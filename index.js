const seats = document.getElementsByClassName('seat');

const seatArray = [];
let seatLeftCounter = 40;
let selectedSeatCounter = 0;

const ticketPrice = 550;
const ticketClass = 'Economy';
const totalPriceElement = document.getElementById('total-price');
totalPriceElement.innerText = '0';
// coupon
const couponBtn = document.getElementById('coupon');
couponBtn.disabled = true;
// coupon codes
const coupon1 = 'NEW15';
const coupon2 = 'Couple 20';
// input validation
const PhoneNumber = document.getElementById('PhoneNumber');
PhoneNumber.addEventListener('input', function () {
    const inputValue = parseInt(PhoneNumber.value);
    const modalBtn = document.getElementById('modal-btn');
    if (inputValue.length !== 0) {
        modalBtn.removeAttribute('disabled');
    }
    console.log(inputValue);
})
for (const seat of seats) {
    seat.addEventListener('click', function () {
        const seatId = seat.getAttribute('id');
        if (seatArray.includes(seat)) {
            alert('You already select this seat');
        } else if (seatArray.length >= 4) {
            alert('You cannot select more than four seats');
        } else {
            seatArray.push(seat);
            setBackgroundColor(seatId);
            updateSeatLeft(--seatLeftCounter);
            updateSeatSelected(++selectedSeatCounter);
            // Element Creation
            const tableRow = document.createElement('tr');
            const tableTd1 = document.createElement('td');
            const tableTd2 = document.createElement('td');
            const tableTd3 = document.createElement('td');
            // set data
            tableTd1.innerText = seat.innerText;
            tableTd2.innerText = ticketClass;
            tableTd3.innerText = ticketPrice;
            tableRow.appendChild(tableTd1);
            tableRow.appendChild(tableTd2);
            tableRow.appendChild(tableTd3);
            // set to table body
            const displaySeat = document.getElementById('display-seat');
            displaySeat.appendChild(tableRow);
            // update total price
            let totalPrice = updateTotalPrice(ticketPrice);
            totalPrice = parseFloat(totalPrice.innerText);
            // enable coupon button
            if (selectedSeatCounter === 4) {
                couponBtn.disabled = false;
                // get input from coupon field
                couponBtn.addEventListener('click', function () {
                    const couponField = document.getElementById('coupon-field').value;
                    const couponInput1 = couponField.slice(0, 3).toUpperCase() + couponField.slice(3);
                    const couponInput2 = capitalizeWords(couponField);
                    if (coupon1 === couponInput1) {
                        document.getElementById('coupon-area').style.display = 'none';
                        document.getElementById('coupon-applied').classList.remove('hidden');
                        const discount = document.getElementById('discount');
                        discount.innerText = (totalPrice * 0.15);
                        const grandTotal = document.getElementById('grand-total');
                        grandTotal.innerText = totalPrice - parseFloat(discount.innerText);
                    } else if (coupon2 === couponInput2) {
                        document.getElementById('coupon-area').style.display = 'none';
                        document.getElementById('coupon-applied').classList.remove('hidden');
                        const discount = document.getElementById('discount');
                        discount.innerText = (totalPrice * 0.2);
                        const grandTotal = document.getElementById('grand-total');
                        grandTotal.innerText = totalPrice - parseFloat(discount.innerText);
                    } else {
                        alert("Enter correct coupon code");
                    }
                })
            }
            // grand total
            const grandTotal = document.getElementById('grand-total');
            grandTotal.innerText = totalPrice;
            // form
            const form = document.getElementById('myForm');
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                console.log('Form submission prevented.');
            });
        }
    })
}
// utility functions goes here
function scrollToSection(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
}
function setBackgroundColor(seatId) {
    const element = document.getElementById(seatId);
    element.style.backgroundColor = '#1DD100';
    element.style.color = 'white';
}
function updateSeatLeft(seatLeft) {
    const seatLeftCounter = document.getElementById('seat-left');
    seatLeftCounter.innerText = seatLeft;
}
function updateSeatSelected(selectedSeat) {
    const seatSelected = document.getElementById('selected-seat');
    seatSelected.innerText = selectedSeat;
}
function setInnerTextByID(id, value) {
    const element = document.getElementById(id);
    element.innerText = value;
}
function updateTotalPrice(price) {
    let totalPrice = parseFloat(totalPriceElement.innerText);
    totalPrice += price;
    totalPriceElement.innerText = totalPrice;
    return totalPriceElement
}
function capitalizeWords(input) {
    input = input.toLowerCase();
    const input2 = input.slice(0, 6);
    const input3 = input.slice(-2);
    let FinalInput = input2.charAt(0).toUpperCase() + input2.slice(1);
    input = FinalInput + " " + input3;
    return input;
}