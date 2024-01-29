import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateConfig<T extends object>(
  config: Record<string, unknown>,
  envVariableClass: ClassConstructor<T>
) {
  const validatedConfig = plainToClass(envVariableClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
