import React, { FC, useState } from 'react'
import { Digits } from '../../app/patterns'
import { CategoryType } from '../../app/types/category.type'
import { ExpenseType, getDefaultExpense } from '../../app/types/expense.type'
import { ExpenseSchema } from '../../app/validation/schemas/ExpenseSchema'
import { NumericMaxLength } from '../../app/variables'
import { useValidator } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../store'
import { useStoreExpenseMutation } from '../../store/api/expenses.api'
import { Icon } from '../Icon'
import CategoryPopup from '../popups/CategoryPopup'
import Button from '../ui/Button'
import { EditableInput } from '../ui/EditableField'
import Popup from '../ui/Popup'
import { toggleAddingExpense } from '../../store/appSlice'
import { cn } from '../../app/className'

const ExpenseCreatePopup: FC = () => {
  const dispatch = useAppDispatch()

  const isOpened = useAppSelector(state => state.app.addingExpense)
  const categories = useAppSelector(state => state.categories.list)
  const isLoading = useAppSelector(state => state.expenses.loading)

  const [expense, setExpense] = useState<ExpenseType>(getDefaultExpense())
  const [showCategory, setShowCategory] = useState<boolean>(false)
  const [storeExpense] = useStoreExpenseMutation()

  const {
    validate,
    clearError,
    checkError,
    errors: valError,
  } = useValidator<typeof ExpenseSchema>()

  const onFieldEdit = (field: keyof ExpenseType, value: any) => {
    clearError(field)
    setExpense({ ...expense, [field]: value })
  }

  const onCategoryClick = () => {
    setShowCategory(true)
  }

  const onSaveClick = async () => {
    if (validate(expense, ExpenseSchema)) {
      await storeExpense(expense)
      onClose()
    }
  }
  const onClose = () => {
    dispatch(toggleAddingExpense())
  }

  return (
    <React.Fragment>
      <Popup
        isOpened={isOpened}
        onClose={onClose}
        className="sm:w-2/3 xl:w-1/3"
        disabled={isLoading}
      >
        <Popup.Header>Додавання витрати</Popup.Header>
        <div className="flex gap-4 items-center overflow-x-hidden">
          <div>
            <div
              className={cn(
                'flex flex-shrink-0 cursor-pointer items-center justify-center p-4 max-h-full rounded-xl bg-primary',
                checkError('categoryId')
                  ? 'shake-elem bg-red-300 border-2 border-red-600 border-spacing-1'
                  : '',
              )}
              onClick={onCategoryClick}
            >
              <Icon
                nameIcon={
                  categories.find(cat => cat.id === expense.categoryId)?.iconName ??
                  'GrStatusUnknown'
                }
                propsIcon={{ size: '36px' }}
              />
            </div>
          </div>

          <div>
            <EditableInput
              type="text"
              value={String(expense.price)}
              error={checkError('price')}
              className="font-default font-bold text-4xl"
              regex={Digits}
              focusDefault={true}
              onEdit={(val: string) => onFieldEdit('price', Number(val))}
              inputMode="numeric"
              maxLength={NumericMaxLength}
              afterText="грн"
              placeholder="150 грн"
            />
            <EditableInput
              type="text"
              value={expense.title}
              error={checkError('title')}
              onEdit={(val: string) => onFieldEdit('title', val)}
              className="font-default text-md text-zinc-500"
            />
          </div>
        </div>
        <Popup.Footer>
          <Button onClick={onSaveClick} disabled={isLoading}>
            Зберегти
          </Button>
        </Popup.Footer>
      </Popup>

      <CategoryPopup
        categories={categories}
        preSelectedId={expense.categoryId}
        onSelect={(category: CategoryType) => onFieldEdit('categoryId', category.id)}
        isOpened={showCategory}
        onClose={() => setShowCategory(false)}
      />
    </React.Fragment>
  )
}

export default ExpenseCreatePopup
