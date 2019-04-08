function attachEvents() {

    const appKey = 'kid_HJA6rFdY4';
    const user = 'user';
    const password = 'pass';
    const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/biggestCatches`;

    $(".load").on('click', loadCatch);
    $(".add").on('click', addCatch)

    function addCatch() {
        let angler = $('#addForm .angler').val()
        let weight = $('#addForm .weight').val()
        let species = $('#addForm .species').val()
        let location = $('#addForm .location').val()
        let bait = $('#addForm .bait').val()
        let captureTime = $('#addForm .captureTime').val()
        let catchObj = {
            angler: angler,
            weight: weight,
            species: species,
            location: location,
            bait: bait,
            captureTime: captureTime
        }

        $.ajax({
            method: 'POST',
            url: baseUrl,
            data: catchObj,
            headers: {
                'Authorization': 'Basic dXNlcjpwYXNz'
            },
            success: handleAdd
        })
    }

    function handleAdd(param) {
        console.log(param)
    }


    function loadCatch() {
        $.ajax({
            method: "GET",
            url: baseUrl,
            headers: {
                'Authorization': 'Basic dXNlcjpwYXNz'
            },
            success: handleSuccess
        })

    }

    function handleSuccess(data) {
        for (const fish of data) {
            let fishTemp = $(
                `<div id="catches">
            <div class="catch" data-id="${fish._id}">
                <label>Angler</label>
                <input type="text" class="angler" value="${fish.angler}" />
                <label>Weight</label>
                <input type="number" class="weight" value="${fish.weight}" />
                <label>Species</label>
                <input type="text" class="species" value="${fish.species}" />
                <label>Location</label>
                <input type="text" class="location" value="${fish.location}" />
                <label>Bait</label>
                <input type="text" class="bait" value="${fish.bait}" />
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${fish.captureTime}" />
                <button class="update">Update</button>
                <button class="delete">Delete</button>
            </div>
        </div>`)
            $('#main').append(fishTemp);
            $('.update').click(function () {

                $.ajax({
                    method: "PUT",
                    url: baseUrl + '/' +
                        fish._id,
                    data: data,
                    headers: {
                        'Authorization': 'Basic dXNlcjpwYXNz'
                    },
                    success: function (d) {
                        alert('Ooooooo,you update me!')
                    }

                })

            })


            $(".delete").click(function () {
                $.ajax({
                    method: "DELETE",
                    url: baseUrl + '/' +
                        fish._id,
                    headers: {
                        'Authorization': 'Basic dXNlcjpwYXNz'
                    },
                    success: $('#catches').remove()
                })

            })





        }


    }


}
