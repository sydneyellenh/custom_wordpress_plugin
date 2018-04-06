console.log('mbc_cdc_settings.js is working TWO!');

document.addEventListener("DOMContentLoaded", function(event) {
    function mbcTimer() {


        //EVENT DATE AND TIME
        const eventDate = document.getElementById('mbc-cdc-date').value;
        const eventTime = document.getElementById('mbc-cdc-timepicker').value;
        const concatEvent = new Date(eventDate + ' ' + eventTime).getTime();
        const today = new Date().getTime();

        const distance = concatEvent - today;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //PREVIEW
        // document.getElementById('mbc-cdc-preview-days').innerHTML = "<h3> Days: </h3>" + "<p>" + days + "</p>";
        // document.getElementById('mbc-cdc-preview-hours').innerHTML = "<h3> Hours: </h3>" + "<p>" + hours + "</p>";
        // document.getElementById('mbc-cdc-preview-minutes').innerHTML = "<h3> Minutes: </h3>" + "<p>" + minutes + "</p>";
        // document.getElementById('mbc-cdc-preview-seconds').innerHTML = "<h3> Seconds: </h3>" + "<p>" + seconds + "</p>";

        document.getElementById('mbc-cdc-onpage-days').innerHTML =  '<p>' + days + '</p>';
        document.getElementById('mbc-cdc-onpage-hours').innerHTML =  '<p>' + hours + '</p>';
        document.getElementById('mbc-cdc-onpage-minutes').innerHTML =  '<p>' + minutes + '</p>';
        document.getElementById('mbc-cdc-onpage-seconds').innerHTML =  '<p>' + seconds + '</p>';

        if (distance <= 0) {
            clearInterval(x);
            document.getElementById('mbc-cdc-onpage-days').innerHTML = '0';
            document.getElementById('mbc-cdc-onpage-hours').innerHTML = '0';
            document.getElementById('mbc-cdc-onpage-minutes').innerHTML = '0';
            document.getElementById('mbc-cdc-onpage-seconds').innerHTML = '0';
        }


    }

    timer = setInterval(mbcTimer, 1000);

});