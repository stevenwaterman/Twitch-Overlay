import React from "react";
import Confetti from "react-confetti";

type Props = {user: string};

const FollowerBox: React.FunctionComponent<Props> = ({user}: Props) => {
    return <div>
        <img src="/goldie.png" alt="Goldie!" style={{
            position: "fixed",
        }}/>
        <div style={{
            position: "fixed",
            fontFamily: "Minecraft-Regular",
            fontSize: "22pt",
            left: 25,
            top: 40
        }}>Thanks for following,
        </div>
        <div style={{
            position: "fixed",
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
        <div
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 750,
                height: 500,
                zIndex: -2
            }}>
            <Confetti
                style={{
                    zIndex: -2,
                    width: 750,
                    height: 500,
                }}
                numberOfPieces={30}
                gravity={0.3}
                initialVelocityY={-10}
                colors={[
                    "#ffcdb2",
                    "#ffb4a2",
                    "#e5989b",
                    "#b5838d"
                ]}
                drawShape={ctx => {
                    ctx.beginPath();
                    ctx.arc(0, 0, 20, Math.PI, 0, false);
                    ctx.arc(40, 0, 20, Math.PI, 0, false);
                    ctx.moveTo(60, 0);
                    ctx.lineTo(20, 40);
                    ctx.lineTo(-20, 0);
                    ctx.fill();
                    ctx.closePath();
                }}
                recycle={false}
            />
        </div>
    </div>
}

export default FollowerBox;