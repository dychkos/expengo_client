import { CategoryViewMode } from '../app/types/app.type'
import { CategoryType } from '../app/types/category.type'
import CategoryCreating from '../components/categories/CategoryCreating'
import CategoryEditing from '../components/categories/CategoryEditing'
import CategoryList from '../components/categories/CategoryList'
import Layout from '../components/layouts/Layout'
import { useAppSelector } from '../store'

const Categories = () => {
  const [appMode, selectedCategory] = useAppSelector(state => [
    state.app.categoryViewMode,
    state.categories.selected,
  ])

  const renderByMode = (mode: CategoryViewMode) => {
    switch (mode) {
      case CategoryViewMode.EDIT_CATEGORY:
        return <CategoryEditing category={selectedCategory as CategoryType} />
      case CategoryViewMode.CREATE_CATEGORY:
        return <CategoryCreating />
      default:
        return <CategoryList />
    }
  }

  return <Layout>{renderByMode(appMode)}</Layout>
}
export default Categories
