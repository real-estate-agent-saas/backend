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

//How long the browser keep the token on the cookies
import { JWT_EXPIRATION_MS } from './constants/auth.constants';

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

    // Defines cookie as httpOnly
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: JWT_EXPIRATION_MS,
    });

    return { message: 'Login realizado com sucesso' };
  }

  @IsPublic()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realiza logout removendo o cookie' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true, // Insures that JS cannot access the token
      secure: process.env.NODE_ENV === "production", // Marks the cookie to be used with HTTPS only.
      sameSite: 'strict', // Only sends the cookie to the origin aplication that created it 
    });

    return { message: 'Logout realizado com sucesso' }; // Success message
  }
}
