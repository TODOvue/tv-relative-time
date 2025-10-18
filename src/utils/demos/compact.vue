<template>
  <tv-relative-time
    :date="date"
    compact
  ></tv-relative-time>
</template>

<script setup>
import { ref } from 'vue'

import { TvRelativeTime } from "@todovue/tv-relative-time";

const date = ref('1993-09-15T00:00:00Z')
</script>
