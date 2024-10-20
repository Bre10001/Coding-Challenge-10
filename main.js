
// Declaration of price and sizing
const priceElement = document.getElementById("product-price");
const sizeSelector = document.getElementById("size-selector");


sizeSelector.addEventListener("change", (event) => {
const selectedPrice = event.target.value;
priceElement.textContent = `$${selectedPrice}`;
});
