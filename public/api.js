let imgUrl = 'http://192.168.1.14:8060'
let url = '192.168.1.20'
const config =   {
    // websocket
    MSG_SOCKET_RECORD: `ws://${url}:7879/ws`, // 与后端websocket 接口
    ASR_SOCKET_RECORD: `ws://${url}:8090/paddlespeech/asr/streaming`,  // Stream ASR 接口
}





