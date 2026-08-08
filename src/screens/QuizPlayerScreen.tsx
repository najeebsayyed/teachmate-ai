import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionValue: string | number) => {
    if (showExplanation || isCompleted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optionValue }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      const userAns = selectedAnswers[idx];
      if (userAns !== undefined) {
        if (typeof q.correctAnswer === 'number' && typeof userAns === 'number') {
          if (q.correctAnswer === userAns) score++;
        } else if (String(q.correctAnswer).trim().toLowerCase() === String(userAns).trim().toLowerCase()) {
          score++;
        }
      }
    });
    return score;
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
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <View className="flex-1 bg-slate-900 justify-between px-6 pt-16 pb-12">
        <View className="items-center my-auto">
          <View className="w-28 h-28 rounded-full bg-indigo-600/30 border-2 border-indigo-500 items-center justify-center mb-6">
            <Text className="text-5xl">{percentage >= 70 ? '🎉' : '📚'}</Text>
          </View>

          <Text className="text-white font-extrabold text-3xl text-center mb-2">
            Quiz Completed!
          </Text>
          <Text className="text-slate-400 text-base text-center mb-6">
            {quiz.topic} ({quiz.level})
          </Text>

          <View className="w-full bg-slate-800 rounded-3xl p-6 border border-slate-700 items-center mb-6">
            <Text className="text-slate-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Your Final Score
            </Text>
            <Text className="text-indigo-400 font-black text-6xl mb-2">
              {score} / {questions.length}
            </Text>
            <Text className="text-slate-300 font-bold text-lg">
              {percentage}% Mastery
            </Text>
          </View>
        </View>

        <View className="space-y-3">
          <CustomButton
            title="Retake Quiz 🔄"
            onPress={() => {
              setSelectedAnswers({});
              setCurrentIndex(0);
              setIsCompleted(false);
              setShowExplanation(false);
            }}
            variant="secondary"
            className="w-full py-4 mb-3"
          />
          <CustomButton
            title="Return to Home 🏠"
            onPress={() => navigation.navigate('HomeScreen')}
            variant="outline"
            className="w-full py-4"
          />
        </View>
      </View>
    );
  }

  const userSelection = selectedAnswers[currentIndex];

  return (
    <View className="flex-1 bg-slate-50">
      <View className="px-5 pt-10 pb-2">
        <Header
          title={`Question ${currentIndex + 1} of ${questions.length}`}
          subtitle={quiz.topic}
          onBack={() => navigation.goBack()}
        />
        {/* Progress Bar */}
        <View className="w-full h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
          <View
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-4 pb-8" showsVerticalScrollIndicator={false}>
        {/* Question Text Card */}
        <View className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-indigo-600 font-bold text-xs uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
              {currentQ.type}
            </Text>
          </View>
          <Text className="text-slate-900 font-bold text-xl leading-snug">
            {currentQ.question}
          </Text>
        </View>

        {/* Options */}
        {currentQ.options && currentQ.options.length > 0 ? (
          <View className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
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
          <View className="bg-white p-5 rounded-2xl border border-slate-200 mb-6">
            <Text className="text-slate-500 italic">
              Correct Answer Key: {String(currentQ.correctAnswer)}
            </Text>
          </View>
        )}

        {/* Answer Explanation */}
        {showExplanation && currentQ.explanation && (
          <View className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 mb-6">
            <Text className="text-indigo-900 font-bold text-sm mb-1">
              💡 Explanation & Solution:
            </Text>
            <Text className="text-indigo-800 text-sm leading-relaxed">
              {currentQ.explanation}
            </Text>
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
