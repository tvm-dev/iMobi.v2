import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { tableTitlesAppointments } from '@/shared/constants/tableTitleAppointments';

interface ScheduledAuctionsProps {
  newTableRow?: string[];
}

export const ScheduledAuctions = ({ newTableRow }: ScheduledAuctionsProps) => {
  const tableRowCell = newTableRow
    ? [newTableRow, ...tableTitlesAppointments]
    : tableTitlesAppointments;
  return (
    <Card className='mb-8 py-0 w-full border-none rounded-md overflow-hidden mt-3'>
      <Table>
        <TableHeader className='bg-navy'>
          <TableRow>
            {tableRowCell.map((title, i) => (
              <TableCell key={i} className='py-3 text-white font-bold'>
                <div className='flex flex-row gap-1 justify-items-start items-center ml-2 text-[17px]'>
                  {title}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {newTableRow && newTableRow.length > 0 ? (
            <TableRow>
              {newTableRow.map((item, i) => (
                <TableCell key={i}>
                  <span className='ml-2'>{item}</span>
                </TableCell>
              ))}
            </TableRow>
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableRowCell.length}
                className='text-center py-6'
              >
                Nenhum leilão agendado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};
