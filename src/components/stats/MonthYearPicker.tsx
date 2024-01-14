import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import moment from 'moment'
import 'moment/locale/uk'
import React from 'react'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { useOutsideClick } from '../../hooks'

interface MonthYearPickerProps {
  handleDatePick: (value: any) => void
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ handleDatePick }) => {
  const [isShownDataPicker, setShownDataPicker] = React.useState<boolean>(false)
  const [calendarValue, setCalendarValue] = React.useState<any>(moment())

  const closeDatePicker = () => {
    setShownDataPicker(false)
  }

  const onChange = (value: any) => {
    setCalendarValue(value)
    handleDatePick(value)
  }

  const outsideRef = useOutsideClick(closeDatePicker)

  return (
    <div
      className="relative flex gap-2 items-center cursor-pointer"
      onClick={() => setShownDataPicker(true)}
    >
      <MdOutlineCalendarToday />
      <span>{moment(calendarValue._d).locale('uk').format('MMMM YYYY')}</span>
      {isShownDataPicker && (
        <div ref={outsideRef} className="absolute -right-2 top-8 z-10 bg-white shadow-lg">
          <DateCalendar
            value={calendarValue}
            onChange={onChange}
            disableFuture
            views={['month', 'year']}
            openTo="month"
          />
        </div>
      )}
    </div>
  )
}

export default MonthYearPicker
