<script lang="ts">
  export let rotateDeg: number = 0;
  export let flipX: boolean = false;

  let arrowStyle: any;
  $: arrowStyle = `transform: scaleX(${flipX ? -1 : 1}) rotate(${rotateDeg}deg);`;

</script>

<style>
  svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  path {
    stroke:#40494f;
    stroke-width:1.5;
    stroke-linecap:round;
    stroke-linejoin:round;
    fill: url(#linear);
  }
</style>

<svg viewBox="40 60 60 60" style={arrowStyle}>
   <defs>
    <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#9FBBCC"/>
      <stop offset="50%" stop-color="#F4FEC1"/>
      <stop offset="100%" stop-color="#9FBBCC"/>
    </linearGradient>
  </defs>
    <!-- <rect x={40} y={60} width={60} height={60} fill="black"/> -->
    <path class="arrow" d="m 45.97943,108.60923 c 24.828858,-7.27755 26.011495,-23.122265 26.011495,-23.122265 0,0 -10.507837,1.2654 -10.696635,-1.19146 -0.188794,-2.456859 14.042164,-19.177165 16.687966,-18.798982 2.645805,0.378183 15.172346,16.333359 14.831981,18.714584 -0.340364,2.381223 -10.910894,1.342779 -10.910894,1.342779 0,0 -1.805945,21.714984 -32.783496,29.603444 z"/>
</svg>
