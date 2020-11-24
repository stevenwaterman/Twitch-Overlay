<script lang="ts">
  import type { HostAlert } from "../events/alerts";
  import { currentAlertStore } from "../events/alerts";
  import { afterUpdate } from "svelte";

  export let alert: HostAlert["payload"];

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

<img src="/assets/host/image.svg" alt="Host"/>

<div>
  <p class="line1">{alert.channel}</p>
  <p class="line2">is now hosting!</p>
</div>

<audio src="/assets/host/audio.wav" autoplay />