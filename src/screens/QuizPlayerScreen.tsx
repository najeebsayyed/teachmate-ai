import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, QuizQuestion } from '../types';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

type QuizPlayerRouteProp = RouteProp<RootStackParamList, 'QuizPlayerScreen'>;
type QuizPlayerNavProp = StackNavigationProp<RootStackParamList, 'QuizPlayerScreen'>;

interface Props {
  route: QuizPlayerRouteProp;
  navigation: QuizPlayerNavProp;
}

const QuizPlayerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { quiz } = route.params;
  const questions: QuizQuestion[] = quiz.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | number }>({});
  const [shortAnswerInput, setShortAnswerInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionValue: string | number) => {
    if (showExplanation || isCompleted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optionValue }));
    setShowExplanation(true);
  };

  const handleSubmitShortAnswer = () => {
    if (!shortAnswerInput.trim() || showExplanation || isCompleted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: shortAnswerInput.trim() }));
    setShowExplanation(true);
  };

  const handleSkipQuestion = () => {
    if (showExplanation || isCompleted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: '__SKIPPED__' }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setShortAnswerInput('');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    questions.forEach((q, idx) => {
      const userAns = selectedAnswers[idx];
      if (userAns === '__SKIPPED__' || userAns === undefined) {
        skipped++;
      } else if (typeof q.correctAnswer === 'number' && typeof userAns === 'number') {
        if (q.correctAnswer === userAns) correct++;
        else incorrect++;
      } else if (String(q.correctAnswer).trim().toLowerCase() === String(userAns).trim().toLowerCase()) {
        correct++;
      } else {
        // Partial match check for text answers
        const target = String(q.correctAnswer).trim().toLowerCase();
        const input = String(userAns).trim().toLowerCase();
        if (input.includes(target) || target.includes(input)) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    return { correct, incorrect, skipped };
  };

  if (!questions || questions.length === 0) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center p-6">
        <Text className="text-slate-800 text-xl font-bold text-center mb-4">
          No questions available for interactive play.
        </Text>
        <CustomButton title="Back to Home" onPress={() => navigation.navigate('HomeScreen')} />
      </View>
    );
  }

  if (isCompleted) {
    const { correct, incorrect, skipped } = calculateResults();
    const percentage = Math.round((correct / questions.length) * 100);

    return (
      <View className="flex-1 bg-slate-900 justify-between px-6 pt-16 pb-12">
        <View className="items-center my-auto">
          <View className="w-24 h-24 rounded-full bg-indigo-600/30 border-2 border-indigo-500 items-center justify-center mb-5">
            <Text className="text-5xl">{percentage >= 70 ? '🎉' : percentage >= 40 ? '👍' : '📚'}</Text>
          </View>

          <Text className="text-white font-black text-3xl text-center mb-1 tracking-tight">
            Quiz Results
          </Text>
          <Text className="text-slate-400 text-sm text-center mb-6">
            {quiz.topic} ({quiz.level})
          </Text>

          {/* Main Score Box */}
          <View className="w-full bg-slate-800 rounded-3xl p-6 border border-slate-700 items-center mb-6 shadow-xl">
            <Text className="text-slate-400 font-semibold text-xs uppercase tracking-widest mb-1">
              Overall Score
            </Text>
            <Text className="text-indigo-400 font-black text-5xl mb-1">
              {correct} / {questions.length}
            </Text>
            <Text className="text-slate-300 font-bold text-base mb-6">
              {percentage}% Accuracy
            </Text>

            {/* Breakdown Stats Pill Row */}
            <View className="flex-row w-full space-x-2 pt-4 border-t border-slate-700">
              <View className="flex-1 bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-2xl items-center">
                <Text className="text-emerald-400 font-black text-xl">{correct}</Text>
                <Text className="text-emerald-300 text-xs font-semibold">Correct</Text>
              </View>

              <View className="flex-1 bg-red-500/20 border border-red-500/40 p-3 rounded-2xl items-center">
                <Text className="text-red-400 font-black text-xl">{incorrect}</Text>
                <Text className="text-red-300 text-xs font-semibold">Incorrect</Text>
              </View>

              <View className="flex-1 bg-amber-500/20 border border-amber-500/40 p-3 rounded-2xl items-center">
                <Text className="text-amber-400 font-black text-xl">{skipped}</Text>
                <Text className="text-amber-300 text-xs font-semibold">Skipped</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="space-y-3">
          <CustomButton
            title="Retake Quiz 🔄"
            onPress={() => {
              setSelectedAnswers({});
              setShortAnswerInput('');
              setCurrentIndex(0);
              setIsCompleted(false);
              setShowExplanation(false);
            }}
            variant="secondary"
            className="w-full py-4 mb-2"
          />
          <CustomButton
            title="Return to Dashboard 🏠"
            onPress={() => navigation.navigate('HomeScreen')}
            variant="outline"
            className="w-full py-4"
          />
        </View>
      </View>
    );
  }

  const userSelection = selectedAnswers[currentIndex];
  const isSkipped = userSelection === '__SKIPPED__';
  const hasOptions = Array.isArray(currentQ?.options) && currentQ.options.length > 0;

  return (
    <View className="flex-1 bg-slate-50">
      <View className="px-5 pt-10 pb-2">
        <Header
          title={`Question ${currentIndex + 1} of ${questions.length}`}
          subtitle={quiz.topic}
          onBack={() => navigation.goBack()}
        />
        {/* Progress Bar */}
        <View className="w-full h-2.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
          <View
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-4 pb-8" showsVerticalScrollIndicator={false}>
        {/* Question Text Card */}
        <View className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-indigo-600 font-bold text-xs uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
              {currentQ.type || 'Question'}
            </Text>

            {!showExplanation && (
              <TouchableOpacity
                onPress={handleSkipQuestion}
                className="bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex-row items-center"
              >
                <Text className="text-amber-700 font-semibold text-xs">Skip ⏭️</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text className="text-slate-900 font-extrabold text-xl leading-snug">
            {currentQ.question}
          </Text>
        </View>

        {/* Options vs Short Answer Input */}
        {hasOptions ? (
          <View className="space-y-3 mb-6">
            {currentQ.options!.map((option, idx) => {
              const isSelected = userSelection === idx || userSelection === option;
              let btnStyle = 'bg-white border-slate-200';
              let textStyle = 'text-slate-800';

              if (showExplanation) {
                const isCorrect =
                  currentQ.correctAnswer === idx ||
                  String(currentQ.correctAnswer).trim().toLowerCase() === String(option).trim().toLowerCase();

                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 border-emerald-600';
                  textStyle = 'text-white font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-red-500 border-red-600';
                  textStyle = 'text-white font-bold';
                }
              } else if (isSelected) {
                btnStyle = 'bg-indigo-600 border-indigo-600';
                textStyle = 'text-white font-bold';
              }

              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleSelectOption(idx)}
                  disabled={showExplanation}
                  activeOpacity={0.7}
                  className={`w-full p-4 rounded-2xl border flex-row items-center mb-3 shadow-sm ${btnStyle}`}
                >
                  <View className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center mr-3">
                    <Text className="font-bold text-slate-700 text-sm">
                      {String.fromCharCode(65 + idx)}
                    </Text>
                  </View>
                  <Text className={`flex-1 text-base font-medium ${textStyle}`}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          /* Short Answer Input Section */
          <View className="mb-6">
            <Text className="text-slate-700 font-semibold text-sm mb-2">
              Write your short answer below:
            </Text>
            <TextInput
              className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 text-base font-medium shadow-sm mb-3 min-h-[100px]"
              placeholder="Type your answer here..."
              placeholderTextColor="#94A3B8"
              multiline
              textAlignVertical="top"
              value={shortAnswerInput}
              onChangeText={setShortAnswerInput}
              editable={!showExplanation}
            />

            {!showExplanation && (
              <CustomButton
                title="Submit Answer ✍️"
                onPress={handleSubmitShortAnswer}
                className="w-full py-4 mb-2"
                disabled={!shortAnswerInput.trim()}
              />
            )}
          </View>
        )}

        {/* Skipped Notice */}
        {showExplanation && isSkipped && (
          <View className="bg-amber-50 p-4 rounded-2xl border border-amber-200 mb-4">
            <Text className="text-amber-800 font-bold text-sm">
              ⏭️ Question Skipped
            </Text>
          </View>
        )}

        {/* Answer Explanation & Solution */}
        {showExplanation && (
          <View className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 mb-6">
            <Text className="text-indigo-900 font-bold text-sm mb-1">
              💡 Correct Answer & Solution:
            </Text>
            <Text className="text-indigo-950 font-bold text-base mb-2">
              {typeof currentQ.correctAnswer === 'number' && hasOptions
                ? currentQ.options![currentQ.correctAnswer]
                : String(currentQ.correctAnswer)}
            </Text>
            {currentQ.explanation && (
              <Text className="text-indigo-800 text-sm leading-relaxed">
                {currentQ.explanation}
              </Text>
            )}
          </View>
        )}

        {/* Next CTA */}
        {showExplanation && (
          <CustomButton
            title={currentIndex < questions.length - 1 ? 'Next Question →' : 'View Final Score 🏆'}
            onPress={handleNext}
            className="w-full py-4 mb-8"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default QuizPlayerScreen;
