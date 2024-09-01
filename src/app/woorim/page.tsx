'use client';

import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button/Button';
import Calendar from '@/components/common/Calendar';
import Icon from '@/components/common/Icon';
import { Option, Selectbox } from '@/components/common/Selectbox';
import Table from '@/components/common/Table';

const tableData = {
  '에너지(kcal)': 250,
  '탄수화물(g)': 30,
  '단백질(g)': 15,
  '지방(g)': 10,
};

const page = () => {
  const calendarData = {
    '2024-09-01': [
      { id: '1', content: '비빔밥' },
      { id: '2', content: '된장국' },
      { id: '3', content: '오이무침' },
      { id: '4', content: '시금치나물' },
      { id: '5', content: '김치' },
    ],
    '2024-09-02': [
      { id: '1', content: '김치찌개' },
      { id: '2', content: '잡채' },
      { id: '3', content: '계란말이' },
      { id: '4', content: '도토리묵' },
      { id: '5', content: '깍두기' },
    ],
    '2024-09-03': [
      { id: '1', content: '불고기' },
      { id: '2', content: '미역국' },
      { id: '3', content: '고구마줄기볶음' },
      { id: '4', content: '콩나물무침' },
      { id: '5', content: '배추김치' },
      { id: '6', content: '김' },
    ],
    '2024-09-04': [
      { id: '1', content: '삼계탕' },
      { id: '2', content: '깍두기' },
      { id: '3', content: '부추전' },
      { id: '4', content: '오이소박이' },
      { id: '5', content: '콩나물국' },
    ],
    '2024-09-05': [
      { id: '1', content: '갈비찜' },
      { id: '2', content: '두부조림' },
      { id: '3', content: '시래기국' },
      { id: '4', content: '무생채' },
      { id: '5', content: '김치' },
    ],
    '2024-09-06': [
      { id: '1', content: '비빔국수' },
      { id: '2', content: '계란찜' },
      { id: '3', content: '어묵볶음' },
      { id: '4', content: '고사리나물' },
      { id: '5', content: '김치' },
    ],
    '2024-09-07': [
      { id: '1', content: '청국장' },
      { id: '2', content: '돼지불고기' },
      { id: '3', content: '애호박전' },
      { id: '4', content: '콩자반' },
      { id: '5', content: '배추김치' },
      { id: '6', content: '무말랭이' },
    ],
  };
  const options: Option[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
    { value: 'fig', label: 'Fig' },
    { value: 'grape', label: 'Grape' },
    { value: 'honeydew', label: 'Honeydew' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'mango', label: 'Mango' },
    { value: 'nectarine', label: 'Nectarine' },
    { value: 'orange', label: 'Orange' },
    { value: 'papaya', label: 'Papaya' },
    { value: 'quince', label: 'Quince' },
  ];
  return (
    <div className='flex h-full w-full flex-col gap-4 p-4'>
      <Calendar
        year={2024}
        month={9}
        data={calendarData}
        onDateClick={() => console.log('clicked')}
      />
      <div className='flex h-full w-full gap-4 bg-slate-300 p-4'>
        <Selectbox size='small' className='w-full' options={options} />
        <Selectbox size='basic' options={options} />
        <Selectbox size='large' options={options} />
      </div>

      <Table data={tableData} />
      <div className='flex items-end gap-4'>
        <Icon name='search' />
        <Badge imageSrc='/imgs/pi-gon-ping.jpg' />
      </div>

      <div className='flex items-end gap-4'>
        <Button variant='primary' size='small' width='fit'>
          SMALL PRIMARY
        </Button>
        <Button variant='primary' size='basic' width='fit'>
          BASIC PRIMARY
        </Button>
        <Button variant='primary' size='large' width='fit'>
          LARGE PRIMARY
        </Button>
      </div>
      <div className='flex items-end gap-4'>
        <Button variant='secondary' size='small' width='fit'>
          SMALL SECONDARY
        </Button>
        <Button variant='secondary' size='basic' width='fit'>
          BASIC SECONDARY
        </Button>
        <Button variant='secondary' size='large' width='fit'>
          LARGE SECONDARY
        </Button>
      </div>
      <div className='flex items-end gap-4'>
        <Button variant='outline' size='small' width='fit'>
          SMALL OUTLINE
        </Button>
        <Button variant='outline' size='basic' width='fit'>
          BASIC OUTLINE
        </Button>
        <Button variant='outline' size='large' width='fit'>
          LARGE OUTLINE
        </Button>
      </div>
    </div>
  );
};

export default page;
