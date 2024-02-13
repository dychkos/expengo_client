import Button from '../ui/Button'
import Popup from '../ui/Popup'
import { PopupProps } from './popup.props'

interface PremiumPopupProps extends PopupProps {}

const PremiumPopup: React.FC<PremiumPopupProps> = ({ isOpened, onClose }) => {
  const benefitsPro: string[] = [
    'До 8 категорій витрат',
    'Більш детальна статистика',
    'Преміум іконки для категорій',
    'Оперативна підтримка',
    'Допомога в розвитку проєкта',
  ]
  const benefitsStandard: string[] = [
    'До 5 категорій витрат',
    'Звичайні іконки для категорій',
    'Обмежена статистика витрат',
    'Підтримка протягом 24 годин',
  ]

  return (
    <Popup
      isOpened={isOpened}
      onClose={onClose}
      className="w-full h-auto sm:h-full sm:w-full sm:my-0 xl:w-2/3 xl:my-32 xl:h-auto"
    >
      <Popup.Header>Відкрий для себе більше можливостей</Popup.Header>
      <div className="mx-auto max-w-3xl py-8 sm:px-6 sm:py-12 lg:px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
          <div className="rounded-2xl border border-blue-500 p-6 shadow-sm ring-1 ring-blue-500 sm:order-last sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Pro
                <span className="sr-only">план</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  1$
                </strong>

                <span className="text-sm font-medium text-gray-700">/місяць</span>
              </p>
            </div>

            <ul className="mt-6 space-y-1">
              {benefitsPro.map(bene => (
                <li className="flex items-center gap-1" key={bene}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="h-5 w-5 text-blue-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-gray-700"> {bene} </span>
                </li>
              ))}
            </ul>

            <Button variant="huge" className="mt-6 w-full">
              Перейти на Premium
            </Button>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Звичайний
                <span className="sr-only">план</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  0$
                </strong>

                <span className="text-sm font-medium text-gray-700">/місяць</span>
              </p>
            </div>

            <ul className="mt-6 space-y-1">
              {benefitsStandard.map(bene => (
                <li className="flex items-center gap-1" key={bene}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="h-5 w-5 text-blue-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-gray-700"> {bene} </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default PremiumPopup
