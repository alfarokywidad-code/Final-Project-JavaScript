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

let cartMenu = document.querySelector(".cart-start");

// !===================this is for open panier
cartButton.addEventListener("click", function (event) {
    event.preventDefault();

    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
});

// !===================this is for close panier
let closeCart = document.querySelector(".cart-close");
closeCart.addEventListener("click", function (event) {
    event.preventDefault();
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

});

cartMenu.addEventListener("click", function (event) {
    event.preventDefault();
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

});

let cartItems = document.querySelectorAll(".cart-item");
let cartEmpty = document.querySelector(".cart-empty");
let cartFooter = document.querySelector(".cart-footer");
let cartTotalPrice = document.querySelector(".cart-total strong");


// !===================this is for update panier

function updateCart() {
    cartTotal = 0;

    let totalPrice = 0;

    cartItems.forEach(function (item) {
        if (!item.hidden) {
            let quantity = Number(item.querySelector(".quantity").textContent);

            let priceText = item.querySelector(".cart-item-info p").textContent;
            let price = Number(priceText.split(" ")[0]);

            cartTotal = cartTotal + quantity;

            totalPrice = totalPrice + quantity * price;

            item.querySelector(".cart-item-price strong").textContent =
                quantity * price + " DH";
        }
    });

    cartCount.textContent = cartTotal;

    cartTotalPrice.textContent = totalPrice + " DH";

    if (cartTotal === 0) {
        cartEmpty.hidden = false;
        cartFooter.hidden = true;
    } else {
        cartEmpty.hidden = true;
        cartFooter.hidden = false;
    }
}
// !===================this is for add pizza to panier

addButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        // *change button color temporarily
        button.classList.add("added");
        button.textContent = "✓ Ajoutée";
        setTimeout(function () {
            button.classList.remove("added");
            button.textContent = "+ Ajouter";
        }, 1200);
        let pizzaCard = button.closest(".pizza-card");
        let pizzaName = pizzaCard.querySelector("h3").textContent.trim();

        cartItems.forEach(function (item) {

            let cartPizzaName = item.querySelector(".cart-item-info h3").textContent.trim();
            if (pizzaName === cartPizzaName) {

                if (item.hidden) {
                    item.hidden = false;
                    item.querySelector(".quantity").textContent = 1;
                } else {
                    let quantity = item.querySelector(".quantity");
                    quantity.textContent = Number(quantity.textContent) + 1;
                }
            }
        });

        updateCart();

    });
});

// !===================this is for increase quantity

cartItems.forEach(function (item) {
    let plusButton = item.querySelector(".quantity-plus");
    plusButton.addEventListener("click", function () {
        let quantity = item.querySelector(".quantity");

        quantity.textContent = Number(quantity.textContent) + 1;

        updateCart();
    });
});


// !===================this is for decrease quantity

cartItems.forEach(function (item) {
    let minusButton = item.querySelector(".quantity-minus");

    minusButton.addEventListener("click", function () {
        let quantity = item.querySelector(".quantity");
        let currentQuantity = Number(quantity.textContent);
        if (currentQuantity > 1) {
            quantity.textContent = currentQuantity - 1;
        } else {
            item.hidden = true;
            quantity.textContent = 1;
        }

        updateCart();
    });
});


// !===================this is for remove pizza

cartItems.forEach(function (item) {
    let removeButton = item.querySelector(".remove-item");
    removeButton.addEventListener("click", function () {
        item.hidden = true;

        item.querySelector(".quantity").textContent = 1;

        updateCart();
    });
});


// !===================this is for initialize panier
updateCart();

