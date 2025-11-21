import type { App, Plugin } from 'vue'
import _TvRelativeTime from './components/TvRelativeTime.vue'

const TvRelativeTime = _TvRelativeTime as typeof _TvRelativeTime & Plugin;
TvRelativeTime.install = (app: App) => {
  app.component('TvRelativeTime', TvRelativeTime)
};

export { TvRelativeTime }

export const TvRelativeTimePlugin: Plugin = {
  install: TvRelativeTime.install
};
export default TvRelativeTime;

declare module 'vue' {
  export interface GlobalComponents {
    TvRelativeTime: typeof TvRelativeTime;
  }
}
