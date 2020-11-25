import { Alert, currentAlertStore } from "./alerts";
import { ChatEvent, chatQueue } from "./chat";
import { BadgesEvent, badgeIdStore } from "../chat/badges";

export type Event = Alert | ChatEvent | BadgesEvent;

export function registerEvent(event: Event) {
  if(event.type === "CHAT") {
    chatQueue.addMessage(event);
  } else if (event.type === "BADGES") {
    badgeIdStore.set(event.payload);
  } else {
    currentAlertStore.addToQueue(event);
  }
}