import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../types';
import { RootState } from '../redux/Store';
import { setQuizInput, setHistory } from '../redux/Slice';
import { getQuizHistory } from '../utils/storage';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

const quickTopics = [
  { topic: "Newton's Laws of Motion", level: 'Secondary', difficulty: ['Medium'], questionType: ['MCQ'] },
  { topic: 'Python Programming Basics', level: 'Graduation', difficulty: ['Easy'], questionType: ['MCQ', 'Short answer'] },
  { topic: 'Cell Biology & Organelles', level: 'Higher Secondary', difficulty: ['Hard'], questionType: ['MCQ'] },
  { topic: 'World War II Key Events', level: 'Secondary', difficulty: ['Medium'], questionType: ['True/False', 'MCQ'] },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { history } = useSelector((state: RootState) => state.quiz);

  useEffect(() => {
    const loadHistory = async () => {
      const saved = await getQuizHistory();
      dispatch(setHistory(saved));
    };
    loadHistory();
  }, [dispatch]);

  const handleSelectPreset = (item: typeof quickTopics[0]) => {
    dispatch(
      setQuizInput({
        topic: item.topic,
        level: item.level,
        difficulty: item.difficulty,
        questionType: item.questionType,
        questionCount: 10,
      })
    );
    navigation.navigate('GenerateScreen');
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 px-5 pt-12 pb-8">
      {/* Top Banner */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-indigo-600 font-bold text-sm uppercase tracking-wider">
            Welcome to TeachMate
          </Text>
          <Text className="text-slate-900 font-extrabold text-3xl tracking-tight">
            Dashboard ⚡
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('HistoryScreen')}
          className="w-12 h-12 rounded-2xl bg-white border border-slate-200 items-center justify-center shadow-sm"
        >
          <Text className="text-xl">📚</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Card */}
      <Card className="bg-indigo-950 border-indigo-900 p-6 mb-6 shadow-xl">
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 rounded-xl bg-indigo-600 items-center justify-center mr-3">
            <Text className="text-white text-xl font-black">🤖</Text>
          </View>
          <View className="bg-indigo-900/80 px-3 py-1 rounded-full border border-indigo-700/50">
            <Text className="text-indigo-300 font-bold text-xs uppercase tracking-wider">
              AI-Powered Engine
            </Text>
          </View>
        </View>
        <Text className="text-white font-extrabold text-2xl mb-2 tracking-tight">
          Create AI Quizzes & Test Papers
        </Text>
        <Text className="text-slate-300 text-sm mb-6 leading-relaxed font-medium">
          Generate tailored questions, instant scoring flashcards, or exportable print papers in seconds.
        </Text>
        <CustomButton
          title="Create New Quiz ✨"
          onPress={() => navigation.navigate('GenerateScreen')}
          variant="secondary"
          className="py-4"
        />
      </Card>

      {/* Quick Action Grid */}
      <View className="flex-row space-x-4 mb-6">
        <Card
          className="flex-1 p-4 bg-white border-slate-200"
          onPress={() => navigation.navigate('GenerateScreen')}
        >
          <Text className="text-2xl mb-2">📝</Text>
          <Text className="text-slate-900 font-bold text-base mb-1">
            Custom Quiz
          </Text>
          <Text className="text-slate-500 text-xs">
            Set level & difficulty
          </Text>
        </Card>

        <Card
          className="flex-1 p-4 bg-white border-slate-200"
          onPress={() => navigation.navigate('HistoryScreen')}
        >
          <Text className="text-2xl mb-2">📂</Text>
          <Text className="text-slate-900 font-bold text-base mb-1">
            Saved History
          </Text>
          <Text className="text-slate-500 text-xs">
            {history.length} saved quiz{history.length === 1 ? '' : 'zes'}
          </Text>
        </Card>
      </View>

      {/* Popular Presets */}
      <Text className="text-slate-900 font-extrabold text-xl mb-4">
        Popular Presets 🎯
      </Text>

      <View className="space-y-3 mb-10">
        {quickTopics.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectPreset(item)}
            activeOpacity={0.7}
            className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm mb-3"
          >
            <View className="flex-1 pr-3">
              <Text className="text-slate-900 font-bold text-base mb-1">
                {item.topic}
              </Text>
              <View className="flex-row items-center space-x-2">
                <Text className="text-indigo-600 text-xs font-semibold bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  {item.level}
                </Text>
                <Text className="text-slate-500 text-xs font-medium ml-2">
                  {item.difficulty.join(', ')}
                </Text>
              </View>
            </View>
            <Text className="text-slate-400 text-xl font-bold">→</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
