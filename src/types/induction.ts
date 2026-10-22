export type UserRole = 'instructor' | 'aprendiz';

export interface InstructorProfile {
  name: string;
  email: string;
  centerName: string;
  regional: string;
  assignedFichas: string[];
}

export interface ApprenticeProfile {
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  fichaNumber: string;
  programName: string;
  centerName: string;
  regional: string;
}

export interface InductionModule {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  iconName: string;
  summary: string;
  articlesReference: string;
  sections: {
    title: string;
    content: string[];
    keyTakeaway?: string;
    bulletPoints?: string[];
  }[];
}

export interface RightOrDuty {
  id: string;
  type: 'derecho' | 'deber' | 'prohibicion' | 'medida';
  category: 'Academico' | 'Disciplinario' | 'Bienestar' | 'Tecnologico' | 'Convivencia';
  number?: number;
  title: string;
  description: string;
  legalBasis: string;
  example: string;
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  legalReference: string;
  category: string;
}

export interface CaseSimulation {
  id: string;
  title: string;
  context: string;
  initialSituation: string;
  choices: {
    id: string;
    text: string;
    outcomeTitle: string;
    outcomeDescription: string;
    isOptimal: boolean;
    legalArticle: string;
    points: number;
  }[];
}

export interface UserProgress {
  completedModules: string[];
  quizCompleted: boolean;
  quizScore: number;
  totalQuestions: number;
  unlockedBadges: string[];
  simulationScore: number;
  completedCases: string[];
  certificateIssuedAt?: string;
  certificateCode?: string;
}
