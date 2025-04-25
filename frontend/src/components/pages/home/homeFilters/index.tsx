import { Card } from '@/components/ui/card';
import { SelectFilter } from './selectFilter';
import { homeFilter } from '@/shared/constants/homeFilter';

export const HomeFilters = () => {
  return (
    <Card className='flex flex-col justify-between p-7 mb-8 w-full border-none'>
      <section className='flex flex-wrap gap-4'>
        {homeFilter.map((filter, i) => (
          <SelectFilter
            key={i}
            icon={filter.icon}
            initOptionText={filter.initOptionText}
            label={filter.label}
          />
        ))}
      </section>
    </Card>
  );
};
