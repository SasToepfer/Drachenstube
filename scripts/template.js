function writeContent(array ,index) {
    return `<div class="dish-block block-border content-distance">
                <div>
                    <h3>${array[index].name}</h3>
                    <p class="description">${array[index].description}</p>
                    <p class="price">${array[index].price} €</p>
                </div>
                <img src="img/plus.png" class="add-btn" onclick="addToBasket('${array[index].name}')" alt="add"></img>
            </div>`
}

function writeBasket(index) {
    return `<div class="basket-single-item-wrapper block-border">
                <h3>${myBasket[index].name}</h3>
                <div class="basket-single-item">
                    <div class="add-remove">
                        <img class="add-btn" onclick="subtractFromBasket('${myBasket[index].name}')" src="img/minus.png" alt="minus">
                        ${myBasket[index].basketAmount}
                        <img class="add-btn" onclick="addToBasket('${myBasket[index].name}')" src="img/plus.png" alt="plus">
                    </div>
                    ${(myBasket[index].price * myBasket[index].basketAmount).toFixed(2)} €
                    <img class="add-btn" onclick="removeFromBasket('${myBasket[index].name}')" src="img/trash.png" alt="delete">
                </div>
            </div>`
}

function writeTextAndPrice(text, price) {
    return `<span>${text}</span>
            <span>${price.toFixed(2)} €</span>`
}