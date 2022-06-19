import faker from 'faker'
import * as Http from '../support/http-mocks'

export const mockInvalidCredentialsError = (): void =>
  Http.mockUnauthorizedError(/login/)

export const mockUnexpectedError = (): void =>
  Http.mockServerError(/login/, 'POST')

export const mockSuccess = (): void => {
  Http.mockSuccess(/login/, 'POST', {
    accessToken: faker.random.uuid(),
    name: faker.name.findName(),
  })
}
