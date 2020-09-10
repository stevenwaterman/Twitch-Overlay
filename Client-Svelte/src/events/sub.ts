export type MessageInfo = {
  userName: string;
  userId: string;
  userDisplayName: string;
  time: Date;
}
export type SubMessage = {
  message: string;
  emotes: SubMessageEmote[];
}
export type SubMessageEmote = {
  start: number;
  end: number;
  id: number;
}
export type SubDetail = {
  context: "sub" | "resub";
  subPlan: "Prime" | "1000" | "2000" | "3000";
  subMessage: SubMessage | null;
  cumulativeMonths: number;
  streakMonths: number;
}
export type SubGiftDetail = {
  context: 'subgift' | 'anonsubgift';
  subPlan: "1000" | "2000" | "3000";
  recipientId: string;
  recipientUserName: string;
  recipientDisplayName: string;
  months: number;
}
export type SubEvent = MessageInfo & (SubDetail | SubGiftDetail);