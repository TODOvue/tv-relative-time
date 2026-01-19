<script setup>
import { defineAsyncComponent } from 'vue';
const TvRelativeTime = defineAsyncComponent(() => import('../components/TvRelativeTime.vue'));
import { demos } from './utils/mocks.js';
</script>

<template>
  <TvDemo
    :component="TvRelativeTime"
    :variants="demos"
    component-name="TvRelativeTime"
    npm-install="@todovue/tv-relative-time"
    source-link="https://github.com/TODOvue/tv-relative-time"
    url-clone="https://github.com/TODOvue/tv-relative-time.git"
    version="1.3.0"
  />
</template>

