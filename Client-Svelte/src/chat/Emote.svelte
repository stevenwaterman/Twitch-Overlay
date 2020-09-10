<script lang="ts">
  export let id: string;
  export let code: string;

  export let scale: number;
  let emoteStyle: string;
  $: emoteStyle = `height: ${1.1 * scale}vw;` 

</script>

<style>
  .emote {
    display: inline-block;
    width: auto;
    display: inline-block;
    vertical-align: middle;
  }
</style>
 
<img class="emote" alt={id} style={emoteStyle}
  src={`https://static-cdn.jtvnw.net/emoticons/v1/${id}/4.0`}
  srcSet={`https://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0 4x`}
/>