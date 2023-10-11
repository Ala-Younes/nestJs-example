import { ValidationPipe, BadRequestException } from '@nestjs/common';

const CustomErrorPipe = new ValidationPipe({
  exceptionFactory: (errors) => {
    const result = errors.map((error) => ({
      property: error.property,
      message: error.constraints
        ? error.constraints[Object.keys(error.constraints)[0]]
        : 'Error',
      error: `Error Value : ${error.value}`,
    }));
    throw new BadRequestException(result);
  },
  stopAtFirstError: true,

  whitelist: true,
  transform: true,
});

export default CustomErrorPipe;
