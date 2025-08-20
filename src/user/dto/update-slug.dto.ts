import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateSlugDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug deve conter apenas letras minúsculas, números e hífens',
  })
  slug: string;
}