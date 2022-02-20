console.log('hello world');

const label1 = document.getElementById("count-label1")
const label2 = document.getElementById("count-label2")
const button = document.getElementById("count-submit")

let CountNum = 0;

function ClickCountUpdate() {
CountNum++
label1.innerText = "Number of clicks since load/refresh: " + CountNum
label2.innerText = "Last click: " + new Date()
    }
