const paths = [
    "bitsAlert",
    "followerAlert",
    "raidAlert",
    "subscriberAlert",
    "meows/1",
    "meows/2",
    "meows/3",
    "meows/4",
    "meows/5",
    "meows/6",
    "meows/7",
    "meows/8",
    "meows/9",
    "meows/10",
    "meows/11",
    "meows/11",
    "meows/12",
    "meows/13",
    "meows/14",
    "meows/15",
    "meows/16",
    "meows/17",
    "meows/18",
    "meows/19",
    "meows/20",
    "meows/21",
    "meows/22"
] as const;
type AudioPath = (typeof paths)[number];

const buffers: Record<AudioPath, AudioBuffer> = {} as any;
const ctx = new AudioContext()
paths.forEach(path => {
    fetch("/sounds/" + path + ".wav").then(res => res.arrayBuffer()).then(res => ctx.decodeAudioData(res)).then(res => buffers[path] = res);
})

export function play(sound: AudioPath, {start, offset, duration, volume, loop, detune}: { start?: number, offset?: number, duration?: number, volume?: number, loop?: boolean, detune?: number } = {}): number {
    const buffer = buffers[sound];
    if (!buffer) return -1;

    const sourceNode: AudioBufferSourceNode = ctx.createBufferSource();
    sourceNode.loop = loop || false;
    if (detune !== undefined) {
        sourceNode.detune.value = detune;
    }
    sourceNode.buffer = buffer;
    if (volume === undefined) {
        sourceNode.connect(ctx.destination);
    } else {
        const gainNode = ctx.createGain();
        gainNode.gain.value = volume;
        sourceNode.connect(gainNode);
        gainNode.connect(ctx.destination);
    }
    sourceNode.start(start === undefined ? undefined : start + ctx.currentTime, offset, duration);
    if (duration !== undefined) {
        sourceNode.stop((start === undefined ? ctx.currentTime : start) + duration);
    }
    if (loop) return duration || 1 * 1000 * 1000 * 1000;
    return (buffer.duration + (start || 0) - (offset || 0)) * 1000;
}