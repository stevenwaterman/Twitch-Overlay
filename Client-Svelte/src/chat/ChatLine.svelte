<script lang="ts">
  import { fly } from "svelte/transition";
  import type { ChatBadge, ChatEvent, ChatMessage, TwitchEmote } from "../events/chat";
  import Emote from "./Emote.svelte";
  import Badge from "./Badge.svelte";

  export let event: ChatEvent;
  export let scale: number;

  let chatMessage: ChatMessage;
  $: chatMessage = event.payload;

  let name: string;
  $: name = chatMessage.displayName;

  let customColor: string | null;
  $: customColor = chatMessage.color ? chatMessage.color : null;

  const defaultColors = [
    "#FF0000", 
    "#0000FF",
    "#008000",
    "#B22222",
    "#FF7F50",
    "#9ACD32",
    "#FF4500",
    "#2E8B57",
    "#DAA520",
    "#D2691E",
    "#5F9EA0",
    "#1E90FF",
    "#FF69B4",
    "#8A2BE2",
    "#00FF7F",
  ];

  let defaultColor: string;
  $: defaultColor = defaultColors[name.charCodeAt(0) % 15];

  let color: string;
  $: color = customColor === null ? defaultColor : customColor;

  type TextToken = {
    type: "text";
    startIndex: number;
    endIndex: number;
    content: string;
  };

  type EmoteToken = TwitchEmote & {
    type: "emote";
  };

  type Token = TextToken | EmoteToken;

  let emotes: TwitchEmote[];
  $: emotes = chatMessage.emotes;

  let emoteTokens: EmoteToken[];
  $: emoteTokens = emotes.map(emote => ({
      type: "emote" as const,
      ...emote,
    })).sort((a, b) => a.startIndex - b.endIndex);

  let messageText: string;
  $: messageText = chatMessage.messageText;

  let emoteTextBoundaries: number[];
  $: emoteTextBoundaries = [0, ...emotes.flatMap(emote => [emote.startIndex, emote.endIndex]), messageText.length].sort((a,b) => a - b);

  let nonEmoteBoundaries: [number, number | undefined][];
  $: nonEmoteBoundaries = emoteTextBoundaries.reduce((acc: [number, number | undefined][], elem: number) => {
    const newAcc = acc.slice();
    if(acc.length > 0 && acc[acc.length - 1][1] === undefined) {
      newAcc[newAcc.length - 1][1] = elem;
    } else {
      newAcc.push([elem, undefined]);
    }
    return newAcc;
  }, []);

  let textSlices: [number, number][];
  $: textSlices = nonEmoteBoundaries.filter(pair => pair[1] !== undefined) as [number, number][];

  let textTokens: TextToken[];
  $: textTokens = textSlices.map(([start, end]) => ({
    type: "text",
    startIndex: start,
    endIndex: end,
    content: messageText.slice(start, end)
  }))

  let tokens: Token[];
  $: tokens = [...emoteTokens, ...textTokens].filter(({startIndex, endIndex}) => startIndex !== endIndex).sort((a, b) => a.startIndex - b.startIndex);

  let badges: ChatBadge[];
  $: badges = chatMessage.badges;

  let clientWidth: number;

  let nickStyle: string;
  $: nickStyle = 
    `margin-left: ${0.3 * scale}vw;` +
    `color: ${color};`;

  let messageStyle: string;
  $: messageStyle =
    `border-radius: ${0.3 * scale}vw;` +
    `padding: ${0.3 * scale}vw ${0.3 * scale}vw ${0.2 * scale}vw ${0.4 * scale}vw;` +
    `margin: ${0.2 * scale}vw;`;
</script>

<style>
  .nick {
    margin-left: 0.5vw;
    font-weight: bold;
  }

  .message {
    word-break: break-word;
    word-wrap: break-word;
    color: #9FBBCC;
    background-color: #40494FEE;
    display: inline;
  }
</style>

<div class="message" style={messageStyle} bind:clientWidth transition:fly={{x: clientWidth}}>
  {#each badges as badge (badge.name)}
    <Badge name={badge.name} version={badge.version} scale={scale}/>
  {/each}

  <span class="nick" style={nickStyle}>{name}</span>

  {#each tokens as token (token.startIndex)}
    {#if token.type === "text"}
      {token.content}
    {:else}
      <Emote id={token.id} code={token.code} scale={scale}/>
    {/if}
  {/each}
</div>
