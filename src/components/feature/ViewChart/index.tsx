'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { surveyType } from '@/type/survey/surveyResponse';
import ControlTab from '@/components/common/ControlTab';
import Pagination from '@/components/common/Pagination';
import {
  Body2Assistive,
  SubTitle1Black,
  SubTitle1Green500,
} from '@/components/common/Typography';
import GetAllListControls from '@/components/shared/GetAllList/Controls';
import GetAllListHeader from '@/components/shared/GetAllList/Header';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import { SURVEY_FILTER_OPTIONS, TAB_OPTIONS } from '@/constants/_controlTab';
import { ROUTES } from '@/constants/_navbar';
import { PAGE_LIMIT } from '@/constants/_pagination';
import { useGetSurveyList } from '@/hooks/survey/useGetSurveyList';

const ViewChart = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const sort = searchParam.get('sort') as string;
  const currentTab = sort ?? ('최신순' as string);

  const [searchValue, setSearchValue] = useState('');
  const [actualSearchValue, setActualSearchValue] = useState('');

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>(
    SURVEY_FILTER_OPTIONS[0],
  );
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS[0]);
  const [page, setPage] = useState(1);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === '') {
      setActualSearchValue('');
    }
  };

  const handleSearchSubmit = () => {
    setActualSearchValue(searchValue);
  };

  const { data: surveyList, refetch } = useGetSurveyList({
    page,
    sort: currentTab === '최신순' ? 'createdAt,desc' : 'createdAt,asc',
    search: actualSearchValue,
    state:
      selectedFilter === '전체'
        ? ''
        : selectedFilter === '진행중'
          ? 'IN_PROGRESS'
          : 'CLOSED',
    startDate:
      selectedMonth && selectedYear
        ? `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-01T00:00:00`
        : undefined,
    endDate:
      selectedMonth && selectedYear
        ? `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-31T23:59:59`
        : undefined,
  });

  useEffect(() => {
    refetch();
  }, [selectedFilter, refetch]);

  const convertToTableRowData = (surveys: surveyType[]) => {
    return surveys.map((survey) => ({
      '설문 ID': survey.surveyId,
      '설문 이름': survey.surveyName,
      생성일: dayjs(survey.createdAt).format('YYYY-MM-DD'),
      마감일: dayjs(survey.deadlineAt).format('YYYY-MM-DD'),
      상태: survey.state === 'IN_PROGRESS' ? '진행중' : '마감',
    }));
  };

  return (
    <div className='flex flex-col gap-6'>
      {surveyList && (
        <>
          <GetAllListHeader title='설문 결과 조회' />
          <GetAllListControls
            type='viewChart'
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            searchValue={searchValue}
            handleChangeSearchValue={handleChangeSearchValue}
            inputPlaceholder='설문 이름을 입력하세요'
            handleSearchSubmit={handleSearchSubmit}
          />
          {surveyList.data.totalItems === 0 ? (
            <div className='flex h-[168px] items-center justify-center rounded-2xl bg-white-100 p-6'>
              <Body2Assistive>설문이 존재하지 않습니다.</Body2Assistive>
            </div>
          ) : (
            <div className='flex flex-col gap-6 rounded-2xl bg-white-100 p-6'>
              <div className='flex items-center justify-between gap-6'>
                <div className='flex items-center gap-1'>
                  <SubTitle1Black>총</SubTitle1Black>
                  <div>
                    <SubTitle1Green500>
                      {surveyList.data.totalItems}
                    </SubTitle1Green500>
                    <SubTitle1Black>개</SubTitle1Black>
                  </div>
                </div>
                <div className='flex items-center gap-6'>
                  <ControlTab
                    controlTabItems={SURVEY_FILTER_OPTIONS}
                    selectedFilter={selectedFilter!}
                    setSelectedFilter={setSelectedFilter!}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                  <ControlTab
                    isSortControl
                    controlTabItems={TAB_OPTIONS}
                    selectedFilter={selectedFilter!}
                    setSelectedFilter={setSelectedFilter!}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                </div>
              </div>
              <GetAllListTable
                data={convertToTableRowData(surveyList.data.surveys)}
                onRowClick={(id) => router.push(`${ROUTES.VIEW.CHART}/${id}`)}
                headerType='viewChart'
              />
              <Pagination
                limit={PAGE_LIMIT}
                page={page}
                setPage={setPage}
                totalPosts={surveyList.data.totalItems}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewChart;
