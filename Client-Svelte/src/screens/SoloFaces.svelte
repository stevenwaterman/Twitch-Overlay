<script lang="ts">
  import Border from "./components/Border.svelte";
  import Chat from "../chat/Chat.svelte";
  import RaveContainer from "./components/RaveContainer.svelte";
</script>

<style>
  .borderContainer {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 52vw;
    height: 39vw;
    transform: translate(-50%, -50%);
  }

  .goldie {
    position: absolute;
    max-width: 35%;
    bottom: 0;
    right: 1%;
  }
</style>

<div class="borderContainer">
  <Border/>
</div>
<img class="goldie" src="/assets/screens/goldie.svg" alt="Goldie" />
<RaveContainer/>
<Chat />