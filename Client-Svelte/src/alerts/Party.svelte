<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import type { Writable } from "svelte/store";
  import { currentAlertStore } from "../events/alerts";
  import { hsluvToHex } from "hsluv";

  let hue: Writable<number> = tweened(0, {duration: 37 * 1000});
  let opacity: Writable<number> = tweened(0, {duration: 1000});
  let hex: string;
  $: hex = hsluvToHex([$hue % 360, 80, 50]);

  onMount(() => {
    opacity.set(30);
    hue.set(360 * 10);
    setTimeout(() => currentAlertStore.clear(), 22 * 1000);
    setTimeout(() => {opacity.set(0)}, 20 * 1000);
  });
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

<div class="party" style={`background-color: ${hex}; opacity: ${$opacity}%;`}/>
<audio src="/assets/party/audio.wav" autoplay />