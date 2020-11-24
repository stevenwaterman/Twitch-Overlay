<script lang="ts">
  import type { FollowAlert } from "../events/alerts";
  import { currentAlertStore } from "../events/alerts";
  import { afterUpdate } from "svelte";

  export let alert: FollowAlert["payload"];

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

<img src="/assets/follow/image.svg" alt="Follow"/>

<div>
  <p class="line1">{alert.userDisplayName}</p>
  <p class="line2">just followed!</p>
</div>

<audio src="/assets/follow/audio.wav" autoplay />