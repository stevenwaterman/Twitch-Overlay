import React, {useEffect, useState} from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import {clearBitsAction} from "./BitsReducer";
import {useAppDispatch} from "../root/RootStore";
import "./bits.css";
import {play} from "../audio";

type Props = { id: string; user: string; message: string; bits: number; fps: number };

const confettiScale = 20;

const BitsBox: React.FunctionComponent<Props> = ({id, user, bits, message, fps}: Props) => {
    const {width, height} = useWindowSize();
    const dispatch = useAppDispatch();

    let soundDone = false;
    let confettiDone = false;

    const [bitsDisplay, setBitsDisplay] = useState(0);

    useEffect(() => {
        const duration = play("bitsAlert");
        setTimeout(() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            soundDone = true;
            if(confettiDone) dispatch(clearBitsAction());
        }, duration)
    }, [id])

    return <>
        <div className="bitsLogo" style={{
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
                    <img src="/images/bits.svg" alt="Bits!"/>
                    <div style={{
                        position: "absolute",
                        fontFamily: "Minecraft-Regular",
                        fontSize: "22pt",
                        textAlign: "center",
                        width: "100%",
                        top: 250
                    }}>{user} just cheered with
                    </div>
                    <div style={{
                        position: "absolute",
                        fontFamily: "Minecraft-Regular",
                        fontSize: "22pt",
                        textAlign: "center",
                        width: "100%",
                        top: 325
                    }}>{Math.round(bitsDisplay)} {Math.round(bitsDisplay) === 1 ? "bit!" : "bits!"}
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
            numberOfPieces={Math.min(2000, bits)}
            gravity={10 / fps}
            initialVelocityX={600 / fps}
            initialVelocityY={1200 / fps}
            width={width}
            height={height}
            colors={[
                "#7730ef",
                "#a886f6",
                "#c8b7f9",
            ]}
            confettiSource={{
                x: width / 2,
                y: height / 2 - 40,
                w: 0,
                h: 0
            }}
            tweenDuration={8000}
            tweenFunction={(currentTime, currentValue, targetValue) => {
                if (currentTime < 2500) return 0;
                const fraction = (currentTime-2500)/5500;
                setBitsDisplay(fraction * bits);
                return fraction * targetValue;
            }}
            drawShape={ctx => {
                ctx.beginPath();
                ctx.lineTo(confettiScale, -2*confettiScale);
                ctx.lineTo(2*confettiScale, 0);
                ctx.lineTo(confettiScale, confettiScale);
                ctx.lineTo(0,0);
                ctx.fill();
                ctx.closePath();
            }}
            recycle={false}
            onConfettiComplete={() => {
                confettiDone = true;
                if(soundDone) dispatch(clearBitsAction());
            }}
        />
    </>
}

export default BitsBox;