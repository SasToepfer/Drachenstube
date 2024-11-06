const deliveryFee = 5;
let preSum = 0;
let finalSum = 0;

function init() {
    showDishes();
}

function showDishes() {
    for (let index = 0; index < myDishes.length; index++) {
        document.getElementById("main-dishes").innerHTML += writeContent(myDishes,index);
    }
    for (let index = 0; index < myDesserts.length; index++) {
        document.getElementById("main-desserts").innerHTML += writeContent(myDesserts,index);
    }
    for (let index = 0; index < myDrinks.length; index++) {
        document.getElementById("main-drinks").innerHTML += writeContent(myDrinks,index);
    }
}

function addToBasket(dishName) {
    let priceRef = 0;
    let ArrayRef = getBaseArray(dishName);
    let IndexRef = getBaseIndex(dishName);
    if (myBasket.find(e => e.name === dishName)) {
        let BasketIndexRef = getBasketIndex(dishName);
        myBasket[BasketIndexRef].basketAmount += 1;
    } else {
        priceRef = setBasketPrice(IndexRef, ArrayRef)
        myBasket.push({ "name": dishName, "price": priceRef, "basketAmount": 1});
    }
    renderBasket();
    writePayText();
}

function subtractFromBasket(dishName) {
    let indexRef = getBasketIndex(dishName);
    if (myBasket[indexRef].basketAmount - 1 <= 0) {
        removeFromBasket(dishName);
    } else {
        myBasket[indexRef].basketAmount = myBasket[indexRef].basketAmount - 1;
        renderBasket();
        writePayText();
    }
}

function removeFromBasket(dishName) {
    let indexRef = getBasketIndex(dishName);
    myBasket.splice(indexRef, 1);
    renderBasket();
    if (myBasket.length == 0) {
        hidePayText();
    } else {
        writePayText();
    }
}

function writePayText() {
    hidePayText();
    preSum = parseFloat(calculateSum().toFixed(2));
    if (preSum >= 50) {
        finalSum = preSum;
    } else {
        finalSum = preSum + deliveryFee;
        document.getElementById("sub-sum").innerHTML = writeTextAndPrice("Zwischensumme", preSum);
        document.getElementById("delivery-fee").innerHTML = writeTextAndPrice("Lieferkosten", deliveryFee);
    }
    finalSum = parseFloat(finalSum.toFixed(2));
    document.getElementById("final-sum").innerHTML = writeTextAndPrice("Gesamtsumme", finalSum);    
}

function hidePayText() {
    document.getElementById("sub-sum").innerHTML = "";
    document.getElementById("delivery-fee").innerHTML = "";
    document.getElementById("final-sum").innerHTML = "";
}

function setBasketPrice(index, array) {
    switch (array) {
        case "myDishes":
            return myDishes[index].price;
        case "myDesserts":
            return myDesserts[index].price;
        case "myDrinks":
            return myDrinks[index].price;
    }
}

function renderBasket() {
    document.getElementById("bought-dishes").innerHTML = "";
    for (let index = 0; index < myBasket.length; index++) {
        document.getElementById("bought-dishes").innerHTML += writeBasket(index);
    }
}

function calculateSum() {
    let sum = 0;
    for (let index = 0; index < myBasket.length; index++) {
        sum += myBasket[index].price * myBasket[index].basketAmount;
    }
    return sum;
}

function getBaseArray(dishName) {
    if (myDishes.find(e => e.name == dishName)) {return "myDishes"}
    if (myDesserts.find(e => e.name == dishName)) {return "myDesserts"}
    if (myDrinks.find(e => e.name == dishName)) {return "myDrinks"}
}

function getBaseIndex(dishName) {
    for (let index = 0; index < myDishes.length; index++) {
        if (myDishes[index].name == dishName) {
            return index;
        }
    }
    for (let index = 0; index < myDesserts.length; index++) {
        if (myDesserts[index].name == dishName) {
            return index;
        }
    }
    for (let index = 0; index < myDrinks.length; index++) {
        if (myDrinks[index].name == dishName) {
            return index;
        }
    }
}

function getBasketIndex(dishName) {
    for (let index = 0; index < myBasket.length; index++) {
        if (myBasket[index].name == dishName) {
            return index;
        }
    }
}

function orderBasket() {
    if (myBasket.length != 0) {
        myBasket = [];
        renderBasket();
        writePayText()
        toggleOrderDialog("Danke für ihre Bestellung");
    } else {
        toggleOrderDialog("Bitte erst etwas in den Warenkorb legen");
    }
}

function toggleOrderDialog(text) {
    document.getElementById("order-overlay").classList.toggle("d-none");
    document.body.classList.toggle("o-hid");
    document.getElementById("dialog-text").innerHTML = text;
    hidePayText();
}

function stopBubbling(event) {
    event.stopPropagation();
}

function showBasketMobile() {
    document.getElementById("basket-wrapper").classList.toggle("basket-wrapper-closed");
    document.body.classList.toggle("o-hid");
}
