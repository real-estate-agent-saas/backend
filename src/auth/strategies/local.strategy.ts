import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local'; // Importa a estratégia local do Passport de usuário e senha
import { AuthService } from '../auth.service';

// Responsável por validar o usuário com o email e senha
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // O método validate é chamado quando o Passport tenta autenticar o usuário
  // Ele verifica se o usuário existe e se a senha está correta
  validate(email: string, password: string) {
    return this.authService.validateUser(email, password);
  }
}