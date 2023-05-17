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

signInElem.addEventListener("hidden.bs.dropdown", (event) => {
  signInForm.reset();
  signInForm.classList.remove("was-validated");
});

signUpElem.addEventListener("hidden.bs.dropdown", (event) => {
  signUpForm.reset();
  signUpForm.classList.remove("was-validated");
});

const handleProcess = (buttonElem, state) => {
  const buttonLabel = buttonElem.querySelector(".button-label"),
    spinnerLabel = buttonElem.querySelector(".spinner-border-label"),
    spinner = buttonElem.querySelector(".spinner-border");

  if (state === "start") {
    buttonElem.disabled = true;
    buttonLabel.classList.toggle("d-none");
    spinnerLabel.classList.toggle("d-none");
    spinner.classList.toggle("d-none");
  } else {
    buttonElem.disabled = false;
    buttonLabel.classList.toggle("d-none");
    spinnerLabel.classList.toggle("d-none");
    spinner.classList.toggle("d-none");
  }
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

const activeUserLocal = localStorage.getItem("activeUser");
const activeUserSession = sessionStorage.getItem("activeUser");

if (activeUserLocal || activeUserSession) {
  handleSignIn();
  welcomeMsg.innerHTML = `Olá ${activeUserLocal || activeUserSession}.`;
}

const appendAlert = (message, type, delay) => {
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

  if (delay > 0) {
    setTimeout(() => {
      alert.close();
    }, delay);
  } else {
    return null;
  }
};

const signUp = () => {
  let user = document.getElementById("signUpUser").value,
    password = document.getElementById("signUpPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userFound =
    users.length &&
    JSON.parse(localStorage.getItem("users")).some(
      (data) => data.user.toLowerCase() == user.toLowerCase()
    );

  if (user && password) {
    if (userFound) {
      appendAlert("Usuário já cadastrado.", "danger", 5000);
    } else {
      handleProcess(signUpForm.querySelector("button[type='submit']"), "start");
      setTimeout(function () {
        users.push({ user, password });
        localStorage.setItem("users", JSON.stringify(users));
        signUpForm.reset();
        signUpForm.classList.remove("was-validated");
        handleProcess(signUpForm.querySelector("button[type='submit']"), "end");
        document.querySelector("#signUp .btn").classList.remove("show");
        document.querySelector("#signUp .btn").ariaExpanded = false;
        signUpForm.classList.remove("show");
        appendAlert("Usuário cadastrado com sucesso.", "success", 0);
      }, 1000);
    }
  } else {
    return null;
  }
};

// const signUp = () => {
//   let user = document.getElementById("signUpUser").value,
//     password = document.getElementById("signUpPassword").value;

//   let users = JSON.parse(localStorage.getItem("users")) || [];

//   let userFound =
//     users.length &&
//     JSON.parse(localStorage.getItem("users")).some(
//       (data) => data.user.toLowerCase() == user.toLowerCase()
//     );

//   if (user && password) {
//     if (!userFound) {
//       appendAlert("Usuário já cadastrado.", "danger", 5000);
//     } else {
//       handleProcess(signUpForm.querySelector("button[type='submit']"), "start");
//       setTimeout(function () {
//         users.push({ user, password });
//         localStorage.setItem("users", JSON.stringify(users));
//         signUpForm.reset();
//         signUpForm.classList.remove("was-validated");
//         handleProcess(signUpForm.querySelector("button[type='submit']"), "end");
//         document.querySelector("#signUp .btn").classList.remove("show");
//         document.querySelector("#signUp .btn").ariaExpanded = false;
//         signUpForm.classList.remove("show");
//         appendAlert("Usuário cadastrado com sucesso.", "success", 5000);
//       }, 1000);
//     }
//   } else {
//     return null;
//   }
// };

const signIn = () => {
  let user = document.getElementById("signInUser").value,
    password = document.getElementById("signInPassword").value;
  remember = document.getElementById("signInRemember").checked;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userFound =
    user &&
    password &&
    users.length &&
    JSON.parse(localStorage.getItem("users")).some(
      (data) =>
        data.user.toLowerCase() == user &&
        data.password.toLowerCase() == password
    );

  if (user && password) {
    if (!userFound) {
      appendAlert("Usuário ou senha incorretos.", "danger", 5000);
    } else {
      handleProcess(signInForm.querySelector("button[type='submit']"), "start");
      setTimeout(function () {
        remember
          ? localStorage.setItem("activeUser", user)
          : sessionStorage.setItem("activeUser", user);
        handleSignIn();
        welcomeMsg.innerHTML = `Olá ${user}.`;
        signInForm.reset();
        signInForm.classList.remove("was-validated");
        handleProcess(signInForm.querySelector("button[type='submit']"), "end");
        document.querySelector("#signIn .btn").classList.remove("show");
        document.querySelector("#signIn .btn").ariaExpanded = false;
        signInForm.classList.remove("show");
        appendAlert("Acesso efetuado com sucesso.", "success", 5000);
      }, 1000);
    }
  } else {
    return null;
  }
};

const logout = (event) => {
  event.preventDefault();
  logoutEle.querySelector(".btn").disabled = true;

  setTimeout(function () {
    handleSignIn();
    logoutEle.querySelector(".btn").disabled = false;
    localStorage.removeItem("activeUser");
    sessionStorage.removeItem("activeUser");
    appendAlert("Logout efetuado com sucesso.", "success", 5000);
  }, 1000);
};
