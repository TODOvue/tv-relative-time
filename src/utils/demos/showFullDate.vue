<template>
  <tv-relative-time
    :date="date"
    show-full-date
  ></tv-relative-time>
</template>

<script setup>
import { ref } from 'vue'

import { TvRelativeTime } from "@todovue/tv-relative-time";

const date = ref('2027-09-15T00:00:00Z')
</script>
