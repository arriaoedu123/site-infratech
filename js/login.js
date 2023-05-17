const signInElem = document.getElementById("signIn"),
  signUpElem = document.getElementById("signUp"),
  signInForm = document.querySelector("#signIn .sign-in-form"),
  signUpForm = document.querySelector("#signUp .sign-up-form"),
  welcomeMsgEle = document.getElementById("welcomeMessage"),
  welcomeMsg = document.querySelector("#welcomeMessage .nav-link"),
  welcomeMsgDivider = document.getElementById("welcomeMessageDividier"),
  logoutEle = document.getElementById("logoutButton");

const handleSignIn = () => {
  signInElem.classList.toggle("d-none");
  signUpElem.classList.toggle("d-none");
  welcomeMsgEle.classList.toggle("d-none");
  welcomeMsgDivider.classList.toggle("d-none");
  logoutEle.classList.toggle("d-none");
};

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
})();

const activeUser = localStorage.getItem("activeUser");

if (activeUser) {
  handleSignIn();
  welcomeMsg.innerHTML = `Olá ${activeUser}.`;
}

const appendAlert = (message, type) => {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

  const wrapper = document.createElement("div");

  const alertId = Math.random()
    .toString(36)
    .substring(2, 6 + 2);

  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert" id="${alertId}">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);

  const alert = bootstrap.Alert.getOrCreateInstance(`#${alertId}`);

  setTimeout(() => {
    alert.close();
  }, 5000);
};

const signUp = () => {
  let user = document.getElementById("signUpUser").value,
    password = document.getElementById("signUpPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exist =
    users.length &&
    JSON.parse(localStorage.getItem("users")).some(
      (data) => data.user.toLowerCase() == user.toLowerCase()
    );

  if (!exist) {
    if (user && password) {
      setTimeout(function () {
        users.push({ user, password });
        localStorage.setItem("users", JSON.stringify(users));
        signUpForm.reset();
        signUpForm.classList.remove("was-validated");
        document.querySelector("#signUp .btn").classList.remove("show");
        document.querySelector("#signUp .btn").ariaExpanded = false;
        document
          .querySelector("#signUp .dropdown-menu")
          .classList.remove("show");
        appendAlert("Usuário cadastrado com sucesso.", "success");
      }, 1000);
    } else {
      return null;
    }
  } else {
    appendAlert("Usuário já cadastrado.", "danger");
  }
};

const signIn = () => {
  let user = document.getElementById("signInUser").value,
    password = document.getElementById("signInPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exist =
    user &&
    password &&
    users.length &&
    JSON.parse(localStorage.getItem("users")).some(
      (data) =>
        data.user.toLowerCase() == user &&
        data.password.toLowerCase() == password
    );

  if (user && password) {
    if (!exist) {
      appendAlert("Usuário ou senha incorretos.", "danger");
    } else {
      setTimeout(function () {
        localStorage.setItem("activeUser", user);
        handleSignIn();
        welcomeMsg.innerHTML = `Olá ${user}.`;
        signInForm.reset();
        signInForm.classList.remove("was-validated");
        document.querySelector("#signIn .btn").classList.remove("show");
        document.querySelector("#signIn .btn").ariaExpanded = false;
        document
          .querySelector("#signIn .dropdown-menu")
          .classList.remove("show");
        appendAlert("Login efetuado com sucesso.", "success");
      }, 1000);
    }
  } else {
    return null;
  }
};

const logout = (event) => {
  event.preventDefault();

  setTimeout(function () {
    handleSignIn();
    localStorage.removeItem("activeUser");
    appendAlert("Logout efetuado com sucesso.", "success");
  }, 1000);
};
