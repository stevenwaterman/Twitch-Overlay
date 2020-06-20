import React from "react";

type Props = {
    id: string;
}
const Emote: React.FunctionComponent<Props> = ({id}: Props) => {
    return <img
        className="emote"
        src={`https://static-cdn.jtvnw.net/emoticons/v1/${id}/4.0`}
        srcSet={`https://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0 4x`}/>
}

export default Emote;