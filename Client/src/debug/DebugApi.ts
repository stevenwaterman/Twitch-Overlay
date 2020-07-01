import axios from "axios";

export async function debugFollowRequest() {
    return axios.post(`http://${process.env.REACT_APP_SERVER_IP}/debug/follow`)
}

export async function debugChatRequest() {
    return axios.post(`http://${process.env.REACT_APP_SERVER_IP}/debug/chat`);
}

export async function debugRaidRequest() {
    return axios.post(`http://${process.env.REACT_APP_SERVER_IP}/debug/raid`);
}

export async function debugSubRequest() {
    return axios.post(`http://${process.env.REACT_APP_SERVER_IP}/debug/sub`);
}

export async function debugGiftSubRequest() {
    return axios.post(`http://${process.env.REACT_APP_SERVER_IP}/debug/giftsub`);
}

export async function debugBitsRequest() {
    return axios.post(`http://${process.env.REACT_APP_SERVER_IP}/debug/bits`);
}