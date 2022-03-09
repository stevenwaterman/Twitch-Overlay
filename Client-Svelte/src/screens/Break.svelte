<script lang="ts">
  import Chat from "../chat/Chat.svelte";
  import Twitter from "./components/Twitter.svelte";
  import Border from "./components/Border.svelte";
  import { fly } from "svelte/transition";
  import { quadIn, quadOut } from "svelte/easing";
import AlertController from "../alerts/AlertController.svelte";

  const minSlide: number = 1;
  const maxSlide: number = 131;
  const slides: number[] = Array(maxSlide - minSlide + 1)
    .fill(null)
    .map((_, index) => index + minSlide);

  const slideDurationSeconds: number = 8;

  function randomSlide(): number {
    return Math.round(Math.random() * (maxSlide - minSlide) + minSlide);
  }

  let slide = randomSlide();

  setInterval(() => {
    slide++;
    if (slide > maxSlide) {
      slide = randomSlide();
    }
  }, slideDurationSeconds * 1000);

  let clientWidth: number;
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
    max-height: 30%;
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

  .slideShow {
    position: absolute;
    bottom: 5%;
    top: 40%;
    left: 5%;
    right: 5%;
  }

  .chat {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 40%;
    height: 100%;
    z-index: 10;
  }

  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
  }

  .slideContainer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -5;

    display: flex;
    flex-direction: row;
    justify-content: center;

    overflow: hidden;
  }

  .slide {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    width: auto;
    z-index: -5;
  }
</style>

<div class="container">
  <svg
    class="titleSvg"
    viewBox="-60 -11 120 18"
    preserveAspectRatio="xMidYMid meet">
    <text class="title" dominant-baseline="middle" text-anchor="middle">
      Be Back Soon!
    </text>
  </svg>

  <AlertController/>
  <div class="chat">
    <Chat />
  </div>

  <Twitter left={100} top={1}/>

  <div class="slideShow" bind:clientWidth>
    <Border>
      <img class="background" alt="background" src="/assets/break/bg.svg" />
      {#each slides as slideOption (slideOption)}
        <div class="slideContainer">
          {#if slide === slideOption}
            <img
              class="slide"
              alt="slide"
              in:fly={{ x: clientWidth, delay: 500, duration: 1000, easing: quadOut }}
              out:fly={{ x: -clientWidth || -2000, duration: 1000, easing: quadIn }}
              src={`/assets/break/pics/${slideOption}.bmp`}/>
          {/if}
        </div>
      {/each}
    </Border>
  </div>

  <audio src="/assets/break/audio.wav" autoplay loop/>
</div>
