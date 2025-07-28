import {menuArray} from './data.js';

const menuList = document.getElementById('menu-list');
const orderList = document.getElementById('order-list');
const totalPriceElement = document.getElementById('total-price');
const cardDetails = document.getElementById('card-details');
const yourOrder = document.getElementById('your-order');
const orderButton = document.getElementById('order-button');
const payButton = document.getElementById('pay-button');
let isOrderComplete = false

const yourOrderArray = menuArray.map(item => {
    return {
        ...item,
        orderAmmount : 0
    }
})

payButton.addEventListener('click', (e) => {
    e.preventDefault()
    isOrderComplete = true;
    cardDetails.classList.add('hidden');
    yourOrder.classList.remove('hidden');
    yourOrder.innerHTML = `<h2 class="completed-order">Thank you, Your order is on its way!</h2>`;
    yourOrder.style.display = 'flex';
    yourOrder.style.justifyContent = 'center';
    yourOrder.style.alignItems = 'center';
    yourOrder.style.minHeight = '200px';
    })

renderMenu();
renderYourOrder();
menuList.addEventListener('click', handlePlusClick);
orderList.addEventListener('click', handleNegativeClick);

orderButton.addEventListener('click', () => {
    cardDetails.classList.remove('hidden');
});


function renderMenu() {
    menuList.innerHTML = '';
    menuArray.map((item) =>{
        const menuItem = document.createElement('li');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `<div class="menu-left">
                            <img src="./images/${item.name}.png" alt="${item.name}" class="menu-image">
                            <div class="menu-details">
                                <h3 class="menu-name">${item.name}</h3>
                                <p class="menu-ingredients">${item.ingredients}</p>
                                <span class="menu-price">$${item.price}</span>
                            </div>
                        </div>
                        <i class="fa-solid fa-circle-plus plusIcon" data-id="${item.id}"></i>`
        menuList.appendChild(menuItem);
    });
}

function renderYourOrder(){
    if (isOrderComplete) return;
    orderList.innerHTML = '';
    let totalPrice = 0;
    
    yourOrderArray.map((item) => {
        if (item.orderAmmount > 0) {
            const orderItem = document.createElement('li');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `<div class="order-left">
                                        <span class="order-name">${item.name}</span>
                                        <span class="order-quantity">${item.orderAmmount}</span>
                                    <i class="fa-solid fa-circle-minus removeIcon" data-id="${item.id}"></i>
                                    </div>
                                    <span class="order-price">$${item.price}</span>`;
            orderList.appendChild(orderItem);
            totalPrice += item.price * item.orderAmmount;
        }
    });
    totalPriceElement.innerHTML = `Total: $${totalPrice}`;
    if (totalPrice > 0) {
        yourOrder.classList.remove('hidden');

    } 
    else if (totalPrice === 0) {
        yourOrder.classList.add('hidden');
    }
}


function handlePlusClick(e){
    if (e.target.dataset.id) {
        yourOrderArray.find(item => {
            if (item.id === parseInt(e.target.dataset.id)) {
                item.orderAmmount++;
                renderYourOrder();
                return true;
            }
            return false;
        })
        
    }
}

function handleNegativeClick(e) {
    if (e.target.dataset.id) {
        yourOrderArray.find(item => {
            if (item.id === parseInt(e.target.dataset.id)) {
                if (item.orderAmmount > 0) {
                    item.orderAmmount-- ;
                }
                renderYourOrder();
                return true;
            }
            return false;
        })
    }
}


