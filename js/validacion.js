const formulario = document.getElementById('formularioContacto');
const botonEnviar = document.querySelector('input[type="submit"][value="Enviar"]');
const botonCancelar = document.querySelector('input[type="reset"][value="Cancelar"]');

formulario.addEventListener("submit", (event) =>  {   // Prevenir el envío del formulario
    event.preventDefault();

    const nombreCompleto = document.getElementById("nombreCompleto").value.trim();
    const email = document.getElementById("email").value.trim();
    const provincia = document.getElementById("provincia").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    console.log(nombreCompleto);
    console.log(email);
    console.log(provincia);
    console.log(telefono);
    console.log(mensaje);

    // Variables para los mensajes de error
    const errorNombre = document.getElementById("errorNombre"); 
    const errorEmail = document.getElementById("errorEmail");
    const errorProvincia = document.getElementById("errorProvincia");
    const errorTelefono = document.getElementById("errorTelefono");

    // Inicializar validación
    let formularioValido = true;

    // Validar nombre
    const nombreCompletoRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+){0,7}$/;
    if (!nombreCompletoRegex.test(nombreCompleto)|| nombreCompleto.length < 3) {
        //alert ("el nombre debe estar completo")
        errorNombre.style.display = "flex";
        formularioValido = false;
    } else {
        errorNombre.style.display = "none";
    }
    // Validar email
    // expresiones regulares
    const emailRegex =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    if (!emailRegex.test(email)) {
        errorEmail.style.display = "flex";
        formularioValido = false;
    } else {
        errorEmail.style.display = "none";
    }
    // Validar provincia
    if (provincia ==0) {
        errorProvincia.style.display = "flex";
        formularioValido = false;
    } else {
        errorProvincia.style.display = "none";
    }
    // Validar teléfono (asegurarse de que sea solo números)
    const telefonoRegex = /^[0-9]{10,13}$/;  // Suponiendo que el teléfono tiene 10  a 13 dígitos
    if (!telefonoRegex.test(telefono) && !telefono == "") {
        errorTelefono.style.display = "flex";
        formularioValido = false;
    } else {
        errorTelefono.style.display = "none";
    }


    console.log("formulario correcto:"+formularioValido);
    // Si el formulario es válido, se puede enviar
    if (formularioValido) {
        alert("Formulario enviado correctamente.");  

        // creariamos un objeto literal del tipo formularioContacto

        const formularioContacto = {
            nombre: nombreCompleto,
            email: email,
            provincia: provincia,
            telefono: telefono,
            mensaje: mensaje
        }
    }else {
            alert("Formulario enviado no salio, hay errores de validacion."); 
    }

        // llamariamos a un api del backend y le mandariamos la informacion en formato json{
         // y ese api guardaria la informacion en una base de datos y luego mandaria el mail
        // aca se puede hacer la accion del envio al api del backend
    
});
    // Funcionalidad del botón "Cancelar"
botonCancelar.addEventListener("click", (event) => { // Prevenir el envío del formulario al hacer click en "Cancelar"
    event.preventDefault();

    // Limpiar todos los campos del formulario
    formulario.reset();

    // Ocultar los mensajes de error (en caso de que estén visibles)
    const errores = document.querySelectorAll('.text-aviso-error');
    errores.forEach(error => {
        error.classList.add("d-none");
    });
});