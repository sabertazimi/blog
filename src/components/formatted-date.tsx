import { useFormatter } from 'next-intl'

interface FormattedDateProps {
  date: string | number | Date | undefined | null
  showTime?: boolean
  className?: string
}

function FormattedDate({ date, showTime = false, className }: FormattedDateProps) {
  const format = useFormatter()

  if (date === undefined || date === null) {
    return null
  }

  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  return showTime
    ? (
        <span className={className}>
          {format.dateTime(dateObj, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      )
    : (
        <span className={className}>
          {format.dateTime(dateObj, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      )
}

export default FormattedDate
