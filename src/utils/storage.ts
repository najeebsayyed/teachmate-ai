import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuizData } from '../types';

const ONBOARDING_KEY = '@teachmate_onboarding_completed';
const HISTORY_KEY = '@teachmate_quiz_history';

export const getOnboardingStatus = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch (e) {
    console.error('Failed to fetch onboarding status', e);
    return false;
  }
};

export const setOnboardingStatus = async (completed: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, completed ? 'true' : 'false');
  } catch (e) {
    console.error('Failed to save onboarding status', e);
  }
};

export const getQuizHistory = async (): Promise<QuizData[]> => {
  try {
    const json = await AsyncStorage.getItem(HISTORY_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to fetch quiz history', e);
    return [];
  }
};

export const saveQuizToHistory = async (quiz: QuizData): Promise<QuizData[]> => {
  try {
    const history = await getQuizHistory();
    // Prepend new quiz & deduplicate by id
    const filtered = history.filter(item => item.id !== quiz.id);
    const updated = [quiz, ...filtered];
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save quiz to history', e);
    return [];
  }
};

export const deleteQuizFromHistory = async (id: string): Promise<QuizData[]> => {
  try {
    const history = await getQuizHistory();
    const updated = history.filter(item => item.id !== id);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete quiz from history', e);
    return [];
  }
};
