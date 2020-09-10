<script lang="ts">
  import type { BitsAlert } from "../events/alerts";
  import { currentAlertStore } from "../events/alerts";
  import { afterUpdate, onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { linear } from "svelte/easing";
  import type { Writable, Readable } from "svelte/store";
  import { derived } from "svelte/store";

  export let alert: BitsAlert["payload"];

  afterUpdate(() => setTimeout(() => currentAlertStore.clear(), 15 * 1000));

  const bitsCount: Writable<number> = tweened(0, {duration: 11 * 1000, easing: linear});

  onMount(() => {
    bitsCount.set(alert.bits);
  })

  const bitsDisplay: Readable<number> = derived(bitsCount, (value) => Math.round(value))
</script>

<style>
  img {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  audio {
    display: 0;
  }

  .line1 {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 80px));
  }

  .line2 {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 150px));
  }
</style>

<img src="/assets/bits/image.svg" alt="Bits"/>

<div>
  <p class="line1">{alert.userName} just cheered</p>
  <p class="line2">{$bitsDisplay} {$bitsDisplay === 1 ? "bit" : "bits"}!</p>
</div>

<audio src="/assets/bits/audio.wav" autoplay />
