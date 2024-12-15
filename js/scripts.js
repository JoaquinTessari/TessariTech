let cart = JSON.parse(localStorage.getItem('cart')) || []; // Cargar carrito desde localStorage
let total = cart.reduce((sum, product) => sum + product.price, 0); // Calcular el total inicial

// Actualizar el contador del carrito
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.innerText = cart.length;
    cartCountElement.style.visibility = cart.length > 0 ? "visible" : "hidden";
}

// Agregar producto al carrito
function add(productName, price) {
    const product = { name: productName, price: price };
    cart.push(product);
    total += price;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    console.log(`Agregado: ${productName}, Total: ${total}`);
}

// Mostrar los productos en un modal
function showCart() {
    const modal = document.getElementById("cart-modal");
    const itemsList = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    itemsList.innerHTML = ""; // Limpiar el contenido previo

    cart.forEach((product, index) => {
        const item = document.createElement("li");
        item.textContent = `${product.name} - $${product.price}`;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Eliminar";
        removeBtn.onclick = () => remove(index);
        item.appendChild(removeBtn);
        itemsList.appendChild(item);
    });

    totalElement.textContent = `Total: $${total}`;
    modal.classList.add("visible");
}

// Ocultar el modal
function hideCart() {
    document.getElementById("cart-modal").classList.remove("visible");
}

// Eliminar un producto del carrito y recargar la página
function remove(index) {
    cart.splice(index, 1); // Eliminar producto del array
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar el localStorage
    updateCartCount(); // Actualizar el contador
    window.location.reload(); // Recargar la página para mostrar los cambios
}


// Realizar el pago
function pay() {
    if (cart.length === 0) {
        window.alert("El carrito está vacío.");
        return;
    }
    window.alert(`Has comprado:\n${cart.map((p) => p.name).join(", \n")}\nTotal: $${total}`);
    cart = [];
    total = 0;
    localStorage.removeItem('cart');
    updateCartCount();
    hideCart();
}

// Cargar el carrito al iniciar
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});


// Renderizar la orden de compras como una lista
function renderOrder() {
    const orderSummary = document.getElementById("order-summary");
    const orderTotal = document.getElementById("order-total");

    // Limpiar contenido previo
    orderSummary.innerHTML = "";
    let total = 0;
    let productList = []; // Para almacenar los productos seleccionados

    // Crear la lista de productos
    const ul = document.createElement("ul");
    ul.style.listStyle = "none"; // Quitar viñetas de la lista
    ul.style.padding = "0";

    cart.forEach((product, index) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.marginBottom = "10px";

        li.innerHTML = `
            <span>${product.name}</span>
            <span>$${product.price}</span>
            <button class="compra-btn" onclick="remove(${index})">Eliminar</button>
        `;
        ul.appendChild(li);

        // Agregar producto a la lista
        productList.push(`${product.name} - $${product.price}`);
        total += product.price;
    });

    orderSummary.appendChild(ul);

    // Mostrar el total en pantalla
    orderTotal.textContent = `Total: $${total}`;

    // Configurar el valor del input del total
    const totalInput = document.getElementById("total-input");
    if (totalInput) {
        totalInput.value = total;
    }

    // Configurar el valor del input de productos
    const productosInput = document.getElementById("productos-input");
    if (productosInput) {
        productosInput.value = productList.join(", "); // Convertir la lista en texto separado por comas
    }
}


// Completar la compra
function completePurchase() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    alert("¡Gracias por tu compra! Tu orden ha sido procesada.");
    cart = [];
    localStorage.removeItem("cart");
    renderOrder();
    updateCartCount();
}

// Vaciar el carrito
function clearCart() {
    if (confirm("¿Seguro que quieres vaciar el carrito?")) {
        cart = [];
        localStorage.removeItem("cart");
        renderOrder();
        updateCartCount();
    }
}

// Renderizar la orden al cargar compras.html
if (document.title.includes("Compras")) {
    renderOrder();
}

// valor total en formulario
function asignarValor() {
    var input = document.getElementById("miInput");
    input.value = "Nuevo valor";
}

// Mostrar el dropdown al pasar el mouse
let dropdownTimer;

function showDropdown(event) {
    const dropdown = document.getElementById("cart-dropdown");
    const itemsList = document.getElementById("dropdown-items");
    const totalElement = document.getElementById("dropdown-total");

    clearTimeout(dropdownTimer); // Limpia cualquier temporizador activo para evitar cierres prematuros

    itemsList.innerHTML = ""; // Limpiar contenido previo

    // Añadir productos al dropdown
    if (cart.length > 0) {
        cart.forEach((product) => {
            const item = document.createElement("li");
            item.textContent = `${product.name} - $${product.price}`;
            itemsList.appendChild(item);
        });

        // Mostrar el total
        totalElement.textContent = `Total: $${total}`;
    } else {
        // Mostrar mensaje si no hay productos
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No hay productos seleccionados.";
        itemsList.appendChild(emptyMessage);
        totalElement.textContent = "";
    }

    // Mostrar el dropdown
    dropdown.classList.remove("hidden");
    dropdown.style.display = "block";

    // Prevenir navegación del enlace si se activa el hover accidentalmente
    event?.preventDefault();
}

function hideDropdown() {
    const dropdown = document.getElementById("cart-dropdown");
    dropdownTimer = setTimeout(() => {
        dropdown.style.display = "none";
    }, 3000); // Espera de 3 segundos antes de ocultar
}


