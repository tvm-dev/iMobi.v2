import { Logo } from '@/components/shared/Logo';
import { Title } from '@/components/shared/Title';
import { CustomLink } from '@/components/ui/customLink';
import { CONTACT_INFO } from '@/shared/constants/contactInfo';
import { NAV_LINKS } from '@/shared/constants/navLinks';
import { forwardRef } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

// Footer da aplicação
export const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <footer ref={ref} className='flex flex-col'>
      {/* Informações do Footer */}
      <div className='pt-8 px-11 bg-navy grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] text-zinc-200'>
        {/* Logo e descrição */}
        <section className='flex flex-col gap-5 pr-10 mb-6'>
          <Logo iconSize={25} textSize='4' versatileTitle />

          <p className=''>
            Sistema especializado em leilões de imóveis da Caixa Econômica
            Federal e outros leiloeiros oficiais.
          </p>
          <p>Encontre as melhores oportunidades do mercado imobiliário.</p>
        </section>

        {/* Links Rapidos */}
        <nav className='mb-6'>
          <Title size='4' label='Links Rapidos' line='init' />
          <ul className='flex flex-col justify-center gap-3'>
            {NAV_LINKS.map((nav, index) => (
              <li key={`${nav.label} - ${index}`}>
                <CustomLink
                  href={nav.href}
                  icon={<IoIosArrowForward />}
                  label={nav.label}
                  className='items-center'
                />
              </li>
            ))}
            <li>
              <CustomLink
                href={
                  'https://www.caixa.gov.br/voce/habitacao/imoveis-venda/Paginas/default.aspx'
                }
                icon={<IoIosArrowForward />}
                label={'Site da Caixa'}
                className='items-center'
                _blank
              />
            </li>
          </ul>
        </nav>

        {/* Contato */}
        <section className='mb-6'>
          <Title size='4' label='Contato' line='init' />
          <ul className='flex flex-col gap-3'>
            {CONTACT_INFO.map((info, index) => (
              <li
                key={`${info.label} - ${index}`}
                className='flex flex-row items-center gap-2'
              >
                {info.icon} {info.label}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Direitos reservados */}
      <hr className='text-blue-900' />
      <div className='bg-navy text-white py-9 text-center'>
        © 2025 iMobi - Todos os direitos reservados
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
