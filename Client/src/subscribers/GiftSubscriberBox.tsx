import React, {useEffect} from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import {clearSubscribeAction} from "./SubscriberReducer";
import {useAppDispatch} from "../root/RootStore";
import "./subscribe.css";
import {play} from "../audio";

type Props = { giver: string; recipient: string; fps: number };

const confettiScale = 20;

const GiftSubscriberBox: React.FunctionComponent<Props> = ({giver, recipient, fps}: Props) => {
    const {width, height} = useWindowSize();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const duration = play("subscriberAlert", {start: 0.5});
        setTimeout(() => {
            dispatch(clearSubscribeAction());
        }, duration);
    })

    return <>
        <div className="subscriberGoldie" style={{
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
                    <img src="/images/goldie-crown-sign.svg" alt="Goldie!"/>
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
                        left: 30,
                        top: 90
                    }}>{giver}
                    </div>
                    <div style={{
                        position: "absolute",
                        fontFamily: "Minecraft-Regular",
                        fontSize: "20pt",
                        left: 85,
                        top: 145
                    }}>Gifted a sub
                    </div>
                    <div style={{
                        position: "absolute",
                        fontFamily: "Minecraft-Regular",
                        fontSize: "20pt",
                        left: 150,
                        top: 180
                    }}>to
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
                        left: 30,
                        top: 210
                    }}>{recipient}!
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
            className="subscriberConfetti"
            numberOfPieces={150}
            gravity={5 / fps}
            initialVelocityX={600 / fps}
            initialVelocityY={1200 / fps}
            width={width}
            height={height}
            tweenFunction={(currentTime, currentValue, targetValue) => currentTime < 1000 ? 0 : Math.min(currentValue + 5, targetValue)}
            confettiSource={{
                x: width / 2,
                y: height / 2 - 40,
                w: 0,
                h: 0
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
            recycle={true}
        />
    </>
}

export default GiftSubscriberBox;