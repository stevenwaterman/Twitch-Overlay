import { writable, Readable, derived } from "svelte/store";
import { EventTemplate } from "./alerts";

export type ChatBadge = {
  name: string;
  version: string;
}

export type TwitchEmote = {
  id: string;
  startIndex: number;
  endIndex: number;
  code: string;
}

export type ChatMessage = {
  messageText: string;
  senderUsername: string;
  senderUserID: string;
  badges: Array<ChatBadge>;
  bits: number | undefined;
  color: string | undefined;
  displayName: string;
  emotes: Array<TwitchEmote>;
  isMod: boolean;
};

export type ChatEvent = EventTemplate<"CHAT", ChatMessage>;

type ChatQueue = ChatEvent[];
const {update, subscribe} = writable<ChatQueue>([]);

export const chatQueue: Readable<ChatQueue> & {
  addMessage: (chatEvent: ChatEvent) => void,
  clearMessage: (id: ChatEvent["id"]) => void
} = {
  subscribe,
  addMessage: (chatEvent: ChatEvent) => {
    onNewMessage(chatEvent);
    update(oldState => [...oldState, chatEvent])
  },
  clearMessage: (id: ChatEvent["id"]) => {
    update(oldState => oldState.filter(message => message.id !== id))  
  }
}

const messageDurationSec = 10;
function onNewMessage(chatEvent: ChatEvent) {
  setTimeout(() => {
    chatQueue.clearMessage(chatEvent.id);
  }, messageDurationSec * 1000)
}

export const chatDisplayQueue: Readable<ChatQueue> = derived(chatQueue, queue => queue.filter(({payload}) => {
  if (payload.messageText.startsWith("!")) return false;
  if (payload.displayName.toLowerCase() === "nightbot") return false;
  if (payload.messageText.split(" ").length === 1 && (
    payload.messageText.startsWith("www.") || payload.messageText.startsWith("http")
  )) return false;
  return true;
}))