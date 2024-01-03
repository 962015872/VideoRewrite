import {
  c as z,
  g as F,
  _ as V,
  o as b,
  a as S,
  b as v,
  r as C,
  d as N,
  $ as M,
  n as W,
  e as U,
  f as R,
  w as E,
  F as k,
  h as T,
  i as G,
  t as I,
  p as q,
  j as J,
} from "./index-d62821d6.js";
let A;
const K = new Uint8Array(16);
function H() {
  if (
    !A &&
    ((A =
      typeof crypto < "u" &&
      crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto)),
    !A)
  )
    throw new Error(
      "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
    );
  return A(K);
}
const w = [];
for (let o = 0; o < 256; ++o) w.push((o + 256).toString(16).slice(1));
function Q(o, a = 0) {
  return (
    w[o[a + 0]] +
    w[o[a + 1]] +
    w[o[a + 2]] +
    w[o[a + 3]] +
    "-" +
    w[o[a + 4]] +
    w[o[a + 5]] +
    "-" +
    w[o[a + 6]] +
    w[o[a + 7]] +
    "-" +
    w[o[a + 8]] +
    w[o[a + 9]] +
    "-" +
    w[o[a + 10]] +
    w[o[a + 11]] +
    w[o[a + 12]] +
    w[o[a + 13]] +
    w[o[a + 14]] +
    w[o[a + 15]]
  );
}
const X =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  O = { randomUUID: X };
function Y(o, a, _) {
  if (O.randomUUID && !a && !o) return O.randomUUID();
  o = o || {};
  const f = o.random || (o.rng || H)();
  if (((f[6] = (f[6] & 15) | 64), (f[8] = (f[8] & 63) | 128), a)) {
    _ = _ || 0;
    for (let m = 0; m < 16; ++m) a[_ + m] = f[m];
    return a;
  }
  return Q(f);
}
var j = { exports: {} };
/*!
 *
 * js-audio-recorder - js audio recorder plugin
 *
 * @version v0.5.7
 * @homepage https://github.com/2fps/recorder
 * @author 2fps <echoweb@126.com> (https://www.zhuyuntao.cn)
 * @license MIT
 *
 */ (function (o, a) {
  (function (_, f) {
    o.exports = f();
  })(z, function () {
    return (function (_) {
      var f = {};
      function m(r) {
        if (f[r]) return f[r].exports;
        var c = (f[r] = { i: r, l: !1, exports: {} });
        return _[r].call(c.exports, c, c.exports, m), (c.l = !0), c.exports;
      }
      return (
        (m.m = _),
        (m.c = f),
        (m.d = function (r, c, e) {
          m.o(r, c) || Object.defineProperty(r, c, { enumerable: !0, get: e });
        }),
        (m.r = function (r) {
          typeof Symbol < "u" &&
            Symbol.toStringTag &&
            Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(r, "__esModule", { value: !0 });
        }),
        (m.t = function (r, c) {
          if (
            (1 & c && (r = m(r)),
            8 & c || (4 & c && typeof r == "object" && r && r.__esModule))
          )
            return r;
          var e = Object.create(null);
          if (
            (m.r(e),
            Object.defineProperty(e, "default", { enumerable: !0, value: r }),
            2 & c && typeof r != "string")
          )
            for (var t in r)
              m.d(
                e,
                t,
                function (n) {
                  return r[n];
                }.bind(null, t)
              );
          return e;
        }),
        (m.n = function (r) {
          var c =
            r && r.__esModule
              ? function () {
                  return r.default;
                }
              : function () {
                  return r;
                };
          return m.d(c, "a", c), c;
        }),
        (m.o = function (r, c) {
          return Object.prototype.hasOwnProperty.call(r, c);
        }),
        (m.p = ""),
        m((m.s = 0))
      );
    })([
      function (_, f, m) {
        Object.defineProperty(f, "__esModule", { value: !0 });
        var r = (function () {
          function e(t) {
            t === void 0 && (t = {}),
              (this.isplaying = !1),
              (this.lBuffer = []),
              (this.rBuffer = []),
              (this.tempPCM = []),
              (this.inputSampleBits = 16),
              (this.playStamp = 0),
              (this.playTime = 0),
              (this.totalPlayTime = 0),
              (this.offset = 0),
              (this.fileSize = 0);
            var n,
              s = new (window.AudioContext || window.webkitAudioContext)();
            (this.inputSampleRate = s.sampleRate),
              (this.config = {
                sampleBits: ~[8, 16].indexOf(t.sampleBits) ? t.sampleBits : 16,
                sampleRate: ~[
                  8e3, 11025, 16e3, 22050, 24e3, 44100, 48e3,
                ].indexOf(t.sampleRate)
                  ? t.sampleRate
                  : this.inputSampleRate,
                numChannels: ~[1, 2].indexOf(t.numChannels) ? t.numChannels : 1,
                compiling: !!t.compiling || !1,
              }),
              (this.outputSampleRate = this.config.sampleRate),
              (this.oututSampleBits = this.config.sampleBits),
              (this.littleEdian =
                ((n = new ArrayBuffer(2)),
                new DataView(n).setInt16(0, 256, !0),
                new Int16Array(n)[0] === 256)),
              e.initUserMedia();
          }
          return (
            (e.prototype.initRecorder = function () {
              var t = this;
              this.context && this.destroy(),
                (this.context = new (window.AudioContext ||
                  window.webkitAudioContext)()),
                (this.analyser = this.context.createAnalyser()),
                (this.analyser.fftSize = 2048);
              var n =
                this.context.createScriptProcessor ||
                this.context.createJavaScriptNode;
              (this.recorder = n.apply(this.context, [
                4096,
                this.config.numChannels,
                this.config.numChannels,
              ])),
                (this.recorder.onaudioprocess = function (s) {
                  if (t.isrecording && !t.ispause) {
                    var i,
                      p = s.inputBuffer.getChannelData(0),
                      l = null;
                    if (
                      (t.lBuffer.push(new Float32Array(p)),
                      (t.size += p.length),
                      t.config.numChannels === 2 &&
                        ((l = s.inputBuffer.getChannelData(1)),
                        t.rBuffer.push(new Float32Array(l)),
                        (t.size += l.length)),
                      t.config.compiling)
                    ) {
                      var g = t.transformIntoPCM(p, l);
                      t.tempPCM.push(g),
                        (t.fileSize = g.byteLength * t.tempPCM.length);
                    } else
                      t.fileSize =
                        Math.floor(
                          t.size /
                            Math.max(t.inputSampleRate / t.outputSampleRate, 1)
                        ) *
                        (t.oututSampleBits / 8);
                    (i = 100 * Math.max.apply(Math, p)),
                      (t.duration += 4096 / t.inputSampleRate),
                      t.onprocess && t.onprocess(t.duration),
                      t.onprogress &&
                        t.onprogress({
                          duration: t.duration,
                          fileSize: t.fileSize,
                          vol: i,
                          data: t.tempPCM,
                        });
                  }
                });
            }),
            (e.prototype.start = function () {
              var t = this;
              if (!this.isrecording)
                return (
                  this.clear(),
                  this.initRecorder(),
                  (this.isrecording = !0),
                  navigator.mediaDevices
                    .getUserMedia({ audio: !0 })
                    .then(function (n) {
                      (t.audioInput = t.context.createMediaStreamSource(n)),
                        (t.stream = n);
                    })
                    .then(function () {
                      t.audioInput.connect(t.analyser),
                        t.analyser.connect(t.recorder),
                        t.recorder.connect(t.context.destination);
                    })
                );
            }),
            (e.prototype.pause = function () {
              this.isrecording && !this.ispause && (this.ispause = !0);
            }),
            (e.prototype.resume = function () {
              this.isrecording && this.ispause && (this.ispause = !1);
            }),
            (e.prototype.stop = function () {
              (this.isrecording = !1),
                this.audioInput && this.audioInput.disconnect(),
                this.recorder.disconnect();
            }),
            (e.prototype.play = function () {
              this.stop(),
                this.source && this.source.stop(),
                (this.isplaying = !0),
                (this.playTime = 0),
                this.playAudioData();
            }),
            (e.prototype.getPlayTime = function () {
              var t = 0;
              return (
                (t = this.isplaying
                  ? this.context.currentTime - this.playStamp + this.playTime
                  : this.playTime) >= this.totalPlayTime &&
                  (t = this.totalPlayTime),
                t
              );
            }),
            (e.prototype.pausePlay = function () {
              !this.isrecording &&
                this.isplaying &&
                (this.source && this.source.disconnect(),
                (this.playTime += this.context.currentTime - this.playStamp),
                (this.isplaying = !1));
            }),
            (e.prototype.resumePlay = function () {
              this.isrecording ||
                this.isplaying ||
                this.playTime === 0 ||
                ((this.isplaying = !0), this.playAudioData());
            }),
            (e.prototype.stopPlay = function () {
              this.isrecording ||
                ((this.playTime = 0),
                (this.isplaying = !1),
                this.source && this.source.stop());
            }),
            (e.prototype.getWholeData = function () {
              return this.tempPCM;
            }),
            (e.prototype.getNextData = function () {
              var t = this.tempPCM.length,
                n = this.tempPCM.slice(this.offset);
              return (this.offset = t), n;
            }),
            (e.prototype.playAudioData = function () {
              var t = this;
              this.context.decodeAudioData(
                this.getWAV().buffer,
                function (n) {
                  (t.source = t.context.createBufferSource()),
                    (t.source.buffer = n),
                    (t.totalPlayTime = t.source.buffer.duration),
                    t.source.connect(t.analyser),
                    t.analyser.connect(t.context.destination),
                    t.source.start(0, t.playTime),
                    (t.playStamp = t.context.currentTime);
                },
                function (n) {
                  e.throwError(n);
                }
              );
            }),
            (e.prototype.getRecordAnalyseData = function () {
              if (this.ispause) return this.prevDomainData;
              var t = new Uint8Array(this.analyser.frequencyBinCount);
              return (
                this.analyser.getByteTimeDomainData(t),
                (this.prevDomainData = t)
              );
            }),
            (e.prototype.getPlayAnalyseData = function () {
              return this.getRecordAnalyseData();
            }),
            (e.prototype.getPCM = function () {
              if (this.tempPCM.length) {
                var t = new ArrayBuffer(
                    this.tempPCM.length * this.tempPCM[0].byteLength
                  ),
                  n = new DataView(t),
                  s = 0;
                this.tempPCM.forEach(function (p) {
                  for (var l = 0, g = p.byteLength; l < g; ++l)
                    n.setInt8(s, p.getInt8(l)), s++;
                }),
                  (this.PCM = n),
                  (this.tempPCM = []);
              }
              if (this.PCM) return this.PCM;
              var i = this.flat();
              return (
                (i = e.compress(
                  i,
                  this.inputSampleRate,
                  this.outputSampleRate
                )),
                (this.PCM = e.encodePCM(
                  i,
                  this.oututSampleBits,
                  this.littleEdian
                ))
              );
            }),
            (e.prototype.getPCMBlob = function () {
              return this.stop(), new Blob([this.getPCM()]);
            }),
            (e.prototype.downloadPCM = function (t) {
              t === void 0 && (t = "recorder");
              var n = this.getPCMBlob();
              this.download(n, t, "pcm");
            }),
            (e.prototype.getWAV = function () {
              var t = this.getPCM();
              return e.encodeWAV(
                t,
                this.inputSampleRate,
                this.outputSampleRate,
                this.config.numChannels,
                this.oututSampleBits,
                this.littleEdian
              );
            }),
            (e.prototype.getWAVBlob = function () {
              return (
                this.stop(), new Blob([this.getWAV()], { type: "audio/wav" })
              );
            }),
            (e.prototype.downloadWAV = function (t) {
              t === void 0 && (t = "recorder");
              var n = this.getWAVBlob();
              this.download(n, t, "wav");
            }),
            (e.prototype.transformIntoPCM = function (t, n) {
              var s = new Float32Array(t),
                i = new Float32Array(n),
                p = e.compress(
                  { left: s, right: i },
                  this.inputSampleRate,
                  this.outputSampleRate
                );
              return e.encodePCM(p, this.oututSampleBits, this.littleEdian);
            }),
            (e.prototype.destroy = function () {
              return this.stopStream(), this.closeAudioContext();
            }),
            (e.prototype.stopStream = function () {
              this.stream &&
                this.stream.getTracks &&
                (this.stream.getTracks().forEach(function (t) {
                  return t.stop();
                }),
                (this.stream = null));
            }),
            (e.prototype.closeAudioContext = function () {
              return this.context &&
                this.context.close &&
                this.context.state !== "closed"
                ? this.context.close()
                : new Promise(function (t) {
                    t();
                  });
            }),
            (e.prototype.download = function (t, n, s) {
              try {
                var i = document.createElement("a");
                (i.href = window.URL.createObjectURL(t)),
                  (i.download = n + "." + s),
                  i.click();
              } catch (p) {
                e.throwError(p);
              }
            }),
            (e.prototype.clear = function () {
              (this.lBuffer.length = 0),
                (this.rBuffer.length = 0),
                (this.size = 0),
                (this.fileSize = 0),
                (this.PCM = null),
                (this.audioInput = null),
                (this.duration = 0),
                (this.ispause = !1),
                (this.isplaying = !1),
                (this.playTime = 0),
                (this.totalPlayTime = 0),
                this.source && (this.source.stop(), (this.source = null));
            }),
            (e.prototype.flat = function () {
              var t = null,
                n = new Float32Array(0);
              this.config.numChannels === 1
                ? (t = new Float32Array(this.size))
                : ((t = new Float32Array(this.size / 2)),
                  (n = new Float32Array(this.size / 2)));
              for (var s = 0, i = 0; i < this.lBuffer.length; i++)
                t.set(this.lBuffer[i], s), (s += this.lBuffer[i].length);
              for (s = 0, i = 0; i < this.rBuffer.length; i++)
                n.set(this.rBuffer[i], s), (s += this.rBuffer[i].length);
              return { left: t, right: n };
            }),
            (e.playAudio = function (t) {
              var n = document.createElement("audio");
              (n.src = window.URL.createObjectURL(t)), n.play();
            }),
            (e.compress = function (t, n, s) {
              for (
                var i = n / s,
                  p = Math.max(i, 1),
                  l = t.left,
                  g = t.right,
                  y = Math.floor((l.length + g.length) / i),
                  d = new Float32Array(y),
                  u = 0,
                  x = 0;
                u < y;

              ) {
                var h = Math.floor(x);
                (d[u] = l[h]), u++, g.length && ((d[u] = g[h]), u++), (x += p);
              }
              return d;
            }),
            (e.encodePCM = function (t, n, s) {
              s === void 0 && (s = !0);
              var i = 0,
                p = t.length * (n / 8),
                l = new ArrayBuffer(p),
                g = new DataView(l);
              if (n === 8)
                for (var y = 0; y < t.length; y++, i++) {
                  var d =
                    (u = Math.max(-1, Math.min(1, t[y]))) < 0
                      ? 128 * u
                      : 127 * u;
                  (d = +d + 128), g.setInt8(i, d);
                }
              else
                for (y = 0; y < t.length; y++, i += 2) {
                  var u = Math.max(-1, Math.min(1, t[y]));
                  g.setInt16(i, u < 0 ? 32768 * u : 32767 * u, s);
                }
              return g;
            }),
            (e.encodeWAV = function (t, n, s, i, p, l) {
              l === void 0 && (l = !0);
              var g = s > n ? n : s,
                y = p,
                d = new ArrayBuffer(44 + t.byteLength),
                u = new DataView(d),
                x = i,
                h = 0;
              c(u, h, "RIFF"),
                (h += 4),
                u.setUint32(h, 36 + t.byteLength, l),
                c(u, (h += 4), "WAVE"),
                c(u, (h += 4), "fmt "),
                (h += 4),
                u.setUint32(h, 16, l),
                (h += 4),
                u.setUint16(h, 1, l),
                (h += 2),
                u.setUint16(h, x, l),
                (h += 2),
                u.setUint32(h, g, l),
                (h += 4),
                u.setUint32(h, x * g * (y / 8), l),
                (h += 4),
                u.setUint16(h, x * (y / 8), l),
                (h += 2),
                u.setUint16(h, y, l),
                c(u, (h += 2), "data"),
                (h += 4),
                u.setUint32(h, t.byteLength, l),
                (h += 4);
              for (var D = 0; D < t.byteLength; )
                u.setUint8(h, t.getUint8(D)), h++, D++;
              return u;
            }),
            (e.throwError = function (t) {
              throw new Error(t);
            }),
            (e.initUserMedia = function () {
              navigator.mediaDevices === void 0 &&
                (navigator.mediaDevices = {}),
                navigator.mediaDevices.getUserMedia === void 0 &&
                  (navigator.mediaDevices.getUserMedia = function (t) {
                    var n =
                      navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia;
                    return n
                      ? new Promise(function (s, i) {
                          n.call(navigator, t, s, i);
                        })
                      : Promise.reject(
                          new Error("浏览器不支持 getUserMedia !")
                        );
                  });
            }),
            (e.getPermission = function () {
              return (
                this.initUserMedia(),
                navigator.mediaDevices
                  .getUserMedia({ audio: !0 })
                  .then(function (t) {
                    t.getTracks().forEach(function (n) {
                      return n.stop();
                    });
                  })
              );
            }),
            e
          );
        })();
        function c(e, t, n) {
          for (var s = 0; s < n.length; s++) e.setUint8(t + s, n.charCodeAt(s));
        }
        f.default = r;
      },
    ]).default;
  });
})(j);
var Z = j.exports,
  tt = Z;
