<script lang="ts">
  export let top: number = 0;
  export let left: number = 0;

  let topBottomString: string;
  $: topBottomString = top > 50 ? `bottom:${100-top}vh` : `top:${top}vh`;

  let leftRightString: string;
  $: leftRightString = left > 50 ? `right:${100-left}vw` : `left:${left}vw`;

  let positionString: string;
  $:positionString = `${topBottomString};${leftRightString};`;
</script>

<style>
  .twitter {
    display: flex;
    flex-direction: row;
    align-items: center;

    position: fixed;
  }

  .twitterLogo {
    height: 20vh;
    max-width: 20vw;
    margin: -3vw;
  }

  .twitterSvg {
    width: 30vw;
    height: auto;
  }

  .twitterText {
    font-family: titleFont;
    fill: #9fbbcc;
    stroke: #40494f;
    stroke-width: 0.7px;
    stroke-linecap: round;
    stroke-linejoin: round;
    paint-order: stroke;
  }

  @font-face {
    font-family: "titleFont";
    src: url("/assets/screens/font.ttf") format("truetype");
  }
</style>

<div class="twitter" style={positionString}>
  <img class="twitterLogo" src="/assets/screens/twitter.svg" alt="Goldie" />
  <svg
    class="twitterSvg"
    viewBox="-42 -11 84 18"
    preserveAspectRatio="xMidYMid meet">
    <!-- <rect x="-42" y="-11" width="84" height="17" fill="red"/> -->
    <text class="twitterText" dominant-baseline="middle" text-anchor="middle">
      @HeyArtie_
    </text>
  </svg>
</div>
