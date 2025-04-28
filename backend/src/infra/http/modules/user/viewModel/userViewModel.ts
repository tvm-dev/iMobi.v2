import { CryptoService } from 'src/infra/crypto/crypto.service';
import { User } from 'src/modules/user/entities/User';

export class UserViewModel {
  static toHttp({ createdAt, name, email, id }: User) {
    return {
      createdAt,
      name: CryptoService.decrypt(name),
      email: CryptoService.decrypt(email),
      id,
    };
  }
}
