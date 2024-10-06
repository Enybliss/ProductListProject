const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.querySelector(".cartItems");
const itemCountElement = document.getElementById("countItems");
const totalAmountElement = document.getElementById("total-amount");
const orderConfirmationCard = document.getElementById("orderConfirmationCard");
const orderedItemsList = document.getElementById("orderedItemsList");
const finalTotalElement = document.getElementById("finalTotal");
const confirmDeliveryButton = document.querySelector(".confirm-delivery");


console.log(addToCartButtons);
let cart = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Button clicked");
        const productCard = button.closest('.productcard');
        const productImage = productCard.querySelector('img').src;
        const productName = productCard.querySelector('.productName').textContent; // Fixed reference
        const productPrice = parseFloat(productCard.querySelector('.productPrice').textContent.replace('$', ''));

        const cartItem = {
            image: productImage,
            name: productName,
            price: productPrice
        };

        cart.push(cartItem);
        renderCartItems();
        updateCartItemCount();
        updateCartTotal();
    });
});

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    orderedItemsList.innerHTML = '';

    if (cart.length === 0) {
        const emptyCartImage = document.createElement('img');
        emptyCartImage.src = 'https://res.cloudinary.com/df5zacepv/image/upload/v1726877503/illustration-empty-cart_efjnrc.svg';
        emptyCartImage.alt = 'Empty Cart';
        emptyCartImage.style.width = '200px';
        emptyCartImage.style.display = 'block';
        emptyCartImage.style.margin = '0 auto';

        const emptyCartText = document.createElement('p');
        emptyCartText.textContent = 'Your added items will appear here';
        emptyCartText.style.textAlign = 'center'; // Fixed typo 'centre' to 'center'
        emptyCartText.style.color = '#b86a1e';
        emptyCartText.style.fontSize = '0.7em';

        cartItemsContainer.appendChild(emptyCartImage);
        cartItemsContainer.appendChild(emptyCartText);
        finalTotalElement.textContent = '0.00';
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.style.display = 'flex';
            cartItemDiv.style.justifyContent = 'space-between';
            cartItemDiv.style.alignItems = 'center';
            cartItemDiv.style.marginBottom = '10px';

            const img = document.createElement('img');
            img.src = item.image;
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.objectFit = 'cover';

            const infoDiv = document.createElement('div');
            infoDiv.style.flex = '1';
            infoDiv.style.marginLeft = '10px';
            infoDiv.innerHTML = `<h3 style="font-size: 0.9em;">${item.name}</h3><p style="color: #b86a1e;">$${item.price.toFixed(2)}</p>`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '✖';
            removeBtn.style.cursor = 'pointer';
            removeBtn.style.backgroundColor = 'transparent';
            removeBtn.style.border = 'none';
            removeBtn.style.color = '#b86a1e';
            removeBtn.style.fontSize = '1.5em';

            removeBtn.addEventListener('click', () => {
                removeCartItem(index);
            });

            cartItemDiv.appendChild(img);
            cartItemDiv.appendChild(infoDiv);
            cartItemDiv.appendChild(removeBtn);
            cartItemsContainer.appendChild(cartItemDiv);

            const orderedItemListItem = document.createElement('li');
            orderedItemListItem.innerHTML = `<img src="${item.image}" style="width: 30px; height: 30px; object-fit: cover; margin-right: 10px;"> ${item.name} - $${item.price.toFixed(2)}`;
            orderedItemsList.appendChild(orderedItemListItem);
            total += item.price;
        });

        finalTotalElement.textContent = total.toFixed(2);
    }
}

function removeCartItem(index) {
    cart.splice(index, 1); 
    renderCartItems(); 
    updateCartItemCount();
    updateCartTotal(); 
}

function updateCartItemCount() {
    itemCountElement.textContent = cart.length;
}

function updateCartTotal() {
    let total = cart.reduce((accum, item) => accum + item.price, 0);
    totalAmountElement.textContent = total.toFixed(2); 
}

if (confirmDeliveryButton) { // Ensure the button exists before adding event listener
    confirmDeliveryButton.addEventListener('click', () => {
        if (cart.length > 0) {
            orderConfirmationCard.style.display = 'block';
        } else {
            alert('Your cart is empty!');
        }
    });
}

document.getElementById('confirm-order').addEventListener('click', () => {
    alert('Order has been confirmed! Thank you for your purchase.');
    cart = [];
    renderCartItems(); 
    orderConfirmationCard.style.display = 'none';
});