const et = F(tt);
let L = window.location.hostname;
const $ = {
  MSG_SOCKET_RECORD: `ws://${L}:7879/ws`,
  ASR_SOCKET_RECORD: `ws://${L}:8090/paddlespeech/asr/streaming`,
};

const P = new et({
  sampleBits: 16,
  sampleRate: 16e3,
  numChannels: 1,
  compiling: !0,
});
console.log(P);
const nt = {
    data() {
      return { onReco: !1, asrResult: "", wsUrl: "", ws: "" };
    },
    mounted() {
      (this.wsUrl = $.ASR_SOCKET_RECORD), (this.ws = new WebSocket(this.wsUrl));
      var o = this;
      let a = document.getElementById("output");
      this.ws.addEventListener("message", function (_) {
        var f = JSON.parse(_.data);
        f.result &&
          f.result != o.streamAsrResult &&
          ((a.value = f.result), o.$nextTick(() => {}));
      });
    },
    methods: {
      startRecorder() {
        if (this.ws.readyState != this.ws.OPEN) {
          this.$message.error(
            "websocket 链接失败，请检查 Websocket 后端服务是否正确开启"
          );
          return;
        }
        this.onReco = !0;
        var o = JSON.stringify({ name: "test.wav", nbest: 5, signal: "start" });
        this.ws.send(o),
          P.start().then(
            () => {
              setInterval(() => {
                let a = P.getNextData();
                a.length && this.uploadChunk(a);
              }, 300);
            },
            (a) => {
              console.log(a), console.log("录音出错");
            }
          );
      },
      endRecorder() {
        P.stop(), (this.onReco = !1), P.clear();
      },
      uploadChunk(o) {
        o.forEach((a) => {
          this.ws.send(a);
        });
      },
    },
  },
  it = { class: "realTime" },
  ot = v("div", { class: "public_recognition_speech" }, null, -1),
  st = [ot];
