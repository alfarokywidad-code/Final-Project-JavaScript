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

// !===================this is for panier
let cartTotal = 0;

addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        cartTotal++;
        cartCount.textContent = cartTotal;
    });
});

