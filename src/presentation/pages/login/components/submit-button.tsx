import React from 'react'
import { useRecoilValue } from 'recoil'
import { SubmitButton as SubmitButtonBase } from '@/presentation/components'
import { loginState } from './atom'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(loginState)

  return <SubmitButtonBase text={text} state={state} />
}

export default SubmitButton