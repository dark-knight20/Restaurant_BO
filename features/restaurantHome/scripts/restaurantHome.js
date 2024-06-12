let selectedList = [];
addEventListener('DOMContentLoaded', function () {
    let openShopping = document.getElementById('addToCart');
    // console.log(openShopping)
    let closeShopping = document.getElementById('close-button');
    closeShopping.addEventListener('click', () => {
        console.log("closed cart")
        document.body.classList.remove('active');
        console.log(closeShopping)
    })

    fetchData();
    this.setTimeout(function () {
        document.querySelectorAll('.select-btn').forEach(function (button) {
            button.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default link behavior
                console.log("item selection triggered")
                if (button.style.border != 'blue') {
                    // button.closest('.card').style.border= '1px solid blue';
                    button.closest('.card').style.transition = 'all 1s ease';
                    button.closest('.card').style.boxShadow = '1px 1px 5px rgba(0, 0, 255, 0.5)';



                }
                setTimeout(function () {
                    // button.style.backgroundColor = 'grey';
                    // button.closest('.card').style.border= 'none';
                    button.closest('.card').style.transition = 'all 1s ease';
                    button.closest('.card').style.boxShadow = 'none';
                }, 1500)

                // Extract the ID of the parent card

                const itemId = this.closest('.card').id;
                console.log(itemId)

                // Add the ID to the selectedList array
                if (!selectedList.includes(itemId)) {
                    // Add the ID to the selectedList array
                    selectedList.push(itemId);
                }

                // Log the updated selectedList
                console.log(selectedList);
            });
        });
    }, 200)




    document.getElementById("openCart").addEventListener('click', displayCartItems);
})
// setTimeout(function () {

// }, 200)

// console.log(selectedList)

function openCart() {
    document.body.classList.add('active');
}

