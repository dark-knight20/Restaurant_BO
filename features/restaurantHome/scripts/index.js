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
      <div class="card mb-3">
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
                          <a class="btn btn-dark" onclick= "cartFunction(id,item)">Add+</a>
                      </span>
                  </div>
              </div>
          </div>
      </div>
      `;
      container.appendChild(card);
  });
}


let cart = [];

function cartFunction(id, item) {
    const cartItem = {
        id: id,
        item: item
    };
    
    cart.push(cartItem);

    console.log(cart); 
}





document.addEventListener('DOMContentLoaded', fetchData);


