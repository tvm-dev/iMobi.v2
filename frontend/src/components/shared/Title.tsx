import { sizeClasses } from '@/shared/constants/textSize';
import { cn } from '@/shared/lib/cn';

interface TitleProps {
  size: '1' | '2' | '3' | '4';
  label: string;
  line?: 'init' | 'center' | 'end' | 'full';
  className?: string;
}

export const Title = ({
  size,
  label,
  line = 'init',
  className,
}: TitleProps) => {
  const lineClasses = {
    init: 'relative after:content-[""] after:block after:w-12 after:h-1 after:bg-yellow-500 after:mt-2 after:ml-0',
    center:
      'relative after:content-[""] after:block after:w-16 after:h-1 after:bg-yellow-500 after:mt-2 after:mx-auto',
    end: 'relative after:content-[""] after:block after:w-12 after:h-1 after:bg-yellow-500 after:mt-2 after:ml-auto',
    full: 'relative after:content-[""] after:block after:w-full after:h-1 after:bg-yellow-500 after:mt-2',
  };

  return (
    <div className={cn('mb-4', className)}>
      <h1 className={`${sizeClasses[size]} font-bold ${lineClasses[line]}`}>
        {label}
      </h1>
    </div>
  );
};
