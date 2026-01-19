import relativeTimeLocales from '../locales/relativeTime.js'

const useRelativeTime = () => {
  const getRelativeTime = (dateString, isTableQuantity = false, compact = false, lang = 'en', timeZone = 'UTC') => {
    const t = relativeTimeLocales[lang] || relativeTimeLocales.en

    const date = new Date(dateString)
    const now = new Date()

    if (!dateString) return { text: isTableQuantity ? '-' : t.noDate, tooltip: '' }

    const fullDate = new Intl.DateTimeFormat(lang, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone,
    }).format(date)

    const diffInSeconds = Math.floor((date - now) / 1000)
    const diffInDays = Math.floor(diffInSeconds / 86400)

    const getUTCDateString = (d) => {
      return `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`
    }
    const sameDay = getUTCDateString(date) === getUTCDateString(now)

    const getDayName = (d) => new Intl.DateTimeFormat(lang, { weekday: 'long', timeZone }).format(d)

    const formatUnit = (val, unit) => `${val} ${val === 1 ? t[unit] : t[unit + 's']}`

    const formatCompact = (val, unit) => {
      const map = {
        [t.minute]: 'm',
        [t.hour]: 'h',
        [t.day]: 'd',
        [t.week]: 'w',
        [t.month]: 'mo',
        [t.year]: 'y'
      }
      return `${val}${map[unit] || ''}`
    }

    const formatDetail = ({ years, months, weeks, days }) => {
      const parts = []
      if (years) parts.push(formatUnit(years, 'year'))
      if (months) parts.push(formatUnit(months, 'month'))
      if (weeks) parts.push(formatUnit(weeks, 'week'))
      if (days) parts.push(formatUnit(days, 'day'))
      return parts.slice(0, 2).join(', ')
    }

    const getDetailedBreakdown = (start, end) => {
      let remainingDays = Math.floor((end - start) / 86400000)
      const years = Math.floor(remainingDays / 365)
      remainingDays %= 365
      const months = Math.floor(remainingDays / 30)
      remainingDays %= 30
      const weeks = Math.floor(remainingDays / 7)
      const days = remainingDays % 7
      return { years, months, weeks, days }
    }

    if (sameDay) {
      const absSeconds = Math.abs(diffInSeconds)
      if (absSeconds < 60) {
        return {
          text: compact ? t.now : diffInSeconds > 0 ? t.inAMoment : t.now,
          tooltip: fullDate
        }
      }

      if (absSeconds < 3600) {
        const minutes = Math.floor(absSeconds / 60)
        return {
          text: compact
            ? formatCompact(minutes, t.minute)
            : diffInSeconds > 0
              ? `${t.in} ${formatUnit(minutes, 'minute')}`
              : `${t.ago} ${formatUnit(minutes, 'minute')}`,
          tooltip: fullDate
        }
      }

      const hours = Math.floor(absSeconds / 3600)
      return {
        text: compact
          ? formatCompact(hours, t.hour)
          : diffInSeconds > 0
            ? `${t.in} ${formatUnit(hours, 'hour')}`
            : `${t.ago} ${formatUnit(hours, 'hour')}`,
        tooltip: fullDate
      }
    }

    if (diffInSeconds > 0) {
      if (diffInDays === 1) return { text: compact ? '1d' : t.tomorrow, tooltip: fullDate }
      if (diffInDays === 2) return { text: compact ? '2d' : `${t.in} 2 ${t.days}`, tooltip: fullDate }
      if (diffInDays < 7) return { text: compact ? `${diffInDays}d` : `${t.next} ${getDayName(date)}`, tooltip: fullDate }
      if (diffInDays < 14) return { text: compact ? '1w' : t.nextWeek, tooltip: fullDate }

      if (diffInDays < 60) {
        const weeks = Math.round(diffInDays / 7)
        return {
          text: compact ? `${weeks}w` : `${t.in} ${formatUnit(weeks, 'week')}`,
          tooltip: fullDate
        }
      }

      const detail = getDetailedBreakdown(now, date)
      return {
        text: compact
          ? formatCompact(detail.years || detail.months, detail.years ? t.year : t.month)
          : `${t.in} ${formatDetail(detail)}`,
        tooltip: fullDate
      }
    } else {
      const absDays = Math.abs(diffInDays)
      if (absDays === 1) return { text: compact ? '1d' : t.yesterday, tooltip: fullDate }
      if (absDays === 2) return { text: compact ? '2d' : `${t.ago} 2 ${t.days}`, tooltip: fullDate }
      if (absDays < 7) return { text: compact ? `${absDays}d` : `${t.past} ${getDayName(date)}`, tooltip: fullDate }
      if (absDays < 14) return { text: compact ? '1w' : t.lastWeek, tooltip: fullDate }

      if (absDays < 60) {
        const weeks = Math.round(absDays / 7)
        return {
          text: compact ? `${weeks}w` : `${t.ago} ${formatUnit(weeks, 'week')}`,
          tooltip: fullDate
        }
      }

      const detail = getDetailedBreakdown(date, now)
      return {
        text: compact
          ? formatCompact(detail.years || detail.months, detail.years ? t.year : t.month)
          : `${t.ago} ${formatDetail(detail)}`,
        tooltip: fullDate
      }
    }
  }

  return { getRelativeTime }
}

export default useRelativeTime
