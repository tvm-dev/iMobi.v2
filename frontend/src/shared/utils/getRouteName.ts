export function getRouteName(pathname: string) {
  switch (pathname) {
    case '/home':
      return '';
    case '/auctioneers':
      return '- Leiloeiros';
    case '/appointments':
      return '- Agendamentos';
    default:
      return '';
  }
}
