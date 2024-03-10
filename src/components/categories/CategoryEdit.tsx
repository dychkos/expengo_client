import React, { useState } from 'react'
import { uiTransformDate, uiTransformPeriod } from '../../app/helper'
import { Digits } from '../../app/patterns'
import { Icons } from '../../app/temp'
import { CategoryType } from '../../app/types/category.type'
import { CategorySchema } from '../../app/validation/schemas/CategorySchema'
import { PeriodOptions } from '../../app/variables'
import { useExpensesInCategory, useValidator } from '../../hooks'
import { useAppDispatch } from '../../store'
import {selectCategory, updateCategoryInList} from '../../store/categoriesSlice'
import CategoryProgress from '../CategoryProgress'
import { Icon } from '../Icon'
import DrawerLayout from '../layouts/DrawerLayout'
import IconPopup from '../popups/IconPopup'
import EditableInput from '../ui/EditableField/EditableInput'
import EditableSelect from '../ui/EditableField/EditableSelect'

interface EditCategoryProps {
  category: CategoryType
}

const CategoryEdit: React.FC<EditCategoryProps> = ({ category: initial }) => {
  const dispatch = useAppDispatch()

  const [category, setCategory] = useState(initial)
  const [showIconEdit, setShowIconEdit] = useState(false)

  const { validate, clearError, checkError } = useValidator<typeof CategorySchema>()

  const currentlySpent = useExpensesInCategory(category.id, {
    forWeek: category.period === 'week',
  })

  const toInitialView = () => {
    dispatch(selectCategory(null))
  }

  const onSaveClick = () => {
    const isValid = validate(category, CategorySchema)

    if (isValid) {
      dispatch(updateCategoryInList(category as CategoryType))
      toInitialView()
    }
  }

  const handleFieldUpdate = (field: keyof CategoryType, value: string) => {
    clearError(field)
    setCategory({ ...category, [field as string]: value })
  }

  return (
    <DrawerLayout handleSave={onSaveClick} handleClose={toInitialView}>
      <div className="grid grid-cols-2-80-one sm:grid-cols-3-96-60-one gap-0 sm:gap-4">
        <div>
          <div
            className="flex w-14 h-14 sm:w-24 sm:h-24 items-center cursor-pointer justify-center rounded-xl bg-primary"
            onClick={() => setShowIconEdit(true)}
          >
            <Icon nameIcon={category.iconName} propsIcon={{ size: '48px' }} />
          </div>
        </div>

        <div>
          <EditableInput
            className="font-bold text-2xl"
            value={category.title}
            placeholder="Назва категорії витрат"
            onEdit={(val: string) => handleFieldUpdate('title', val)}
            error={checkError('category')}
          />
        </div>

        <div>
          <span className="hidden sm:block font-default font-bold leading-3 text-zinc-500 text-xs text-right ml-auto">
            {uiTransformDate(category.createdAt)}
          </span>
        </div>
      </div>

      <div className="grid grid-rows-2 md:grid-cols-2-one-two gap-5 mt-5">
        <div>
          <div className="flex items-center gap-2">
            <span>Ліміт на</span>
            <EditableSelect
              className="font-medium underline"
              innerText={uiTransformPeriod(category.period)}
              options={PeriodOptions}
              error={checkError('period')}
              onEdit={(val: string) => handleFieldUpdate('period', val)}
            />
          </div>

          <div className="flex items-center gap-2">
            <EditableInput
              type="text"
              className="text-xl md:text-2xl"
              value={category.limit.toString()}
              maxLength={7}
              regex={Digits}
              onEdit={(val: string) => handleFieldUpdate('limit', val)}
              error={checkError('limit')}
              afterText="грн"
            />
          </div>
        </div>

        <CategoryProgress current={currentlySpent} limit={category.limit} size="huge" />
      </div>

      <IconPopup
        isOpened={showIconEdit}
        onClose={() => setShowIconEdit(false)}
        onSelect={(icon: string) => handleFieldUpdate('iconName', icon)}
        preSelected={category.iconName}
        iconSource={Icons}
      />
    </DrawerLayout>
  )
}
export default CategoryEdit
