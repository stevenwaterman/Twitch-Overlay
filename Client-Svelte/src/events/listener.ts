import { WebSocketClient } from "./ws";
import { Alert, currentAlertStore } from "./alerts";
import { Event, registerEvent } from "./events";

export function initialise() {
  const websocket = new WebSocketClient(`__SERVER__/events`);

  let id = 0;
  websocket.onMessage = message => {
    const event: Event = JSON.parse(message.data);
    event.id = id++;
    registerEvent(event);
  }
}