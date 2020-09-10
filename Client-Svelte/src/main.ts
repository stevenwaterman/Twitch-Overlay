// @ts-ignore
import App from './App.svelte';
import * as listener from './events/listener';

listener.initialise()

export default new App({
  target: document.body,
  props: {
    title: "Awesome Slider Demo",
    hydrate: true
  }
});
