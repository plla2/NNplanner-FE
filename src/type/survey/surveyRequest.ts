import { inputsType } from '@/components/feature/Survey/Create';

export interface PostSurveyRequest {
  mmId: string;
  surveyName: string;
  deadlineAt: Date | null;
  additionalQuestions: inputsType[];
}

export interface GetSearchSurveyRequest {
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  startDate?: string;
  endDate?: string;
  state?: string;
}

export interface PutSurveyRequest {
  surveyName: string;
  deadlineAt: Date | null;
  state?: string;
  questions: {
    questionId: number;
    question: string;
    answerType: 'text' | 'radio';
  }[];
}

interface questionsType {
  questionId: number;
  answer: number | string | string[];
}
export interface PostServeyResponsesRequest {
  basicQuestions: questionsType[];
  additionalQuestions: questionsType[];
}
