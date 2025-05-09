import * as Carrito from '../cotizador/script_cotizador.js';

export function FuncionBotonEnviarCotizacion() {
    try {
        EnviarCotizacionCorreo();
        EnviarCotizacionBase();
        alert("Tu cotizacion a sido enviada");
    } catch(Error) {
        if (Error.name === "CamposVaciosError") {
            alert("Por favor, completa todos los campos.");
            return;
        }
        alert("Hubo un error inseperado, no se envio la cotizacion");
        console.log(Error);
    }
}

async function EnviarCotizacionCorreo() {
    const Contenido = Carrito.LeerArticuloCarrito();
    const Nombre = document.getElementById("NombreFormulario");
    const Correo = document.getElementById("CorreoFormulario");
    const Telefono = document.getElementById("TelefonoFormulario");
    const Direccion = document.getElementById("DireccionFormulario");
    const Empresa = document.getElementById("EmpresaFormulario");

    if(!Nombre.value || !Correo.value || !Telefono.value){
        const error = new Error("Una de las casillas está vacía");
        error.name = "CamposVaciosError"; // Nombre del error
        throw error;
    }else {
        // Obtener los datos del formulario
        let dato = {
            "nombre":Nombre.value,
            "correo":Correo.value,
            "direccion":Direccion.value,
            "empresa":Empresa.value,
            "cotizacion":JSON.stringify(Contenido)
        };
        const formData = new FormData();

        // Llenar los datos del objeto al formdata
        for (let key in dato) {
            formData.append(key, dato[key]);
        }

        console.log(dato);

        try {
            const response = await fetch('../backend/sendMails.php', { // Php para mandar el correo
                method: 'POST',
                body: formData
            });

            // Verificar si la respuesta fue exitosa
            const result = await response.json(); // Aseguramos que el PHP devuelve un JSON

            // Mostrar mensaje de éxito o error
            if (result.success) {
                alert(result.message); // Mostrar mensaje si fue exitoso
            } else {
                alert(result.message); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('❌ Hubo un problema al enviar el formulario. Intenta de nuevo más tarde.');
        }
    }
}

function EnviarCotizacionBase() {

}