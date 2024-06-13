let selectedList = [];
addEventListener('DOMContentLoaded', function () {
    let closeShopping = document.getElementById('close-button');
    closeShopping.addEventListener('click', () => {
        document.body.classList.remove('active');
    })

    fetchData();
    this.setTimeout(function () {
        document.querySelectorAll('.select-btn').forEach(function (button) {
            button.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default link behavior

                if (button.style.border != 'blue') {
                    button.closest('.card').style.transition = 'all 1s ease';
                    button.closest('.card').style.boxShadow = '1px 1px 5px rgba(0, 0, 255, 0.5)';
                }

                setTimeout(function () {
                    button.closest('.card').style.transition = 'all 1s ease';
                    button.closest('.card').style.boxShadow = 'none';
                }, 1500)

                // Extract the ID of the parent card
                const itemId = this.closest('.card').id;

                // Add the ID to the selectedList array
                if (!selectedList.includes(itemId)) {
                    // Add the ID to the selectedList array
                    selectedList.push(itemId);
                }
            });
        });
    }, 200)
    document.getElementById("openCart").addEventListener('click', displayCartItems);
})

function openCart() {
    document.body.classList.add('active');
}

let totalCount = 0;
let cartTotal = 0;
function displayCartItems() {
    totalCount = 0;
    cartTotal = 0;
    const cartItemContainer = document.getElementById('cartList');

    cartItemContainer.innerHTML = "";

    fetch("../../json/data.json")
        .then(response => response.json())
        .then(data => {
            items = data;
            mainItems = items["main-course"];
            sideItems = items["side-course"];
            drinks = items["drinks"]

            for (mainItem of mainItems) {
                if (selectedList.includes(mainItem.id.toString())) {
                    createCard(mainItem)
                }
            }

            for (sideItem of sideItems) {
                if (selectedList.includes(sideItem.id.toString())) {
                    createCard(sideItem)
                }
            }

            for (drink of drinks) {
                if (selectedList.includes(drink.id.toString())) {
                    createCard(drink)
                }
            }

            function createCard(item) {
                let cartItem = document.createElement('div');
                cartItem.classList.add("d-flex", "row", "food-item");
                cartItem.id = item.id;

                let itemImageDiv = document.createElement('div');
                itemImageDiv.classList.add("col-3", "d-flex", "justify-content-center", "ms-2");

                let itemImage = document.createElement('img');
                itemImage.classList.add("cart-image");
                itemImage.id = 'cart-item-img';
                itemImage.src = item.image;

                itemImageDiv.appendChild(itemImage);

                let cartDescDiv = document.createElement('div');
                cartDescDiv.classList.add("col-6", "cart-desc");

                let itemTitle = document.createElement('p');
                itemTitle.classList.add("cart-product-title", "fw-semibold");
                itemTitle.textContent = item.title;

                cartDescDiv.appendChild(itemTitle);

                let colorBoxDiv = document.createElement('div');
                colorBoxDiv.classList.add("d-flex", "red-margin");

                let colorDiv = document.createElement('div');
                colorDiv.id = "cart-item-color";
                colorDiv.classList.add("veg-non-box");
                if (item.type == 'Non-Veg') {
                    colorDiv.style.backgroundColor = 'red';
                }
                else {
                    colorDiv.style.backgroundColor = 'green';
                }

                colorBoxDiv.appendChild(colorDiv);
                cartDescDiv.appendChild(colorBoxDiv);

                let countSelectDiv = document.createElement('div');
                countSelectDiv.classList.add("d-flex", "mt-2", "count-select");

                let minusBtnDiv = document.createElement('div');
                minusBtnDiv.classList.add("pad-reomve");

                let minusBtn = document.createElement('button');
                minusBtn.type = "button";
                minusBtn.classList.add("minus");
                minusBtn.id = "minus" + item.id;

                let minusIcon = document.createElement('i');
                minusIcon.classList.add("bi", "bi-dash");

                minusBtn.appendChild(minusIcon);
                minusBtnDiv.appendChild(minusBtn);
                countSelectDiv.appendChild(minusBtnDiv);

                let inputDiv = document.createElement('div');
                inputDiv.classList.add("pad-reomve");

                let inputField = document.createElement('input');
                inputField.classList.add("count-items");
                inputField.type = "text";
                inputField.style.width = "25px";
                inputField.style.height = "25px";
                inputField.value = 1;
                inputField.readOnly = true;
                inputField.id = "input" + item.id;

                inputDiv.appendChild(inputField);
                countSelectDiv.appendChild(inputDiv);

                let plusBtnDiv = document.createElement('div');
                plusBtnDiv.classList.add("pad-reomve");

                let plusBtn = document.createElement('button');
                plusBtn.type = "button";
                plusBtn.classList.add("plus");
                plusBtn.id = "plus" + item.id;

                let plusIcon = document.createElement('i');
                plusIcon.classList.add("bi", "bi-plus");

                plusBtn.appendChild(plusIcon);
                plusBtnDiv.appendChild(plusBtn);
                countSelectDiv.appendChild(plusBtnDiv);

                let removeTextDiv = document.createElement('div');
                removeTextDiv.classList.add("remove-text-div");

                let removeItemBtn = document.createElement('button');
                removeItemBtn.type = "button";
                removeItemBtn.classList.add("remove-item-button", "remove-item");
                removeItemBtn.textContent = "remove";
                removeItemBtn.onclick = function () {
                    removeItem(item.id);
                };

                let itemPrice = document.createElement('div');
                itemPrice.classList.add("col-2", "d-flex", "justify-content-end");

                let itemPriceText = document.createElement('p');
                itemPriceText.classList.add("fw-semibold", "total_amount");
                itemPriceText.id = "total-amount";
                itemPriceText.textContent = "₹" + item.price;

                itemPrice.appendChild(itemPriceText);
                removeTextDiv.appendChild(removeItemBtn);
                countSelectDiv.appendChild(removeTextDiv);

                cartDescDiv.appendChild(countSelectDiv);
                cartItem.appendChild(itemImageDiv);
                cartItem.appendChild(cartDescDiv);
                cartItem.appendChild(itemPrice);

                cartItemContainer.appendChild(cartItem);

                totalCount++;
                cartTotal += item.price;
                document.getElementById('totalCount').textContent = "(" + totalCount + ")";
                document.getElementById('cart-total').textContent = "₹" + cartTotal;


                document.querySelectorAll('.minus').forEach(function (minusBtn) {
                    minusBtn.addEventListener('click', function () {
                        let countInput = this.closest('.count-select').querySelector('.count-items');
                        let count = parseInt(countInput.value);
                        if (count > 0) {
                            count--;
                            countInput.value = count;
                            updateCartTotal();
                        }
                        return;
                    });
                });

                document.querySelectorAll('.plus').forEach(function (plusBtn) {
                    plusBtn.addEventListener('click', function () {
                        let countInput = this.closest('.count-select').querySelector('.count-items');
                        if (!countInput) {
                            console.log("Count input not found.");
                            return;
                        }
                        let count = parseInt(countInput.value);
                        count++;
                        countInput.value = count;
                        updateCartTotal();
                    });
                });

                document.querySelectorAll('.remove-item').forEach(function (removeBtn) {
                    removeBtn.addEventListener('click', function () {
                        currentIdDelete = this.closest('.food-item').id;
                        this.closest('.food-item').remove();
                        let index = selectedList.indexOf(currentIdDelete);

                        if (index !== -1) {
                            // If value exists, remove it from the array
                            selectedList.splice(index, 1);
                        }
                        updateCartTotal();
                    })
                });

                function updateCartTotal() {
                    totalCount = 0;
                    cartTotal = 0;
                    document.querySelectorAll('.count-items').forEach(function (countInput) {
                        let count = parseInt(countInput.value);
                        let itemPrice = parseFloat(countInput.closest('.food-item').querySelector('.total_amount').textContent.replace(/[^\d.]/g, ''));
                        totalCount += count;
                        cartTotal += count * itemPrice;
                    });
                    document.getElementById('totalCount').textContent = "(" + totalCount + ")";
                    document.getElementById('cart-total').textContent = "₹" + cartTotal;
                }
            }
        }
        )
}

