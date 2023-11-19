export enum GoalViewMode {
  EDIT_GOAL = 'edit',
  CREATE_GOAL = 'create',
  GOAL_LIST = 'goal_list',
}

export interface StatsOptions {
  targetMonth: number
  targetYear: number
  totalValues: boolean
  includeCurrentWeek: boolean
}
