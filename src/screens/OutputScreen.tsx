import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GEMINI_API_KEY } from '@env';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Markdown from 'react-native-markdown-display';
import { RootStackParamList, QuizData } from '../types';
import { RootState } from '../redux/Store';
import { setCurrentQuiz, setHistory } from '../redux/Slice';
import { saveQuizToHistory } from '../utils/storage';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import LoadingSkeleton from '../components/LoadingSkeleton';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

type OutputScreenRouteProp = RouteProp<RootStackParamList, 'OutputScreen'>;
type OutputScreenNavProp = StackNavigationProp<RootStackParamList, 'OutputScreen'>;

interface Props {
  route: OutputScreenRouteProp;
  navigation: OutputScreenNavProp;
}

const OutputScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { topic, level, difficulty, questionType, questionCount, currentQuiz } = useSelector(
    (state: RootState) => state.quiz
  );

  const [activeTab, setActiveTab] = useState<'paper' | 'preview'>('paper');
  const [loading, setLoading] = useState(!route.params?.quizId && !currentQuiz);
  const [quizData, setQuizData] = useState<QuizData | null>(currentQuiz);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // If a saved quizId was passed or currentQuiz already exists for the topic
    if (quizData && quizData.topic === topic && !route.params?.quizId) {
      setLoading(false);
      return;
    }

    const generateQuizWithGemini = async () => {
      setLoading(true);
      setErrorMsg('');

      try {
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash',
          generationConfig: {
            responseMimeType: 'application/json',
          },
        });

        const prompt = `Generate a ${questionCount}-question test paper on "${topic}" for ${level} level students.
Difficulty: ${difficulty.join(', ')}. Question Types: ${questionType.join(', ')}.

Return a JSON object with this exact structure:
{
  "markdownPaper": "# Test Paper: ${topic}\\n\\n## Level: ${level} | Questions: ${questionCount}\\n\\n...",
  "questions": [
    {
      "id": "q1",
      "question": "Sample Question Text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation text",
      "type": "MCQ"
    }
  ]
}`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();

        let parsed: any = null;
        try {
          let jsonStr = textResponse.trim();
          jsonStr = jsonStr.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
          
          const firstBrace = jsonStr.indexOf('{');
          const lastBrace = jsonStr.lastIndexOf('}');
          if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
          }
          parsed = JSON.parse(jsonStr);
        } catch (parseErr) {
          console.warn('JSON parsing fallback triggered:', parseErr);
          parsed = {
            markdownPaper: textResponse,
            questions: [],
          };
        }

        const newQuiz: QuizData = {
          id: Date.now().toString(),
          topic,
          level,
          difficulty,
          questionType,
          questions: Array.isArray(parsed.questions) ? parsed.questions : [],
          markdownPaper: parsed.markdownPaper || textResponse,
          createdAt: Date.now(),
        };

        setQuizData(newQuiz);
        dispatch(setCurrentQuiz(newQuiz));

        // Save to local persistence
        const updatedHistory = await saveQuizToHistory(newQuiz);
        dispatch(setHistory(updatedHistory));
      } catch (err: any) {
        console.error('Gemini error:', err);
        setErrorMsg('Failed to generate quiz. Please check your network connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    generateQuizWithGemini();
  }, [topic, level, difficulty, questionType, questionCount]);

  const handleExportPDFOrShare = async () => {
    if (!quizData) return;
    try {
      await Share.share({
        title: `TeachMate Test Paper - ${quizData.topic}`,
        message: `TEACHMATE AI TEST PAPER\nTopic: ${quizData.topic} (${quizData.level})\n\n${quizData.markdownPaper}\n\nGenerated with TeachMate AI`,
      });
    } catch (error) {
      Alert.alert('Share Error', 'Could not export or share test paper.');
    }
  };

  if (loading) {
    return <LoadingSkeleton message={`Crafting ${questionCount} questions on "${topic}"...`} />;
  }

  if (errorMsg || !quizData) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center p-6">
        <Text className="text-4xl mb-4">⚠️</Text>
        <Text className="text-slate-900 font-extrabold text-2xl text-center mb-2">
          Generation Error
        </Text>
        <Text className="text-slate-600 text-base text-center mb-8">
          {errorMsg || 'Unable to retrieve quiz content.'}
        </Text>
        <CustomButton
          title="Try Again 🔄"
          onPress={() => navigation.navigate('GenerateScreen')}
          className="w-full max-w-xs"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <View className="px-5 pt-10 pb-2">
        <Header
          title={quizData.topic}
          subtitle={`${quizData.level} • ${quizData.questions?.length || 0} Questions`}
          onBack={() => navigation.navigate('HomeScreen')}
          rightAction={
            <TouchableOpacity
              onPress={handleExportPDFOrShare}
              className="bg-indigo-50 border border-indigo-200 px-3.5 py-2 rounded-xl flex-row items-center shadow-sm"
            >
              <Text className="text-indigo-600 font-bold text-xs">Export / PDF 📥</Text>
            </TouchableOpacity>
          }
        />

        {/* Action Button: Play Interactive Quiz */}
        {Array.isArray(quizData.questions) && quizData.questions.length > 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate('QuizPlayerScreen', { quiz: quizData })}
            className="bg-indigo-600 rounded-2xl p-4 flex-row items-center justify-between mb-3 shadow-md shadow-indigo-300 active:scale-[0.98] transition-all"
          >
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">🎮</Text>
              <View>
                <Text className="text-white font-extrabold text-lg">
                  Play Interactive Quiz
                </Text>
                <Text className="text-indigo-200 text-xs font-medium">
                  Instant option validation & scorecard
                </Text>
              </View>
            </View>
            <Text className="text-white font-bold text-xl">→</Text>
          </TouchableOpacity>
        )}

        {/* View Switcher Tabs */}
        <View className="flex-row bg-slate-200 p-1 rounded-2xl mb-2">
          <TouchableOpacity
            onPress={() => setActiveTab('paper')}
            className={`flex-1 py-2.5 rounded-xl items-center justify-center ${
              activeTab === 'paper' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text
              className={`font-bold text-sm ${
                activeTab === 'paper' ? 'text-indigo-600' : 'text-slate-600'
              }`}
            >
              📄 Printable Test Paper
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('preview')}
            className={`flex-1 py-2.5 rounded-xl items-center justify-center ${
              activeTab === 'preview' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text
              className={`font-bold text-sm ${
                activeTab === 'preview' ? 'text-indigo-600' : 'text-slate-600'
              }`}
            >
              📋 Question Summary
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView className="flex-1 px-5 pt-2 pb-10" showsVerticalScrollIndicator={false}>
        {activeTab === 'paper' ? (
          <View className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-12">
            <Markdown>{quizData.markdownPaper || 'No markdown paper available.'}</Markdown>
          </View>
        ) : (
          <View className="space-y-4 mb-12">
            {Array.isArray(quizData.questions) && quizData.questions.length > 0 ? (
              quizData.questions.map((q, idx) => (
                <View
                  key={q?.id || idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-3"
                >
                  <Text className="text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
                    Q{idx + 1} • {typeof q?.type === 'string' ? q.type : 'Question'}
                  </Text>
                  <Text className="text-slate-900 font-bold text-base mb-3">
                    {typeof q?.question === 'string' ? q.question : JSON.stringify(q?.question || '')}
                  </Text>
                  {Array.isArray(q?.options) && q.options.length > 0 && (
                    <View className="space-y-1.5 mb-3">
                      {q.options.map((opt, oIdx) => (
                        <Text key={oIdx} className="text-slate-700 text-sm mb-1">
                          {String.fromCharCode(65 + oIdx)}. {typeof opt === 'string' ? opt : JSON.stringify(opt)}
                        </Text>
                      ))}
                    </View>
                  )}
                  {q?.explanation && (
                    <Text className="text-slate-500 text-xs italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      Solution: {typeof q.explanation === 'string' ? q.explanation : JSON.stringify(q.explanation)}
                    </Text>
                  )}
                </View>
              ))
            ) : (
              <View className="bg-white rounded-2xl p-6 border border-slate-200 items-center justify-center my-6">
                <Text className="text-slate-800 font-bold text-base mb-1">
                  No Question Summary Available
                </Text>
                <Text className="text-slate-500 text-xs text-center">
                  Check the "Printable Test Paper" tab to view the complete test paper and answer keys.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OutputScreen;
