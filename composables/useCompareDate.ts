export default function () {
  function compareDate(dateString: string): string {
    const [year, month, day] = dateString.split('/').map(Number)
    const date = new Date(year, month - 1, day)

    const today = new Date()
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    if (date > todayDate) {
      return 'future'
    } else if (date <= todayDate) {
      return 'past'
    } else {
      return ''
    }
  }

  return {
    compareDate
  }
}
