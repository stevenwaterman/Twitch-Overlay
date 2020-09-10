<script lang="ts">
  import type { RaidAlert } from "../events/alerts";
  import { currentAlertStore } from "../events/alerts";
  import { afterUpdate, onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { linear } from "svelte/easing";
  import type { Writable, Readable } from "svelte/store";
  import { derived } from "svelte/store";

  export let alert: RaidAlert["payload"];

  afterUpdate(() => setTimeout(() => currentAlertStore.clear(), 15 * 1000));
</script>

<style>
  img {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
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

<img src="/assets/raid/leader.svg" alt="Raid"/>

<div>
  <p class="line1">{alert.displayName}</p>
  <p class="line2">just raided!</p>
</div>

<audio src="/assets/raid/audio.wav" autoplay />