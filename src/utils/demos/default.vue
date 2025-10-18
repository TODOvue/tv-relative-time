<template>
  <tv-relative-time
    :date="date"
  ></tv-relative-time>
</template>

<script setup>
import { ref } from 'vue'

import { TvRelativeTime } from "@todovue/tv-relative-time";

const date = ref('2025-05-05T00:00:00Z')
</script>
