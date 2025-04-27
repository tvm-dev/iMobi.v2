import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { tableTitles } from '@/shared/constants/tableTitlesHome';

export const HomeTable = () => {
  return (
    <Card className='mb-8 py-0 w-full'>
      <Table>
        <TableHeader className=' bg-navy'>
          <TableRow>
            {tableTitles.map((title, i) => (
              <TableCell key={i} className=' py-6 text-white font-bold '>
                <div className='flex flex-row gap-1 justify-center items-center text-[17px]'>
                  {title.label} {title.icon}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Aqui você pode mapear os dados da tabela */}
          <TableRow>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableCell key={i}>Exemplo {i}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};
