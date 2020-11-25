import { Alert, currentAlertStore } from "./alerts";
import { ChatEvent, chatQueue } from "./chat";
import { raveStore, RaveEvent } from "./rave";
import { BadgesEvent, badgeIdStore } from "../chat/badges";

export type Event = Alert | ChatEvent | RaveEvent | BadgesEvent;

export function registerEvent(event: Event) {
  if(event.type === "CHAT") {
    chatQueue.addMessage(event);
  } else if (event.type === "RAVE") {
    raveStore.set(event.payload);
  } else if (event.type === "BADGES") {
    badgeIdStore.set(event.payload);
  } else {
    currentAlertStore.addToQueue(event);
  }
}