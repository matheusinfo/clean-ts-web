import { testUrl } from '../support/helpers'

describe('PrivateRoutes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')
    testUrl('/login')
  })
})