function orderConfirmed() {
    let currentOrder = {
        items: [],
        totalCount: totalCount,
        totalPrize: cartTotal
    };

    document.querySelectorAll('.food-item').forEach(function (item) {
        let itemId = item.id;
        let itemCount = parseInt(item.querySelector('.count-items').value);
        currentOrder.items.push({ id: itemId, count: itemCount });
    });

    let currentOrderJSON = JSON.stringify(currentOrder);
    localStorage.setItem('currentOrder', currentOrderJSON);
    window.location.href = "../orderConfirm/index.html";
}

//fetching items
async function fetchData() {
    try {
        const response = await fetch('../../json/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayItems(data["main-course"], 'dishes-container');
        displayItems(data["side-course"], 'sides-container');
        displayItems(data["drinks"], 'drinks-container');
    } catch (error) {
        console.error('Error fetching the data:', error);
    }
}

function displayItems(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
        <div class="card mb-3" id="${item.id}">
            <div class="row g-0">
                <div class="image-container col-md-5">
                    <img src="${item.image}" class="image" alt="${item.title}" />
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">
                            ${item.description}
                        </p>
                        <span>
                            <p>MRP : ₹ ${item.price}</p>
                            <a class="btn btn-dark select-btn">+</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        `;
        container.appendChild(card);
    });
}

function removeItem(id) {
    document.getElementById(id).textContent = '';
}
