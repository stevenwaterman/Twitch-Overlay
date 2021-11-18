<script lang="ts">
  import Border from "./components/Border.svelte";
  import AlertController from "../alerts/AlertController.svelte";
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
