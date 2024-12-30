function validateForm() {
  const username = document.forms["signupForm"]["username"].value;
  const password = document.forms["signupForm"]["password"].value;
  const passconfirm = document.forms["signupForm"]["passconfirm"].value;
  const email = document.forms["signupForm"]["email"].value;
  const dob = document.forms["signupForm"]["dob"].value;
  const spinner = document.getElementById("spinner");
  const errorElement = document.getElementById("error-message");
  errorElement.innerHTML = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (username === "" || password === "") {
    errorElement.innerHTML = "Username and Password must be filled out";
    return false;
  }
  if (password.length < 6) {
    errorElement.innerHTML = "Password must be at least 6 characters long";
    return false;
  }
  if (password !== passconfirm) {
    errorElement.innerHTML = "Passwords do not match";
    return false;
  }
  if (!emailPattern.test(email)) {
    errorElement.innerHTML = "Please enter a valid email address";
    return false;
  }
  if (dob === "") {
    errorElement.innerHTML = "Please select a valid date of birth";
    return false;
  }
  spinner.style.display = "block"; // Show the spinner
  console.log(dob);
  return true;
}

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateForm()) {
    return;
  }

  const formData = {
    username: document.forms["signupForm"]["username"].value,
    password: document.forms["signupForm"]["password"].value,
    email: document.forms["signupForm"]["email"].value,
    dob: document.forms["signupForm"]["dob"].value
  };

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = '/signup-success.html'; // or whatever your success page URL is
    } else {
      // Handle error
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
