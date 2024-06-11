let curr

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