let totalCount = 0;
let cartTotal = 0;
function displayCartItems() {
    const cartItemContainer = document.getElementById('cartList');

    cartItemContainer.innerHTML = "";

    console.log(selectedList)

    fetch("../../json/data.json")
        .then(response => response.json())
        .then(data => {
            items = data;
            console.log("working");
            // console.log(items);

            mainItems = items["main-course"];
            // console.log(mainItems);

            sideItems = items["side-course"];
            // console.log(sideItems)
            drinks = items["drinks"]
            // console.log(drinks)

            for (mainItem of mainItems) {
                if (selectedList.includes(mainItem.id.toString())) {
                    console.log(mainItem.id)
                    console.log(mainItem.title)
                    createCard(mainItem)
                }
            }
            for (sideItem of sideItems) {
                if (selectedList.includes(sideItem.id.toString())) {
                    console.log(sideItem.id)
                    console.log(sideItem.title)
                    createCard(sideItem)
                }
            }
            for (drink of drinks) {
                if (selectedList.includes(drink.id.toString())) {
                    console.log(drink.id)
                    console.log(drink.title)
                    createCard(drink)
                }
            }

            function createCard(item) {
                console.log(item.price)
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
                // minusBtn.onclick = minusCount(minusBtn.id);

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
                // plusBtn.onclick = plusCount(plusBtn.id);

                let plusIcon = document.createElement('i');
                plusIcon.classList.add("bi", "bi-plus");

                plusBtn.appendChild(plusIcon);
                plusBtnDiv.appendChild(plusBtn);
                countSelectDiv.appendChild(plusBtnDiv);



                let removeTextDiv = document.createElement('div');
                removeTextDiv.classList.add("remove-text-div");

                // let removeText = document.createElement('p');
                // removeText.classList.add("remove-text");

                let removeItemBtn = document.createElement('button');
                removeItemBtn.type = "button";
                removeItemBtn.classList.add("remove-item-button", "remove-item");
                removeItemBtn.textContent = "remove";
                removeItemBtn.onclick = function () {
                    console.log("remove trigger")
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
                    console.log("minus triggered")
                    console.log(minusBtn)
                    minusBtn.addEventListener('click', function () {
                        console.log("minus triggered inside")
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

                document.querySelectorAll('.plus').forEach(function(plusBtn) {
                    plusBtn.addEventListener('click', function() {
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
                // function minusCount(id, txtId) {
                //     console.log(id);
                //     let element = document.getElementById(id); // Declare 'element' using 'let'
                //     console.log(element);

                //     let countInput = element.closest('.count-select').querySelector("#" + txtId);
                //     if (!countInput) {
                //         // console.log("Count input not found.");
                //         // return;
                //     }

                //     let count = parseInt(countInput.value);
                //     console.log('===============')
                //     console.log(countInput.value)
                //     if (count > 0) {
                //         count--;
                //         countInput.value = count;
                //         updateCartTotal();
                //     }
                // }


                // function plusCount(id, txtId) {
                //     console.log("plus")
                //     console.log(id);
                //     let element = document.getElementById(id); // Declare 'element' using 'let'
                //     console.log(element);


                //     // let countInput = element.closest('.count-select').querySelector("#"+txtId);
                //     let countInput = document.getElementById(txtId);
                //     if (!countInput) {
                //         console.log("Count input not found.");
                //         return;
                //     }
                //     let count = parseInt(countInput.value);
                //     console.log(countInput.value)
                //     console.log(count)
                //     count++;
                //     console.log(count)
                //     countInput.value = count;
                //     console.log(countInput.value)
                //     console.log("Hai")
                //     //updateCartTotal();
                // }

                // document.addEventListener('click',function(element) {

                //     if(element.target.classList.includes('.plus'))
                //         {
                //             targetId=target.id;
                //             plusCount(targetId)
                //         }

                // })




                // document.addEventListener('click', function (event) {
                //     console.log("click triggered on plus icon")
                //     event.stopPropagation();
                //     // Check if the clicked element or its ancestor is a .plus button
                //     let plusBtn = event.target.closest('.plus');
                //    console.log("plus btn ="+ plusBtn.id) 
                //     // let add=0;
                //     let txtBtn = event.target.closest('.count-select').querySelector('.count-items');
                //     //let txtBtn = 'plus50'
                //     console.log(txtBtn)
                //     console.log('edwin marker')
                    
                //     if (plusBtn) {
                //         // Get the id of the plus button
                //         console.log("triggered add if")
                //         let targetId = plusBtn.id;
                //         let txtId = txtBtn.id;
                //         plusCount(targetId, txtId);
                //         console.log(targetId)
                //         console.log(txtId)
                //     }


                // });
                
                // document.addEventListener('click', function (event) {
                //     // Check if the clicked element or its ancestor is a .plus button
                //     let minusBtn = event.target.closest('.minus');
                //     let txtBtn = event.target.closest('.count-select').querySelector('.count-items');
                //     if (minusBtn) {
                //         // Get the id of the plus button
                //         let targetId = plusBtn.id;
                //         let txtId = txtBtn.id;
                //         minusCount(targetId, txtId);
                //     }
                // });









                // document.querySelectorAll('.plus').forEach(function (plusBtn) {
                //     console.log("plus")
                //     plusBtn.addEventListener('click', function () {
                //         let countInput = this.closest('.count-select').querySelector('.count-items');
                //         let count = parseInt(countInput.value);

                //         // Increment the count value
                //         count++;
                //         countInput.value = count;
                //         updateCartTotal();

                //     });
                //     return;
                // });

                document.querySelectorAll('.remove-item').forEach(function (removeBtn) {
                    console.log("triggered remove")
                    console.log(removeBtn)
                    // currentId=this.closest('.food-item').id
                    // removeBtn.onclick =removeItem(currentId);
                    removeBtn.addEventListener('click', function () {
                        console.log("triggered remove new")
                        // removeItem(1);
                        currentIdDelete = this.closest('.food-item').id;
                        this.closest('.food-item').remove();
                        let index = selectedList.indexOf(currentIdDelete);

                        if (index !== -1) {
                            // If value exists, remove it from the array
                            selectedList.splice(index, 1);
                        }
                        updateCartTotal();
                        console.log(selectedList)
                    })
                });

                let itemId;
                function updateCartTotal() {
                    totalCount = 0;
                    cartTotal = 0;


                    document.querySelectorAll('.count-items').forEach(function (countInput) {
                        console.log("working check")
                        let count = parseInt(countInput.value);
                        let itemPrice = parseFloat(countInput.closest('.food-item').querySelector('.total_amount').textContent.replace(/[^\d.]/g, ''));
                        totalCount += count;
                        console.log(item.price)
                        cartTotal += count * itemPrice;
                    });
                    //     document.querySelectorAll('.count-items').forEach(function(countInput)
                    // {

                    //     itemId=countInput.closest('.food-item').id;
                    //     console.log(itemId+"set")
                    //     document.getElementById(itemId).addEventListener('click',function()
                    // {
                    //     console.log("working plus function")
                    //     let itemPrice = parseFloat(countInput.closest('.food-item').querySelector('.total_amount').textContent.replace(/[^\d.]/g, ''));
                    //         totalCount += count;
                    //         console.log(item.price)
                    //         cartTotal += count * itemPrice;
                    // })
                    // })
                    // for( listItem of selectedList){
                    //     document.getElementById(listItem).addEventListener('click',function(){
                    //         console.log("working plus function")
                    //     })
                    // }

                    document.getElementById('totalCount').textContent = "(" + totalCount + ")";
                    document.getElementById('cart-total').textContent = "₹" + cartTotal;
                }
            }



        }
        )
}

function orderConfirmed() {
    console.log("exit triggered")
    let currentOrder = {
        items: [],
        totalCount: totalCount,
        totalPrize: cartTotal
    };

    document.querySelectorAll('.food-item').forEach(function (item) {
        console.log(item)
        let itemId = item.id;
        let itemCount = parseInt(item.querySelector('.count-items').value);
        currentOrder.items.push({ id: itemId, count: itemCount });
    });

    let currentOrderJSON = JSON.stringify(currentOrder);

    localStorage.setItem('currentOrder', currentOrderJSON);

    window.location.href = "../orderConfirm/index.html";
}

console.log(localStorage.getItem('currentOrder'))


//fetching items
async function fetchData() {
    try {
        const response = await fetch('../../json/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // To check the fetched data
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






//   document.addEventListener('DOMContentLoaded', fetchData);

function removeItem(id) {
    // document.getElementById(id);
    console.log(id)
    document.getElementById(id).textContent = '';
    console.log("click worked")
    console.log(document.getElementById(id))
}
