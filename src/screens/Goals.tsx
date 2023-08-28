import React from 'react'
import Layout from '../components/Layout'
import { GoalList } from '../components/goals/GoalList'
import GoalInEdit from '../components/goals/GoalInEdit'
import { useAppSelector } from '../store'

const Goals = () => {
  const selectedGoal = useAppSelector(state => state.goals.selected)
  const editMode = !selectedGoal

  return (
    <Layout>
      {editMode ? <GoalList /> : <GoalInEdit goal={selectedGoal} />}
    </Layout>
  )
}
export default Goals
