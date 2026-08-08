import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizData, QuizInputState } from '../types';

const initialState: QuizInputState = {
  topic: '',
  level: '',
  difficulty: ['Medium'],
  questionType: ['MCQ'],
  questionCount: 10,
  currentQuiz: null,
  history: [],
  loading: false,
  error: null,
};

const Slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizInput: (
      state,
      action: PayloadAction<{
        topic: string;
        level: string;
        difficulty: string[];
        questionType: string[];
        questionCount?: number;
      }>
    ) => {
      state.topic = action.payload.topic;
      state.level = action.payload.level;
      state.difficulty = action.payload.difficulty;
      state.questionType = action.payload.questionType;
      if (action.payload.questionCount) {
        state.questionCount = action.payload.questionCount;
      }
    },
    setCurrentQuiz: (state, action: PayloadAction<QuizData | null>) => {
      state.currentQuiz = action.payload;
    },
    setHistory: (state, action: PayloadAction<QuizData[]>) => {
      state.history = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setQuizInput,
  setCurrentQuiz,
  setHistory,
  setLoading,
  setError,
} = Slice.actions;

export default Slice.reducer;
