'use client';

import { useEffect, useState } from 'react';
import { AppointmentTitle } from '@/components/shared/AppointmentTitle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { pastAuctionsInput } from '@/shared/constants/pastAuctionsInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaSave, FaTimes } from 'react-icons/fa';
import { parse } from 'date-fns';
import { CreateAppointmentData } from '@/shared/schemas/appointment/createAppointmentSchema';
import { handleSubmitCreate } from './handleSubmit/createAuction';
import { Appointment } from '@/shared/types/Appointment';
import { handleSubmitUpdate } from './handleSubmit/updateAuction';
import { useAppointment } from '@/shared/contexts/AppointmentContext';

interface PastAuctionsProps {
  state?: 'create' | 'update';
  auction?: Appointment;
  cancel?: () => void;
}

export const PastAuctions = ({ state, auction, cancel }: PastAuctionsProps) => {
  const { fetchAppointments } = useAppointment();
  const [formData, setFormData] = useState<Partial<CreateAppointmentData>>({});
  const [status, setStatus] = useState(auction ? auction.status : '');
  const [appointmentNumber, setAppointmentNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auction) {
      const { date, ...rest } = auction;
      const parsedDate = date
        ? parse(date, 'dd/MM/yyyy', new Date())
        : undefined;

      setFormData({
        ...rest,
        date: parsedDate,
      });
      setNotes(auction.observations);
      setAppointmentNumber(auction.appointmentNumber);
    }
  }, [auction]);

  const handleChange = (key: keyof CreateAppointmentData, value: string) => {
    const parsedValue = key === 'date' ? new Date(value) : value;
    setFormData(prev => ({ ...prev, [key]: parsedValue }));
  };

  return (
    <Card className='border-none p-5'>
      <AppointmentTitle
        color='text-sky-950'
        icon={<FaCirclePlus size={25} className='text-sky-950' />}
        label='Adicionar Novo Leilão'
      />
      <form
        className='space-y-6'
        onSubmit={e => {
          if (state === 'create') {
            handleSubmitCreate({
              e,
              cancel,
              formData,
              setFormData,
              setStatus,
              setNotes,
              notes,
              status,
              fetchAppointments,
            });
          } else {
            handleSubmitUpdate({
              e,
              cancel,
              appointmentNumber,
              formData,
              setFormData,
              setStatus,
              setNotes,
              notes,
              status,
              fetchAppointments,
            });
          }
        }}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {pastAuctionsInput.map((input, i) => {
            const rawValue =
              formData[input.name as keyof CreateAppointmentData];

            const value: string =
              rawValue instanceof Date && !isNaN(rawValue.getTime())
                ? rawValue.toISOString().substring(0, 10)
                : typeof rawValue === 'string' || typeof rawValue === 'number'
                ? String(rawValue)
                : '';

            return (
              <div key={i} className='flex flex-col gap-1'>
                <Label className='text-sky-900'>{input.title}</Label>
                <Input
                  type={input.type}
                  value={value}
                  onChange={e =>
                    handleChange(
                      input.name as keyof CreateAppointmentData,
                      e.target.value
                    )
                  }
                  className='placeholder:text-zinc-600 focus-visible:border-blue-400 focus-visible:ring-blue-400/50 focus:border-blue-400 focus:ring-0 border border-zinc-300 transition-all duration-300'
                  placeholder={input.placeholder}
                />
              </div>
            );
          })}

          <div className='flex flex-col gap-1 w-full'>
            <Label className='text-sky-900'>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className='border w-full border-zinc-300 placeholder:text-zinc-600 focus-visible:border-blue-400 focus-visible:ring-blue-400/50 focus:border-blue-400 focus:ring-0 transition-all duration-300 rounded-md px-3 py-2 text-sm'>
                <SelectValue placeholder='Selecione o status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='planejado'>Planejado</SelectItem>
                <SelectItem value='em-andamento'>Em andamento</SelectItem>
                <SelectItem value='concluido'>Concluído</SelectItem>
                <SelectItem value='cancelado'>Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <Label className='text-sky-900'>Observações</Label>
          <Textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className='placeholder:text-zinc-600 focus-visible:border-blue-400 focus-visible:ring-blue-400/50 focus:border-blue-400 focus:ring-0 border border-zinc-300 transition-all duration-300'
            placeholder='Detalhes importantes sobre o leilão'
          />
        </div>

        {error && (
          <div className='text-red-600 text-sm font-medium'>{error}</div>
        )}

        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            onClick={() => {
              setFormData({});
              setStatus('');
              setNotes('');
              setError(null);
              cancel?.();
            }}
            className='p-3 flex flex-row justify-center items-center bg-yellow-400 text-black hover:bg-yellow-500'
          >
            <FaTimes /> Cancelar
          </Button>
          <Button
            type='submit'
            className='p-3 flex flex-row justify-center items-center bg-sky-950 text-white hover:bg-sky-900'
          >
            <FaSave /> Salvar Leilão
          </Button>
        </div>
      </form>
    </Card>
  );
};
