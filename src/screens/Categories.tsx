import CategoryEdit from '../components/categories/CategoryEdit'
import CategoryList from '../components/categories/CategoryList'
import Layout from '../components/layouts/Layout'
import { useAppSelector } from '../store'

const Categories = () => {
  const selectedCategory = useAppSelector(state => state.categories.selected)

  return (
    <Layout>
      {selectedCategory ? (
        <CategoryEdit category={selectedCategory} />
      ) : (
        <CategoryList />
      )}
    </Layout>
  )
}
export default Categories
