<script lang="ts">
  import Border from "./components/Border.svelte";
  import Chat from "../chat/Chat.svelte";
  import Arrow from "./components/Arrow.svelte";
  import RaveContainer from "./components/RaveContainer.svelte";

  export let mainCamera: "shown" | "hidden" = "shown";
  export let secondaryCamera: "shown" | "hidden" = "shown";
  export let flipX: boolean = false;
</script>

<style>
  .borderContainer {
    width: 16vw;
    height: 12vw;
    top: 0.5vw;
    position: fixed;
  }

  .mainBorder {
    left: 1vw;
  }

  .secondaryBorder {
    right: 35vw;
  }

  .arrowContainer {
    width: 4vw;
    height: 4vw;
    position: fixed;
  }

  .mainArrow {
    top: 11vw;
    left: 1vw;
  }

  .secondaryArrow {
    top: 0.5vw;
    right: 32.5vw;
  }

  .container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .flipX {
    transform: scaleX(-1);
  }
</style>

<div class="container" class:flipX>
  {#if mainCamera === "shown"}
    <div class="borderContainer mainBorder">
      <Border topLeft="big" topRight="none" bottomRight="big" bottomLeft="none"/>
    </div>
    <div class="arrowContainer mainArrow">
      <Arrow rotateDeg={180}/>
    </div>
  {/if}

  {#if secondaryCamera === "shown"}
    <div class="borderContainer secondaryBorder">
      <Border topLeft="none" topRight="big" bottomRight="none" bottomLeft="big"/>
    </div>

    <div class="arrowContainer secondaryArrow">
      <Arrow rotateDeg={270} flipX/>
    </div>
  {/if}
</div>
<RaveContainer/>
<Chat />