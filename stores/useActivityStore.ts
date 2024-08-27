const { compareDate } = useCompareDate()
export const useActivityStore = defineStore('activity', () => {
  const activityName = ref()
  const activityDate = ref()
  const activityTime = ref()
  const activitySource = ref()
  const activities = ref([
    {
      name: '12月甜點聯誼會',
      date: '2024/12/06',
      time: '12:00',
      path: '/activity/12月甜點聯誼會',
      type: 'social'
    },
    {
      name: '10月甜點同好會',
      date: '2024/10/05',
      time: '17:00',
      path: '/activity/10月甜點同好會',
      type: 'interest'
    },
    {
      name: '中秋月餅DIY',
      date: '2024/08/20',
      time: '18:00',
      path: '/activity/中秋月餅DIY',
      type: 'moon'
    },
    {
      name: '情人節甜點DIY',
      date: '2024/08/10',
      time: '18:00',
      path: '/activity/情人節甜點DIY',
      type: 'couple'
    },
    {
      name: '5月甜點聯誼會',
      date: '2024/05/04',
      time: '12:00',
      path: '/activity/5月甜點聯誼會',
      type: 'social'
    },
    {
      name: '3月甜點同好會',
      date: '2024/03/02',
      time: '17:00',
      path: '/activity/3月甜點同好會',
      type: 'interest'
    }
  ])
  const activitiesNow = computed(() => {
    return activities.value.filter((activity) => compareDate(activity.date) === 'future')
  })
  return { activityName, activityDate, activityTime, activitySource, activities, activitiesNow }
})
