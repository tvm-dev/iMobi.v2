import Link from 'next/link';
interface FormDivLinksProps {
  title: string;
  inputInfo: {
    href: string;
    hrefName: string;
    label: string;
  }[];
}

export const FormDivLinks = ({ title, inputInfo }: FormDivLinksProps) => {
  return (
    <div className='w-full '>
      <h1 className='text-2xl font-bold mb-2'>{title}</h1>
      <hr className='text-zinc-300 mb-4' />
      {/* Inputs com os links */}
      <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3'>
        {inputInfo.map((info, i) => (
          <div
            key={i}
            className='border border-zinc-300 rounded-lg px-3 py-4 flex flex-col gap-2 justify-between items-start transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white'
          >
            <Link
              href={info.href}
              className='hover:underline hover:text-blue-950 text-sky-800'
              target='_blank'
            >
              {info.hrefName}
            </Link>
            {info.label}
          </div>
        ))}
      </div>
    </div>
  );
};
