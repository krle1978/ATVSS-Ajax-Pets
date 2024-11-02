(function() {
  "use strict";
  window.addEventListener("load", initialize);

  function initialize() {
    // Pronađi sve radio dugmiće
    let radioButtons = qsa("input[name='animal']");
    
    // Dodaj event listener za svaki radio dugmić
    radioButtons.forEach(button => {
      button.addEventListener("change", function() {
        let animalType = this.value;
        makeRequest(animalType);
      });
    });
  }

  // Funkcija za slanje AJAX zahteva
  function makeRequest(animalType) {
    let url = `https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php?animal=${animalType}`;
    fetch(url, {mode: "cors"})
      .then(checkStatus)
      .then(displayPictures)
      .catch(console.log);
  }

  // Funkcija za prikaz slika na stranici
  function displayPictures(responseText) {
    let picturesDiv = $("pictures");
    picturesDiv.innerHTML = ""; // Očisti prethodno prikazane slike
    let pictureUrls = responseText.split("\n"); // Podeli odgovor po novom redu
    pictureUrls.forEach(url => {
      if (url.trim().length > 0) { // Ignoriši prazne redove
        let img = document.createElement("img");
        img.src = url;
        img.alt = "Pet image";
        picturesDiv.appendChild(img);
      }
    });
  }

  // Funkcija za proveru statusa odgovora
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text(); // Vraćamo tekstualni odgovor
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  // Pomoćne funkcije
  function $(id) {
    return document.getElementById(id);
  }

  function qs(query) {
    return document.querySelector(query);
  }

  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
