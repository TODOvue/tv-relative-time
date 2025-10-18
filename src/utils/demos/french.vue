<template>
  <TvRelativeTime
    :date="'2026-04-25T15:00:00Z'"
    lang="fr"
    show-full-date
  ></TvRelativeTime>
</template>

<script setup>
import { ref } from 'vue'

import { TvRelativeTime } from "@todovue/tv-relative-time";

const date = ref('2026-04-25T15:00:00Z')
</script>
