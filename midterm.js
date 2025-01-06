document.getElementById('date').setAttribute('min', new Date().toISOString().split('T')[0]);
function searchBuses() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    if (!from || !to || !date) {
        alert('Please enter both From, To destinations, and Select a Date!');
        return;
    }
    const busesContainer = document.getElementById('busesContainer');
    busesContainer.innerHTML = '';
    const buses = [
        { id: 1, name: 'Express Bus', price: 500 },
        { id: 2, name: 'Luxury Bus', price: 800 },
        { id: 3, name: 'Sleeper Bus', price: 1000 },
        { id: 4, name: 'Semi-Sleeper Bus', price: 700 },
        { id: 5, name: 'AC Bus', price: 1200 },
        { id: 6, name: 'Non-AC Bus', price: 400 }
    ];
    buses.forEach(bus => {
        const busDiv = document.createElement('div');
        busDiv.className = 'bus';
        busDiv.innerHTML = `
            <p><strong>${bus.name}</strong></p>
            <p>Price: ₹${bus.price}</p>
            <button onclick="selectBus(${bus.id}, '${bus.name}', ${bus.price})">Select Seat</button>
        `;
        busesContainer.appendChild(busDiv);
    });
    busesContainer.style.display = 'block';
}
function selectBus(id, name, price) {
    const busesContainer = document.getElementById('busesContainer');
    busesContainer.innerHTML = ` 
        <p>You selected <strong>${name}</strong> with a ticket price of ₹${price}.</p>
        <div class="seat-layout" id="seatLayout">
            <div class="deck-label">Lower Deck</div>
            ${generateVerticalSeats(1, 8)}
            <div class="deck-label">Upper Deck</div>
            ${generateVerticalSeats(9, 16)}
        </div>
        <button onclick="proceedToDetails()">Proceed</button>
    `;
    const seatDivs = document.querySelectorAll('.seat');
    seatDivs.forEach(seatDiv => {
        seatDiv.onclick = function () {
            seatDiv.classList.toggle('selected');
        };
    });
}
function generateVerticalSeats(start, end) {
    let seatsHTML = '';
    for (let i = start; i <= start + 3; i++) {
        for (let j = i; j <= end; j += 4) {
            seatsHTML += `<div class="seat">${j}</div>`;
        }
    }
    return seatsHTML;
}
function proceedToDetails() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat.');
        return;
    }
    const seatNumbers = Array.from(selectedSeats).map(seat => seat.textContent).join(', ');
    const busesContainer = document.getElementById('busesContainer');
    busesContainer.innerHTML = `
        <p>You selected seat numbers <strong>${seatNumbers}</strong>.</p>
        <input type="text" id="name" placeholder="Your Name" required>
        <input type="number" id="age" placeholder="Your Age" required>
        <input type="email" id="email" placeholder="Your Email" required>
        <br>
        <button onclick="payNow()">Pay Now</button>
    `;
}
function payNow() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    if (!name || !age || !email) {
        alert('Please fill all the details.');
        return;
    }
    window.location.href = 'https://payu.in/payment-gateway/';
}
