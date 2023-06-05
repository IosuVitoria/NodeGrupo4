const loginForm = document.getElementById('loginForm');
const errorElement = document.getElementById('error');
const registerElement = document.querySelector('.sign-up');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const { user, token } = data;
      const { userName } = user; 
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('username', userName);
      localStorage.setItem('email', email);
      localStorage.setItem('token', token);
      
      const infoMessage = `Login successful. User: ${user}, Token: ${token}`;
      openNewPage(infoMessage);
    } else {
      const data = await response.json();
      const { message } = data;
      showError(message);
      console.log("usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    showError('An error occurred. Please try again later.');
  }
});

function showError(message) {
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function openNewPage(infoMessage) {
  window.location.href = "http://127.0.0.1:5500/public/home.html";
}

registerElement.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/public/Register.html";
});
