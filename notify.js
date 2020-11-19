function notify(theBody,theIcon) {
    var options = {
        body: theBody,
        icon: "./img/" + theIcon
    }
    var n = new Notification("재획 타이머",options);
}

