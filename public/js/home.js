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

let backShopping = document.querySelector(".continue-shopping");
backShopping.addEventListener("click", function (event) {
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

// !===================this is for checkout page

let checkoutPage = document.querySelector(".checkout-page");
let checkoutButton = document.querySelector(".checkout-button");
let checkoutClose = document.querySelector(".checkout-close");

let checkoutPizzasPrice = document.querySelector(".checkout-pizzas-price");
let checkoutTotalPrice = document.querySelector(".checkout-total-price");

let deliveryLabel = document.querySelector(".delivery-label");
let deliveryPrice = document.querySelector(".delivery-price");

let orderOptions = document.querySelectorAll(".order-option");
let deliveryAddress = document.querySelector(".delivery-address");

// !===================this is for open checkout

checkoutButton.addEventListener("click", function () {

    if (cartTotal === 0) {
        return;
    }
    cartEmpty.hidden = true;
    cartFooter.hidden = true;
    checkoutPage.hidden = false;

    updateCheckout();

});

// !===================this is for close checkout

checkoutClose.addEventListener("click", function () {

    checkoutPage.hidden = true;
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

});

// !===================this is for order type

orderOptions.forEach(function (option) {

    option.addEventListener("click", function () {
        orderOptions.forEach(function (item) {
            item.classList.remove("active");
        });

        option.classList.add("active");
        let radio = option.querySelector("input");
        radio.checked = true;
        updateCheckout();
    });

});


// !===================this is for update checkout

function updateCheckout() {

    let pizzasPrice = 0;
    cartItems.forEach(function (item) {

        if (!item.hidden) {
            let quantity = Number( item.querySelector(".quantity").textContent);
            let priceText = item.querySelector(".cart-item-info p").textContent;
            let price = Number(priceText.split(" ")[0]);
            pizzasPrice = pizzasPrice + quantity * price;
        }
    });


    let selectedOption = document.querySelector('input[name="orderType"]:checked');

    let deliveryCost = 0;
    if (selectedOption.value === "delivery") {
        deliveryCost = 20;
        deliveryLabel.textContent = "Livraison";
        deliveryPrice.textContent = "20 MAD";
        deliveryAddress.hidden = false;

    } else {
        deliveryLabel.textContent = "À emporter";
        deliveryPrice.textContent = "Gratuit";
        deliveryAddress.hidden = true;
    }

    let totalPrice = pizzasPrice + deliveryCost;
    checkoutPizzasPrice.textContent = pizzasPrice + " MAD";
    checkoutTotalPrice.textContent = totalPrice + " MAD";

}

// !===================this is for phone validation
let customerPhone = document.getElementById("customerPhone");
let phoneError = document.querySelector(".phone-error");

customerPhone.addEventListener("input", function () {
    let phoneValue = customerPhone.value.trim();
    let cleanPhone = phoneValue.replace(/[\s()-]/g, "");

    // !+212
    if (cleanPhone.startsWith("+212")) {
        let numberAfterCode =
            cleanPhone.substring(4);

        if (numberAfterCode.length > 9) {

            phoneError.textContent = "Le numéro ne doit pas dépasser 10 chiffres.";
            phoneError.hidden = false;
            customerPhone.classList.add("phone-invalid");
            return;
        }

        if (numberAfterCode.length < 9) {
            phoneError.textContent = "Indiquez un numéro marocain valide, par exemple +212 6 12 34 56 78.";
            phoneError.hidden = false;
            customerPhone.classList.add("phone-invalid");
            return;
        }


        if (!/^[5678]\d{8}$/.test(numberAfterCode)) {

            phoneError.textContent =
                "Indiquez un numéro marocain valide.";
            phoneError.hidden = false;
            customerPhone.classList.add("phone-invalid");
            return;
        }
    }
    // !LOCAL MOROCCAN NUMBER
    else {
        if (cleanPhone.length > 10) {
            phoneError.textContent = "Le numéro ne doit pas dépasser 10 chiffres.";
            phoneError.hidden = false;
            customerPhone.classList.add("phone-invalid");
            return;
        }


        if (cleanPhone.length < 10) {
            phoneError.textContent ="Indiquez un numéro marocain valide, par exemple 06 12 34 56 78.";
            phoneError.hidden = false;
            customerPhone.classList.add("phone-invalid");
            return;
        }
        if (!/^(05|06|07|08)\d{8}$/.test(cleanPhone)) {
            phoneError.textContent = "Indiquez un numéro marocain valide.";
            phoneError.hidden = false;
            customerPhone.classList.add("phone-invalid");
            return;
        }
    }

    phoneError.hidden = true;
    customerPhone.classList.remove("phone-invalid");

});

// !============== this is retoure
let backCartText = document.querySelector(".back-cart-text");

backCartText.addEventListener("click", function (event) {
    event.preventDefault();
    checkoutPage.hidden = true;
    cartFooter.hidden = false;

});


let orderSuccess = document.querySelector(".order-success");
let confirmOrder = document.querySelector(".confirm-order");
let successClose = document.querySelector(".success-close");
let returnMenu = document.querySelector(".return-menu");
let customerNameResult = document.querySelector(".customer-name-result");
let customerPhoneResult = document.querySelector(".customer-phone-result");
let successItems = document.querySelector(".success-items");
let successTotalPrice = document.querySelector(".success-total-price");
let successOrderType = document.querySelector(".success-order-type");
let successDeliveryPrice = document.querySelector(".success-delivery-price");

// !===================this is for confirm order
confirmOrder.addEventListener("click", function () {
    let customerName = document.getElementById("customerName").value.trim();
    let customerPhone = document.getElementById("customerPhone").value.trim();
    if (customerName === "") {
        document.getElementById("customerName").focus();
        return;
    }

    if (customerPhone === "") {
        document.getElementById("customerPhone").focus();
        return;
    }

    if (document.getElementById("customerPhone").classList.contains("phone-invalid")) {
        document.getElementById("customerPhone").focus();
        return;
    }

    customerNameResult.textContent = customerName;
    customerPhoneResult.textContent = customerPhone;

    // *create order items
    successItems.innerHTML = "";
    let finalTotal = 0;
    cartItems.forEach(function (item) {
        if (!item.hidden) {
            let quantity = Number(item.querySelector(".quantity").textContent);
            let pizzaName = item.querySelector(".cart-item-info h3").textContent;
            let priceText = item.querySelector(".cart-item-info p").textContent;
            let price = Number(priceText.split(" ")[0]);
            let itemTotal = quantity * price;
            finalTotal = finalTotal + itemTotal;
            let successItem = document.createElement("div");
            successItem.className = "success-item";
            successItem.innerHTML =
                "<span>" +
                quantity +
                " * " +
                pizzaName +
                "</span>" +
                "<strong>" +
                itemTotal +
                " MAD" +
                "</strong>";
            successItems.appendChild(successItem);

        }

    });

    // *delivery price
    let selectedOption = document.querySelector('input[name="orderType"]:checked');

    if (selectedOption.value === "delivery") {
        successOrderType.textContent = "En livraison";
        successDeliveryPrice.textContent = "+ 20 MAD";
        finalTotal = finalTotal + 20;

    } else {
        successOrderType.textContent = "À emporter";
        successDeliveryPrice.textContent = "Sans frais";

    }
    successTotalPrice.textContent = finalTotal + " MAD";
    checkoutPage.hidden = true;
    orderSuccess.hidden = false;

});

// !===================this is for return to menu
returnMenu.addEventListener("click", function () {
    orderSuccess.hidden = true;
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
});

// !===================this is for close success
successClose.addEventListener("click", function () {

    orderSuccess.hidden = true;
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

});