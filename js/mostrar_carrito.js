document.addEventListener("DOMContentLoaded", () => {
    const tablaCarritoChica = document.getElementById("tablaCarritoChica");
    const tablaCarritoGrande = document.getElementById("tablaCarritoGrande");
    const totalCarrito = document.getElementsByClassName("totalCarrito")[0];
    const cantArticulos = document.getElementsByClassName("cantArticulos")[0];
    const totalCarritoG = document.getElementsByClassName("totalCarritoG")[0];
    const cantArticulosG = document.getElementsByClassName("cantArticulosG")[0];

    // Obtener carrito de localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función calculo de subtotales (cantidadx precio de un producto)
    function subtotal(precio,cantidad) { 
        // input    precio es un texto con signo $ y coma
        //          cantidad es un texto de numero entero
        let subtotal =precio.replace(/\,/g, '.');
                subtotal=cantidad*parseFloat(subtotal.replace(/[^\d.-]/g, ''));
        return subtotal;   
    }

    // Función para renderizar el carrito
    const renderizarCarrito = () => {
        // Limpiar tabla
        tablaCarritoChica.innerHTML = "";
        tablaCarritoGrande.innerHTML = "";

        if (carrito.length === 0) {
            totalCarrito.textContent = 0.0;
            totalCarritoG.textContent = 0.0;
            cantArticulos.textContent = 0 ;
            cantArticulosG.textContent = 0 ;
            return;
        }

        // Renderizar productos en la tabla chica
        carrito.forEach((producto, index) => {
            
            // crear la fila de tabla chica
            const fila = document.createElement("tr");
            // crear la fila de tabla grande
            const filaG = document.createElement("tr");

            // Crear la tabla anidada
            const tablaAnidada = document.createElement("table");
            tablaAnidada.classList.add("tabla-interna", "color-secundario");

            // Rellenar la tabla anidada con la información del producto
            tablaAnidada.innerHTML = `
                <tr>
                    <td>${producto.codigo}</td>
                    <td colspan="3">${producto.nombre}</td>               
                </tr>
                <tr>
                    <td>${producto.volumen}</td>
                    <td>${producto.precio}</td>
                    <td><input type="number" value= ${producto.cantidad} data-index="${index}" class="cantidad-input  color-secundario" min=0></td>
                    <td class="subtotal">$${subtotal(producto.precio,producto.cantidad).toFixed(2)}</td>
                </tr>
            </tr> 
            `;
            // Crear la tabla grande
            filaG.innerHTML = `
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>               
                <td>${producto.volumen}</td>
                <td>${producto.precio}</td>
                <td><input type="number" value= ${producto.cantidad} data-index="${index}" class="cantidad-input  color-secundario" min=0></td>
                <td class="subtotal">$${subtotal(producto.precio,producto.cantidad).toFixed(2)}</td>                
            `;

        // Insertar la tabla anidada dentro de la fila principal tabla chica
        const celda = document.createElement("td");
        celda.appendChild(tablaAnidada);
        fila.appendChild(celda);
        tablaCarritoChica.appendChild(fila);
        // insertar en la tabla grande
        tablaCarritoGrande.appendChild(filaG);
    });

    // Agregar evento a los inputs para actualizar el subtotal y total
    const inputsCantidad = document.querySelectorAll(".cantidad-input");
    inputsCantidad.forEach((input) => {
        input.addEventListener("input", (e) => {
            const index = e.target.dataset.index; // Obtener el índice del producto
            let cantidad = parseInt(e.target.value, 10); // Obtener la nueva cantidad
            
              // Validar que la cantidad no sea negativa
            if (cantidad < 0) {
                cantidad = 0; // Si es negativa, ponerla a 0
                e.target.value = cantidad; // Actualizar el valor del input
            }
            
            carrito[index].cantidad = cantidad; // Actualizar la cantidad en el carrito

            // Actualizar el subtotal en la tabla
            const precio = carrito[index].precio;
            const subtotalActualizado = subtotal(precio, cantidad);
            const subtotalSpan = e.target.closest("tr").querySelector(".subtotal");
            subtotalSpan.textContent = `$${subtotalActualizado.toFixed(2)}`;

            // Recalcular el total después de cambiar la cantidad
            actualizarTotal();
            // Guardar el carrito actualizado en localStorage
            guardarCarrito();
        });
    });

    // Calcular y mostrar el total actualizado
    actualizarTotal();
};

    // Función para actualizar el total general
    const actualizarTotal = () => {
        let total = 0;
        let cantidadTotal = 0;
        carrito.forEach((producto) => {
            const subtotalProducto = subtotal(producto.precio, producto.cantidad);
            total += subtotalProducto;
            cantidadTotal += producto.cantidad;
        });
       

        // Actualizar el pie de la tabla con el total
        totalCarrito.textContent = `$${total.toFixed(2)}`;
        totalCarritoG.textContent = `$${total.toFixed(2)}`;
        cantArticulos.textContent = cantidadTotal;
        cantArticulosG.textContent = cantidadTotal;
    };

    // Función para guardar el carrito actualizado en localStorage
    const guardarCarrito = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));  // Guardar en localStorage
    };

    // Llamar a la función renderizarCarrito para mostrar el carrito al cargar la página
    renderizarCarrito();

    // Seleccionamos el botón "Pagar"
    const botonPagar = document.getElementById('botonPagar');

    // Función para manejar el clic en "Pagar"
    botonPagar.addEventListener('click', () => {

        // Filtrar productos cuyo contador es 0
        for (let i = carrito.length - 1; i >= 0; i--) {
            if (carrito[i].cantidad === 0) {
                carrito.splice(i, 1); // Elimina el producto del carrito
            }
        };
    // Recalcular el total después de cambiar la cantidad
    actualizarTotal();
    renderizarCarrito();
    // Guardar el carrito actualizado en localStorage
    guardarCarrito();
    alert(`Compra realizada por un monto de ${totalCarrito.textContent}. El pago fue exitoso.`);
    });    

    // Seleccionamos el botón "cancelar"
    const botonCancelar = document.getElementById('botonCancelar');

    // Función para manejar el clic en "cancelar"
    botonCancelar.addEventListener('click', () => {

        // Limpiar el carrito (vaciar el arreglo)
        carrito.length = 0; // Vaciar el carrito

        guardarCarrito();

        // Limpiar tabla
        tablaCarritoChica.innerHTML = "";
        tablaCarritoGrande.innerHTML = "";
        totalCarrito.textContent = 0.0;
        totalCarritoG.textContent = 0.0;
        cantArticulos.textContent = 0 ;
        cantArticulosG.textContent = 0 ;
        renderizarCarrito();
        
    });
});    
