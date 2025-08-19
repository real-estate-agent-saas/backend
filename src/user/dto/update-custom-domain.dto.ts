import { IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

export class UpdateCustomDomainDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'O domínio só pode conter letras minúsculas, números e hífens',
  })
  customDomain?: string;
}