import React, { useContext } from 'react'
import { SurveyModel } from '@/domain/models'
import {
  SurveyContext,
  SurveyItem,
  SurveyItemEmpty,
} from '@/presentation/pages/survey-list/components'
import Styles from './survey-list-item-styles.scss'

const SurveyListItem: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length ? (
        state.surveys.map((survey: SurveyModel) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  )
}

export default SurveyListItem