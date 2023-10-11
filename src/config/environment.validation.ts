// environment.validation.ts

import { IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariables {
  @IsString({ message: 'Invalid DATABASE_URL' })
  DATABASE_URL: string;

  @IsNumber()
  PORT: number;
}

export const validate = (config: Record<string, unknown>) => {
  // `plainToClass` to converts plain object into Class
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  // `validateSync` method validate the class and returns errors
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
