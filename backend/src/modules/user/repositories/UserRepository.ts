import { User } from '../entities/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(userId: string): Promise<User | null>;
  abstract findMany(): Promise<User[] | null>;
  abstract updateUserById(
    userId: string,
    updateProps: Partial<User>,
  ): Promise<User | null>;
}
