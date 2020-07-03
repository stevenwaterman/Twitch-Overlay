import React, {useEffect} from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import {clearFollowAction} from "./FollowerReducer";
import {useAppDispatch} from "../root/RootStore";
import "./follow.css";
import {play} from "../audio";

type Props = { user: string; fps: number };

const confettiScale = 10;

const FollowerBox: React.FunctionComponent<Props> = ({user, fps}: Props) => {
    const {width, height} = useWindowSize();
    const dispatch = useAppDispatch();

    let soundDone = false;
    let confettiDone = false;

    useEffect(() => {
        const duration = play("followerAlert", {start: 0.5})
        setTimeout(() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            soundDone = true;
            if(confettiDone) dispatch(clearFollowAction());
        }, duration);
    })

    return <>
        <div className="followerGoldie" style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw"
            }}>
                <div style={{position: "relative", flexGrow: 0, flexShrink: 0}}>
                    <img src="/images/goldie-sign.svg" alt="Goldie!"/>
                    <div style={{
                        position: "absolute",
                        fontFamily: "Minecraft-Regular",
                        fontSize: "22pt",
                        left: 25,
                        top: 40
                    }}>Thanks for following,
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
                        width: 280,
                        height: 120,
                        left: 30,
                        top: 80
                    }}>{user}!
                    </div>
                </div>
            </div>
        </div>


        <Confetti
            style={{
                zIndex: -2,
                width: "100%",
                height: "100%",
            }}
            numberOfPieces={100}
            gravity={10 / fps}
            initialVelocityX={600 / fps}
            initialVelocityY={1200 / fps}
            width={width}
            height={height}
            colors={[
                "#ffcdb2",
                "#ffb4a2",
                "#e5989b",
                "#b5838d"
            ]}
            confettiSource={{
                x: width / 2,
                y: height / 2 - 40,
                w: 0,
                h: 0
            }}
            tweenFunction={(currentTime, currentValue, targetValue) => {
                if (currentTime < 500) return 0;
                if (currentValue < targetValue) return currentValue + (targetValue / 10);
                return 0;
            }}
            drawShape={ctx => {
                ctx.beginPath();
                ctx.arc(-confettiScale, 0, confettiScale, Math.PI, 0, false);
                ctx.arc(confettiScale, 0, confettiScale, Math.PI, 0, false);
                ctx.moveTo(-2 * confettiScale, 0);
                ctx.lineTo(0, 2 * confettiScale);
                ctx.lineTo(2 * confettiScale, 0);
                ctx.fill();
                ctx.closePath();
            }}
            recycle={false}
            onConfettiComplete={() => {
                confettiDone = true;
                if(soundDone) dispatch(clearFollowAction());
            }}
        />
    </>
}

export default FollowerBox;