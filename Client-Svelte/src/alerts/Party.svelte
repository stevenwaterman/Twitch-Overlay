<script lang="ts">
  import { afterUpdate } from "svelte";
  import { tweened } from "svelte/motion";
  import type { Writable } from "svelte/store";
  import { currentAlertStore } from "../events/alerts";
  import { fade } from "svelte/transition";

  let hue: Writable<number> = tweened(0, {duration: 1000});

  afterUpdate(() => setTimeout(() => currentAlertStore.clear(), 42 * 1000));

  setInterval(() => {
    hue.set(Math.random() * 360);
  }, 1000)
</script>

<style>
  .party {
    opacity: 0.3;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<div class="party" style={`background-color: hsl(${$hue}, 100%, 50%)`} transition:fade/>
<audio src="/assets/party/audio.wav" autoplay />