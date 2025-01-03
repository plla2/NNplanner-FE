import { FoodInfo } from '@/type/menu/menuResponse';
import { removeTrailingZeros } from '@/utils/meal';
import Table from '@/components/common/Table';
import { NutritionMenu } from '@/components/common/Typography';

type MealTableProps = {
  data: FoodInfo[];
  isButton?: boolean;
  onClick?: (menu: string) => void;
};

const MealTable = ({ data, isButton = false, onClick }: MealTableProps) => {
  return (
    <div className='flex w-full flex-col'>
      {data?.map((item, index) => {
        const tableData = [
          {
            에너지: removeTrailingZeros(item.kcal),
            탄수화물: removeTrailingZeros(item.carbohydrate),
            단백질: removeTrailingZeros(item.protein),
            지방: removeTrailingZeros(item.fat),
          },
        ];

        const content = (
          <>
            <NutritionMenu>{item.foodName}</NutritionMenu>
            <Table
              data={tableData}
              headerClassName='p-1 whitespace-nowrap'
              bodyClassName='p-1 bg-white-200'
            />
          </>
        );

        return isButton ? (
          <button
            type='button'
            key={`${item.foodId}-${index}`}
            className='flex w-full flex-col gap-0.5 rounded-md p-2 text-left transition duration-300 ease-in-out hover:bg-gray-100 active:bg-gray-200'
            onClick={() => onClick?.(item.foodName)}
          >
            {content}
          </button>
        ) : (
          <div
            key={`${item.foodId}-${index}`}
            className='flex w-full flex-col gap-0.5 rounded-md p-2 text-left'
            onClick={() => onClick?.(item.foodName)}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default MealTable;
