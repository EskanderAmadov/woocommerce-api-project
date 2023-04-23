      // Set up the API endpoint URL and authentication details
      const apiUrl = 'https://amadovs.no/wp-json/wc/v3/products';
      const consumerKey = 'ck_e0234e53e27149a7280ed17cfa46c46d14685d41';
      const consumerSecret = 'cs_9e9553a0c3305247d2be71a8e11539a00a43b557';

      fetch(apiUrl, {
        headers: {
          Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
        },
      })
        .then(response => response.json())
        .then(products => {
          const allProductsGridHtml = products.map(product => `
            <div class="product-thumbnail">
              <div class="img-wrapper">
                <img src="${product.images[0].src}" alt="${product.name}">
              </div>
              <div class="product-information"> 
                <h2>${product.name}</h2>
                <p>Price: ${product.price}</p>
                <a href="product-detail.html?id=${product.id}">Read More</a>
              </div>
            </div>
          `).join('');
          const featuredProducts = products.filter(product => product.featured);
          const featuredProductsGridHtml = featuredProducts.map(product => `
          <div class="product-thumbnail">
          <div class="img-wrapper">
            <img src="${product.images[0].src}" alt="${product.name}">
          </div>
          <div class="product-information"> 
            <h2>${product.name}</h2>
            <p>Price: ${product.price}</p>
            <a href="product-detail.html?id=${product.id}">Read More</a>
          </div>
        </div>
          `).join('');

          const allProductsGrid = document.getElementById('products-grid');
          allProductsGrid.innerHTML = allProductsGridHtml;

          const featuredProductsGrid = document.getElementById('featured-products-grid');
          featuredProductsGrid.innerHTML = featuredProductsGridHtml;
        })
        .catch(error => {
          console.error(error);
        });