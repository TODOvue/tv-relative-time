<template>
  <TvRelativeTime
    :date="'2023-01-01T00:00:00Z'"
    compact
    lang="pt"
    show-full-date
  ></TvRelativeTime>
</template>

<script setup>
import { ref } from 'vue'

import { TvRelativeTime } from "@todovue/tv-relative-time";

const date = ref('2023-01-01T00:00:00Z')
</script>
