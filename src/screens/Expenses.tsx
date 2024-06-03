import React, { useCallback, useEffect, useRef } from 'react'
import Layout from '../components/layouts/Layout'
import ExpenseList from '../components/expenses/ExpenseList'
import { useAppDispatch, useAppSelector } from '../store'
import { useGetExpensesQuery } from '../store/api/expenses.api'
import Button from '../components/ui/Button'
import ExpenseEmpty from '../components/expenses/ExpenseEmpty'
import { toggleAddingExpense } from '../store/appSlice'
import { EXPENSES_PER_PAGE } from '../app/types/expense.type'
import BodyLoader from '../components/ui/loaders/BodyLoader'
import { setExpensesPage } from '../store/expensesSlice'
import CircularLoader from '../components/ui/loaders/CircularLoader'

const Expenses = () => {
  const page = useAppSelector(state => state.expenses.viewedPage)
  const expenses = useAppSelector(state => state.expenses.list)
  const dispatch = useAppDispatch()

  const bottomRef = useRef(null)

  const { data, isLoading, isFetching } = useGetExpensesQuery({
    perPage: EXPENSES_PER_PAGE,
    page,
  })

  const addExpense = () => {
    dispatch(toggleAddingExpense())
  }

  const loadMore = useCallback(() => {
    if (!data?.meta?.next) return
    dispatch(setExpensesPage(page + 1))
  }, [dispatch, page, data?.meta?.next])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const target = entries[0]
      if (target.isIntersecting) {
        loadMore()
      }
    })

    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current)
      }
    }
  }, [isFetching])

  if (isLoading) {
    return <BodyLoader />
  }

  return (
    <Layout className="w-full sm:w-full md:w-2/3 xl:w-1/3">
      {expenses.length > 0 ? (
        <div>
          <Button icon="AiOutlinePlusCircle" className="ml-auto" onClick={addExpense}>
            Нова витрата
          </Button>
          <ExpenseList expenses={expenses} />
        </div>
      ) : (
        <ExpenseEmpty />
      )}
      {isFetching ? <CircularLoader /> : <div ref={bottomRef}></div>}
    </Layout>
  )
}

export default Expenses
