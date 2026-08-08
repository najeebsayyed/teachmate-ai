export interface QuizQuestion {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string | number; // Index or text of correct answer
  explanation?: string;
  type: 'MCQ' | 'True/False' | 'Short answer';
}

export interface QuizData {
  id: string;
  topic: string;
  level: string;
  difficulty: string[];
  questionType: string[];
  questions: QuizQuestion[];
  markdownPaper: string;
  createdAt: number;
}

export interface QuizInputState {
  topic: string;
  level: string;
  difficulty: string[];
  questionType: string[];
  questionCount: number;
  currentQuiz: QuizData | null;
  history: QuizData[];
  loading: boolean;
  error: string | null;
}

export type RootStackParamList = {
  SplashScreen: undefined;
  OnboardingScreen: undefined;
  HomeScreen: undefined;
  GenerateScreen: undefined;
  OutputScreen: { quizId?: string };
  QuizPlayerScreen: { quiz: QuizData };
  HistoryScreen: undefined;
};
