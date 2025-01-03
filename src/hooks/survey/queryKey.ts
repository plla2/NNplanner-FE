import { GetSearchSurveyRequest } from '@/type/survey/surveyRequest';

export const surveyKeys = {
  all: ['surveys'] as const,

  lists: () => [...surveyKeys.all, 'list'] as const,
  search: (request?: GetSearchSurveyRequest) =>
    [...surveyKeys.lists(), request] as const,
  detail: (surveyId: number) => [...surveyKeys.all, surveyId] as const,
  qrCode: (id: number) => [...surveyKeys.all, id, 'qrCode'],
};
