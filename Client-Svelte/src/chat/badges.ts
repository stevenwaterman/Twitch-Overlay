import { writable, Writable } from "svelte/store";
import { EventTemplate } from "../events/alerts";

export const badgeIdStore: Writable<Record<string, string>> = writable({});

export type BadgesEvent = EventTemplate<"BADGES", Record<string, string>>;