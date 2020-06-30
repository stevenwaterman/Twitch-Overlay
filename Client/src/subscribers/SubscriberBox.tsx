import React, {useEffect} from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import {ChatMessage, clearSubscribeAction} from "./SubscriberReducer";
import {useAppDispatch} from "../root/RootStore";
import "./subscribe.css";
import Sound from "react-sound";
import {say} from "../tts";

type Props = { user: string; message: ChatMessage | null ; fps: number };

const confettiScale = 20;

const SubscriberBox: React.FunctionComponent<Props> = ({user, message, fps}: Props) => {
    const {width, height} = useWindowSize();
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            if(message !== null) {
                say(message.message)
            }
        }, 11000)
    }, [message])

    return <>
        <Sound playFromPosition={-500} playStatus="PLAYING" url="/sounds/subscriberAlert.wav" onFinishedPlaying={() => {
            dispatch(clearSubscribeAction(user));
        }
        }/>
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
                        fontFamily: "Minecraft-Regular",
                        fontSize: "20pt",
                        left: 5,
                        top: 90
                    }}>Thanks for subscribing,
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
                        top: 130
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
            className="subscriberConfetti"
            numberOfPieces={150}
            gravity={5 / fps}
            initialVelocityX={600 / fps}
            initialVelocityY={1200 / fps}
            width={width}
            height={height}
            tweenFunction={((currentTime, currentValue, targetValue) => {
                console.log(currentTime);
                return currentTime < 1000 ? 0 : Math.min(currentValue + 5, targetValue)
            })}
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

export default SubscriberBox;