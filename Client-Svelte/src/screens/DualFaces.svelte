<script lang="ts">
  import Border from "./components/Border.svelte";
  import Chat from "../chat/Chat.svelte";
  import Twitter from "./components/Twitter.svelte";
</script>

<style>
  .flexContainer {
    position: fixed;
    top: 40vh;
    left: 50vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    transform: translate(-50%, -50%);
  }

  .borderContainer {
    width: 40vw;
    height: 30vw;
  }

  .spacer {
    flex-grow: 0;
    flex-shrink: 0;
    width: 10vw;
  }

  .goldie {
    position: absolute;
    max-width: 30%;
    bottom: 0;
    left: 50%;
    transform: translate(-70%)
  }
</style>

<div class="flexContainer">
  <div class="borderContainer">
    <Border/>
  </div>
  <div class="spacer"/>
  <div class="borderContainer">
    <Border/>
  </div>
</div>

<img class="goldie" src="/assets/screens/goldie.svg" alt="Goldie" />
<Twitter left={100} top={1}/>
<Chat />