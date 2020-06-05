import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import FollowerBox from "./FollowerBox";
import React from "react";
import {useAppDispatch} from "../root/RootStore";
import {clearFollowAction} from "./FollowerReducer";

type Props = {};
const FollowerContainer: React.FunctionComponent<Props> = () => {
    const user = useSelector((state: RootState) => state.follower.current?.user);
    const dispatch = useAppDispatch();

    if(user == null) return null;

    setTimeout(() => {
        dispatch(clearFollowAction(user));
    }, 5000);

    return <FollowerBox key={user} user={user}/>
}

export default FollowerContainer;