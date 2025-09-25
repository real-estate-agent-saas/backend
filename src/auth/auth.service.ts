import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../application/use-cases/user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

// How long the backend considers the token
import { JWT_EXPIRATION } from './constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para autenticar o usuário e gerar o token JWT
  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    // Gera o token JWT assinado com os dados do usuário
    const jwtToken = this.jwtService.sign(payload, {
      expiresIn: JWT_EXPIRATION,
    });

    // Retorna o token JWT
    return {
      access_token: jwtToken,
    };
  }

  // Método para validar as credenciais do usuário
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      // Verifica se o usuário está ativo
      if (!user.isActive) {
        throw new UnauthorizedException(
          'Sua conta está desativada. Entre em contato com o suporte.',
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined, // Remove a senha do retorno
        };
      }
    }

    // Mensagem genérica para não revelar qual informação está incorreta
    throw new UnauthorizedException('Credenciais inválidas.');
  }
}
