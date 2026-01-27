<p align="center"><img width="150" src="https://res.cloudinary.com/dcdfhi8qz/image/upload/v1763663056/uqqtkgp1lg3xdplutpga.png" alt="TODOvue logo">
</p>

# TODOvue RelativeTime (TvRelativeTime)
A minimal and customizable Vue 3 component to display human-readable relative dates with live updates, compact formats, and multi-language support. Works seamlessly in Single Page Apps and Server-Side Rendered (SSR) environments (e.g. Nuxt 3).

[![npm](https://img.shields.io/npm/v/@todovue/tv-relative-time.svg)](https://www.npmjs.com/package/@todovue/tv-relative-time)
[![npm downloads](https://img.shields.io/npm/dm/@todovue/tv-relative-time.svg)](https://www.npmjs.com/package/@todovue/tv-relative-time)
[![npm total downloads](https://img.shields.io/npm/dt/@todovue/tv-relative-time.svg)](https://www.npmjs.com/package/@todovue/tv-relative-time)
![License](https://img.shields.io/github/license/TODOvue/tv-relative-time)
![Release Date](https://img.shields.io/github/release-date/TODOvue/tv-relative-time)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/@todovue/tv-relative-time)
![Node Version](https://img.shields.io/node/v/@todovue/tv-relative-time)
![Last Commit](https://img.shields.io/github/last-commit/TODOvue/tv-relative-time)
![Stars](https://img.shields.io/github/stars/TODOvue/tv-relative-time?style=social)

> Demo: https://ui.todovue.blog/relativetime

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Quick Start (SPA)](#quick-start-spa)
- [Nuxt 4 / SSR Usage](#nuxt-4--ssr-usage)
- [Component Registration Options](#component-registration-options)
- [Usage Examples](#usage-examples)
- [Props](#props)
- [Multi-Language Support](#multi-language-support)
- [Composable (useRelativeTime)](#composable-userelativetime)
- [Customization & Formats](#customization--formats)
- [Accessibility](#accessibility)
- [SSR Notes](#ssr-notes)
- [Development](#development)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Human-readable formats**: "2 hours ago", "Yesterday", "In 3 days"
- **Compact mode**: `2h`, `1d`, `3w`, `2mo` for space-constrained UIs
- **Live updates**: Auto-refresh at configurable intervals (default 60s)
- **Multi-language**: Built-in support for English, Spanish, French, Portuguese
- **Full date display**: Optionally show absolute date alongside relative time
- **SSR-compatible**: Works with Nuxt 3 and other SSR frameworks
- **Lightweight & tree-shakeable**: Vue 3 marked as external dependency
- **Semantic HTML**: Renders as `<time>` element with proper `datetime` attribute
- **Accessible**: Includes `title` and `aria-label` for screen readers

## Installation
Using npm:
```bash
npm install @todovue/tv-relative-time
```
Using yarn:
```bash
yarn add @todovue/tv-relative-time
```
Using pnpm:
```bash
pnpm add @todovue/tv-relative-time
```

## Quick Start (SPA)
Global registration (main.js / main.ts):
```js
import { createApp } from 'vue'
import App from './App.vue'
import { TvRelativeTime } from '@todovue/tv-relative-time'

createApp(App)
  .use(TvRelativeTime) // enables <TvRelativeTime /> globally
  .mount('#app')
```

Local import inside a component:
```vue
<script setup>
import { TvRelativeTime } from '@todovue/tv-relative-time'

const publishedDate = '2024-01-15T10:30:00Z'
</script>

<template>
  <TvRelativeTime :date="publishedDate" />
</template>
```

## Nuxt 4 / SSR Usage
Create a plugin file: `plugins/tv-relative-time.client.ts` (or without `.client` suffix as it's SSR-safe):
```ts
import { defineNuxtPlugin } from '#app'
import { TvRelativeTime } from '@todovue/tv-relative-time'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(TvRelativeTime)
})
```

Use anywhere in your Nuxt app:
```vue
<template>
  <TvRelativeTime 
    :date="article.publishedAt" 
    lang="es" 
    show-full-date 
  />
</template>
```

Optional direct import (no plugin):
```vue
<script setup>
import { TvRelativeTime } from '@todovue/tv-relative-time'
</script>
```

## Component Registration Options
| Approach                                                                           | When to use                                    |
|------------------------------------------------------------------------------------|------------------------------------------------|
| Global via `app.use(TvRelativeTime)`                                               | Many usages across app / design system install |
| Local named import `{ TvRelativeTime }`                                            | Isolated / code-split contexts                 |
| Direct default import `import { TvRelativeTime } from '@todovue/tv-relative-time'` | Single usage or manual registration            |
| Plugin with custom name                                                            | Custom component naming requirements           |

## Usage Examples

### Basic usage
```vue
<TvRelativeTime :date="'2024-10-18T08:00:00Z'" />
<!-- Output: "2 hours ago" (depending on current time) -->
```

### Compact format
```vue
<TvRelativeTime :date="postDate" compact />
<!-- Output: "2h", "3d", "1w", etc. -->
```

### Show full date
```vue
<TvRelativeTime :date="eventDate" show-full-date />
<!-- Output: "3 days ago (October 15, 2024)" -->
```

### Different language
```vue
<TvRelativeTime :date="createdAt" lang="es" />
<!-- Output: "Hace 2 horas" -->
```

### Custom update interval (every 10 seconds)
```vue
<TvRelativeTime :date="lastSeen" :update-interval="10000" />
```

### Combined features
```vue
<TvRelativeTime 
  :date="article.publishedAt"
  lang="fr"
  compact
  show-full-date
  :update-interval="30000"
/>
<!-- Output: "2h (18 octobre 2024)" -->
```

### Customizable Thresholds
```vue
<!-- "Just now" lasts for 5 minutes (300 seconds) -->
<TvRelativeTime :date="newPostDate" :now-threshold="300" />
```

## Props

| Prop             | Type          | Default | Required | Description                                                          |
|------------------|---------------|---------|----------|----------------------------------------------------------------------|
| `date`           | String/Number | —       | Yes      | Date string (ISO 8601) or timestamp to format.                       |
| `updateInterval` | Number        | `60000` | No       | Interval in milliseconds for live updates (60s default).             |
| `compact`        | Boolean       | `false` | No       | If true, returns compact format (`2h`, `3d`, `1w`, `2mo`).           |
| `showFullDate`   | Boolean       | `false` | No       | If true, appends the full date next to the relative time.            |
| `lang`           | String        | `'en'`  | No       | Language code: `'en'`, `'es'`, `'fr'`, `'pt'`.                       |
| `timeZone`       | String        | `'UTC'` | No       | Target timezone (e.g. `'America/New_York'`).                         |
| `nowThreshold`   | Number        | `60`    | No       | Seconds threshold to show "A moment ago" instead of "0 minutes ago". |

### Prop Details

#### `date` (required)
Accepts:
- ISO 8601 date strings: `'2024-10-18T14:30:00Z'`
- JavaScript timestamps: `1697635800000`
- Any valid date string parseable by `new Date()`

#### `updateInterval`
Controls how often the component recalculates the relative time. Set to `0` to disable auto-updates (not recommended for live data).

#### `compact`
Perfect for space-constrained UIs like tables, cards, or mobile views:
- `false` (default): "2 hours ago", "Yesterday", "In 3 days"
- `true`: "2h", "1d", "3w", "2mo", "1y"

#### `showFullDate`
Useful for providing context:
- `false` (default): "2 days ago"
- `true`: "2 days ago (October 16, 2024)"

#### `lang`
Supported languages:
- `'en'`: English (default)
- `'es'`: Spanish / Español
- `'fr'`: French / Français
- `'pt'`: Portuguese / Português

## Multi-Language Support

The component includes built-in translations for 4 languages. Examples:

| Time difference | English (en)      | Spanish (es)        | French (fr)         | Portuguese (pt)      |
|-----------------|-------------------|---------------------|---------------------|----------------------|
| < 1 minute      | A moment ago      | Hace un momento     | Il y a un instant   | Há um momento        |
| 2 hours ago     | 2 hours ago       | Hace 2 horas        | Il y a 2 heures     | Há 2 horas           |
| Yesterday       | Yesterday         | Ayer                | Hier                | Ontem                |
| 3 days ago      | 3 days ago        | Hace 3 días         | Il y a 3 jours      | Há 3 dias            |
| Last week       | Last week         | La semana pasada    | La semaine dernière | Semana passada       |
| Tomorrow        | Tomorrow          | Mañana              | Demain              | Amanhã               |
| In 5 days       | In 5 days         | En 5 días           | Dans 5 jours        | Em 5 dias            |

### Compact format (all languages)
Compact format uses universal abbreviations:
- Minutes: `m` (e.g., `15m`)
- Hours: `h` (e.g., `3h`)
- Days: `d` (e.g., `5d`)
- Weeks: `w` (e.g., `2w`)
- Months: `mo` (e.g., `3mo`)
- Years: `y` (e.g., `1y`)

## Composable (useRelativeTime)

You can also use the underlying composable directly in your own logic:

```js
import useRelativeTime from '@todovue/tv-relative-time/composable/useRelativeTime'

const { getRelativeTime } = useRelativeTime()

const result = getRelativeTime('2024-10-15T10:00:00Z', false, false, 'en')
console.log(result.text)    // "3 days ago"
console.log(result.tooltip) // "October 15, 2024"
```

### Composable signature
```js
getRelativeTime(dateString, isTableQuantity, compact, lang)
```

| Parameter         | Type    | Description                                    |
|-------------------|---------|------------------------------------------------|
| `dateString`      | String  | Date to format                                 |
| `isTableQuantity` | Boolean | If true, returns '-' when date is invalid      |
| `compact`         | Boolean | Enable compact format                          |
| `lang`            | String  | Language code (`'en'`, `'es'`, `'fr'`, `'pt'`) |

Returns:
```js
{
  text: string,    // Formatted relative time
  tooltip: string  // Full formatted date
}
```

## Customization & Formats

### Output Formats

#### Standard format (compact: false)
- "A moment ago" / "In a moment"
- "2 minutes ago" / "In 5 minutes"
- "1 hour ago" / "In 3 hours"
- "Yesterday" / "Tomorrow"
- "Last Monday" / "This Friday"
- "Last week" / "Next week"
- "3 weeks ago" / "In 2 weeks"
- "2 months ago" / "In 4 months"
- "1 year, 2 months ago"

#### Compact format (compact: true)
- "Now"
- "15m", "2h"
- "1d", "5d"
- "2w", "3w"
- "2mo", "6mo"
- "1y", "2y"

### Full Date Format
When `showFullDate` is enabled, the full date is formatted according to the selected language using `Intl.DateTimeFormat`:
- **en**: "October 18, 2024"
- **es**: "18 de octubre de 2024"
- **fr**: "18 octobre 2024"
- **pt**: "18 de outubro de 2024"

## Accessibility

The component is built with accessibility in mind:

### Semantic HTML
```html
<time 
  class="tv-relative-time" 
  datetime="2024-10-18T14:30:00Z"
  title="October 18, 2024"
  aria-label="October 18, 2024"
>
  2 hours ago
</time>
```

### Key accessibility features:
- Uses semantic `<time>` element with `datetime` attribute
- Includes `title` attribute for tooltip on hover
- Includes `aria-label` with full date for screen readers
- Full date always available even when showing relative time
- Proper language attribute can be set on parent elements

### Best practices:
```vue
<!-- Good: Context is clear -->
<article lang="es">
  <h2>{{ article.title }}</h2>
  <TvRelativeTime :date="article.publishedAt" lang="es" />
</article>

<!-- Better: Additional context -->
<p>
  Published <TvRelativeTime :date="publishedAt" show-full-date />
</p>
```

## SSR Notes

- **No direct DOM access**: Safe for SSR/Nuxt environments
- **Hydration-friendly**: Component state syncs properly on client
- **Universal rendering**: Works identically on server and client
- **Timezone handling**: Uses UTC by default for consistency
- **Auto-updates**: Live updates start only after client-side hydration

### Nuxt-specific considerations:
```vue
<!-- In Nuxt, this works everywhere -->
<template>
  <div>
    <TvRelativeTime :date="post.createdAt" />
  </div>
</template>
```

The component will render the initial relative time on the server, then activate live updates on the client.

## Development

Clone the repository and install dependencies:
```bash
git clone https://github.com/TODOvue/tv-relative-time.git
cd tv-relative-time
yarn install
```

Run the development server with demo playground:
```bash
yarn dev
```

Build the library:
```bash
yarn build
```

Build demo site:
```bash
yarn build:demo
```

### Project structure
```
src/
├── components/
│   └── TvRelativeTime.vue    # Main component
├── composable/
│   └── useRelativeTime.js    # Core logic
├── locales/
│   └── relativeTime.js       # Translations
├── demo/
│   └── Demo.vue              # Demo playground
└── entry.ts                  # Library entry point
```

## Changelog
See [CHANGELOG.md](https://github.com/TODOvue/tv-relative-time/blob/main/CHANGELOG.md) for release history and updates.

## Contributing
PRs and issues welcome! Please read our [Contributing Guide](https://github.com/TODOvue/tv-relative-time/blob/main/CONTRIBUTING.md) and [Code of Conduct](https://github.com/TODOvue/tv-relative-time/blob/main/CODE_OF_CONDUCT.md).

## License
[MIT](https://github.com/TODOvue/tv-relative-time/blob/main/LICENSE) © TODOvue

### Attributions
Crafted for the TODOvue component ecosystem
