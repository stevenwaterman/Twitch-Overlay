import React, {useEffect} from "react";
import "./raid.css"
import {useAppDispatch} from "../root/RootStore";
import {clearRaidAction} from "./RaidReducer";
import {play} from "../audio";

type Props = {
    displayName: string;
    viewerCount: number;
    mute: boolean;
}

/**
 * 0-1, more centered if iter increased
 */
function gaussRandom(iter: number): number {
    return new Array(iter).fill(null).map(() => Math.random()).reduce((a, b) => a + b) / iter;
}

const RaidBox: React.FunctionComponent<Props> = ({displayName, viewerCount, mute}: Props) => {
    const goldieCount = Math.min(viewerCount, 1000);
    const goldieLeft: number[] = new Array(goldieCount).fill(null).map(() => -(8 * goldieCount + 1000) * gaussRandom(2));
    const goldieBottom: number[] = new Array(goldieCount).fill(null).map(() => (goldieCount + 50) * (gaussRandom(5) - 0.5) + 50);
    const minGoldieLeft = Math.min(...goldieLeft, 0);
    const maxGoldieLeft = Math.max(...goldieLeft, 0);
    const goldieLeftRange = maxGoldieLeft === minGoldieLeft ? 1 : maxGoldieLeft - minGoldieLeft;
    const duration = (-minGoldieLeft) + 10000;
    const delay = 15000-Math.min(15000, duration);


    play("raidAlert", {volume: mute ? 0 : 0.5})

    const volume = mute ? 0 : (0.1 + 0.9/Math.max(1, goldieCount));


    const dispatch = useAppDispatch();
    useEffect(() => {
        setTimeout(() => {
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
            const meowIdx = Math.floor(Math.random() * 22) + 1;
            play("meows/" + meowIdx as any, {volume: volume, loop: true, detune: 1000 * (gaussRandom(2) - 0.5), start: ((0.5*duration)/1000)*(-(minGoldieLeft - left)/goldieLeftRange)+(0.5*duration/1000)+(delay/1000), duration: 5});

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