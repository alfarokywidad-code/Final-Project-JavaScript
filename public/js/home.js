let searchInput = document.getElementById("searchInput");
let pizzaCards = document.querySelectorAll(".pizza-card");
let categorySelect = document.getElementById("categorySelect");

let addButtons = document.querySelectorAll(".add-button");
let cartCount = document.querySelector(".mon-panier span");

// !==============this is for fillter and search
function filterPizzas() {
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categorySelect.value;
    pizzaCards.forEach(function (card) {
        const pizzaName = card.querySelector("h3").textContent.toLowerCase();
        const pizzaType = card.querySelector(".pizza-type").textContent.toLowerCase();
        const matchSearch = pizzaName.includes(searchValue);
        let matchCategory = true;
        if (categoryValue === "classic") {
            matchCategory = pizzaType.includes("classique");
        }

        if (categoryValue === "vegetarian") {
            matchCategory = pizzaType.includes("végétarienne");
        }

        if (categoryValue === "special") {
            matchCategory = !pizzaType.includes("classique") && !pizzaType.includes("végétarienne");
        }
        if (matchSearch && matchCategory) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}
searchInput.addEventListener("input", filterPizzas);
categorySelect.addEventListener("change", filterPizzas);
// !===================this is for total panier
let cartTotal = 0;

addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        cartTotal++;
        cartCount.textContent = cartTotal;
    });
});

let cartButton = document.querySelector(".mon-panier a");
let cartDrawer = document.querySelector(".cart-drawer");
let cartOverlay = document.querySelector(".cart-overlay");

// !===================this is for open panier
cartButton.addEventListener("click", function (event) {
    event.preventDefault();

    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
});
// !===================this is for close panier
let closeCart = document.querySelector(".cart-close");
closeCart.addEventListener("click", function (event) {
event.preventDefault
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

});




