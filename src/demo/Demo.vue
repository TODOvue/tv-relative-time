<script setup>
import { defineAsyncComponent } from "vue";
import { TvDemo } from '@todovue/tv-demo';
const TvRelativeTime = defineAsyncComponent(() => import("../components/TvRelativeTime.vue"));
import { demos } from '../utils/mocks.js';
</script>

<template>
  <tv-demo
    :component="TvRelativeTime"
    :variants="demos"
    name-component="TvRelativeTime"
    npm-install="@todovue/tv-relative-time"
    source-link="https://github.com/TODOvue/tv-relative-time"
    url-clone="https://github.com/TODOvue/tv-relative-time.git"
    version="1.1.1"
  />
</template>

