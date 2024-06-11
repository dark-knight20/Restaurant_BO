const cartData = {
    "items": [
        {"id":"1","count":4},
        {"id":"2","count":1},
        {"id":"3","count":1}
    ],
    "totalCount": 6,
    "totalPrize": 900
};

// const itemDetails = {
//     "1": { title: 'Apples', price: 1.00, image: 'apple.jpg' },
//     "2": { title: 'Bananas', price: 0.50, image: 'banana.jpg' },
//     "3": { title: 'Oranges', price: 0.75, image: 'orange.jpg' }
//     // Add more items as needed
// };

function displayItems(cartData, containerId) {
    const container = document.getElementById(containerId);
    cartData.items.forEach(cartItem => {
        const item = itemDetails[cartItem.id];
        const row = document.createElement('div');
        row.innerHTML = `
            <span class="d-flex">
                <div class="item">${item.title}</div>
                <div class="quantity">${cartItem.count}</div>
                <div class="price">$${item.price.toFixed(2)} each</div>
            </span>
        `;
        container.appendChild(row);
    });

    // Display total count and prize
    const summaryRow = document.createElement('div');
    summaryRow.innerHTML = `
        <span class="d-flex mt-4">
            <div class="total">Total Items: ${cartData.totalCount}</div>
            <div class="total">Total Prize: $${cartData.totalPrize.toFixed(2)}</div>
        </span>
    `;
    container.appendChild(summaryRow);
}

document.addEventListener('DOMContentLoaded', () => {
    displayItems(cartData, 'itemsContainer');
});