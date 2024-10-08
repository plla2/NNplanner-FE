import { Input } from '@/components/common/Input';
import { Selectbox } from '@/components/common/Selectbox';
import { PageHeaderTitle } from '@/components/common/Typography';

type MealCreateHeaderProps = {
  inputValue: string;
  seletedCategory: string[];
  pageHeaderTitle: string;
};

const MealCreateHeader = ({
  inputValue,
  seletedCategory,
  pageHeaderTitle,
}: MealCreateHeaderProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <PageHeaderTitle>{pageHeaderTitle}</PageHeaderTitle>
      <div className='flex w-fit items-center gap-4'>
        <Input
          className='text-lg font-semibold focus:border-green-400'
          bgcolor='meal'
          height='basic'
          value={inputValue}
          disabled
        />
        <div className='flex gap-2'>
          <Selectbox
            size='small'
            selectedValue={seletedCategory[0]}
            className='cursor-not-allowed focus:border-gray-300'
            readonly={true}
          />
          <Selectbox
            size='small'
            selectedValue={seletedCategory[1]}
            className='cursor-not-allowed focus:border-gray-300'
            readonly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MealCreateHeader;
