function attachEvents() {

    let host = 'https://judgetests.firebaseio.com/';


    $('#submit').click(getWeather);

    function getWeather() {


        var locationName = $('#location').val();



        $.get(host + "locations.json")
            .then(parseData)
            .catch(handleError);

        function parseData(codes) {
            let code = undefined;
            for (let loc of codes) {
                if (loc.name == locationName) {
                    code = loc.code;
                    break;
                }
            }
            Promise.all([
        $.get(`${host}forecast/today/${code}.json`),
        $.get(`${host}forecast/upcoming/${code}.json`)
    ]).then(handleForcast)
                .catch(handleError);

            function handleForcast([today, upcoming]) {

                let symbol = '';
                switch (today.forecast.condition) {
                    case 'Sunny':
                        symbol = '&#x2600;';
                        break;
                    case 'PartlY sunny':
                        symbol = '&#x26C5;';
                        break;
                    case 'Overcast':
                        symbol = '&#x2601;';
                        break;
                    case 'Rain':
                        symbol = '&#x2614;';
                        break;
                }

                const htmlSymbol = `<span class='condition symbol'>${symbol}</span>`;
                const htmlContent = `<span class="condition">
                                <span class="forcast-data">${today.name}</span>
                                <span class="forcast-data">${today.forecast.low}&#176;/&#176;${today.forecast.high}</span>
                                <span class="forcast-data">${today.forecast.condition}</span>
                                </span>`;



                $('#current').empty();
                $('#current').append(htmlSymbol);
                $('#current').append(`<div class="label">Current conditions</div>`);
                $('#current').append(htmlContent);






                $("#upcoming").empty();
                $("#upcoming").append(`<div class="label">Three day forecast </div>`);
                for (let day of upcoming.forecast) {
                    $("#upcoming").append(renderUpcoming(day))
                }

                $('#forecast').show();
                $('.upcoming').show();




                function renderUpcoming(data) {

                    let symbol2 = '';
                    switch (data.condition) {
                        case 'Sunny':
                            symbol = '&#x2600;';
                            break;
                        case 'Partly sunny':
                            symbol2 = '&#x26C5;';
                            break;
                        case 'Overcast':
                            symbol2 = '&#x2601;';
                            break;
                        case 'Rain':
                            symbol2 = '&#x2614;';
                            break;
                    }


                    const htmlContent2 = `<span class="upcoming">
                                <span class="symbol">${symbol2}</div>
                                <span class="forcast-data">${data.condition}</span>
                                <span class="forcast-data">${data.low}&#176;/&#176;${data.high}</span>
                                </span>`;

                    return htmlContent2;

                }


            }



        }


    }

    function handleError() {
        $('#forecast').text("Error,man!");
        $('#forecast').show();

    }


}
