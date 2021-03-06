import faker from 'faker'
import * as Http from '../utils/http-mocks'
import { testInputStatus, testMainError } from '../utils/form-helpers'
import {
  testLocalStorageItem,
  testUrl,
  testHttpCallsCount,
} from '../utils/helpers'

const path = /login/

const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(path)

const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')

const mockSuccess = (): void => {
  Http.mockSuccess(path, 'POST', 'fx:account')
}

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('email').should('have.attr', 'readOnly')

    testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should reset state on page load', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    testInputStatus('email')

    cy.getByTestId('signup-link').click()
    cy.getByTestId('login-link').click()

    testInputStatus('email', 'Campo obrigatório')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email', 'O campo email é inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'O campo password é inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    testInputStatus('email')

    cy.getByTestId('password').focus().type(faker.internet.password())
    testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if invalid credentials are provided', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    testMainError('Credenciais inválidas')
    testUrl('/login')
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente!')
    testUrl('/login')
  })

  it('Should present save account if valid credentiasl are provided', () => {
    mockSuccess()
    simulateValidSubmit()
    testUrl('/')
    testLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()
    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@request')
    testHttpCallsCount(1)
  })

  it('Should not submit with invalid form', () => {
    mockSuccess()

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    testHttpCallsCount(0)
  })
})
