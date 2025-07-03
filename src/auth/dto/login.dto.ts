import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@email.com'
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Senha@1234',
    minLength: 8,
    maxLength: 20,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$',
    type: 'string'
  })
  password: string;
}
