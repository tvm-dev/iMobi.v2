import { Response } from 'express';

function parseExpire(exp: string): number {
  const time = parseInt(exp);
  if (exp.endsWith('m')) return time * 60 * 1000;
  if (exp.endsWith('h')) return time * 60 * 60 * 1000;
  if (exp.endsWith('d')) return time * 24 * 60 * 60 * 1000;
  return time; // assume que já está em ms
}

export function setAuthCookie(response: Response, token: string) {
  const expire = process.env.JWT_EXPIRE || '30d';
  const maxAge = parseExpire(expire);

  response.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
  });
}
