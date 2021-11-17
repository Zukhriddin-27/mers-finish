function data() {
    //TIME 

    const didline = "2022-01-01";

    function getTime(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            seconds = Math.floor((total / 1000) % 60),
            minutes = Math.floor(((total / 1000) / 60) % 60),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        return {
            total: total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }



    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTime(endTime);
            days.innerHTML = getZero(time.days);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);
            if (time.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }
    setClock(".timer", didline);
}
export default data;