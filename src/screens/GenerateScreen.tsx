import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../types';
import { RootState } from '../redux/Store';
import { setQuizInput } from '../redux/Slice';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import ChipSelect from '../components/ChipSelect';
import CustomButton from '../components/CustomButton';

type GenerateScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GenerateScreen'>;
};

const levels = [
  'Kindergarten',
  'Primary',
  'Secondary',
  'Higher Secondary',
  'Graduation',
];

const difficultyOptions = ['Easy', 'Medium', 'Hard'];
const questionTypeOptions = ['MCQ', 'True/False', 'Short answer'];
const countOptions = [5, 10, 15, 20];

const GenerateScreen: React.FC<GenerateScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const quizState = useSelector((state: RootState) => state.quiz);

  const [topic, setTopic] = useState(quizState.topic || '');
  const [selectedLevel, setSelectedLevel] = useState(quizState.level || 'Secondary');
  const [difficulty, setDifficulty] = useState<string[]>(quizState.difficulty.length ? quizState.difficulty : ['Medium']);
  const [questionType, setQuestionType] = useState<string[]>(quizState.questionType.length ? quizState.questionType : ['MCQ']);
  const [questionCount, setQuestionCount] = useState<number>(quizState.questionCount || 10);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    if (!topic.trim()) {
      setError('Please describe your quiz topic');
      return;
    }
    setError('');

    dispatch(
      setQuizInput({
        topic: topic.trim(),
        level: selectedLevel,
        difficulty,
        questionType,
        questionCount,
      })
    );

    navigation.navigate('OutputScreen', {});
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="px-5 pt-10 pb-2">
        <Header
          title="Generate Quiz"
          subtitle="Configure your AI paper parameters"
          onBack={() => navigation.goBack()}
        />
      </View>

      <ScrollView className="flex-1 px-5 pt-2 pb-10" showsVerticalScrollIndicator={false}>
        {/* Topic Input */}
        <CustomInput
          label="Quiz Topic or Subject"
          placeholder="e.g. Photosynthesis, Class 10 Physics, Python Loops..."
          value={topic}
          onChangeText={text => {
            setTopic(text);
            if (text.trim()) setError('');
          }}
          error={error}
        />

        {/* Target Level */}
        <ChipSelect
          label="Target Education Level"
          options={levels}
          selectedValues={[selectedLevel]}
          onSelect={values => setSelectedLevel(values[0])}
          multiSelect={false}
        />

        {/* Question Count Stepper */}
        <View className="w-full mb-5">
          <Text className="text-slate-800 font-semibold text-base mb-2.5">
            Number of Questions
          </Text>
          <View className="flex-row gap-2.5">
            {countOptions.map(num => (
              <TouchableOpacity
                key={num}
                onPress={() => setQuestionCount(num)}
                className={`flex-1 py-3 rounded-2xl border items-center justify-center ${
                  questionCount === num
                    ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-200'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <Text
                  className={`font-bold text-base ${
                    questionCount === num ? 'text-white' : 'text-slate-700'
                  }`}
                >
                  {num} Qs
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Difficulty Select */}
        <ChipSelect
          label="Difficulty Level"
          options={difficultyOptions}
          selectedValues={difficulty}
          onSelect={values => setDifficulty(values.length ? values : ['Medium'])}
          multiSelect={true}
        />

        {/* Question Types */}
        <ChipSelect
          label="Question Formats"
          options={questionTypeOptions}
          selectedValues={questionType}
          onSelect={values => setQuestionType(values.length ? values : ['MCQ'])}
          multiSelect={true}
        />

        {/* Generate CTA */}
        <View className="mt-4 mb-12">
          <CustomButton
            title="Generate AI Quiz ⚡"
            onPress={handleGenerate}
            className="w-full py-5"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default GenerateScreen;
