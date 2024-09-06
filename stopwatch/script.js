window.onload = function () {
  var hour = 0;
  var minute = 0;
  var second = 0;

  var appendSecond = document.getElementById("second");
  var appendMinute = document.getElementById("minute");
  var appendHour = document.getElementById("hour");

  var buttonStart = document.getElementById("button-start");
  var buttonStop = document.getElementById("button-stop");
  var buttonReset = document.getElementById("button-reset");

  buttonStart.addEventListener("click", function () {
    timer = true;
    stopwatch();
  });

  buttonStop.addEventListener("click", function () {
    timer = false;
  });

  buttonReset.addEventListener("click", function () {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    appendHour.innerHTML = "00";
    appendMinute.innerHTML = "00";
    appendSecond.innerHTML = "00";
  });

  function stopwatch() {
    if (timer) {
      second++;

      if (second <= 9) {
        appendSecond.innerHTML = "0" + second;
      }

      if (second > 9) {
        appendSecond.innerHTML = second;
      }

      if (second > 99) {
        minute++;
        appendMinute.innerHTML = "0" + minute;
        second = 0;
        appendSecond.innerHTML = "0" + 0;
      }

      if (minute > 9) {
        appendMinute.innerHTML = minute;
      }

      if (minute > 59) {
        hour++;
        appendHour.innerHTML = "0" + hour;
        minute = 0;
        appendMinute.innerHTML = "0" + 0;
      }
      setTimeout(stopwatch, 10);
    }
  }
};
