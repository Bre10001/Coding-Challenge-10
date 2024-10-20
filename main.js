// Declare elements
const sizeSelector = document.getElementById("product-size");
const priceElement = document.getElementById("product-price");
const purchaseButton = document.getElementById("purchase-button"); // Declare the purchase button
const inventoryCount = document.getElementById("inventory-count"); // Declare the inventory count display


const stockAvailability = { // stock availability and price for each size
    small: { price: 20, stock: 5 },
    medium: { price: 25, stock: 0 }, 
    large: { price: 30, stock: 3 }
};

//Task 2: Add Event Listeners for Product Selection

function updateInventory() { // function to update the inventory and availability
    const selectedSize = sizeSelector.value; // Get the selected size (small, medium, large)
    const { stock } = stockAvailability[selectedSize]; // Get stock information for the selected size

    if (stock > 0) {
        purchaseButton.disabled = false; // Enable the purchase button if stock is available
        inventoryCount.textContent = `Available Stock: ${stock}`; // Show available stock
    } else {
        purchaseButton.disabled = true; // Disable the button if out of stock
        inventoryCount.textContent = "Out of Stock"; // Display out of stock message
    }
}


sizeSelector.addEventListener("change", () => { // event listener to update price and inventory on size change
    const selectedSize = sizeSelector.value;
    const { price } = stockAvailability[selectedSize]; // Get the price for the selected size
    
    priceElement.textContent = `$${price}`; // Update the price display
    updateInventory(); // Update inventory display
});

// Task 3: Handle Stock Availability
purchaseButton.addEventListener("click", () => { // add event listener for the purchase button (checkout event)
    const selectedSize = sizeSelector.value;
    const { stock } = stockAvailability[selectedSize];

    
    if (stock > 0) { // check if the product is available
        alert("Thank you for your purchase! Your item has been successfully added to the cart.");
        stockAvailability[selectedSize].stock--; // Decrease stock by 1 after purchase
        updateInventory(); // Update the inventory after the purchase
    } else {
        alert("Sorry, this product is out of stock and cannot be purchased.");
    }
});

// initialize the page with the default selection
sizeSelector.dispatchEvent(new Event("change")); // trigger a change event on page load to initialize the page

// Task 4: Create a Checkout Event

purchaseButton.addEventListener("click", () => { // add an event listener for the purchase button (checkout event)
    const selectedOption = sizeSelector.options[sizeSelector.selectedIndex];
    const stockStatus = selectedOption.getAttribute("data-stock");

    
    if (stockStatus === "in-stock") { // check if the product is available before proceeding
        alert("Thank you for your purchase! Your item has been successfully added to the cart.");
    } else if (stockStatus === "out-of-stock") {
        alert("Sorry, this product is out of stock and cannot be purchased.");
    }
});

// Initialize the page with the default selection
sizeSelector.dispatchEvent(new Event("change")); // Trigger a change event on page load to initialize

//Task 5: Implement Event Delegation for Dynamic Product List

//   new elements
const productList = document.getElementById("product-list");
const addProductButton = document.getElementById("add-product-button");
const newProductName = document.getElementById("new-product-name");
const newProductSize = document.getElementById("new-product-size");
const newProductPrice = document.getElementById("new-product-price");
const newProductStock = document.getElementById("new-product-stock");


addProductButton.addEventListener("click", (event) => { // event listener for dynamically adding new products
    event.preventDefault(); // prevent form submission behavior
    
    const productName = newProductName.value;
    const productSize = newProductSize.value;
    const productPrice = newProductPrice.value;
    const productStock = newProductStock.value;
    
    // ensure all fields are filled
    if (!productName || !productSize || !productPrice) {
        alert("Please fill in all the fields.");
        return;
    }
    
    
    const productDiv = document.createElement("div"); // create a new product div
    productDiv.classList.add("product");

    // insert new product HTML structure
    productDiv.innerHTML = `
        <h3>${productName}</h3>
        <p class="product-price">$${productPrice}</p>
        <label for="product-size">Select Size: ${productSize}</label>
        <select class="product-size">
            <option value="${productPrice}" data-stock="${productStock}">
                ${productSize}: ${productStock === 'in-stock' ? 'In Stock' : 'Out of Stock'}
            </option>
        </select>
        <p class="availability">${productStock === 'in-stock' ? 'In Stock' : 'Out of Stock'}</p>
        <button class="purchase-button" ${productStock === 'out-of-stock' ? 'disabled' : ''}>Purchase</button>
    `;

    
    productList.appendChild(productDiv); // add new product to the product list

    
    newProductName.value = ''; // clear the form after product is added
    newProductSize.value = '';
    newProductPrice.value = '';
});


productList.addEventListener("change", (event) => { // event delegation for handling size change and purchase click
    if (event.target.classList.contains("product-size")) {
        const productDiv = event.target.closest(".product");
        const selectedOption = event.target.options[event.target.selectedIndex];
        const priceElement = productDiv.querySelector(".product-price");
        const availabilityElement = productDiv.querySelector(".availability");
        const purchaseButton = productDiv.querySelector(".purchase-button");

        const selectedPrice = selectedOption.value;
        const stockStatus = selectedOption.getAttribute("data-stock");

        
        priceElement.textContent = `$${selectedPrice}`; // update price and availability
        availabilityElement.textContent = stockStatus === "in-stock" ? "In Stock" : "Out of Stock";
        purchaseButton.disabled = stockStatus === "out-of-stock";
    }
});


productList.addEventListener("click", (event) => { // Event delegation for handling purchase button click
    if (event.target.classList.contains("purchase-button")) {
        const productDiv = event.target.closest(".product");
        const availabilityElement = productDiv.querySelector(".availability");

        if (availabilityElement.textContent === "In Stock") {
            alert("Thank you for your purchase! Your item has been successfully added to the cart.");
        } else {
            alert("Sorry, this product is out of stock and cannot be purchased.");
        }
    }
});
