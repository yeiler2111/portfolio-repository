import Schema from "async-validator";
import { AsyncValidationError } from "async-validator/dist-types/util";

interface ValidatorResult {
  validated: boolean;
  errors: Record<string, string>;
}

interface ValidatorRunner {
  run: (values: Record<string, any>) => Promise<ValidatorResult>;
}

export default class Validator implements ValidatorRunner {
  public validator: Schema;

  constructor(public readonly descriptor: any) {
    this.validator = new Schema(descriptor);
  }
  async run(values: Record<string, any>) {
    const errors: Record<string, string> = {};
    let validated = false;
    try {
      await this.validator.validate(values);
      validated = true;
    } catch (err: unknown) {
      const error: AsyncValidationError = err as AsyncValidationError;
      const { errors: validationErrors, fields } = error;
      if (validationErrors?.length > 0) {
        for (const [key, data] of Object.entries(fields)) {
          errors[key] = data?.[0]?.message!
        }
      }

    }
    return { validated, errors };
  }

}
