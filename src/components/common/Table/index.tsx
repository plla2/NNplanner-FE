'use client';

import TableBody from '@/components/common/TableBody';
import TableHeader from '@/components/common/TableHeader';

export type TableRowData = {
  [key: string]: string | number | undefined;
};

export type TableType = 'table' | 'list';

type TableProps = {
  data: TableRowData[];
  type?: TableType;
  headerClassName?: string;
  bodyClassName?: string;
};

const Table = ({
  data,
  type = 'table',
  headerClassName,
  bodyClassName,
}: TableProps) => {
  const tableHeaders = Array.from(
    new Set(data.flatMap((item) => Object.keys(item))),
  );

  return (
    <div className='w-full overflow-hidden rounded-md'>
      <table className='w-full border-collapse text-center'>
        <TableHeader headerData={tableHeaders} className={headerClassName} />
        <TableBody
          headerData={tableHeaders}
          bodyData={data}
          type={type}
          className={bodyClassName}
        />
      </table>
    </div>
  );
};
export default Table;
