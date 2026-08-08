import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList, QuizData } from '../types';
import { RootState } from '../redux/Store';
import { setHistory, setCurrentQuiz } from '../redux/Slice';
import { getQuizHistory, deleteQuizFromHistory } from '../utils/storage';
import Header from '../components/Header';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

type HistoryScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HistoryScreen'>;
};

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { history } = useSelector((state: RootState) => state.quiz);

  const [search, setSearch] = useState('');
  const [items, setItems] = useState<QuizData[]>(history);

  useEffect(() => {
    const load = async () => {
      const saved = await getQuizHistory();
      dispatch(setHistory(saved));
      setItems(saved);
    };
    load();
  }, [dispatch]);

  useEffect(() => {
    if (!search.trim()) {
      setItems(history);
    } else {
      const q = search.toLowerCase();
      setItems(
        history.filter(
          item =>
            item.topic.toLowerCase().includes(q) ||
            item.level.toLowerCase().includes(q)
        )
      );
    }
  }, [search, history]);

  const handleDelete = (id: string, topic: string) => {
    Alert.alert(
      'Delete Quiz',
      `Are you sure you want to delete "${topic}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = await deleteQuizFromHistory(id);
            dispatch(setHistory(updated));
            setItems(updated);
          },
        },
      ]
    );
  };

  const handleOpenQuiz = (quiz: QuizData) => {
    dispatch(setCurrentQuiz(quiz));
    navigation.navigate('OutputScreen', { quizId: quiz.id });
  };

  const handlePlayQuiz = (quiz: QuizData) => {
    dispatch(setCurrentQuiz(quiz));
    navigation.navigate('QuizPlayerScreen', { quiz });
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="px-5 pt-10 pb-2">
        <Header
          title="Saved Library"
          subtitle={`${history.length} Quizzes Stored Offline`}
          onBack={() => navigation.goBack()}
        />

        {/* Search Bar */}
        <View className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex-row items-center mb-4 shadow-sm">
          <Text className="text-slate-400 text-lg mr-2">🔍</Text>
          <TextInput
            className="flex-1 text-slate-900 text-base font-medium"
            placeholder="Search saved quizzes by topic..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-2 pb-10" showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Text className="text-5xl mb-4">📚</Text>
            <Text className="text-slate-900 font-extrabold text-2xl text-center mb-2">
              {search ? 'No Quizzes Found' : 'No Saved Quizzes Yet'}
            </Text>
            <Text className="text-slate-500 text-base text-center max-w-xs mb-6">
              {search
                ? `No items matched "${search}".`
                : 'Generated quizzes will be saved locally here for offline access.'}
            </Text>
            <CustomButton
              title="Create New Quiz ⚡"
              onPress={() => navigation.navigate('GenerateScreen')}
              className="px-6 py-4"
            />
          </View>
        ) : (
          <View className="space-y-4 mb-12">
            {items.map(quiz => (
              <Card key={quiz.id} className="bg-white border-slate-200 mb-3">
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-1 pr-2">
                    <Text className="text-slate-900 font-extrabold text-xl mb-1">
                      {quiz.topic}
                    </Text>
                    <View className="flex-row items-center space-x-2">
                      <Text className="text-indigo-600 text-xs font-semibold bg-indigo-50 px-2.5 py-0.5 rounded-md">
                        {quiz.level}
                      </Text>
                      <Text className="text-slate-400 text-xs">
                        {quiz.questions?.length || 0} Questions
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDelete(quiz.id, quiz.topic)}
                    className="p-2 bg-slate-100 rounded-full"
                  >
                    <Text className="text-red-500 font-bold text-xs">🗑️</Text>
                  </TouchableOpacity>
                </View>

                {/* Actions */}
                <View className="flex-row space-x-3 mt-4 pt-3 border-t border-slate-100">
                  <TouchableOpacity
                    onPress={() => handlePlayQuiz(quiz)}
                    className="flex-1 bg-indigo-600 py-3 rounded-xl items-center justify-center flex-row shadow-sm"
                  >
                    <Text className="text-white font-bold text-sm">
                      🎮 Play Interactive
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleOpenQuiz(quiz)}
                    className="flex-1 bg-slate-100 py-3 rounded-xl items-center justify-center flex-row"
                  >
                    <Text className="text-slate-800 font-bold text-sm">
                      📄 View Paper
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;
