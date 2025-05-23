'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { inputsType } from '@/components/feature/Survey/Create';
import AdditionQuestions from '@/components/shared/Survey/AdditionQuestions';
import SurveyControls from '@/components/shared/Survey/Controls';
import DefaultQuestions from '@/components/shared/Survey/DefaultQuestions';
import SurveyHeader from '@/components/shared/Survey/Header';
import { BASE_ROUTES } from '@/constants/_navbar';
import { surveyKeys } from '@/hooks/survey/queryKey';
import { useGetSurveyDetail } from '@/hooks/survey/useGetSurveyDetail';
import { usePutSurvey } from '@/hooks/survey/usePutSurvey';
import useNavigate from '@/hooks/useNavigate';
import { useToastStore } from '@/stores/useToastStore';

interface Props {
  id: number;
}

const SurveyEdit = ({ id }: Props) => {
  const queryClient = useQueryClient();
  const { navigate } = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const { data: detailSurvey } = useGetSurveyDetail(id);

  const [editSurveyName, setEditSurveyName] = useState('');
  const [editDeadLine, setEditDeadLine] = useState<Date | null | string>(null);
  const [inputs, setInputs] = useState<inputsType[]>([]);

  useEffect(() => {
    if (detailSurvey) {
      setEditSurveyName(detailSurvey.surveyName);
      setEditDeadLine(detailSurvey.deadline);
      setInputs(
        detailSurvey.additionalQuestions.map((item) => ({
          questionId: item.questionId,
          question: item.questionText,
          answerType: item.answerType,
        })),
      );
    }
  }, [detailSurvey]);

  const { mutate } = usePutSurvey(id, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: surveyKeys.detail(id) });
      navigate(BASE_ROUTES.VIEW_CHART);
      showToast('설문 수정 성공', 'success', 1000);
    },
    onError: () => {
      showToast('기본 질문은 수정이 불가능합니다. ', 'warning', 1000);
    },
  });

  const submitSurvey = () => {
    if (detailSurvey) {
      mutate({
        deadlineAt: editDeadLine,
        surveyName: editSurveyName,
        state: 'CLOSED',
        questions: inputs.map(({ questionId, question, answerType }) => {
          const base = { question, answerType: answerType as 'text' | 'radio' };
          return questionId ? { questionId, ...base } : base;
        }),
      });
    }
  };

  return (
    detailSurvey && (
      <div className='flex flex-col gap-5'>
        <SurveyHeader title='설문 수정' />
        <SurveyControls
          isChangeable
          surveyName={editSurveyName!}
          setEditSurveyName={setEditSurveyName}
          deadLine={editDeadLine!}
          setDeadLine={setEditDeadLine!}
          accessBtnText='수정'
          accessHandler={submitSurvey}
        />
        <div className='flex gap-5'>
          <DefaultQuestions />
          <AdditionQuestions
            inputs={inputs}
            setInputs={setInputs}
            successSubmit={false}
          />
        </div>
      </div>
    )
  );
};

export default SurveyEdit;
