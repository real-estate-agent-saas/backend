import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    // Método para autenticar o usuário e gerar o token JWT
    async login(user: User): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };

        // Gera o token JWT assinado com os dados do usuário
        const jwtToken = this.jwtService.sign(payload);

        // Retorna o token JWT
        return {
            acess_token: jwtToken,
        }; 
    }

    // Método para validar o usuário
    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined // Remove a senha do retorno
                }

            }
        }

        // Se não encontrar usuário ou a senha estiver incorreta
        throw new UnauthorizedException('Email ou senha inválidos.');
    }
}