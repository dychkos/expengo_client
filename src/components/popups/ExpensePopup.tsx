import React, { FC, useEffect, useState } from 'react'
import { Digits } from '../../app/patterns'
import { CategoryType } from '../../app/types/category.type'
import { ExpenseType, getDefaultExpense } from '../../app/types/expense.type'
import { ExpenseSchema } from '../../app/validation/schemas/ExpenseSchema'
import { NumericMaxLength } from '../../app/variables'
import { useValidator } from '../../hooks'
import { useAppSelector } from '../../store'
import { Icon } from '../Icon'
import Button from '../ui/Button'
import { EditableInput } from '../ui/EditableField'
import Popup from '../ui/Popup'
import CategoryPopup from './CategoryPopup'
import { PopupProps } from './popup.props'

interface ExpensePopupProps extends PopupProps {
  onSaveClick: (expense: ExpenseType) => void
  loading: boolean
  expense?: ExpenseType
  focusOnShow?: boolean
  onRemoveClick?: (expense: ExpenseType) => void
}

const ExpensePopup: FC<ExpensePopupProps> = props => {
  const [current, setCurrent] = useState<ExpenseType>(
    props.expense || getDefaultExpense(),
  )
  const [showCategory, setShowCategory] = useState<boolean>(false)

  const selectedCategory = useAppSelector(state => {
    const selectedById = state.categories.list.find(cat => cat.id === current?.categoryId)
    return selectedById || state.categories.list[0]
  })

  const categories = useAppSelector(state => state.categories.list)
  const { validate, clearError, checkError } = useValidator<typeof ExpenseSchema>()

  useEffect(() => {
    if (!current.categoryId && selectedCategory) {
      setCurrent({ ...current, categoryId: selectedCategory.id })
    }
  }, [])

  const onFieldEdit = (field: keyof ExpenseType, value: any) => {
    clearError(field)
    setCurrent({ ...current, [field]: value })
  }

  const onSaveClick = () => {
    if (validate(current, ExpenseSchema)) {
      props.onSaveClick(current)
    }
  }

  const onRemoveClick = () => {
    if (props.onRemoveClick) {
      props.onRemoveClick(current)
    }
  }

  return (
    <React.Fragment>
      <Popup
        isOpened={props.isOpened}
        onClose={props.onClose}
        className="sm:w-2/3 xl:w-1/3"
        disabled={props.loading}
      >
        <Popup.Header>Редагування витрати</Popup.Header>
        <div className="flex gap-4 items-center overflow-x-hidden">
          <div
            className="flex flex-shrink-0 cursor-pointer  items-center justify-center p-4 max-h-full rounded-xl bg-primary"
            onClick={() => setShowCategory(true)}
          >
            <Icon nameIcon={selectedCategory.iconName} propsIcon={{ size: '36px' }} />
          </div>
          <div>
            <EditableInput
              type="text"
              value={current.price.toString()}
              error={checkError('price')}
              className="font-default font-bold text-4xl"
              regex={Digits}
              focusDefault={props.focusOnShow}
              onEdit={(val: string) => onFieldEdit('price', Number(val))}
              inputMode="numeric"
              maxLength={NumericMaxLength}
              afterText="грн"
              placeholder="150 грн"
            />
            <EditableInput
              type="text"
              value={current.title}
              error={checkError('title')}
              onEdit={(val: string) => onFieldEdit('title', val)}
              className="font-default text-md text-zinc-500"
            />
          </div>
        </div>
        <Popup.Footer>
          <Button onClick={onSaveClick} disabled={props.loading}>
            Зберегти
          </Button>
          {props.onRemoveClick && (
            <Button variant="outline" onClick={onRemoveClick} disabled={props.loading}>
              Видалити
            </Button>
          )}
        </Popup.Footer>
      </Popup>
      <CategoryPopup
        categories={categories}
        preSelectedId={current.categoryId}
        onSelect={(category: CategoryType) => onFieldEdit('categoryId', category.id)}
        isOpened={showCategory}
        onClose={() => setShowCategory(false)}
      />
    </React.Fragment>
  )
}

export default ExpensePopup
