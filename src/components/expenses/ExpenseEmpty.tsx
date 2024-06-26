import React from 'react'
import Button from '../ui/Button'
import {useAppDispatch} from "../../store";
import {toggleAddingExpense} from "../../store/appSlice";

const ExpenseEmpty: React.FC = () => {
  const dispatch = useAppDispatch()

  const addExpense = () => {
    dispatch(toggleAddingExpense())
  }

  return (
    <div className="flex items-center mt-6 text-center rounded-lg h-96">
      <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
        <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            ></path>
          </svg>
        </div>
        <h1 className="mt-3 text-lg font-medium text-gray-800">
          Ще немає жодної витрати
        </h1>
        <p className="mt-2 text-gray-500">Ти можеш почати додавати витрати зараз.</p>
        <div className="flex items-center mt-4 mx-auto">
          <Button icon="AiOutlinePlusCircle" onClick={addExpense}>
            Нова витрата
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ExpenseEmpty
