export default function () {
  const images = computed<Record<string, string>>(() =>
    import.meta.glob('~/assets/images/**/*', { eager: true, import: 'default' })
  )
  const getImageUrl = (filename: string) => {
    const url = `/assets/images/${String(filename).replace(/^(\.\/+|\/+)/, '')}`
    return images.value?.[url]
  }

  return {
    getImageUrl
  }
}
