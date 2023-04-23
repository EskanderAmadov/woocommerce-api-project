// Get the product ID from the URL parameter
const productId = new URLSearchParams(window.location.search).get('id');

// Set up the API endpoint URL and authentication details
const apiUrl = `https://amadovs.no/wp-json/wc/v3/products/${productId}`;
const auth = btoa('ck_e0234e53e27149a7280ed17cfa46c46d14685d41:cs_9e9553a0c3305247d2be71a8e11539a00a43b557');

// Make the API request using fetch
fetch(apiUrl, { headers: { Authorization: `Basic ${auth}` } })
  .then(response => response.json())
  .then(product => {
    // Create HTML elements for the product data
    const productDetail = document.getElementById('product-detail');
    productDetail.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.images[0].src}" />
      <div class="product-details-wrapper">
      <p>Categories: ${product.categories.map(category => category.name).join(', ')}</p>
        <p>Price: ${product.price}</p>
        <p>${product.description}</p>
      </div>
    `;
  })
  .catch(error => {
    // Handle any errors that occur
    console.error(error);
  });

function goToHomePage() {
  window.location.href = 'index.html';
}
