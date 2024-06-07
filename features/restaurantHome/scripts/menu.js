async function fetchData() {
    try {
      const response = await fetch('../json/data.json').then(response=>response.json);
      console.log(response);
      const data = await response.json();
      displayItems(data.dishes, 'dishes-container');
      displayItems(data.sides, 'sides-container');
      displayItems(data.drinks, 'drinks-container');
    } catch (error) {
      console.error('Error fetching the data:', error);
    }
  }

  function displayItems(items, containerId) {
    const container = document.getElementById(containerId);
    items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('col');
      card.innerHTML = `
        <div class="card mb-3 w-60">
            <div class="row g-0">
                <div class="col-md-5">
                    <img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}" />
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">
                            ${item.description}
                        </p>
                        <span>
                            <p>MRP : ₹${item.price}</p>
                            <a href="#" class="btn btn-dark">Add+</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
      `;
      
      container.appendChild(card);
    });
  }

  document.addEventListener('DOMContentLoaded', fetchData);