import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './signup-styles.scss'
import {
  Input,
  Footer,
  FormStatus,
  UnsignedHeader,
  SubmitButton,
} from '@/presentation/components'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    mainError: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
  })

  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(
    () => validate('passwordConfirmation'),
    [state.passwordConfirmation]
  )

  const validate = (field: string): void => {
    const formData = {
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
    }

    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData),
    }))

    setState((old) => ({
      ...old,
      isFormInvalid:
        !!old.nameError ||
        !!old.emailError ||
        !!old.passwordError ||
        !!old.passwordConfirmationError,
    }))
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

     setState((old) => ({
       ...old,
       isLoading: true,
     }))

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      })

      setCurrentAccount(account)

      history.replace('/')
    } catch (error) {
     setState((old) => ({
       ...old,
       isLoading: false,
       mainError: error.message,
     }))
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <UnsignedHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirme sua senha"
          />
          <SubmitButton text="Cadastrar" />
          <Link
            data-testid="login-link"
            replace
            to="/login"
            className={Styles.link}>
            Voltar para Login
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
