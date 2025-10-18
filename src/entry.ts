import TvRelativeTime from './components/TvRelativeTime.vue'

(TvRelativeTime as any).install = (app: any) => {
  app.component('TvRelativeTime', TvRelativeTime)
};

export const TvRelativeTimePlugin = {
  install(app: any) {
    app.component('TvRelativeTime', TvRelativeTime)
  }
}

export { TvRelativeTime }
export default TvRelativeTime
