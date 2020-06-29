const speech = window.speechSynthesis;
let voice: SpeechSynthesisVoice | null = null;

function loadVoices() {
    console.log("voices changed");
    voice = speech.getVoices().filter(voice => voice.lang === "en-GB")[0];
}
loadVoices();

speech.onvoiceschanged = loadVoices;

export function say(text: string) {
    if(voice === null) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
}
