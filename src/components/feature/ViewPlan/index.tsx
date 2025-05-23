'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { MenuResponseDTO } from '@/type/menu/menuResponse';
import { Result } from '@/type/response';
import { findOriginalId } from '@/utils/findOriginalId';
import ControlTab from '@/components/common/ControlTab';
import Pagination from '@/components/common/Pagination';
import { Option } from '@/components/common/Selectbox';
import { TableRowData } from '@/components/common/Table';
import {
  Body2Assistive,
  SubTitle1Black,
  SubTitle1Green500,
} from '@/components/common/Typography';
import GetAllListControls from '@/components/shared/GetAllList/Controls';
import GetAllListHeader from '@/components/shared/GetAllList/Header';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import { CATEGORY_MAPPINGS } from '@/constants/_category';
import { TAB_OPTIONS } from '@/constants/_controlTab';
import { ROUTES } from '@/constants/_navbar';
import { DEFAULT_PAGE, PAGE_LIMIT } from '@/constants/_pagination';
import { useGetSearchMealList } from '@/hooks/meal/useGetSearchMealList';
import { usePrefetchMinorCategories } from '@/hooks/menuCategory/usePrefetchMinorCategories';
import useNavigate from '@/hooks/useNavigate';
import { useToastStore } from '@/stores/useToastStore';

const SORT_DESC = 'createdAt,desc';
const SORT_ASC = 'createdAt,asc';

const ViewPlan = () => {
  const { navigate } = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const queryClient = useQueryClient();
  const { prefetchMinorCategories, hasCategories } =
    usePrefetchMinorCategories();
  const [minorCategories, setMinorCategories] = useState<Option[]>([]);

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS[0]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const searchTriggerCondition =
    // 1. 대분류, 소분류 값이 있을 때
    !!(selectedOrganization && selectedCategory) ||
    // 2. 특정 연도와 월이 선택된 경우 (초기에는 전체 리스트를 가져오기 위해 빈 문자열이면 false)
    !!(selectedYear || selectedMonth) ||
    // 3. 오래된 순이면서 다른 파라미터 중에 유효한 값이 하나라도 있는 경우
    selectedTab !== TAB_OPTIONS[0] ||
    // 4. 검색어가 있고, 검색 버튼이 클릭되었을 때
    !!isSearchClicked;

  const { data: searchMealList, refetch: searchMealRefetch } =
    useGetSearchMealList(
      {
        page: page,
        sort: selectedTab === TAB_OPTIONS[0] ? SORT_DESC : SORT_ASC,
        size: PAGE_LIMIT,
        majorCategory: selectedOrganization || undefined,
        minorCategory: selectedCategory || undefined,
        menuName: searchTerm || undefined,
        year: selectedYear || undefined,
        month: selectedMonth || undefined,
      },
      {
        enabled: searchTriggerCondition,
      },
    );

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchInputValue(newValue);

    if (newValue) return;

    setSearchTerm('');
    setIsSearchClicked(false);
  };

  const submitSearchValue = () => {
    if (!searchInputValue) return;

    setPage(DEFAULT_PAGE);
    setSearchTerm(searchInputValue);
    setIsSearchClicked(true);
  };

  const convertToTableRowData = (menus: MenuResponseDTO[]): TableRowData[] => {
    return menus.map((menu) => ({
      '식단 ID': menu.monthMenuId.slice(0, 4),
      '식단 이름': menu.monthMenuName,
      대분류: menu.majorCategory,
      소분류: menu.minorCategory,
      생성일: dayjs(menu.createAt).format('YYYY-MM-DD'),
    }));
  };

  useEffect(() => {
    searchMealRefetch();
  }, [page, searchMealRefetch]);

  useEffect(() => {
    searchMealRefetch();
    setPage(DEFAULT_PAGE);
  }, [selectedTab, searchMealRefetch]);

  useEffect(() => {
    if (!selectedOrganization) return;

    const selectedMapping = CATEGORY_MAPPINGS.find(
      (organization) => organization.category === selectedOrganization,
    );

    if (selectedMapping) {
      const queryKey = [selectedMapping.queryKey];
      const cachedMinorCategories =
        queryClient.getQueryData<Result<string[]>>(queryKey);

      if (!cachedMinorCategories) return;

      if (cachedMinorCategories) {
        const formattedData = cachedMinorCategories.data?.map((category) => ({
          value: category,
          label: category,
        }));
        setMinorCategories(formattedData);
      }
      if (!hasCategories) {
        showToast('소분류가 없습니다.', 'warning', 1000);
      }
    }
  }, [selectedOrganization, queryClient, hasCategories]);

  useEffect(() => {
    if (!hasCategories) {
      prefetchMinorCategories();
    }
  }, [hasCategories, prefetchMinorCategories]);

  const handleClickRow = (id: string) => {
    const selectedMenuList = searchMealList?.data?.menuResponseDTOList || [];

    findOriginalId({
      list: selectedMenuList,
      matchField: 'monthMenuId',
      matchValue: id,
      navigateTo: ROUTES.VIEW.PLAN,
      getId: (menu) => menu.monthMenuId,
      navigate,
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      {searchMealList && (
        <>
          <GetAllListHeader title={'내가 작성한 식단'} />
          <GetAllListControls
            type='viewPlan'
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            organization={selectedOrganization}
            setOrganization={setSelectedOrganization}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchValue={searchInputValue}
            handleChangeSearchValue={handleChangeSearchValue}
            inputPlaceholder='식단 이름을 입력해주세요.'
            handleSearchSubmit={submitSearchValue}
            minorCategories={minorCategories}
          />
          {searchMealList?.data.totalElements === 0 ? (
            <div className='flex h-[168px] items-center justify-center rounded-2xl bg-white-100 p-6'>
              <Body2Assistive>식단이 존재하지 않습니다.</Body2Assistive>
            </div>
          ) : (
            <div className='flex flex-col gap-6 rounded-2xl bg-white-100 p-6'>
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <SubTitle1Black>총</SubTitle1Black>
                  <div>
                    <SubTitle1Green500>
                      {searchMealList.data.totalElements}
                    </SubTitle1Green500>
                    <SubTitle1Black>개</SubTitle1Black>
                  </div>
                </div>
                <ControlTab
                  isSortControl
                  controlTabItems={TAB_OPTIONS}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              </div>
              <GetAllListTable
                data={convertToTableRowData(
                  searchMealList?.data?.menuResponseDTOList ?? [],
                )}
                onRowClick={(id) => handleClickRow(String(id))}
                headerType='viewPlan'
              />
              <Pagination
                limit={PAGE_LIMIT}
                page={page}
                setPage={setPage}
                totalPosts={searchMealList?.data.totalElements ?? 0}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewPlan;
