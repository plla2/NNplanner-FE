import { TableRowData, TableType } from '@/components/common/Table';

type TableBodyProps = {
  headerData: string[];
  bodyData: TableRowData[];
  type: TableType;
};

const TableBody = ({ headerData, bodyData, type }: TableBodyProps) => {
  const handleTrClick = () => {};

  return (
    <tbody>
      {bodyData.map((item, index) => (
        <tr
          key={index}
          className='border-y border-thead'
          onClick={type === 'list' ? handleTrClick : undefined}
        >
          {headerData.map((header) => (
            <td key={header} className='bg-primary p-3'>
              {item[header] !== undefined ? item[header] : '-'}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
