<template>
  <TvRelativeTime
    :date="'2022-09-10T12:00:00Z'"
    lang="es"
    show-full-date
  ></TvRelativeTime>
</template>

<script setup>
import { ref } from 'vue'

import { TvRelativeTime } from "@todovue/tv-relative-time";

const date = ref('2022-09-10T12:00:00Z')
</script>
