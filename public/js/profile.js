const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#profile-name').value.trim();
  const needed_funding = document
    .querySelector('#profile-instrument')
    .value.trim();
  const description = document.querySelector('#profile-genre').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/matched`, {
      method: 'POST',
      body: JSON.stringify({
        first_name,
        last_name,
        instrument,
        genre,
        band,
        username,
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/matched/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to unmatch profile');
    }
  }
};

const logout = async () => {
  console.log('logging out');
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);

document
  .querySelector('.new-profile-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.profile-list')
  .addEventListener('click', delButtonHandler);
