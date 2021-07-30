submit_by_id() => {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    if (validation()) // Calling validation function
    {
    document.getElementById("submitButton").submit(); //form submission
    alert(" Name : " + firstName && lastName + " n Email : " + email + " n Form Id : " + document.getElementById("form").getAttribute("id") + "nn Form Submitted Successfully!");
    }
    }