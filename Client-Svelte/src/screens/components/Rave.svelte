<script lang="ts">
import { tweened } from "svelte/motion";
import type { Writable } from "svelte/store";


  let hue: Writable<number> = tweened(0, {duration: 1000});

  setInterval(() => {
    hue.set(Math.random() * 360);
  }, 1000)
</script>

<style>
  .rave {
    opacity: 0.2;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<div class="rave" style={`background-color: hsl(${$hue}, 100%, 50%)`}>

</div>