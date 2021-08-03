const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(email, password);
  if (email && password) {
    // console.log('got here');
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username: email, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

const signupFormHandler = async (event) => {
  event.preventDefault();

  // const instrument = document.querySelectorAll(
  //   'input[name="instrument"]:checked'
  // )[0].value;
  // const genre = document.querySelectorAll('input[name="genre"]:checked')[0]
  //   .value;
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const data = {
      username: username,
      password: password,
    };
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('click sign up button');
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
