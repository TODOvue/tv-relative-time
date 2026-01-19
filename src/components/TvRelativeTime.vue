<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import useRelativeTime from '../composable/useRelativeTime.js'

const props = defineProps({
  date: {
    type: [String, Number],
    required: true
  },
  updateInterval: {
    type: Number,
    default: 60000
  },
  compact: {
    type: Boolean,
    default: false
  },
  showFullDate: {
    type: Boolean,
    default: false
  },
  lang: {
    type: String,
    default: 'en'
  },
  timeZone: {
    type: String,
    default: 'UTC'
  }
})

const { getRelativeTime } = useRelativeTime(props.lang)
const timeInfo = ref({ text: '-', tooltip: '' })
let intervalId = null

const updateTime = () => {
  if (!props.date) return
  timeInfo.value = getRelativeTime(props.date, false, props.compact, props.lang, props.timeZone)
}

const displayText = computed(() => {
  return props.showFullDate
    ? `${timeInfo.value.text} (${timeInfo.value.tooltip})`
    : timeInfo.value.text
})

onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, props.updateInterval)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

watch(() => props.date, updateTime)
watch(() => props.lang, updateTime)
watch(() => props.compact, updateTime)
watch(() => props.showFullDate, updateTime)
watch(() => props.timeZone, updateTime)
</script>

<template>
  <time
    class="tv-relative-time"
    :datetime="props.date"
    :title="!props.showFullDate ? timeInfo.tooltip : undefined"
    :aria-label="timeInfo.tooltip"
    :style="props.showFullDate ? '' : 'cursor: help;'"
  >
    <slot 
      :text="timeInfo.text" 
      :tooltip="timeInfo.tooltip" 
      :original-date="props.date"
    >
      {{ displayText }}
    </slot>
  </time>
</template>

<style></style>
