const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const first_name = document.querySelector('#first_name-signup').value.trim();
    const last_name = document.querySelector('#last_name-signup').value.trim();
    const instrument = document.querySelector('#instrument-signup').value.trim();
    const genre = document.querySelector('#genre-signup').value.trim();
    const band = document.querySelector('#band-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, instrument, genre, band, username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
