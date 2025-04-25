interface AlertMessageProps {
  label: string;
  strong?: string;
}

export const AlertMessage = ({ label, strong }: AlertMessageProps) => {
  return (
    <div className='bg-yellow-100 w-full py-4 px-3 border-l-4 border-l-amber-500'>
      <span className='font-bold'>{strong}</span>
      {label}
    </div>
  );
};
