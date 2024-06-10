
let selectedList=[];
addEventListener('DOMContentLoaded',function(){
    let openShopping = document.getElementById('addToCart');
    console.log(openShopping)
    let closeShopping = document.getElementById('close-button');
    closeShopping.addEventListener('click', () => {
        console.log("closed cart")
        document.body.classList.remove('active');
        console.log(closeShopping)
    })



    // document.getElementById('addToCart').addEventListener('click', displayCartItems);
    document.getElementById('plus').addEventListener('click', function () {
        console.log(document.getElementById('count-items').value)
        let count = parseInt(document.getElementById('count-items').value);

        // Increment the integer value
        count = count + 1;

        // Update the element with the new value
        document.getElementById('count-items').value = count;
        document.getElementById('totalCount').textContent = "(" + document.getElementById('count-items').value + ")";
        console.log(document.getElementById('count-items').value);
        // document.getElementById('sub-total').textContent = "€ " + (count * localStorage.getItem('currentPrice'));
        document.getElementById('cart-total').textContent = "₹" + (count * 120);


    })
    document.getElementById('minus').addEventListener('click', function () {
        console.log(document.getElementById('count-items').value)
        let count = parseInt(document.getElementById('count-items').value);

        // Increment the integer value
        if (count > 0) { count = count - 1; }

        if (count == 0) {
            document.getElementById('cartList').textContent = '';
            document.getElementById('totalCount').textContent = "(0)";
            document.getElementById('cart-total').textContent = 0;
            document.getElementById('sub-total').textContent = 0;
        }

        // Update the element with the new value
        document.getElementById('count-items').value = count;
        document.getElementById('totalCount').textContent = "(" + document.getElementById('count-items').value + ")";
        document.getElementById('sub-total').textContent = "€ " + (count * localStorage.getItem('currentPrice'));
        document.getElementById('cart-total').textContent = "€ " + (count * localStorage.getItem('currentPrice'));

    })

    document.getElementById('totalCount').textContent = "(" + document.getElementById('count-items').value + ")";
    

    document.getElementById('remove-item').addEventListener('click', function () {
        document.getElementById('cartList').textContent = '';
        document.getElementById('totalCount').textContent = "(0)";
        document.getElementById('cart-total').textContent = 0;
        document.getElementById('sub-total').textContent = 0;
    })

   
    
    
    document.querySelectorAll('.select-btn').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            
            // Extract the ID of the parent card
            const itemId = this.closest('.card').id;
            
            // Add the ID to the selectedList array
            if (!selectedList.includes(itemId)) {
                // Add the ID to the selectedList array
                selectedList.push(itemId);}
            
            // Log the updated selectedList
            console.log(selectedList);
        });
    });

    
document.getElementById("openCart").addEventListener('click',displayCartItems);
})
// setTimeout(function () {



    

// }, 200)


// console.log(selectedList)

function openCart() {
    document.body.classList.add('active');
}


function displayCartItems()
{
    const cartItemContainer=document.getElementById('cartList');

    cartItemContainer.innerHTML="";

    console.log(selectedList)

    fetch("./json/data.json")
    .then(response=>response.json())
    .then(data=>{
    items=data;
    console.log("working");
    // console.log(items);

    mainItems=items["main-course"];
    // console.log(mainItems);

    sideItems=items["side-course"];
    // console.log(sideItems)
    drinks=items["drinks"]
    // console.log(drinks)

    for(mainItem of mainItems)
        {
            if(selectedList.includes(mainItem.id.toString()))
                {
                    console.log(mainItem.id)
                    console.log(mainItem.title)
                    createCard(mainItem)
                } 
        }
        for(sideItem of sideItems)
            {
                if(selectedList.includes(sideItem.id.toString()))
                    {
                        console.log(sideItem.id)
                        console.log(sideItem.title)
                        createCard(sideItem)
                    } 
            }
            for(drink of drinks)
                {
                    if(selectedList.includes(drink.id.toString()))
                        {
                            console.log(drink.id)
                            console.log(drink.title)
                            createCard(drink)
                        } 
                }

function createCard(item)
{
    let cartItem = document.createElement('div');
    cartItem.classList.add("d-flex", "row", "food-item");
    
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
    itemTitle.textContent = item.title; // Assuming "item.title" is the title
    
    cartDescDiv.appendChild(itemTitle);
    

    let colorBoxDiv=document.createElement('div');
    colorBoxDiv.classList.add("d-flex", "red-margin");


    let colorDiv = document.createElement('div');
    colorDiv.id = "cart-item-color";
    colorDiv.classList.add("veg-non-box");
    if(item.type=='Non-Veg')
        {
            colorDiv.style.backgroundColor='red';
        }
        else
        {
            colorDiv.style.backgroundColor='green';
        }
    
    colorBoxDiv.appendChild(colorDiv);
    cartDescDiv.appendChild(colorBoxDiv);
    
    let countSelectDiv = document.createElement('div');
    countSelectDiv.classList.add("d-flex", "mt-2", "count-select");
    
    let minusBtnDiv = document.createElement('div');
    minusBtnDiv.classList.add("pad-reomve");
    
    let minusBtn = document.createElement('button');
    minusBtn.type = "button";
    minusBtn.id = "minus";
    
    let minusIcon = document.createElement('i');
    minusIcon.classList.add("bi", "bi-dash");
    
    minusBtn.appendChild(minusIcon);
    minusBtnDiv.appendChild(minusBtn);
    countSelectDiv.appendChild(minusBtnDiv);
    
    let inputDiv = document.createElement('div');
    inputDiv.classList.add("pad-reomve");
    
    let inputField = document.createElement('input');
    inputField.type = "text";
    inputField.style.width = "25px";
    inputField.style.height = "25px";
    inputField.id = "count-items";
    inputField.value = 1;
    inputField.readOnly = true;
    
    inputDiv.appendChild(inputField);
    countSelectDiv.appendChild(inputDiv);
    
    let plusBtnDiv = document.createElement('div');
    plusBtnDiv.classList.add("pad-reomve");
    
    let plusBtn = document.createElement('button');
    plusBtn.type = "button";
    plusBtn.id = "plus";
    
    let plusIcon = document.createElement('i');
    plusIcon.classList.add("bi", "bi-plus");
    
    plusBtn.appendChild(plusIcon);
    plusBtnDiv.appendChild(plusBtn);
    countSelectDiv.appendChild(plusBtnDiv);
    
    
    
    let removeTextDiv = document.createElement('div');
    removeTextDiv.classList.add("remove-text-div");
    
    let removeText = document.createElement('p');
    removeText.classList.add("remove-text");
    
    let removeItemBtn = document.createElement('button');
    removeItemBtn.type = "button";
    removeItemBtn.classList.add("remove-item-button");
    removeItemBtn.textContent = "remove";

    let itemPrice=document.createElement('div');
    itemPrice.classList.add("col-2", "d-flex","justify-content-end");

    let itemPriceText=document.createElement('p');
    itemPriceText.classList.add("fw-semibold");
    itemPriceText.id="total-amount";
    itemPriceText.textContent="₹"+item.price;

    itemPrice.appendChild(itemPriceText);

    
    removeText.appendChild(removeItemBtn);
    removeTextDiv.appendChild(removeText);
    countSelectDiv.appendChild(removeTextDiv);
    
    cartDescDiv.appendChild(countSelectDiv);
    cartItem.appendChild(itemImageDiv);
    cartItem.appendChild(cartDescDiv);
    cartItem.appendChild(itemPrice);
    
    cartItemContainer.appendChild(cartItem); 
}


    
}
)
}
