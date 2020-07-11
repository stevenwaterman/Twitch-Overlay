import React, {useEffect} from "react";
import {clearHostAction} from "./HostReducer";
import {useAppDispatch} from "../root/RootStore";
import "./host.css";
import {play} from "../audio";

type Props = { user: string };

const HostBox: React.FunctionComponent<Props> = ({user}: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const duration = play("hostAlert", {start: 0.5})
        setTimeout(() => {
            dispatch(clearHostAction());
        }, duration);
    })

    return <>
        <div className="hostGoldie" style={{
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
                    <img src="/images/goldie-tv.svg" alt="Goldie!" width={800}/>
                    <div style={{
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                        wordWrap: "break-word",
                        fontFamily: "Minecraft-Regular",
                        fontSize: "28pt",
                        width: 240,
                        height: 120,
                        left: 440,
                        top: 170
                    }}>{user}
                    </div>
                    <div style={{
                        position: "absolute",
                        fontFamily: "Minecraft-Regular",
                        fontSize: "22pt",
                        left: 450,
                        top: 320
                    }}>is now hosting!
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default HostBox;