async function fetchData() {
    try {
        const response = await fetch('../../json/data.json'); // Adjust the path to your data.json file
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function getItemDetailsById(id, data) {
    const allItems = [...data["main-course"], ...data["side-course"], ...data["drinks"]];
    return allItems.find(item => item.id.toString() === id.toString());
}

async function displayOrderDetails() {
    const orderDetailsContainer = document.getElementById('order-details');
    const totalCountElement = document.getElementById('total-count');
    const totalPriceElement = document.getElementById('total-price');

    const currentOrderJSON = localStorage.getItem('currentOrder');
    console.log(currentOrderJSON)
    if (!currentOrderJSON) {
        orderDetailsContainer.innerHTML = '<p>No order found.</p>';
        return;
    }

    const currentOrder = JSON.parse(currentOrderJSON);
    const items = currentOrder.items;
    const totalCount = currentOrder.totalCount;
    const totalPrize = currentOrder.totalPrize;

    const data = await fetchData();
    if (!data) {
        orderDetailsContainer.innerHTML = '<p>Error loading order details.</p>';
        return;
    }

    for (const item of items) {
        const itemDetails = await getItemDetailsById(item.id, data);
        if (itemDetails) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('order-item');

            itemDiv.innerHTML = `
                <img src="${itemDetails.image}" alt="${itemDetails.title}" class="order-item-image">
                <div class="order-item-details">
                    <p class="order-item-title">${itemDetails.title}</p>
                    <p class="order-item-count">Quantity: ${item.count}</p>
                    <p class="order-item-price">Price: ₹${itemDetails.price}</p>
                </div>
            `;

            orderDetailsContainer.appendChild(itemDiv);
        } else {
            console.error(`Item details for item with id ${item.id} could not be found.`);
        }
    }

    totalCountElement.textContent = `Total Items: ${totalCount}`;
    totalPriceElement.textContent = `Total Price: ₹${totalPrize}`;
}

document.addEventListener('DOMContentLoaded', displayOrderDetails);


document.addEventListener('DOMContentLoaded', async function () {
    const deliveryUsername = document.getElementById('delivery-username');
    const deliveryAddress = document.getElementById('delivery-address');

    // Get the current user information from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        deliveryUsername.textContent = `Name: ${currentUser.username}`;
        deliveryAddress.textContent = `Address: ${currentUser.address}`;
    } else {
        deliveryUsername.textContent = 'No user information found. Please log in.';
        deliveryAddress.textContent = '';
    }

   
});
