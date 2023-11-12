// let cart = [];
// let total = 0;

// getRequest();

// function addToCart() {
//   const title = card.querySelector(".product-name").textContent;
//   const price = card.querySelector(".product-price").textContent;
//   const selectedItem = { title, price };
//   console.log("Item added to cart:", selectedItem);
//   cart.push(selectedItem);
//   checkCart();
//   console.log("cart:", cart);
// }

// function checkCart() {
//   const cartButton = document.getElementById("cart-button");
//   const currentCartTotal = document.getElementById("current-cart-total");

//   if (cart.length !== 0 && cartButton && currentCartTotal) {
//     currentCartTotal.textContent = total + "€";
//     currentCartTotal.style.fontSize = "1rem";
//     currentCartTotal.innerHTML = `${total}€`;
//   }
// }

// function getRequest(isAdmin) {
//   fetch("https://striveschool-api.herokuapp.com/api/product/", {
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZTI4MDI1NGU4ODAwMTgzZjE4NjciLCJpYXQiOjE2OTk2MDMwNzIsImV4cCI6MTcwMDgxMjY3Mn0.m4a72RFt16Fio7Qj6dSirjfZJk7srWAS7drV9EY-ezs"
//     }
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Network error: " + response.status);
//       }
//     })
//     .then((arrayOfProducts) => {
//       const innerMainContainer = document.getElementById(
//         "inner-main-container"
//       );

//       const shop = document.createElement("div");
//       shop.className = "row max-1200";
//       shop.id = "shop";
//       innerMainContainer.appendChild(shop);

//       const productsRow = document.createElement("div");
//       productsRow.className = "row d-flex gap-3 justify-content-center";
//       shop.appendChild(productsRow);

//       arrayOfProducts.forEach((product) => {
//         const card = createProductCard(product, isAdmin);
//         productsRow.appendChild(card);
//       });
//       console.log("arrayOfProducts:", arrayOfProducts);
//     })
//     .catch((error) => {
//       console.log("Error: " + error.message);
//     });
// }

// function createProductCard(product, isAdmin) {
//   const card = document.createElement("div");
//   card.className =
//     "card col-12 h-xs-25 p-xs-1 col-sm-4 h-sm-50 p-sm-2 col-md-3 h-md-75 p-md-3 col-xl-2 h-xl-100 p-4 rounded-4";
//   card.style.minHeight = "100px";

//   const spinner = document.createElement("div");
//   spinner.className = "spinner-border align-self-center h-100 w-0";
//   spinner.role = "status";
//   card.appendChild(spinner);

//   if (product.imageUrl) {
//     spinner.className = "d.none";

//     const img = document.createElement("img");
//     img.src = product.imageUrl;
//     img.className =
//       "product-img h-100 object-fit-contain card-img-top rounded-4";
//     img.textContent = product.imageUrl;
//     card.appendChild(img);
//   }

//   const cardBody = document.createElement("a");
//   cardBody.className = "card-body m-0 p-0  pb-3 text-decoration-none";
//   card.appendChild(cardBody);

//   if (product.name) {
//     const name = document.createElement("h5");
//     name.className = "product-name card-title mt-3";
//     name.textContent = product.name;
//     cardBody.appendChild(name);
//   }

//   if (product.brand) {
//     const brand = document.createElement("p");
//     brand.className = "product-brand m-0 text-secondary";
//     brand.textContent = product.brand;
//     brand.style.fontSize = "12px";
//     cardBody.appendChild(brand);
//   }

//   if (product.description) {
//     const description = document.createElement("p");
//     description.className = "product-description card-text my-2";
//     description.textContent = product.description;
//     cardBody.appendChild(description);
//   }

//   const cardFooter = document.createElement("div");
//   cardFooter.className =
//     "card-footer d-flex align-items-center mt-auto bg-white p-0 pt-3 mb-2";
//   card.appendChild(cardFooter);

//   if (product.price) {
//     const price = document.createElement("span");
//     price.className = "product-price me-auto";
//     price.textContent = product.price + "€";
//     cardFooter.appendChild(price);
//   }

//   const viewItem = document.createElement("button");
//   viewItem.id = "view-button";
//   viewItem.className = "btn btn-primary";
//   viewItem.innerHTML = `<i class="bi bi-eye-fill text-white"></i>`;
//   viewItem.addEventListener("click", viewItemFunction);
//   cardFooter.appendChild(viewItem);

//   if (isAdmin) {
//     console.log("Adding Admin tools");
//     const editButton = document.createElement("button");
//     editButton.id = "edit-button";
//     editButton.className = "btn btn-warning";
//     editButton.innerHTML = `<i class="bi bi-pencil-square"></i>`;
//     // editButton.addEventListener("click", editItem);
//     cardFooter.appendChild(editButton);

//     const deleteButton = document.createElement("button");
//     deleteButton.id = "delete-button";
//     deleteButton.className = "btn btn-danger";
//     deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
//     // deleteButton.addEventListener("click", deleteItem);
//     cardFooter.appendChild(deleteButton);
//   } else {
//     const buyButton = document.createElement("button");
//     buyButton.className = "btn btn-success ms-2";
//     buyButton.innerText = "Buy ";
//     buyButton.addEventListener("click", addToCart);
//     cardFooter.appendChild(buyButton);

//     const cartIcon = document.createElement("span");
//     cartIcon.className = "bi bi-cart4";
//     buyButton.appendChild(cartIcon);
//   }

//   if (product._id) {
//     const productId = document.createElement("p");
//     productId.className =
//       "product-id m-0 text-secondary mt-auto position-absolute bottom-0 left-0 right-0";
//     productId.textContent = product._id;
//     productId.style.fontSize = "8px";
//     cardFooter.appendChild(productId);
//   }

//   return card;
// }

// function viewItemFunction() {
//   console.log("Showing item");
//   hideShop();
//   openItem();
// }

// function openItem(selectedItemId) {
//   fetchProduct(selectedItemId)
//     .then((product) => {
//       const cardElement = createCardElement();
//       cardElement.innerText = product.title;
//     })
//     .catch((error) => {
//       console.log("Error:", error);
//     });
// }

// async function fetchProduct(itemId) {
//   try {
//     const response = await fetch(
//       `https://striveschool-api.herokuapp.com/api/product/${itemId}`
//     );
//     return await response.json();
//   } catch (error) {
//     throw new Error("Failed to fetch product");
//   }
// }

// function createCardElement() {
//   const cardElement = document.createElement("div");
//   document.querySelector(".card-container").appendChild(cardElement);
//   return cardElement;
// }

// function hideShop() {
//   const shop = document.getElementById("shop");
//   shop.classList.add("d-none");
// }
