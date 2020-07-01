import React, {useEffect} from "react";
import "./raid.css"
import {useAppDispatch} from "../root/RootStore";
import {clearRaidAction} from "./RaidReducer";

type Props = {
    displayName: string;
    viewerCount: number;
}

const ctx = new AudioContext();
const volume = ctx.createGain();
volume.connect(ctx.destination);
const warVolume = ctx.createGain();
warVolume.gain.value = 0.5;
warVolume.connect(ctx.destination);

const meowBuffers: AudioBuffer[] = [];
new Array(22).fill(null).forEach(async (_, idx) => {
    const arrayBuffer = await fetch(`/meows/${idx + 1}.wav`).then(res => res.arrayBuffer())
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    meowBuffers.push(audioBuffer);
});

let warBuffer: AudioBuffer | null = null;
fetch("/sounds/raidAlert.wav").then(res => res.arrayBuffer()).then(res => ctx.decodeAudioData(res)).then(res => warBuffer = res);

/**
 * 0-1, more centered if iter increased
 */
function gaussRandom(iter: number): number {
    return new Array(iter).fill(null).map(() => Math.random()).reduce((a, b) => a + b) / iter;
}

const RaidBox: React.FunctionComponent<Props> = ({displayName, viewerCount}: Props) => {
    const goldieCount = Math.max(viewerCount, 1000);
    const goldieLeft: number[] = new Array(goldieCount).fill(null).map(() => -(8 * goldieCount + 1000) * gaussRandom(2));
    const goldieBottom: number[] = new Array(goldieCount).fill(null).map(() => (goldieCount + 50) * (gaussRandom(5) - 0.5) + 50);
    const minGoldieLeft = Math.min(...goldieLeft, 0);
    const maxGoldieLeft = Math.max(...goldieLeft, 0);
    const goldieLeftRange = maxGoldieLeft === minGoldieLeft ? 1 : maxGoldieLeft - minGoldieLeft;
    const duration = (-minGoldieLeft) + 10000;
    const delay = 15000-Math.min(15000, duration);

    const warSource = ctx.createBufferSource();
    warSource.buffer = warBuffer;
    warSource.connect(warVolume);
    warSource.start(ctx.currentTime);

    volume.gain.value = 0.1 + 0.9/Math.max(1, goldieCount);

    const sources: AudioBufferSourceNode[] = new Array(goldieCount).fill(null).map(() => {
        const source = ctx.createBufferSource();
        const meowIdx = Math.floor(Math.random() * meowBuffers.length);
        source.buffer = meowBuffers[meowIdx];
        source.loop = true;
        source.detune.value = 1000 * (gaussRandom(2) - 0.5);
        source.connect(volume);
        return source;
    })

    const dispatch = useAppDispatch();
    useEffect(() => {
        setTimeout(() => {
            console.log("clearing");
            dispatch(clearRaidAction());
        }, duration + delay)
    }, [displayName, duration, dispatch, delay])

    return <div className="raidGoldie" style={{
        position: "absolute",
        transform: `translateX(calc(100vw + ${-minGoldieLeft}px))`,
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        top: "calc(50vh - 250px)"
    }}>
        {new Array(goldieCount).fill(null).map((_, idx) => {
            const left = goldieLeft[idx];
            const source = sources[idx];
            const startAt = ((0.5*duration)/1000)*(-(minGoldieLeft - left)/goldieLeftRange)+(0.5*duration/1000)+(delay/1000);
            source.start(ctx.currentTime + startAt);
            source.stop(ctx.currentTime + startAt + 5);

            return <img className="smallGoldie" key={idx} style={{
                position: "absolute",
                objectFit: "contain",
                height: 120,
                width: 120,
                left: goldieLeft[idx],
                bottom: goldieBottom[idx],
                animationDelay: `${Math.random() * 3000}ms`,
                animationDuration: `${1000 + Math.random() * 1000}ms`,
            }} src="/images/goldie-nosign.svg" alt="Goldie!"/>
        })}
        <div style={{
            position: "relative"
        }}>
            <img src="/images/goldie-sign.svg" alt="Goldie!"/>
            <div style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                wordWrap: "break-word",
                fontFamily: "Minecraft-Regular",
                fontSize: "28pt",
                width: 340,
                left: 0,
                top: 20
            }}>{displayName}</div>
            {viewerCount === 0 ? <div style={{
                position: "absolute",
                fontFamily: "Minecraft-Regular",
                fontSize: "22pt",
                left: 65,
                top: 70
            }}>is raiding alone
            </div> : <>
                <div style={{
                    position: "absolute",
                    fontFamily: "Minecraft-Regular",
                    fontSize: "22pt",
                    left: 70,
                    top: 70
                }}>is raiding with
                </div>
                <div style={{
                    position: "absolute",
                    fontFamily: "Minecraft-Regular",
                    fontSize: "22pt",
                    left: 82,
                    top: 100
                }}>an army of
                </div>
                <div style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    wordWrap: "break-word",
                    fontFamily: "Minecraft-Regular",
                    fontSize: "28pt",
                    width: 340,
                    left: 0,
                    top: 140
                }}>{viewerCount}!
                </div>
            </>}
        </div>
    </div>
}

export default RaidBox;