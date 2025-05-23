import { useState } from 'react';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { Selectbox } from '@/components/common/Selectbox';
import {
  SubTitle1Black,
  Subtitle2Black,
  Subtitle2Grey100,
} from '@/components/common/Typography';
import { inputsType } from '@/components/feature/Survey/Create';
import { WARNING } from '@/constants/_toastMessage';
import { useToastStore } from '@/stores/useToastStore';

interface Props {
  inputs: inputsType[];
  setInputs: React.Dispatch<React.SetStateAction<inputsType[]>>;
  successSubmit: boolean;
}

const EXTRA_QUESTIONS_LIMIT = 7;

const ANSWER_TYPE = [
  { label: '선택형', value: 'radio' },
  { label: '서술형', value: 'text' },
];

const AdditionQuestions = ({ inputs, setInputs, successSubmit }: Props) => {
  const [addInputValue, setAddInputValue] = useState('');
  const [addInputType, setAddInputType] = useState('text');
  const showToast = useToastStore((state) => state.showToast);

  const handleAddInput = () => {
    if (inputs.length >= EXTRA_QUESTIONS_LIMIT) {
      showToast(WARNING.maxAdditionQuestion, 'warning', 2000);
      return;
    }
    if (addInputValue === '' || addInputType === '') {
      showToast(WARNING.noQuestionValue, 'warning', 2000);
      return;
    }
    if (!successSubmit && inputs.length < EXTRA_QUESTIONS_LIMIT) {
      setInputs((prevInputs) => [
        ...prevInputs,
        {
          question: addInputValue,
          answerType: addInputType,
        },
      ]);
      setAddInputValue('');
      setAddInputType('text');
    }
  };

  const handleChangeInput = (questionId: number, newValue: string) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.questionId === questionId
          ? { ...input, question: newValue }
          : input,
      ),
    );
  };

  const handleChangeInputType = (questionId: number, newType: string) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.questionId === questionId
          ? { ...input, answerType: newType }
          : input,
      ),
    );
  };

  const handleChangeAddInputType = (selectedValue: string) => {
    const selectedOption = ANSWER_TYPE.find(
      (opt) => opt.value === selectedValue,
    );
    if (selectedOption) {
      setAddInputType(selectedOption.value);
    }
  };

  const handleDeleteInput = (indexToDelete: number) => {
    !successSubmit &&
      setInputs((prevInputs) =>
        prevInputs.filter((_, index) => index !== indexToDelete),
      );
  };

  return (
    <div className='flex w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
      <SubTitle1Black>추가 질문</SubTitle1Black>
      <div className='flex items-center gap-2'>
        <Input
          type='text'
          variant='grey50'
          value={addInputValue}
          onChange={(e) => setAddInputValue(e.target.value)}
          placeholder='추가 질문을 입력해 주세요.'
          borderRadius='large'
        />
        <div className='min-w-[110px]'>
          <Selectbox
            key={addInputType}
            bgColor='grey'
            size='small'
            options={ANSWER_TYPE}
            selectedValue={
              addInputType === 'text'
                ? '서술형'
                : addInputType === 'radio'
                  ? '선택형'
                  : ''
            }
            placeholder='서술형'
            onChange={handleChangeAddInputType}
            buttonSize='sm'
          />
        </div>
        <div className='min-w-[60px]'>
          <Button
            size='sm'
            width='full'
            variant='teritary'
            onClick={handleAddInput}
            disabled={successSubmit}
            className='rounded-lg'
          >
            <Subtitle2Grey100>등록</Subtitle2Grey100>
          </Button>
        </div>
      </div>
      <ul className='flex flex-col gap-3'>
        {inputs.length !== 0 &&
          inputs.map((input, idx) => (
            <div key={`${input}-${idx}`} className='flex items-center gap-2'>
              <Input
                type='text'
                variant='grey50'
                value={input.question}
                onChange={(e) =>
                  handleChangeInput(input.questionId!, e.target.value)
                }
                borderRadius='large'
              />
              <div className='min-w-[110px]'>
                <Selectbox
                  size='small'
                  bgColor='grey'
                  key={input.answerType}
                  options={ANSWER_TYPE}
                  selectedValue={
                    input.answerType === 'text'
                      ? '서술형'
                      : input.answerType === 'radio'
                        ? '선택형'
                        : ''
                  }
                  onChange={(selectedValue) =>
                    handleChangeInputType(input.questionId!, selectedValue)
                  }
                  buttonSize='sm'
                />
              </div>
              <div className='min-w-[60px]'>
                <Button
                  size='sm'
                  variant='outline'
                  width='full'
                  onClick={() => handleDeleteInput(idx)}
                  disabled={successSubmit}
                  className='rounded-lg'
                >
                  <Subtitle2Black>삭제</Subtitle2Black>
                </Button>
              </div>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default AdditionQuestions;
