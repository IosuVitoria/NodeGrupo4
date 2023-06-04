const loginForm = document.getElementById('loginForm'); 
// Obtenemos la referencia al formulario de inicio de sesión por medio del identificador por ID loginform.
const errorElement = document.getElementById('error'); 
// Referencia al elemento de error. Mensaje instalado para que se muestre en caso de error.

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  // Evitar el comportamiento predeterminado de envío del formulario. Tomado del TODO list.

  const userName = document.getElementById('username').value;
  const email = document.getElementById('email').value; 
  const password = document.getElementById('password').value; 
  const role = document.getElementById('role').value;

  // Obtener el valor del campo de correo electrónico y de la contraseña. Empezamos con esto y si funciona intentar cuadrar también Username.

  try {
    const response = await fetch('http://localhost:5000/users/register', { 
      // Realizar una solicitud POST a la ruta de inicio de sesión. Esta debe cuadrar con el tipo de solicitud preprogramada en las rutas.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        // Establecer el encabezado de tipo de contenido como JSON. Revisado en: https://developer.mozilla.org/es/docs/Web/HTTP/Headers.
      },
      body: JSON.stringify({ userName,email, password, role}), 
      // Convertir los datos de inicio de sesión en formato JSON y enviarlos en el cuerpo de la solicitud. La comparación debe cuadrar para que se permita el acceso.
    });

    console.log("Aquí registro usuarios");

    if (response.ok) {
      const data = await response.json(); 
      //Pasar  la respuesta en formato JSON
      const { user } = data; 
      console.log(data);
      // window.location.href = "http://www.google.com"; Si queremos verlo en la misma pestaña
      window.open("http://127.0.0.1:5500/public/login.html");
      console.log(typeof user);
    } else {
      const data = await response.json(); 
      const { message } = data; 
      // Extraer el mensaje de error de la respuesta
      showError(message); 
      // Mostrar el mensaje de error en el elemento correspondiente. Error 404 teórico.
      console.log("usuario erróneo");
    }
  } catch (error) {
    console.error(error); 
    showError('An error occurred. Please try again later.'); // Mostrar un mensaje en caso de que el servidor falle. Es un error de tipo genérico. Callback que hace referencia a una función exterior.
  }
});

function showError(message) {
  errorElement.textContent = message; 
  errorElement.style.display = 'block'; 
}