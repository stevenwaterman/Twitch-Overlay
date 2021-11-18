<script lang="ts">
  import Border from "./components/Border.svelte";
  import Chat from "../chat/Chat.svelte";
  import Arrow from "./components/Arrow.svelte";
  import AlertController from "../alerts/AlertController.svelte";

  export let leftCamera: "priority" | "other" | "hidden" = "priority";
  export let rightCamera: "priority" | "other" | "hidden" = "priority";
</script>

<style>
  .borderContainer {
    width: 16vw;
    height: 12vw;
    position: fixed;
  }
  .rightBorder {
    right: 1vw;
    top: 100px;
  }
</style>

<div class="borderContainer rightBorder">
  <Border topLeft="none" topRight="big" bottomRight="none" bottomLeft="big"/>
</div>
<AlertController />
