import Default from './demos/default.vue?raw';
import UpdateInterval from './demos/updateInterval.vue?raw';
import Compact from './demos/compact.vue?raw';
import ShowFullDate from "./demos/showFullDate.vue?raw";
import Spanish from './demos/spanish.vue?raw'
import French from './demos/french.vue?raw'
import Portuguese from './demos/portuguese.vue?raw'

export const demos = [
  {
    id: 1,
    title: "TvRelativeTime Default",
    description: "Displays the relative time using the default format (e.g., '2 days ago', 'in 1 week').",
    propsData: {
      date: '2025-05-05T00:00:00Z',
    },
    html: Default,
  },
  {
    id: 2,
    title: "TvRelativeTime Update Interval",
    description: "Updates the relative time every 30 seconds to keep the display accurate in real time.",
    propsData: {
      date: '2025-05-25T00:00:00Z',
      updateInterval: 30000,
    },
    html: UpdateInterval,
  },
  {
    id: 3,
    title: "TvRelativeTime Compact",
    description: "Displays the time in a compact format like '1d', '3w', or '2mo' for minimal layouts.",
    propsData: {
      date: '1993-09-15T00:00:00Z',
      compact: true,
    },
    html: Compact,
  },
  {
    id: 4,
    title: "TvRelativeTime Show Full Date",
    description: "Displays the relative time along with the exact full date as a tooltip or adjacent text.",
    propsData: {
      date: '2027-09-15T01:02:00Z',
      showFullDate: true,
    },
    html: ShowFullDate,
  },
  {
    id: 5,
    title: "TvRelativeTime Español",
    description: "Muestra una fecha pasada en español con `showFullDate` activado.",
    propsData: {
      date: '2022-09-10T12:00:00Z',
      lang: 'es',
      showFullDate: true
    },
    html: Spanish
  },
  {
    id: 6,
    title: "TvRelativeTime Français",
    description: "Affiche une date future en français, avec la date complète visible.",
    propsData: {
      date: '2026-04-25T15:00:00Z',
      lang: 'fr',
      compact: false,
      showFullDate: true
    },
    html: French
  },
  {
    id: 7,
    title: "TvRelativeTime Português",
    description: "Exibe uma data passada em português, no formato compacto com data completa.",
    propsData: {
      date: '2023-01-01T00:00:00Z',
      lang: 'pt',
      compact: true,
      showFullDate: true
    },
    html: Portuguese
  }
];

