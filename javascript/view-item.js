function viewItemFunction(event) {
  const isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));
  console.log("isAdmin:", isAdmin);

  hideShop();
  const innerMainContainer = document.getElementById("inner-main-container");

  // Create a card element
  const card = document.createElement("div");
  card.className = "card col p-4 rounded-4 max-height-auto position-relative";
  innerMainContainer.appendChild(card);

  const currentCard = event.target.closest(".card");

  // Create an image element for the product
  const productImg = currentCard.querySelector("img:first-of-type").src;
  const cardImg = document.createElement("img");
  cardImg.src = productImg;
  cardImg.className =
    "product-img-details h-100 col-12 w-100 col-md-6 w-50 col-xxl-6 w-50 object-fit-contain card-img-top rounded-4";
  card.appendChild(cardImg);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body p-0";
  card.appendChild(cardBody);

  // Create a title element for the product name
  const productName = currentCard.querySelector(".product-name").textContent;
  const cardTitle = document.createElement("div");
  cardTitle.className = "card-title h3 mt-4";
  cardTitle.innerText = productName;
  cardBody.appendChild(cardTitle);

  // Create a paragraph element for the product brand
  const productBrand = currentCard.querySelector(".product-brand").textContent;
  const cardBrand = document.createElement("p");
  cardBrand.className = "product-brand m-0 text-secondary card-text";
  cardBrand.textContent = productBrand;
  cardBody.appendChild(cardBrand);

  // Create a paragraph element for the product description
  const productDescription = currentCard.querySelector(
    ".product-description"
  ).textContent;
  const cardDescription = document.createElement("p");
  cardDescription.className = "product-description card-text my-2 no-truncate";
  cardDescription.innerText = productDescription;
  cardBody.appendChild(cardDescription);

  const cardFooter = document.createElement("div");
  cardFooter.className =
    "card-footer d-flex align-items-center mt-auto bg-white p-0 pt-3 mb-2";
  card.appendChild(cardFooter);

  // Create a span element for the product price
  const price = currentCard.querySelector(".product-price").textContent;
  const cardPrice = document.createElement("span");
  cardPrice.className = "product-price me-auto card-text h4";
  cardPrice.textContent = price;
  cardFooter.appendChild(cardPrice);

  // Create a span element for the product id
  const productId = currentCard.querySelector(".product-id").textContent;
  const cardId = document.createElement("span");
  cardId.className =
    "product-id m-0 text-secondary mt-auto position-absolute bottom-0 left-0 right-0 card-text";
  cardId.textContent = productId;
  cardId.style.fontSize = "8px";
  cardFooter.appendChild(cardId);

  if (isAdmin) {
    console.log("Accessing Admin tools");

    // Create an edit button for admin users
    const editButton = document.createElement("button");
    editButton.id = "edit-button";
    editButton.className = "btn btn-warning";
    editButton.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    editButton.addEventListener("click", editItem);
    cardFooter.appendChild(editButton);

    // Create a delete button for admin users
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete-button";
    deleteButton.className = "btn btn-danger";
    deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
    deleteButton.addEventListener("click", deleteItem);
    cardFooter.appendChild(deleteButton);
  } else {
    console.log("Not an Admin");
  }

  const closeProductView = document.createElement("span");
  closeProductView.className = "position-absolute top-0 end-0 m-3";
  closeProductView.innerHTML = `<i class="bi bi-x-circle-fill text-danger fs-3"></i>`;
  card.appendChild(closeProductView);

  // Edit product
  function editItem() {
    console.log("editItem:", editItem);
  }
}

// Return the created card element
function createCardElement() {
  const cardElement = document.createElement("div");
  document.querySelector(".card-container").appendChild(cardElement);
  return cardElement;
}
