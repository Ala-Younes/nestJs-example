import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const newBook = await this.prisma.book.create({
      data: {
        ...createBookDto,
      },
    });
    return newBook;
  }

  async findAll() {
    return await this.prisma.book.findMany();
  }

  async findOne(id: number) {
    try {
      const book = await this.prisma.book.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      return book;
    } catch (err) {
      return new NotFoundException({
        reason: `Book with ID : ${id} not found`,
      });
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const updatedBook = await this.prisma.book.update({
        data: {
          title: updateBookDto.title,
          author: updateBookDto.author,
        },
        where: {
          id: id,
        },
      });
      if (!updatedBook) throw new Error('No Book');
      return updatedBook;
    } catch (err) {
      if (err.code === 'P2025') {
        return new NotFoundException({
          reason: err.meta.cause,
        });
      } else {
        return new Error('Problem updating ....');
      }
    }
  }

  async remove(id: number) {
    try {
      const removeBook = await this.prisma.book.delete({
        where: {
          id,
        },
      });

      if (!removeBook) {
        throw new Error(`Book with ID ${id} not found`);
      }

      return removeBook;
    } catch (error) {
      if (error.code === 'P2025') {
        const response = {
          statusCode: 204,
          errorMsg: 'Record to delete does not exist.',
        };
        return response;
      } else {
        // Handle other errors or rethrow them if necessary
        return error;
      }
    }
  }

  async removeAll() {
    try {
      const { count } = await this.prisma.book.deleteMany();
      if (count === 0) {
        throw new Error(`No books to delete`);
      }
      return count;
    } catch (err) {
      const response = {
        statusCode: 204,
        errorMsg: err.message,
      };
      return response;
    }
  }
}
