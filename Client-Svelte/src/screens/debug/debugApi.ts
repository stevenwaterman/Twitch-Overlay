export async function debugFollowRequest() {
  return debugRequest("follow");
}

export async function debugChatRequest() {
  return debugRequest("chat");
}

export async function debugHostRequest() {
  return debugRequest("host");
}

export async function debugRaidRequest() {
  return debugRequest("raid");
}

export async function debugSubRequest() {
  return debugRequest("sub");
}

export async function debugGiftSubRequest() {
  return debugRequest("giftsub");
}

export async function debugBitsRequest() {
  return debugRequest("bits");
}

export async function debugPartyRequest() {
  return debugRequest("party");
}

async function debugRequest(path: string) {
  return fetch(`http://__SERVER__/debug/${path}`, {
    method: "POST",
    mode: "no-cors"
  });
}