const form = document.getElementById("form");
const formControl = document.querySelectorAll(".form-control");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const container = document.querySelector(".container");

const h2 = document.querySelector("h2");

const label = document.querySelectorAll("label");
const input = document.querySelectorAll("input");
const small = document.querySelectorAll("small");

const checkTrue = document.getElementsByClassName("fa-check-circle");
const checkFalse = document.getElementsByClassName("fa-exclamation-circle");

const registered = document.querySelector(".registered");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

let databaseCreate = [];
let databaseLogin = [];

function checkInputs() {
  // trim to remove the whitespaces
  let usernameValue = username.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();
  let confirmPasswordValue = confirmPassword.value.trim();

  if (usernameValue === "") {
    setErrorFor(username, "Username cannot be blank");
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Not a valid email");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be blank");
  } else {
    setSuccessFor(password);
  }

  if (confirmPasswordValue === "") {
    setErrorFor(confirmPassword, "Confirm Password cannot be blank");
  } else if (passwordValue !== confirmPasswordValue) {
    setErrorFor(confirmPassword, "Passwords does not match");
  } else {
    setSuccessFor(confirmPassword);
  }

  if (
    usernameValue &&
    emailValue &&
    isEmail(emailValue) &&
    passwordValue &&
    confirmPasswordValue &&
    passwordValue === confirmPasswordValue
  ) {
    databaseCreate.push(usernameValue);
    databaseCreate.push(emailValue);
    databaseCreate.push(passwordValue);
    for (let i = 0; i < checkTrue.length; i++) {
      checkTrue[i].style.visibility = "hidden";
      input[i].style.borderColor = "#f0f0f0";
    }
    username.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";

    h2.innerText = "Login Account";
    form[3].style.visibility = "hidden";
    label[3].style.visibility = "hidden";
    checkFalse[0].style.visibility = "hidden";
    small[0].style.visibility = "hidden";

    formControl[3].remove();
  } else if (
    usernameValue &&
    emailValue &&
    isEmail(emailValue) &&
    passwordValue
  ) {
    databaseLogin.push(usernameValue);
    databaseLogin.push(emailValue);
    databaseLogin.push(passwordValue);
    checkFalse[0].style.visibility = "visible";
    small[0].style.visibility = "visible";
  }
  // console.log(databaseCreate, databaseLogin);
  if (databaseCreate[0] === databaseLogin[0]) {
    checkFalse[0].style.visibility = "hidden";
    small[0].style.visibility = "hidden";
    if (databaseCreate[1] === databaseLogin[1]) {
      if (databaseCreate[2] === databaseLogin[2]) {
        container.style.visibility = "hidden";
        const h1 = document.createElement("h1");
        const node = document.createTextNode(
          `Congratulations ${usernameValue} have successfully logged in!`
        );
        h1.appendChild(node);
        registered.appendChild(h1);
        registered.style.visibility = "visible";
      } else {
        databaseLogin = [];
        username.value = "";
        email.value = "";
        password.value = "";
        setErrorFor(password, "Passwords does not match");
      }
    } else {
      databaseLogin = [];
      username.value = "";
      email.value = "";
      password.value = "";
      setErrorFor(email, "Email does not match");
    }
  } else {
    databaseLogin = [];
    username.value = "";
    email.value = "";
    password.value = "";
    setErrorFor(username, "Username does not match");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
