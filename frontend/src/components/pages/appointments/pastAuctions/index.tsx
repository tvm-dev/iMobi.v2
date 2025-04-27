import { AppointmentTitle } from '@/components/shared/AppointmentTitle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FaCirclePlus } from 'react-icons/fa6';
import { pastAuctionsInput } from '@/shared/constants/pastAuctionsInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaSave, FaTimes } from 'react-icons/fa';

export const PastAuctions = () => {
  return (
    <Card className='border-none p-5'>
      <AppointmentTitle
        color='text-sky-950'
        icon={<FaCirclePlus size={25} className='text-sky-950' />}
        label='Adicionar Novo Leilão'
      />
      <form className='space-y-6'>
        {/* Inputs do formulario */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {pastAuctionsInput.map((input, i) => (
            <div key={i} className='flex flex-col gap-1'>
              <Label className='text-sky-900'>{input.title}</Label>
              <Input
                type={input.type}
                className='placeholder:text-zinc-600 focus-visible:border-blue-400 focus-visible:ring-blue-400/50 focus:border-blue-400 focus:ring-0 border border-zinc-300 transition-all duration-300'
                placeholder={input.placeholder}
              />
            </div>
          ))}

          {/* Select do formulario */}
          <div className='flex flex-col gap-1 w-full'>
            <Label className='text-sky-900'>Status</Label>
            <Select>
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

        {/* Text Area de observações do formulario */}
        <div className='flex flex-col gap-1'>
          <Label className='text-sky-900'>Observações</Label>
          <Textarea
            className='placeholder:text-zinc-600 focus-visible:border-blue-400 focus-visible:ring-blue-400/50 focus:border-blue-400 focus:ring-0 border border-zinc-300 transition-all duration-300'
            placeholder='Detalhes importantes sobre o leilão'
          />
        </div>

        {/* Botão para cancelar e salvar o formulario */}
        <div className='flex justify-end gap-2'>
          <Button
            type='button'
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
