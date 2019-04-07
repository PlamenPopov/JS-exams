 const host = 'https://baas.kinvey.com';

 function remote(method, url, data) {
     return $.ajax({
         method,
         url,
         headers: {
             'Authorization': 'Basic Z3Vlc3Q6cGFzcw=='
         }
     })
 }

 function attachEvents() {
     $('#getVenues').click(getVenues);
 }

 async function getVenues() {
     const infoDiv = $('#venue-info');
     const date = $('#venueDate').val();
     const venueId = await getAllVenues(date);
     const details = await Promise.all(venueId.map(getDetails))

     infoDiv.empty();
     for (let venue of details) {
         infoDiv.append(renderVenue(venue))
     }


 }

 function renderVenue(venue) {
     let venueTemp =
         $(`<div class="venue" id="${venue._id}">

				  <span class="venue-name"><input class="info" type="button" value="More info">${venue.name}</span>

                       <div class="venue-details">

				 <table>

				  <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>

				  <tr>

				  <td class="venue-price">${venue.price} lv</td>

				 <td><select class="quantity">

																          <option value="1">1</option>

																          <option value="2">2</option>

																          <option value="3">3</option>

																          <option value="4">4</option>

																          <option value="5">5</option>

																        </select></td>

																        <td><input class="purchase" type="button" value="Purchase"></td>

																      </tr>

																    </table>

																    <span class="head">Venue description:</span>

																    <p class="description">${venue.description}</p>

																    <p class="description">Starting time: ${venue.startingHour}</p>

																  </div>

																</div>`);

     $(venueTemp).find('.purchase').click(e => {
         const qty = $(venueTemp).find('.quantity option:selected').val();
         renderScreenConfirm(venue._id, venue.name, qty, venue.price)
     });
     return venueTemp
 }

 function renderScreenConfirm(venueId, name, qty, price) {
     const html = $(`<span class="head">Confirm purchase</span>

<div class="purchase-info">

  <span>${name}</span>

  <span>${qty} x ${price}</span>

  <span>Total: ${qty * price} lv</span>

  <input type="button" value="Confirm">

</div>`)

     $(html).find('input').click(() => Tickets(venueId, qty))

     $('#venue-info').html(html);
 }

 function getAllVenues(date) {



     return remote('post', `${host}/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`)


 }

 function getDetails(venueId) {

     return remote('get', `${host}/appdata/kid_BJ_Ke8hZg/venues/${venueId}`);

 }

 async function Tickets(venueId, count) {
     const host = 'https://baas.kinvey.com';

     const tickets = await remote('post', `${host}/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${venueId}&qty=${count}`);

     $('#venue-info').html(tickets.html);
 }
