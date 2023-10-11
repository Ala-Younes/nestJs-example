import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

// ! Putting the PartialType will check if the props here corresponds to the props on the CreateBookDTO
export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsString({ message: 'Invalid title format', groups: ['update'] })
  @IsNotEmpty({ message: 'Title should not be empty', groups: ['update'] })
  @MinLength(5, {
    message: 'Title is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  @IsOptional({ groups: ['update'] })
  title?: string;

  @IsString({ message: 'Invalid author format', groups: ['update'] })
  @IsNotEmpty({ message: 'Author should not be empty', groups: ['update'] })
  @IsOptional({ groups: ['update'] })
  author?: string;
}
