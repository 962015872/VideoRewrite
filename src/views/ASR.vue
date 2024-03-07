
<template>
  <div class="container">
    <!-- Header -->
    <header class="main-header">
        <div id="logo">
            <a href="javascript:void(0);">
                对话列表
            </a>
        </div>
        <div class="header-right">
        </div>
    </header>
    <!-- ./ Header -->

    <!-- Layout -->
    <div class="layout">

        <!-- Content -->
        <div class="content">
            <!-- Chat -->
            <div class="chat">
                <div class="chat-body"> <!-- .no-message -->
                    <div class="messages">
                     
                    </div>
                </div>
                <div class="chat-footer">
                    <form>
                        <input type="text" class="form-control" id="output" placeholder="请输入对话内容">
                        <div class="form-buttons">
                            <span id="startBtn" v-if="!onReco" @click="start"  class="btn btn-light d-none d-sm-inline-block">
                               <el-icon size="18px"><Microphone/></el-icon>
                            </span>
                            <span  @click="end()" v-else id="startBtn" class="btn btn-light d-none d-sm-inline-block">
                                <el-icon size="18px"><Mute/></el-icon>
                            </span>
                            <button style="padding: 11px 14px;" class="btn btn-primary" type="submit" id="endBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- ./ Chat -->

        </div>
        <!-- 语音录制 -->
        <!-- <div v-if="videoVisiable" class="shadow" @click="videoVisiable = false"> </div>
        <div v-if="videoVisiable" class="videoBox">
            <VoiceRecorder @send="sendVideo" :sendVideo="sendVideo"></VoiceRecorder>
        </div> -->
        <RealTime ref="child"></RealTime>
        <div class="img" style="display: none;">
            <img :src="imageUrl" alt="" style="width: 100%;">
        </div>
        <div class="tab" style="display: none;">
            <table class="tab__table" style="border-collapse:collapse;">
                <thead>
                    <tr>
                        <th v-for="item in thead" :key="item">{{dict[item]}}</th>    
                    </tr>    
                </thead>
                <tbody>
                    <tr v-for="item in tableData" :key="item">
                        <td v-for="ite in Object.values(item)" :key="ite">{{ite}}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="tableData.length > 9" style="text-align: center;">...</div>
        </div>
    </div>
  </div>
</template>
<script setup>
import '@/assets/bundle.css';
import '@/assets/app.min.css';
import { nextTick, onMounted, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue'
import RealTime from "../components/RealTime.vue"

let socket = ref({})
const tableData = ref([])
const thead = ref([])
const dict = ref({
    equipmentName: '设备名称',
    factoryStation: '所属场站',
    capacity: '额定容量',
    maxVoltage: '最高电压等级',
    windingType: '绕组类型',
    time: '时间',
    voltage: '电压',
    sceneCategories: '场景大类',
    subclass: '小类',
    illustrate: '说明',
    stationName: '厂站ID',
    voltageLevel: '电压等级',
    riskyDevices: '风险设备ID',
    lossLoad: '损失负荷',
    riskLevel: '风险等级',
    plantStationGraphics: '厂站图形名称',
    riskType: '风险类型',
    lossGeneration: '损失发电',
    riskEquipment: '风险设备名称',
    levelCorrespondingClause: '等级对应条款',
    suspiciousRisk: '可以自投动作风险',
    name: '设备名称',
    affiliatedStation: '所属场站',
    voltageLevel: '电压等级',
    upperVoltageLimit: '电压上限',
    lowerVoltageLimit: '电压下限',
    warningUpperLimit: '预警上限',
    warningLowerLimit: '预警下限',
    lineVoltage: '线电压',
    time: '时间',
    quantityOfElectricity: '电量',
    lineName: '线路名称',
    voltageLevel: '电压等级',
    startingStation: '起点厂站',
    interval: '起点所属间隔',
    terminalStation: '终点厂站',
    powerLimit: '功率限值',
    lineLength: '线路全长',
    lineEndName: '线端名称',
    stationId: '厂站id',
    voltageLevel: '电压等级',
    line: '所属线路',
    activeValue: '有功值',
    reactivePowerValue: '无功值',
    current: '电流值',
    powerFactor: '功率因数',
    currentLoadRate: '电流负载率',
    apparentPower: '视在功率',
}) 
const child = ref(null)
const onReco = ref(false)
const imageUrl = ref('')
onMounted(() => {
    // socket连接
    let userId = uuidv4();
    socket = new WebSocket(`${config.MSG_SOCKET_RECORD}/${userId}`);
    socket.onopen = function(msg) {
        console.log(msg)
    }
    const sendMessage = (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    };
    
    $(document).on('submit', '.layout .content .chat .chat-footer form', function (e) {
        e.preventDefault();

        var input = $(this).find('input[type=text]');
<<<<<<< Updated upstream
        var message = input.val();
        message = $.trim(message);
=======
        // var message = input.val();

        var message = $.trim(inputField.value);
        console.log(message)
>>>>>>> Stashed changes
        if (message) {
            add({message, type: 'outgoing-message'});
            sendMessage(message)
            if(onReco.value) {
                end()
            }
            socket.onmessage = function(res) {
                console.log(res)
                if(res.data != '成功') {
                    let obj = JSON.parse(res.data)
                    console.log(obj)
                    let result = obj.results != '无' ? obj.results : ''

                    if(obj.tabData != '无') {
                        tableData.value = obj.tabData[0].slice(0,10)
                        thead.value = Object.keys(obj.tabData[0][0])
                    }
                    if(obj.jpgPath != '无') {
                        imageUrl.value = imgUrl + obj.jpgPath
                    } 
                    let msg = `<span>${result}</span>`
                    nextTick(() => {
                        add({msg})
                    })
                }
            }
            setTimeout(() => {
                input.val('')
            }, 500)
            tableData.value = []
            thead.value = []
            imageUrl.value = ''
        } else {
            input.focus();
        }
    });
})
const add = ({message, type , msg = ''}) => {
    var chat_body = $('.layout .content .chat .chat-body');
    if (chat_body.length > 0) {
        type = type ? type : '';
        message = type ? message : msg;
        let tab = tableData.value.length > 0 && !type ? $('.tab').html() : '';
        let img = imageUrl.value && !type ? $('.img').html() : '';
        $('.layout .content .chat .chat-body .messages').append(`<div class="message-item ` + type + `">
            <div>
                <div class="message-content">
                    ` + message + `
                    `+ tab + `
                    `+ img + `
                </div>
            </div>
        </div>`);

        setTimeout(function () {
            chat_body.scrollTop(chat_body.get(0).scrollHeight, -1)
        }, 200);
    }
}

const start = (e) => {
    child.value.startRecorder()
    onReco.value = child.value.onReco
}
const end = () => {
    child.value.endRecorder()
    onReco.value = child.value.onReco
}
</script>
<style scoped>
.chat-body::-webkit-scrollbar {
  width: 4px;
}

  /*定义滚动条轨道
  内阴影+圆角*/
.chat-body::-webkit-scrollbar-track{
  opacity:0.2;
}
  /*定义滑块
    内阴影+圆角*/
.chat-body::-webkit-scrollbar-thumb{
  border-radius:20px;
  background: rgba(66, 66, 66, 0.2)
}
.videoBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 1111;
    width: 400px;
    background: #fff;
}
.shadow{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000000;
    z-index: 1111;
}
.tab__table{
    width: 100%;
}
.tab__table th{
    border: 1px solid #000;
    text-align: center;
}
.tab__table td{
    border: 1px solid #000;
    text-align: center;
    padding: 0 10px
}
</style>