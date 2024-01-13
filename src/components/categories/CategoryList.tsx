import { CategoryViewMode } from '../../app/types/app.type'
import { CategoryType } from '../../app/types/category.type'
import { useExpense } from '../../hooks/useExpense'
import { useAppDispatch, useAppSelector } from '../../store'
import { switchCategoryView } from '../../store/appSlice'
import { selectCategory } from '../../store/categoriesSlice'
import ExpensePopup from '../popups/ExpensePopup'
import Button from '../ui/Button'
import CategoryItem from './CategoryItem'

const CategoryList = () => {
  const { add, isEditing, toggleEditing } = useExpense()

  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.list)

  const onSelectCategory = (category: CategoryType) => {
    dispatch(selectCategory(category))
    dispatch(switchCategoryView(CategoryViewMode.EDIT_CATEGORY))
  }

  const addCategory = () => {
    dispatch(switchCategoryView(CategoryViewMode.CREATE_CATEGORY))
  }

  return (
    <>
      <div className="mb-8 flex justify-end gap-2">
        <Button icon="AiOutlinePlusCircle" onClick={toggleEditing}>
          Додати витрату
        </Button>
        <Button variant="outline" onClick={addCategory}>
          Новий ліміт
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="m-auto w-full">
          {categories.map(item => (
            <CategoryItem key={item.id} onSelect={() => onSelectCategory(item)} {...item} />
          ))}
        </div>
      </div>
      <ExpensePopup
        onSaveClick={add}
        isOpened={isEditing}
        focusOnShow={true}
        onClose={toggleEditing}
      />
    </>
  )
}

export default CategoryList
