import React, { useState } from 'react'
import { uiTransformPeriod } from '../../app/helper'
import { Digits } from '../../app/patterns'
import { Icons } from '../../app/temp'
import { CategoryViewMode } from '../../app/types/app.type'
import { CategoryType, getDefaultCategory } from '../../app/types/category.type'
import { CategorySchema } from '../../app/validation/schemas/CategorySchema'
import { PeriodOptions } from '../../app/variables'
import { useValidator } from '../../hooks'
import { useAppDispatch } from '../../store'
import { switchCategoryView } from '../../store/appSlice'
import { createCategory } from '../../store/categoriesSlice'
import { Icon } from '../Icon'
import DrawerLayout from '../layouts/DrawerLayout'
import IconPopup from '../popups/IconPopup'
import EditableInput from '../ui/EditableField/EditableInput'
import EditableSelect from '../ui/EditableField/EditableSelect'

const CategoryCreating: React.FC = () => {
  const dispatch = useAppDispatch()

  const [category, setCategory] = useState<CategoryType>(getDefaultCategory())
  const [isIconEditing, setIsIconEditing] = useState<boolean>(false)

  const { validate, clearError, checkError } = useValidator<typeof CategorySchema>()

  const toInitialView = () => {
    dispatch(switchCategoryView(CategoryViewMode.CATEGORY_LIST))
  }

  const onSaveClick = () => {
    const isValid = validate(category, CategorySchema)

    if (isValid) {
      dispatch(createCategory(category))
      toInitialView()
    }
  }

  const handleFieldUpdate = (field: keyof CategoryType, value: string) => {
    clearError(field)
    setCategory({ ...category, [field as string]: value })
  }

  return (
    <DrawerLayout handleClose={toInitialView} handleSave={onSaveClick}>
      <div className="grid grid-cols-2-80-one sm:grid-cols-3-96-60-one gap-0 sm:gap-4">
        <div>
          <div
            className="flex w-14 h-14 sm:w-24 sm:h-24 items-center cursor-pointer justify-center rounded-xl bg-primary"
            onClick={() => setIsIconEditing(true)}
          >
            <Icon nameIcon={category.iconName} propsIcon={{ size: '48px' }} />
          </div>
        </div>

        <div>
          <EditableInput
            className="font-bold text-2xl"
            value={category.title}
            focusDefault={true}
            placeholder="Назва категорії витрат"
            onEdit={(val: string) => handleFieldUpdate('title', val)}
            error={checkError('title')}
          />
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
              value={`${category.limit}`}
              maxLength={7}
              regex={Digits}
              onEdit={(val: string) => handleFieldUpdate('limit', val)}
              error={checkError('limit')}
              afterText="грн"
            />
          </div>
        </div>
      </div>

      <IconPopup
        isOpened={isIconEditing}
        onClose={() => setIsIconEditing(false)}
        onSelect={(icon: string) => handleFieldUpdate('iconName', icon)}
        preSelected={category.iconName}
        iconSource={Icons}
      />
    </DrawerLayout>
  )
}
export default CategoryCreating
