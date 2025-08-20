import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateSlugDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/, {
    message: 'O slug deve conter apenas letras minúsculas, números e hífens,\nnão podendo começar com número ou hífen, nem terminar com hífen',
  })
  slug: string;
}