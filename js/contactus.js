const contactUsForm = document.getElementById("contactUs");

const sendMessage = () => {
  let contactName = document.getElementById("contactUsName").value,
    contactSurname = document.getElementById("contactUsSurname").value,
    contactEmail = document.getElementById("contactUsEmail").value,
    contactCity = document.getElementById("contactUsCity").value,
    contactState = document.getElementById("contactUsState").value,
    contactMessage = document.getElementById("contactUsMessage").value;

  let checkInputs = contactName && contactSurname && contactEmail && contactCity && contactState && contactMessage;

  if (checkInputs) {
    const protocol = Math.floor(
      Math.random() * (1000000 - 100000 + 1) + 100000
    );

    handleProcess(
      contactUsForm.querySelector("button[type='submit']"),
      "start"
    );

    setTimeout(() => {
      contactUsForm.reset();
      contactUsForm.classList.remove("was-validated");
      handleProcess(
        contactUsForm.querySelector("button[type='submit']"),
        "end"
      );
      appendAlert(
        `Mensagem enviada com sucesso! Seu protocolo é ${protocol}.`,
        "success",
        0
      );
    }, 2000);
  } else if (!checkInputs) {
    return null;
  } else {
    appendAlert("Algo deu errado. Tente novamente.", "danger", 5000);
  }
};
