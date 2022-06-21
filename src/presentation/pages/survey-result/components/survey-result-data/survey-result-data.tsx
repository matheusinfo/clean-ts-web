import React from 'react'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'
import { Calendar } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import Styles from './survey-result-data-styles.scss'

type Props = {
  surveyResult: LoadSurveyResult.Result
}

const SurveyResultData: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory()

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>

      <FlipMove data-testid="answers" className={Styles.answerList}>
        {surveyResult.answers.map((answer) => (
          <li
            data-testid="answer-wrap"
            className={answer.isCurrentAccountAnswer ? Styles.active : ''}
            key={answer.answer}>
            {answer.image && (
              <img data-testid="image" src={answer.image} alt={answer.answer} />
            )}
            <span data-testid="answer" className={Styles.answer}>
              {answer.answer}
            </span>
            <span data-testid="percent" className={Styles.percent}>
              {answer.percent}%
            </span>
          </li>
        ))}
      </FlipMove>

      <button
        data-testid="back-button"
        className={Styles.button}
        onClick={goBack}>
        Voltar
      </button>
    </>
  )
}

export default SurveyResultData
