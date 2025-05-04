import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

// Função auxiliar para verificar expiração do token

// Definição de permissões baseadas em roles
const rolePermissions = {
  admin: ['/home/:path*', '/auctioneers/:path*', '/appointments/:path*'],
  user: ['/home/:path*', '/auctioneers/:path*', '/appointments/:path*'],
};

export type UserRole = keyof typeof rolePermissions;

export async function middleware(req: NextRequest) {
  console.log('🔍 Middleware executado!');

  const token = req.cookies.get('token')?.value;
  if (!token) {
    console.log('🚫 Token não encontrado. Redirecionando para login...');
    return NextResponse.redirect(new URL('/login', req.url));
  }
  try {
    console.log('✅ Token encontrado nos cookies, verificando validade...');
    const decoded: {
      exp: number;
      email?: string;
      name?: string;
      role?: string;
    } = jwtDecode(token);

    // Obtendo a role do usuário
    const userRole: UserRole = (decoded.role as UserRole) || 'user';
    const pathname = req.nextUrl.pathname;
    console.log(userRole);

    // Verifica se a role do usuário tem permissão para acessar a rota
    const allowedRoutes = rolePermissions[userRole] || [];
    const hasAccess = allowedRoutes.some(route => {
      const normalizedRoute = route.replace(':path*', '').replace(/\/$/, ''); // Remove ':path*' e a barra final, se houver
      return (
        pathname === normalizedRoute ||
        pathname.startsWith(normalizedRoute + '/')
      );
    });

    if (!hasAccess) {
      console.log(
        `⛔ Acesso negado para ${pathname}. Role: ${userRole}. Redirecionando...`
      );
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Redireciona para uma página permitida
    }
  } catch (error) {
    console.error('🚨 Erro no middleware:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Define quais rotas o middleware deve proteger
export const config = {
  matcher: ['/home/:path*', '/auctioneers/:path*', '/appointments/:path*'],
};
