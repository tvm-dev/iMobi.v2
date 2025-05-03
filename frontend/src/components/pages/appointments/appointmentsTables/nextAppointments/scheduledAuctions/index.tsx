import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { tableTitlesAppointments } from '@/shared/constants/tableTitleAppointments';
import { useAppointment } from '@/shared/hooks/appointmentHook';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { PastAuctions } from '../../../pastAuctions';
import { Appointment } from '@/shared/types/Appointment';
import { deleteAuction } from './deleteAuction';

interface ScheduledAuctionsProps {
  data: 'today' | 'tomorrow' | 'after' | 'before';
}

export const ScheduledAuctions = ({ data }: ScheduledAuctionsProps) => {
  const [openEditAuctionsModal, setOpenEditAuctionsModal] =
    useState<boolean>(false);
  const [auction, setAuction] = useState<Appointment>();

  const {
    appointmentTodayAfter,
    appointmentTodayBefore,
    appointmentToday,
    appointmentTomorrow,
  } = useAppointment();

  function tableData() {
    switch (data) {
      case 'after':
        return appointmentTodayAfter;
      case 'before':
        return appointmentTodayBefore;
      case 'today':
        return appointmentToday;
      case 'tomorrow':
        return appointmentTomorrow;
    }
  }

  const tables = tableData();

  return (
    <div>
      <Card className='mb-8 py-0 w-full border-none rounded-md overflow-hidden mt-3'>
        <Table>
          <TableHeader className='bg-navy'>
            <TableRow>
              {(data === 'before' || data === 'after') && (
                <TableCell className='py-3 text-white font-bold'>
                  <div className='flex flex-row gap-1 justify-items-start items-center ml-2 text-[17px]'>
                    Data
                  </div>
                </TableCell>
              )}
              {tableTitlesAppointments.map((title, i) => (
                <TableCell key={i} className='py-3 text-white font-bold'>
                  <div className='flex flex-row gap-1 justify-items-start items-center ml-2 text-[17px]'>
                    {title}
                  </div>
                </TableCell>
              ))}
              <TableCell className='py-3 text-white font-bold'>
                <div className='flex flex-row gap-1 justify-center items-center ml-2 text-[17px]'>
                  Ações
                </div>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tables.length > 0 ? (
              tables.map((item, i) => (
                <TableRow key={i}>
                  {(data === 'before' || data === 'after') && (
                    <TableCell>
                      <span className='ml-2'>{item.date}</span>
                    </TableCell>
                  )}
                  <TableCell>
                    <span className='ml-2'>{item.hour}</span>
                  </TableCell>
                  <TableCell>
                    <span className='ml-2'>{item.description}</span>
                  </TableCell>
                  <TableCell>
                    <span className='ml-2'>{item.location}</span>
                  </TableCell>
                  <TableCell>
                    <span className='ml-2'>{item.link}</span>
                  </TableCell>
                  <TableCell>
                    <span className='ml-2'>{item.status}</span>
                  </TableCell>
                  <TableCell>
                    <span className='ml-2 flex flex-row justify-center items-center gap-5'>
                      <FaPencil
                        className='text-green-600 hover:text-green-700 hover:cursor-pointer'
                        onClick={() => {
                          setAuction(item);
                          setOpenEditAuctionsModal(true);
                        }}
                      />
                      <FaTrash
                        className='text-red-600 hover:text-red-700 hover:cursor-pointer'
                        onClick={() => {
                          deleteAuction(item.appointmentNumber);
                        }}
                      />
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    data === 'before' || data === 'after'
                      ? tableTitlesAppointments.length + 2
                      : tableTitlesAppointments.length + 2
                  }
                  className='text-center py-6'
                >
                  Nenhum leilão agendado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      {openEditAuctionsModal && auction && (
        <div className='fixed inset-0 bg-black/50  flex items-center justify-center z-50'>
          <div className='max-w-[800px] w-full max-h-[90vh] overflow-y-auto'>
            <PastAuctions
              state='update'
              auction={auction}
              cancel={() => setOpenEditAuctionsModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
