function displayErrorMessage(message) {
  const body = document.querySelector("body");
  const error = document.createElement("h1");
  error.className = "w-100 h-100 text-bg-dark";
  error.innerText = message;
  body.appendChild(error);
}

function getRequest() {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZTI4MDI1NGU4ODAwMTgzZjE4NjciLCJpYXQiOjE2OTk2MDMwNzIsImV4cCI6MTcwMDgxMjY3Mn0.m4a72RFt16Fio7Qj6dSirjfZJk7srWAS7drV9EY-ezs"
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        switch (response.status) {
          case 400:
            displayErrorMessage("Richiesta non valida");
            throw new Error("Richiesta non valida");
            break;
          case 401:
            displayErrorMessage("Non autorizzato");
            throw new Error("Non autorizzato");
            break;
          case 403:
            displayErrorMessage("Vietato");
            throw new Error("Vietato");
            break;
          case 404:
            displayErrorMessage("Non trovato");
            throw new Error("Non trovato");
            break;
          default:
            displayErrorMessage("Errore durante il recupero dei dati");
            throw new Error("Errore durante il recupero dei dati");
        }
      }
    })
    .then((arrayOfProducts) => {
      const innerMainContainer = document.getElementById(
        "inner-main-container"
      );

      const shop = document.createElement("div");
      shop.className = "row";
      shop.id = "shop";
      innerMainContainer.appendChild(shop);

      const h2 = document.createElement("h2");
      h2.className = "text-bg-dark d-flex h2";
      h2.innerText = "Shop";
      shop.appendChild(h2);

      const container = document.createElement("div");
      container.className = "container  max-1200";
      shop.appendChild(container);

      const productsRow = document.createElement("div");
      productsRow.className = "row d-flex gap-3 justify-content-center";
      container.appendChild(productsRow);

      arrayOfProducts.forEach((product) => {
        const card = document.createElement("div");
        card.className =
          "card col-5 h-xs-25 col-sm-3 h-sm-50 col-md-3 h-md-75  col-xl-2 h-xl-100 p-3 rounded-4";
        card.style.minHeight = "100px";
        productsRow.appendChild(card);

        const spinner = document.createElement("div");
        spinner.className = "spinner-border align-self-center h-100 w-0";
        spinner.role = "status";
        card.appendChild(spinner);

        if (product.imageUrl) {
          spinner.className = "d.none";

          const img = document.createElement("img");
          img.src = product.imageUrl;
          img.className =
            "product-img h-100 object-fit-contain card-img-top rounded-4";
          img.textContent = product.imageUrl;
          card.appendChild(img);
        }

        const cardBody = document.createElement("a");
        cardBody.className = "card-body m-0 p-0  pb-3 text-decoration-none";
        card.appendChild(cardBody);

        if (product.name) {
          const name = document.createElement("h5");
          name.className = "product-name card-title mt-3";
          name.textContent = product.name;
          cardBody.appendChild(name);
        }

        if (product.brand) {
          const brand = document.createElement("p");
          brand.className = "product-brand m-0 text-secondary";
          brand.textContent = product.brand;
          brand.style.fontSize = "12px";
          cardBody.appendChild(brand);
        }

        if (product.description) {
          const description = document.createElement("p");
          description.className = "product-description card-text";
          description.textContent = product.description;
          cardBody.appendChild(description);
        }

        const cardFooter = document.createElement("div");
        cardFooter.className =
          "card-footer d-flex align-items-center justify-content-between mt-auto bg-white p-0 pt-3";
        card.appendChild(cardFooter);

        if (product.price) {
          const price = document.createElement("span");
          price.className = "product-price";
          price.textContent = product.price + "€";
          cardFooter.appendChild(price);
        }

        const buyButton = document.createElement("button");
        buyButton.className = "btn btn-primary";
        buyButton.innerHTML = `<span>Buy <i class="bi bi-cart4"></i></span>`;
        buyButton.addEventListener("click", addToCart());
        cardFooter.appendChild(buyButton);
      });
      console.log(" ---------------------------------");
      console.log("arrayOfProducts:", arrayOfProducts);
      console.log(" ---------------------------------");
    })
    .catch((error) => console.log("Blocco catch", error));
}

// * Create Shop

function loadShop() {
  const backOffice = document.getElementById("back-office");
  backOffice.classList.add("d-none");

  if (document.getElementById("shop")) {
    const shop = document.getElementById("shop");
    shop.classList.remove("d-none");
  } else {
    getRequest();
  }
}
