import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaHistory } from 'react-icons/fa';
import { AppointmentTitle } from '../../../shared/AppointmentTitle';
import { oldAppointmentsTable } from '@/shared/constants/oldAppointmentsInput';

export const OldAppointments = () => {
  return (
    <div className='mt-5'>
      <AppointmentTitle
        color='text-sky-950'
        icon={<FaHistory size={25} className='text-sky-950' />}
        label='Leilões Passados'
      />
      <Card className='mb-8 py-0 w-full border-none rounded-md overflow-hidden mt-3'>
        <Table>
          <TableHeader className='bg-navy'>
            <TableRow>
              {oldAppointmentsTable.map((title, i) => (
                <TableCell key={i} className='py-3 text-white font-bold'>
                  <div className='flex flex-row gap-1 justify-items-start items-center ml-2 text-[17px]'>
                    {title}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {oldAppointmentsTable && oldAppointmentsTable.length > 0 ? (
              <TableRow>
                {oldAppointmentsTable.map((item, i) => (
                  <TableCell key={i}>
                    <span className='ml-2'>{item}</span>
                  </TableCell>
                ))}
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={oldAppointmentsTable.length}
                  className='text-center py-6'
                >
                  Nenhum leilão agendado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
