// Declare elements
const sizeSelector = document.getElementById("product-size");
const priceElement = document.getElementById("product-price");

// Add event listener to the dropdown
sizeSelector.addEventListener("change", (event) => {
    const selectedPrice = event.target.value; // Get the price directly from the selected option
    priceElement.textContent = `$${selectedPrice}`; // Update the price display
});
