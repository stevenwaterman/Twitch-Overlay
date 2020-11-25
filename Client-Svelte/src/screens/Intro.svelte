<script>
  import AlertController from "../alerts/AlertController.svelte";
import Chat from "../chat/Chat.svelte";
  import Twitter from "./components/Twitter.svelte";
</script>

<style>
  .container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #d9f9a5;
  }

  @font-face {
    font-family: "titleFont";
    src: url("/assets/screens/font.ttf") format("truetype");
  }

  .titleSvg {
    position: absolute;
    transform: translate(-50%);
    top: 10%;
    left: 50%;

    width: 100%;
    height: auto;
    max-height: 40%;
  }

  .title {
    font-family: titleFont;
    fill: #9fbbcc;
    stroke: #40494f;
    stroke-width: 0.7px;
    stroke-linecap: round;
    stroke-linejoin: round;
    paint-order: stroke;
  }

  .goldie {
    position: absolute;
    transform: translateX(-64%);
    left: 50%;

    max-height: 60%;
    max-width: 50%;

    bottom: 0;
    z-index: -1;
  }

  .chat {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
    height: 100%;
  }
</style>

<div class="container">
  <svg
    class="titleSvg"
    viewBox="-60 -11 120 18"
    preserveAspectRatio="xMidYMid meet">
    <text class="title" dominant-baseline="middle" text-anchor="middle">
      Stream Starts Soon!
    </text>
  </svg>
  <img class="goldie" src="/assets/screens/goldie.svg" alt="Goldie" />

  <AlertController />
  <div class="chat">
    <Chat />
  </div>

  <Twitter top={45} left={100}/>
</div>
