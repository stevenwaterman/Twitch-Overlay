<script lang="ts">
  import { chatDisplayQueue } from "../events/chat";
  import ChatLine from "./ChatLine.svelte";

  export let scale: number = 1.5;
  export let maxWidth: number = 100;
  let chatBoxStyle: string;
  $: chatBoxStyle = 
    `font-size: ${scale}vw;` +
    `line-height: ${1.1 * scale}vw;` +
    `max-width: ${maxWidth}vw;`;
</script>

<style>
  .chatBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    transform-origin: bottom right;
    position: absolute;
    bottom: 0;
    right: 0;

    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    overflow: hidden;
  }
</style>

<div class="chatBox" style={chatBoxStyle}>
  {#each $chatDisplayQueue as chatEvent (chatEvent.id)}
    <ChatLine event={chatEvent} scale={scale}/>
  {/each}
</div>
