<script lang="ts">
  import { badgeIdStore } from "./badges";

  export let name: string;
  export let version: string;

  let index: string;
  $: index = `${name}-${version}`;

  let urls: Record<string, string>;
  $: urls = $badgeIdStore;

  let url: string | undefined;
  $: url = index in urls ? urls[index as keyof typeof urls] : undefined;

  export let scale: number;
  let badgeStyle: string;
  $: badgeStyle =
    `height: ${1.1 * scale}vw;` +
    `width: ${1.1 * scale}vw;` +
    `background-image: url(${url});`
</script>

<style>
  .badge {
    display: inline-block;
    background-position: 0 center;
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: bottom;
    overflow: hidden;
  }
  
</style>

{#if url !== undefined}
    <span class="badge" style={badgeStyle}/>
{/if}