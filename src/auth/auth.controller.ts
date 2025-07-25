import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Realiza login com e-mail e senha' })
  @ApiBody({ type: LoginDto })
  async login(
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(req.user);

    // Define o cookie httpOnly
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 2,
    });

    return { message: 'Login realizado com sucesso' };
  }

  @IsPublic() // Não precisa de autenticação
  @Post('logout') // Endpoint para logout
  @HttpCode(HttpStatus.OK) // Responde com status 200 OK em vez do padrão 201 Created
  @ApiOperation({ summary: 'Realiza logout removendo o cookie' }) // Descrição da operação
  async logout(@Res({ passthrough: true }) res: Response) { // Recebe a resposta do Express
    res.clearCookie('access_token', { // Limpa o cookie de autenticação
      httpOnly: true, // Garante que o cookie não é acessível via JavaScript
      secure: false, // Trafego realizado somente com HTTPS
      sameSite: 'strict', // Envia o cookie apenas para requisições que o originou
    });

    return { message: 'Logout realizado com sucesso' }; // Retorna uma mensagem de sucesso
  }
}
