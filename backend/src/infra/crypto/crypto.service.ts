import * as bcrypt from 'bcrypt';
import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  createHash,
} from 'crypto';

const ALGORITHM = 'aes-256-cbc'; // Algoritmo de criptografia

function getSecretKey() {
  const secret = process.env.CRYPTO_SECRET_KEY;
  if (!secret) throw new Error('CRYPTO_SECRET_KEY não definida');
  return Buffer.from(secret, 'hex');
}

function getIV() {
  const iv = process.env.CRYPTO_IV;
  if (!iv) throw new Error('CRYPTO_IV não definida');
  return Buffer.from(iv, 'hex');
}

export class CryptoService {
  // Criptografa algo que pode ser decriptado
  static encrypt(text: string): string {
    const cipher = createCipheriv(ALGORITHM, getSecretKey(), getIV());
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  // Decriptografa
  static decrypt(encrypted: string): string {
    const decipher = createDecipheriv(ALGORITHM, getSecretKey(), getIV());
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  // Faz o hash SHA-256 (para comparação)
  static hashForCompare(text: string): string {
    return createHash('sha256').update(text.trim().toLowerCase()).digest('hex');
  }

  // Compara um valor com o hash SHA-256
  static compareHash(email: string, emailCompareHash: string): boolean {
    return CryptoService.hashForCompare(email) === emailCompareHash;
  }

  // Faz o hash bcrypt (para senhas)
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  // Compara um valor com o hash bcrypt
  static async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
