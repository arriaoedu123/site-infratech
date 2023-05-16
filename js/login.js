const signInForm = document.getElementById("signIn"),
  signUpForm = document.getElementById("signUp"),
  welcomeMsgEle = document.getElementById("welcomeMessage"),
  welcomeMsg = document.querySelector("#welcomeMessage .nav-link"),
  welcomeMsgDivider = document.getElementById("welcomeMessageDividier"),
  logoutEle = document.getElementById("logoutButton");

(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  const activeUser = localStorage.getItem("activeUser");

  if (activeUser) {
    signInForm.classList.add("d-none");
    signUpForm.classList.add("d-none");
    welcomeMsgEle.classList.remove("d-none");
    welcomeMsgDivider.classList.remove("d-none");
    logoutEle.classList.remove("d-none");
    welcomeMsg.innerHTML = `Olá ${activeUser}.`;
  }
})();

const signUp = () => {
  let name = document.getElementById("signUpName").value,
    user = document.getElementById("signUpUser").value,
    password = document.getElementById("signUpPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exist =
    users.length &&
    JSON.parse(localStorage.getItem("users")).some(
      (data) => data.user.toLowerCase() == user.toLowerCase()
    );

  if (!exist) {
    users.push({ name, user, password });
    localStorage.setItem("users", JSON.stringify(users));

    setTimeout(function () {
      signUpForm.classList.remove("open");
    }, 1000);
  } else {
    alert("Usuário já existe.");
  }
};

const signIn = () => {
  let user = document.getElementById("signInUser").value,
    password = document.getElementById("signInPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exist =
    users.length &&
    JSON.parse(localStorage.getItem("users")).some(
      (data) =>
        data.user.toLowerCase() == user &&
        data.password.toLowerCase() == password
    );
  if (!exist) {
    alert("Usuário ou senha inválidos.");
  } else {
    localStorage.setItem("activeUser", user);
    signInForm.classList.add("d-none");
    signUpForm.classList.add("d-none");
    welcomeMsgEle.classList.remove("d-none");
    welcomeMsgDivider.classList.remove("d-none");
    logoutEle.classList.remove("d-none");
    welcomeMsg.innerHTML = `Olá ${user}.`;

    setTimeout(function () {
      signInForm.classList.remove("open");
    }, 1000);
  }
};

const logout = () => {
  localStorage.removeItem("activeUser");
  location.reload();
};
