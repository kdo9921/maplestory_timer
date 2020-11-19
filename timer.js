var running = false;
var huntTimer = 7200;
var oneMinute = 60000;    //개발중 테스트 용도, 실 사용시 60 * 1000 밀리초
var clockSetting = {
    m3: [false, "cb3m", 3],
    m15: [false, "cb15m", 15],
    m30: [false, "cb30m", 30],
    m60: [false, "cb60m", 60]
};
var timer = {
    hunting: null,
    m3: null,
    m15: null,
    m30: null,
    m60: null
};

window.onload = function () {
    document.getElementById('end').disabled = true;
}

function set() {
    clockSetting.m3[0] = document.getElementById('cb3m').checked;
    clockSetting.m15[0] = document.getElementById('cb15m').checked;
    clockSetting.m30[0] = document.getElementById('cb30m').checked;
    clockSetting.m60[0] = document.getElementById('cb60m').checked;
}

function clock() {
    if (huntTimer == 0) {
        stopTimer();
        huntTimer = 7200;
        return 0;
    }
    huntTimer -= 1;
    const time = Math.floor(huntTimer / 3600) + ":" +
        ((huntTimer % 3600) / 60 < 10 ? "0" : "") + Math.floor((huntTimer % 3600) / 60) + ":" +
        (huntTimer % 60 < 10 ? "0" : "") + Math.floor(huntTimer % 60);
    document.getElementById('huntTimer').innerHTML = time;
}

function startTimer() {
    running = true;
    document.getElementById('start').disabled = true;
    document.getElementById('end').disabled = false;
    set();
    timer.hunting = setInterval(clock, 1000);
    for (const i in clockSetting) {
        if (clockSetting[i][0]) {
            var minute = 0;
            switch (i) {
                case "m3":
                    minute = 3;
                    break;
                case "m15":
                    minute = 15;
                    break;
                case "m30":
                    minute = 30;
                    break;
                case "m60":
                    minute = 60;
                    break;
            }
            timer[i] = setInterval(function () {
                alertBuff(i);
            }, minute * oneMinute);
        }
    }
}

function stopTimer() {
    running = false;
    huntTimer = 7200;
    document.getElementById('huntTimer').innerHTML = "2:00:00";
    document.getElementById('start').disabled = false;
    document.getElementById('end').disabled = true;
    for (const i in timer) {
        clearInterval(timer[i]);
    }
}

function setChange() {
    if (!running) {
        return 0;
    }
    for (const i in clockSetting) {
        if (clockSetting[i][0] != document.getElementById(clockSetting[i][1]).checked) {
            if (clockSetting[i][0]) {
                clockSetting[i][0] = false;
                clearInterval(timer[i]);
            } else {
                clockSetting[i][0] = true;
                timer[i] = setInterval(function () {
                    alertBuff(i);
                }, clockSetting[i][2] * oneMinute);
            }
        }
    }
}
const notiInfo = {
    m3: ["쓸만한 홀리심볼 재사용하기", "simbol.png"],
    m15: ["경험치 쿠폰(15분) 재사용하기", "exp.png"],
    m30: ["경험치 쿠폰(30분) 재사용하기", "mvp.png"],
    m60: ["경험치 쿠폰(60분) 재사용하기", "exp.png"]
}

function alertBuff(buff) {
    notify(notiInfo[buff][0], notiInfo[buff][1]);
}