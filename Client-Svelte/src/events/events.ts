import { Alert, currentAlertStore } from "./alerts";
import { ChatMessage, ChatEvent, chatQueue } from "./chat";

export type Event = Alert | ChatEvent;

export function registerEvent(event: Event) {
  if(event.type === "CHAT") {
    chatQueue.addMessage(event);
  } else {
    currentAlertStore.addToQueue(event);
  }
}