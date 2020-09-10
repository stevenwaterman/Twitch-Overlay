<script lang="ts">
  import BigBorderCorner from "./BigBorderCorner.svelte";
  import SmallBorderCorner from "./SmallBorderCorner.svelte";

  export let topLeft: "none" | "small" | "big" = "big";
  export let topRight: "none" | "small" | "big" = "small";
  export let bottomRight: "none" | "small" | "big" = "big";
  export let bottomLeft: "none" | "small" | "big" = "small";

  let clientHeight: number;
  let clientWidth: number;

  let widthInset: number;
  $: widthInset = clientWidth / 50;

  let heightInset: number;
  $: heightInset = clientHeight / 50;

  let inset: number;
  $: inset = Math.min(widthInset, heightInset);

  const dashOutset = 6;
</script>

<style>
  .outerDash {
    z-index: -4;
    stroke: #9FBBCC;
    stroke-width: 1.5px;
    stroke-dasharray: 2 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }
  .borderBG {
    z-index: -3;
    stroke: #40494F;
    stroke-width: 7.5px;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }
  .gradientBorder {
    z-index: -2;
    stroke-width: 4px;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }
  .innerDash {
    z-index: -1;
    stroke: #40494F;
    stroke-width: 1.5px;
    stroke-dasharray: 2 5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    opacity: 0.75;
  }
  .container {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .border {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .content {
    position: absolute;
    z-index: -5;
  }
</style>

<div class="container" bind:clientHeight bind:clientWidth>
  <div class="content" style={`top: ${inset}px; right: ${inset}px; bottom: ${inset}px; left: ${inset}px;`}>
    <slot/>
  </div>

  <svg viewBox={`0 0 ${clientWidth} ${clientHeight}`} class="border">
    <defs>
      <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#9FBBCC"/>
        <stop offset="50%" stop-color="#F4FEC1"/>
        <stop offset="100%" stop-color="#9FBBCC"/>
      </linearGradient>
    </defs>
    <rect x={inset - dashOutset} y={inset - dashOutset} width={clientWidth - (inset - dashOutset) * 2} height={clientHeight - (inset - dashOutset) * 2} class="outerDash"/>
    <rect x={inset} y={inset} width={clientWidth - inset * 2} height={clientHeight - inset * 2} class="borderBG"/>
    <rect x={inset} y={inset} width={clientWidth - inset * 2} height={clientHeight - inset * 2} class="gradientBorder" stroke="url(#linear)"/>
    <rect x={inset} y={inset} width={clientWidth - inset * 2} height={clientHeight - inset * 2} class="innerDash"/>
  </svg>
  
  {#if topLeft === "big"}
    <BigBorderCorner maxWidth={40} maxHeight={60} corner="topLeft" rotateDeg={180}/>
  {:else if topLeft === "small"}
    <SmallBorderCorner maxWidth={55} maxHeight={35} corner="topLeft"/>
  {/if}

  {#if topRight === "big"}
    <BigBorderCorner maxWidth={40} maxHeight={60} corner="topRight" rotateDeg={180} flipX/>
  {:else if topRight === "small"}
    <SmallBorderCorner maxWidth={55} maxHeight={35} corner="topRight"/>
  {/if}

  {#if bottomRight === "big"}
    <BigBorderCorner maxWidth={40} maxHeight={60} corner="bottomRight"/>
  {:else if bottomRight === "small"}
    <SmallBorderCorner maxWidth={55} maxHeight={35} corner="bottomRight"/>
  {/if}

  {#if bottomLeft === "big"}
    <BigBorderCorner maxWidth={40} maxHeight={60} corner="bottomLeft" flipX/>
  {:else if bottomLeft === "small"}
    <SmallBorderCorner maxWidth={55} maxHeight={35} corner="bottomLeft"/>
  {/if}  
</div>

