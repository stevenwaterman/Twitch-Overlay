<script lang="ts">
  import Border from "./components/Border.svelte";
  import Chat from "../chat/Chat.svelte";
  import Arrow from "./components/Arrow.svelte";

  export let leftCamera: "priority" | "other" | "hidden" = "priority";
  export let rightCamera: "priority" | "other" | "hidden" = "priority";
</script>

<style>
  .borderContainer {
    width: 16vw;
    height: 12vw;
    top: 0.5vw;
    position: fixed;
  }

  .leftBorder {
    left: 1vw;
  }

  .rightBorder {
    right: 1vw;
  }

  .arrowContainer {
    width: 6vw;
    height: 6vw;
    top: -1vw;
    position: fixed;
  }

  .leftArrow {
    left: 15vw;
  }

  .rightArrow {
    right: 15vw;
  }
</style>

{#if leftCamera !== "hidden"}
  <div class="borderContainer leftBorder">
    <Border topLeft="big" topRight="none" bottomRight="big" bottomLeft="none"/>
  </div>
{/if}

{#if leftCamera === "priority"}
  <div class="arrowContainer leftArrow">
    <Arrow rotateDeg={225} flipX/>
  </div>
{/if}

{#if rightCamera !== "hidden"}
  <div class="borderContainer rightBorder">
    <Border topLeft="none" topRight="big" bottomRight="none" bottomLeft="big"/>
  </div>
{/if}

{#if rightCamera === "priority"}
  <div class="arrowContainer rightArrow">
    <Arrow rotateDeg={225}/>
  </div>
{/if}
<Chat />