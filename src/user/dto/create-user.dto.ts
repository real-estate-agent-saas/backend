import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @ApiProperty({
    description: 'ID do usuário (gerado automaticamente pelo banco de dados)',
    required: false,
  })
  id?: number;

  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/, {
    message:
      'A senha deve conter pelo menos: 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.',
  })
  @ApiProperty({
    description:
      'Senha do usuário. Deve ter de 8 a 20 caracteres, incluindo pelo menos: uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
    example: 'Senha@1234',
  })
  password: string;

  @IsString()
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres.' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres.' })
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  name: string;
}
