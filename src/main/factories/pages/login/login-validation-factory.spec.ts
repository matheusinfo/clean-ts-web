import {
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators'
import { makeLoginValidationFactory } from './login-validation-factory'

describe('LoginValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidationFactory()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new RequiredFieldValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
      ])
    )
  })
})
