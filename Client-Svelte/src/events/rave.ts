import { writable } from "svelte/store";
import { EventTemplate } from "./alerts";
export type RaveEvent = EventTemplate<"RAVE", boolean>;

export const raveStore = writable(false);