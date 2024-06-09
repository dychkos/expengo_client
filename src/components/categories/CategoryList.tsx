import React from 'react'
import { CategoryType } from '../../app/types/category.type'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectCategory } from '../../store/categoriesSlice'
import Button from '../ui/Button'
import CategoryEmpty from './CategoryEmpty'
import CategoryItem from './CategoryItem'
import { toggleAddingCategory, toggleAddingExpense } from '../../store/appSlice'

const CategoryList = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state =>
    state.categories.list.filter(
      category => !(category.uncategorized && category.volume.month === 0),
    ),
  )

  const onSelectCategory = (category: CategoryType) => {
    dispatch(selectCategory(category))
  }

  const addCategory = () => {
    dispatch(toggleAddingCategory())
  }

  const addExpense = () => {
    dispatch(toggleAddingExpense())
  }

  if (!categories.length) {
    return <CategoryEmpty />
  }

  return (
    <section>
      <div className="mb-8 flex justify-end gap-2">
        <Button icon="AiOutlinePlusCircle" onClick={addExpense}>
          Додати витрату
        </Button>
        <Button variant="outline" onClick={addCategory}>
          Новий ліміт
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="m-auto w-full">
          {categories.map(item => (
            <CategoryItem
              key={item.id}
              onSelect={() => onSelectCategory(item)}
              category={item}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryList
