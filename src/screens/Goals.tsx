import React from 'react'
import Layout from '../components/Layout'
import { GoalList } from '../components/goals/GoalList'
import GoalInEdit from '../components/goals/GoalInEdit'
import { useAppSelector } from '../store'
import { GoalViewMode } from '../app/types/app.type'
import { GoalType } from '../app/types/goal.type'

const Goals = () => {
  const [appMode, selectedGoal] = useAppSelector(state => [
    state.app.goalViewMode,
    state.goals.selected,
  ])

  const renderByMode = (mode: GoalViewMode) => {
    switch (mode) {
      case GoalViewMode.EDIT_GOAL:
        return <GoalInEdit goal={selectedGoal as GoalType} />
      case GoalViewMode.CREATE_GOAL:
        return <></>
      case GoalViewMode.ADD_EXPENSE:
        return <></>
      default:
        return <GoalList />
    }
  }

  return <Layout>{renderByMode(appMode)}</Layout>
}
export default Goals
