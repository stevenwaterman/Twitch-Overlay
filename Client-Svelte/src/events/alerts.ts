import { Readable, writable, derived, Writable } from "svelte/store"
import { SubEvent } from "./sub";

export type EventTemplate<TYPE extends string, PAYLOAD> = {
  id: number,
  type: TYPE,
  payload: PAYLOAD
}

export type BitsAlert = EventTemplate<"BITS", {
    bits: number,
    message: string,
    userName: string
  }>;

export type FollowAlert = EventTemplate<"FOLLOW", {
  userDisplayName: string
}>;

export type HostAlert = EventTemplate<"HOST", {
  channel: string,
  auto: boolean
}>;

export type RaidAlert = EventTemplate<"RAID", {
  displayName: string,
  viewerCount: number
}>;

export type PartyAlert = EventTemplate<"PARTY", {}>;

export type SubscribeAlert = EventTemplate<"SUBSCRIBE", SubEvent>;

export type Alert = BitsAlert | FollowAlert | HostAlert | RaidAlert | SubscribeAlert | PartyAlert;

type AlertQueue = Alert[];

const alertQueueStore: Writable<AlertQueue> = writable([]);
const partyAlertStore: Readable<AlertQueue> = derived(alertQueueStore, alerts => alerts.filter(alert => alert.type === "PARTY"));

const currentAlertInner = derived(partyAlertStore, (alertQueue) => {
  if (alertQueue.length === 0) return null;
  return alertQueue[0];
});

export const currentAlertStore: Readable<Alert | null> & {
  clear: () => void,
  addToQueue: (alert: Alert) => void
} = {
  ...currentAlertInner,
  clear: () => {
    alertQueueStore.update((state) => {
      return state.slice(1)
    })
  },
  addToQueue: (alert: Alert) => {
    alertQueueStore.update((state) => {
      return [...state, alert]
    })
  }
}