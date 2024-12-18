document.addEventListener('DOMContentLoaded', function() {
    // Cargar el carrito desde localStorage (si existe)
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    //vaciarCarrito()


    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        // Comprobamos si el producto ya está en el carrito
        const index = carrito.findIndex(item => item.id === producto.id);
        
        if (index !== -1) {
            // Si el producto ya está, solo incrementamos la cantidad
            carrito[index].cantidad++;
        } else {
            // Si el producto no está, lo agregamos al carrito con cantidad 1
            producto.cantidad = 1;
            carrito.push(producto);
        }

        // Actualizamos la visualización del carrito y guardamos en localStorage
        guardarCarritoEnLocalStorage();
    }

    // Función para guardar el carrito actualizado en localStorage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function vaciarCarrito() {
        // Eliminar el carrito de localStorage
        localStorage.removeItem('carrito');
        carrito = [];  // Vaciar la variable carrito
        console.log("Carrito vacío.");
    }

    // Escuchar el clic en cada opción de tamaño del producto
    document.querySelectorAll('.producto-millanel ul li').forEach(opcion => {
        opcion.addEventListener('click', () => {
            // Obtener el producto correspondiente al li donde se hizo clic
            const productoItem = opcion.closest('.producto-millanel'); // Encuentra el producto al que pertenece el li

            // Obtener la información de la imagen (src y alt)
            const img = productoItem.querySelector('img');
            const imgSrc = img.src;
            const imgAlt = img.alt;

            // Separamos el atributo alt por comas
            const partesAlt = imgAlt.split(',');

            // Asignamos los valores separados del alt
            const codigoProducto = partesAlt[0].trim();  // Código del producto
            const tipoProducto = partesAlt[1].trim();    // Tipo de producto
            const nombreProducto = partesAlt[2].trim();  // Nombre del producto

            // Obtener la información del volumen y precio de la opción seleccionada
            const volumen = opcion.querySelector('p').textContent;  // El primer <p> es el volumen (30ml, 60ml, 100ml)
            const precio = opcion.querySelectorAll('p')[1].textContent; // El segundo <p> es el precio

            // Crear un objeto con la información del producto
            const producto = {
                id: opcion.id,  // Usamos el id del li como identificador único
                codigo: codigoProducto,
                tipo: tipoProducto,
                nombre: nombreProducto,
                src: imgSrc,
                alt: imgAlt,
                volumen: volumen,
                precio: precio,
            };

            // Llamar a la función para agregar al carrito
            agregarAlCarrito(producto);
        });
    });

    // Inicializar el carrito al cargar la página
    // actualizarCarrito();
    });