function at(o, a, _, f, m, r) {
  return b(), S("div", it, st);
}
const rt = V(nt, [["render", at]]);
const B = (o) => (q("data-v-e7e842d1"), (o = o()), J(), o),
  lt = { class: "container" },
  ct = B(() =>
    v(
      "header",
      { class: "main-header" },
      [
        v("div", { id: "logo" }, [
          v("a", { href: "javascript:void(0);" }, " 对话列表 "),
        ]),
        v("div", { class: "header-right" }),
      ],
      -1
    )
  ),
  ut = { class: "layout" },
  pt = { class: "content" },
  dt = { class: "chat" },
  ht = B(() =>
    v("div", { class: "chat-body" }, [v("div", { class: "messages" })], -1)
  ),
  ft = { class: "chat-footer" },
  mt = B(() =>
    v(
      "input",
      {
        type: "text",
        class: "form-control",
        id: "output",
        placeholder: "请输入对话内容",
      },
      null,
      -1
    )
  ),
  gt = { class: "form-buttons" },
  yt = B(() =>
    v(
      "button",
      {
        style: { padding: "11px 14px" },
        class: "btn btn-primary",
        type: "submit",
        id: "endBtn",
      },
      [
        v(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "feather feather-send",
          },
          [
            v("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
            v("polygon", { points: "22 2 15 22 11 13 2 9 22 2" }),
          ]
        ),
      ],
      -1
    )
  ),
  vt = { class: "tab", style: { display: "none" } },
  wt = { class: "tab__table", style: { "border-collapse": "collapse" } },
  _t = { key: 0, style: { "text-align": "center" } },
  bt = {
    __name: "ASR",
    setup(o) {
      let a = C({});
      const _ = C([]),
        f = C([]),
        m = C({
          equipmentName: "设备名称",
          factoryStation: "所属场站",
          capacity: "额定容量",
          maxVoltage: "最高电压等级",
          windingType: "绕组类型",
          time: "时间",
          voltage: "电压",
          sceneCategories: "场景大类",
          subclass: "小类",
          illustrate: "说明",
          stationName: "厂站ID",
          voltageLevel: "电压等级",
          riskyDevices: "风险设备ID",
          lossLoad: "损失负荷",
          riskLevel: "风险等级",
          plantStationGraphics: "厂站图形名称",
          riskType: "风险类型",
          lossGeneration: "损失发电",
          riskEquipment: "风险设备名称",
          levelCorrespondingClause: "等级对应条款",
          suspiciousRisk: "可以自投动作风险",
          name: "设备名称",
          affiliatedStation: "所属场站",
          voltageLevel: "电压等级",
          upperVoltageLimit: "电压上限",
          lowerVoltageLimit: "电压下限",
          warningUpperLimit: "预警上限",
          warningLowerLimit: "预警下限",
          lineVoltage: "线电压",
          time: "时间",
          quantityOfElectricity: "电量",
          lineName: "线路名称",
          voltageLevel: "电压等级",
          startingStation: "起点厂站",
          interval: "起点所属间隔",
          terminalStation: "终点厂站",
          powerLimit: "功率限值",
          lineLength: "线路全长",
          lineEndName: "线端名称",
          stationId: "厂站id",
          voltageLevel: "电压等级",
          line: "所属线路",
          activeValue: "有功值",
          reactivePowerValue: "无功值",
          current: "电流值",
          powerFactor: "功率因数",
          currentLoadRate: "电流负载率",
          apparentPower: "视在功率",
        }),
        r = C(null),
        c = C(!1);
      N(() => {
        let s = Y();
        (a = new WebSocket(`${$.MSG_SOCKET_RECORD}/${s}`)),
          (a.onopen = function (p) {
            console.log(p);
          });
        const i = (p) => {
          a && a.readyState === WebSocket.OPEN && a.send(p);
        };
        M(document).on(
          "submit",
          ".layout .content .chat .chat-footer form",
          function (p) {
            p.preventDefault();
            var l = M(this).find("input[type=text]"),
              g = l.val();
            (g = M.trim(g)),
              g
                ? (e({ message: g, type: "outgoing-message" }),
                  i(g),
                  console.log(c.value),
                  c.value && n(),
                  setTimeout(function () {
                    l.val(""),
                      (a.onmessage = function (y) {
                        if (y.data != "成功") {
                          let d = JSON.parse(y.data);
                          console.log(d),
                            d.objects != null &&
                              ((_.value = d.objects[0].slice(0, 10)),
                              (f.value = Object.keys(d.objects[0][0])));
                          let u = `对应标准问题：${d.question}<br/>
                                    所属类别:${d.cate}<br/>
                                    指令:${
                                      d.directive ? d.directive : "空"
                                    }<br/>
                                    输入提示:${d.tips}<br/>
                                    结果：${
                                      d.objects == null
                                        ? d.state == null
                                          ? d.num
                                          : d.state
                                        : d.num
                                        ? d.num
                                        : ""
                                    }<br/>
                                    `;
                          W(() => {
                            e({ msg: u });
                          });
                        }
                      });
                  }, 500),
                  (_.value = []),
                  (f.value = []))
                : l.focus();
          }
        );
      });
      const e = ({ message: s, type: i, msg: p = "" }) => {
        console.log(s, i, p);
        var l = M(".layout .content .chat .chat-body");
        if (l.length > 0) {
          (i = i || ""), (s = i ? s : p);
          let g = i ? p : M(".tab").html();
          M(".layout .content .chat .chat-body .messages").append(
            '<div class="message-item ' +
              i +
              `">
            <div>
                <div class="message-content">
                    ` +
              s +
              `
                    ` +
              g +
              `
                </div>
            </div>
        </div>`
          ),
            setTimeout(function () {
              l.scrollTop(l.get(0).scrollHeight, -1);
            }, 200);
        }
      };
      function t() {
        r.value.startRecorder(), (c.value = r.value.onReco);
      }
      function n() {
        r.value.endRecorder(), (c.value = r.value.onReco);
      }
      return (s, i) => {
        const p = U("Microphone"),
          l = U("el-icon"),
          g = U("Mute");
        return (
          b(),
          S("div", lt, [
            ct,
            v("div", ut, [
              v("div", pt, [
                v("div", dt, [
                  ht,
                  v("div", ft, [
                    v("form", null, [
                      mt,
                      v("div", gt, [
                        c.value
                          ? (b(),
                            S(
                              "button",
                              {
                                key: 1,
                                onClick: i[1] || (i[1] = (y) => n()),
                                id: "startBtn",
                                class: "btn btn-light d-none d-sm-inline-block",
                                "data-toggle": "tooltip",
                                title: "",
                                type: "button",
                                "data-original-title": "Send a voice record",
                              },
                              [
                                R(
                                  l,
                                  { size: "18px" },
                                  { default: E(() => [R(g)]), _: 1 }
                                ),
                              ]
                            ))
                          : (b(),
                            S(
                              "button",
                              {
                                key: 0,
                                id: "startBtn",
                                onClick: i[0] || (i[0] = (y) => t()),
                                class: "btn btn-light d-none d-sm-inline-block",
                                "data-toggle": "tooltip",
                                title: "",
                                type: "button",
                                "data-original-title": "Send a voice record",
                              },
                              [
                                R(
                                  l,
                                  { size: "18px" },
                                  { default: E(() => [R(p)]), _: 1 }
                                ),
                              ]
                            )),
                        yt,
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              R(rt, { ref_key: "child", ref: r }, null, 512),
              v("div", vt, [
                v("table", wt, [
                  v("thead", null, [
                    v("tr", null, [
                      (b(!0),
                      S(
                        k,
                        null,
                        T(
                          f.value,
                          (y) => (b(), S("th", { key: y }, I(m.value[y]), 1))
                        ),
                        128
                      )),
                    ]),
                  ]),
                  v("tbody", null, [
                    (b(!0),
                    S(
                      k,
                      null,
                      T(
                        _.value,
                        (y) => (
                          b(),
                          S("tr", { key: y }, [
                            (b(!0),
                            S(
                              k,
                              null,
                              T(
                                Object.values(y),
                                (d) => (b(), S("td", { key: d }, I(d), 1))
                              ),
                              128
                            )),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                ]),
                _.value.length > 9 ? (b(), S("div", _t, "...")) : G("", !0),
              ]),
            ]),
          ])
        );
      };
    },
  },
  xt = V(bt, [["__scopeId", "data-v-e7e842d1"]]);
export { xt as default };
