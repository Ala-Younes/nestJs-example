import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Invalid title format' })
  @MinLength(5, {
    message: 'Title is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @IsString({ message: 'Invalid author format' })
  @IsNotEmpty({ message: 'Author should not be empty' })
  author: string;

  // @IsDateString()
  // @IsNotEmpty({ message: 'Publish year should not be empty' })
  // publishYear: Date;
}
