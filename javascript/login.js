let cart = [];
let total = 0;

const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", loadLoginPage);
console.log("loginButton: addeventlistener");

const backOfficeButton = document.getElementById("back-office-button");
backOfficeButton.addEventListener("click", loadBackOffice);

const addItemOfficeForm = document.getElementById("add-item-office-form");
const resetButton = document.getElementById("reset-item-button");
resetButton.addEventListener("click", function () {
  addItemOfficeForm.reset();
});

if (sessionStorage.isAdmin === "true") {
  backOfficeButton.classList.remove("d-none");
}

function editItem() {
  console.log("edit item");
}

function deleteItem() {
  console.log("item deleted");
}

function loadBackOffice() {
  console.log("Loading Back Office ⬇");
  hideShop();
  console.log("hiding Shop ⬇");

  const backOfficePage = document.getElementById("back-office-page");
  backOfficePage.className = "row max-1200";

  const submitNewItemButton = document.getElementById("submit-new-item-button");

  const addItemOfficeForm = document.getElementById("add-item-office-form");
  const resetButton = document.getElementById("reset-item-button");
  resetButton.addEventListener("click", function () {
    addItemOfficeForm.reset();
  });

  submitNewItemButton.addEventListener("click", function (event) {
    event.preventDefault();

    const isConfirmed = confirm("⚠ Are you sure to post this new article?");

    if (isConfirmed) {
      const productName = document.getElementById("product-name").value;
      const productDescription = document.getElementById(
        "product-description"
      ).value;
      const productBrand = document.getElementById("product-brand").value;
      const productPrice = document.getElementById("product-price").value;
      const productUrl = document.getElementById("product-url").value;

      const requestData = {
        name: productName,
        description: productDescription,
        brand: productBrand,
        price: productPrice,
        imageUrl: productUrl
      };

      fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZTI4MDI1NGU4ODAwMTgzZjE4NjciLCJpYXQiOjE2OTk2MDMwNzIsImV4cCI6MTcwMDgxMjY3Mn0.m4a72RFt16Fio7Qj6dSirjfZJk7srWAS7drV9EY-ezs",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  });

  const viewCardPage = document.getElementById("view-card-page");
  viewCardPage.classList.add("d-none");

  const backofficeButton = document.getElementById("back-office-button");
  backofficeButton.classList.add("d-none");
}

function loadLoginPage() {
  const loginPage = document.getElementById("login-page");
  loginPage.classList.remove("d-none");
  console.log("loginPage: removed d-none");
  console.log(" ---------------------");

  const shopPage = document.getElementById("shop-page");
  shopPage.innerHTML = "";

  const viewCardPage = document.getElementById("view-card-page");
  viewCardPage.classList.add("d-none");

  loginPage.addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username-input").value;
    const passwordInput = document.getElementById("password-input").value;

    login(usernameInput, passwordInput);
    console.log("login");
  });

  // Guest login
  const loginAsGuestButton = document.getElementById(
    "login-as-guest-submit-button"
  );
  loginAsGuestButton.addEventListener("click", function (event) {
    event.preventDefault();
    login("guest", "password");
    console.log("login");
  });

  console.log("loadLoginPage started");

  hideShop();
  console.log("hideShop started");

  function findUser(username, password) {
    console.log("return:", users.find);
    return users.find(
      (user) => user.username === username && user.password === password
    );
  }

  // Function to handle login
  function login(username, password) {
    const user = findUser(username, password);
    if (user) {
      storeUserCredential(user);
      console.log("storeUserCredential: starting");
      hideLoginPage();
      console.log("hideLoginPage: starting");
      toastSuccessLoginMessage(user.username);
      console.log("toastSuccessLoginMessage: starting");
      showUsernameOnNavbar(user.username);
      console.log("showUsernameOnNavbar: starting");
      showlogoutButton();
      console.log("showlogoutButton: starting");
      showCartButton();
      console.log("showCartButton: starting");
      loadShop();
      console.log("loadShop: starting");
    } else {
      toastFailureLoginMessage();
      console.log("toastFailureLoginMessage");
    }
  }

  // Function to store user credentials in sessionStorage
  function storeUserCredential(user) {
    sessionStorage.setItem("username", user.username);
    sessionStorage.setItem("password", user.password);
    sessionStorage.setItem("userType", user.userType);
    sessionStorage.setItem("isAdmin", user.isAdmin);
    sessionStorage.setItem("apiKey", user.apiKey);
    console.log(
      "storeUserCredential: stored username, password, userType, isAdmin, apiKey"
    );
  }

  // Toast success message
  function toastSuccessLoginMessage(username) {
    const toast = new bootstrap.Toast(document.getElementById("liveToast"));
    toast.show();

    const loginOutcome = document.getElementById("login-outcome");
    loginOutcome.className = "text-success me-auto";
    loginOutcome.innerText = "Access Granted";

    const loggingInAs = document.getElementById("logging-in-as");
    loggingInAs.innerHTML = `Logging in as <b>${username}</b>`;

    console.log("toastSuccessLoginMessage");
  }

  // Toast failure message
  function toastFailureLoginMessage() {
    const toast = new bootstrap.Toast(document.getElementById("liveToast"));
    toast.show();

    const loginOutcome = document.getElementById("login-outcome");
    loginOutcome.className = "text-danger me-auto";
    loginOutcome.innerText = "Access Denied";

    const loggingInAs = document.getElementById("logging-in-as");
    loggingInAs.innerText = "Please check your username and password and retry";

    console.log("toastFailureLoginMessage");
  }

  // Show username on navbar after login
  function showUsernameOnNavbar(username) {
    const navUsername = document.getElementById("nav-username");
    navUsername.innerHTML = `Hi, <b>${username}</b>`;

    console.log("showUsernameOnNavbar");
  }

  // Show cart and total
  function showCartButton() {
    const cartButton = document.getElementById("cart-button");
    cartButton.classList.remove("d-none");
    console.log("showCartButton");
  }

  // Show loading spinner before content loads
  function showLoadingSpinner() {
    const pageIndex = document.createElement("page-index");
    pageIndex.innerHTML = `<div class="spinner-border" role="status">
      <span class="visually-hidden">
        Loading...
      </span>
    </div>`;

    console.log("showLoadingSpinner");

    return new Promise((resolve) => {
      console.log("return new Promise");
      setTimeout(resolve, 2000);
    });
  }

  // Load Shop
  async function loadShop() {
    console.log("loadShop:");
    await showLoadingSpinner();
    console.log("showLoadingSpinner");

    if (sessionStorage.getItem("userType") === "user") {
      const logoutButton = document.getElementById("logout-button");
      logoutButton.classList.remove("d-none");
      logoutButton.addEventListener("click", logout);
      console.log("logoutButton: removed d-none");
    }

    const pageIndex = document.getElementById("page-index");
    pageIndex.innerText = "SHOP";
    console.log("pageIndex: SHOP");
    console.log(" ---------------------");

    if (document.getElementById("shop")) {
      //   const shop = document.getElementById("shop");
      //   shop.classList.remove("d-none");
      //   console.log("shop: removed d-none");
      //   console.log(" -----------");
      // } else {
      getRequest();
      console.log("Sending GET request...");
    }

    if (sessionStorage.getItem("isAdmin") === "true") {
      const backOfficeButton = document.getElementById("back-office-button");
      backOfficeButton.classList.remove("d-none");
      console.log("backOfficeButton: removed d-none");
      backOfficeButton.addEventListener("click", loadBackOffice);
      console.log("backOfficeButton: add event listener");
    }

    getRequest();
  }

  // * Product image live update

  const productUrl = document.getElementById("product-url");
  productUrl.addEventListener("change", displayUrlImage);

  function displayUrlImage() {
    const imageUrl = productUrl.value;
    const productImagePreview = document.getElementById(
      "product-image-preview"
    );

    if (imageUrl) {
      productImagePreview.src = imageUrl;
    }

    console.log("displayUrlImage");
    console.log(" -------------------");
  }

  // Hide the shop element
  function hideShop() {
    const shopPage = document.getElementById("shop-page");
    shopPage.className = "d-none";
    console.log("hiding shop");
    console.log(" -------------------");
  }

  console.log("Login page loaded!");
}

getRequest();
console.log("getRequest");
console.log(" -----------------------");

function addToCart() {
  const title = card.querySelector(".product-name").textContent;
  const price = card.querySelector(".product-price").textContent;
  const selectedItem = { title, price };
  console.log("Item added to cart:", selectedItem);
  cart.push(selectedItem);
  checkCart();
  console.log("cart:", cart);
  console.log("addToCart");
  console.log(" ---------------------");
}

function checkCart() {
  const cartButton = document.getElementById("cart-button");
  const currentCartTotal = document.getElementById("current-cart-total");

  if (cart.length !== 0 && cartButton && currentCartTotal) {
    currentCartTotal.textContent = total + "€";
    currentCartTotal.style.fontSize = "1rem";
    currentCartTotal.innerHTML = `${total}€`;
  }

  console.log("checkCart:", checkCart);
  console.log(" ---------------------");
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
        throw new Error("Network error: " + response.status);
      }
    })
    .then((arrayOfProducts) => {
      const shopPage = document.getElementById("shop-page");
      shopPage.classList.remove("d-none");

      const shopButton = document.getElementById("shop-button");
      shopButton.classList.add("d-none");

      const productsRow = document.createElement("div");
      productsRow.className = "row d-flex gap-3 justify-content-center";
      shopPage.appendChild(productsRow);

      const userLogged = sessionStorage.getItem("userType") === "user";
      console.log("userLogged:", userLogged);

      if (userLogged) {
        const logoutButton = document.getElementById("logout-button");
        logoutButton.classList.remove("d-none");
        logoutButton.addEventListener("click", logout);

        const loginButton = document.getElementById("login-button");
        loginButton.classList.add("d-none");
      }

      arrayOfProducts.forEach((product) => {
        console.log("arrayOfProducts:", arrayOfProducts);

        const card = document.createElement("div");
        card.className =
          "card col-12 h-xs-25 p-xs-1 col-sm-4 h-sm-50 p-sm-2 col-md-3 h-md-75 p-md-3 col-xl-2 h-xl-100 p-4 rounded-4";
        card.style.minHeight = "100px";
        productsRow.appendChild(card);

        if (product.imageUrl) {
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
          description.className = "product-description card-text my-2";
          description.textContent = product.description;
          cardBody.appendChild(description);
        }

        const cardFooter = document.createElement("div");
        cardFooter.className =
          "card-footer d-flex align-items-center mt-auto bg-white p-0 pt-3 mb-2";
        card.appendChild(cardFooter);

        if (product.price) {
          const price = document.createElement("span");
          price.className = "product-price me-auto";
          price.textContent = product.price + "€";
          cardFooter.appendChild(price);
        }

        const viewItemButton = document.createElement("button");
        viewItemButton.id = "view-button";
        viewItemButton.className = "btn btn-primary";
        viewItemButton.innerHTML = `<i class="bi bi-eye-fill text-white"></i>`;
        viewItemButton.addEventListener("click", async (e) => {
          hideShop();
          console.log("hideShop");
          const closestCard = e.target.closest(".card");
          if (closestCard) {
            const productIdElement = closestCard.querySelector(".product-id");
            if (productIdElement) {
              let innerText = productIdElement.textContent.trim();
              innerText = encodeURIComponent(innerText);
              await openItem(innerText);
              console.log("openItem");
            }
          }
        });
        cardFooter.appendChild(viewItemButton);

        if (sessionStorage.getItem("isAdmin") === "true") {
          console.log("Adding Admin tools");
          const editButton = document.createElement("button");
          editButton.id = "edit-button";
          editButton.className = "btn btn-warning";
          editButton.innerHTML = `<i class="bi bi-pencil-square"></i>`;
          editButton.addEventListener("click", editItem);
          cardFooter.appendChild(editButton);

          const deleteButton = document.createElement("button");
          deleteButton.id = "delete-button";
          deleteButton.className = "btn btn-danger";
          deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
          deleteButton.addEventListener("click", async (e) => {
            const shopPage = document.getElementById("shop-page");
            shopPage.innerHTML = "";
            const closestCard = e.target.closest(".card");
            if (closestCard) {
              closestCard.remove();
            }
            try {
              const response = await fetch(
                `https://striveschool-api.herokuapp.com/api/product/${product._id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization:
                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZTI4MDI1NGU4ODAwMTgzZjE4NjciLCJpYXQiOjE2OTk2MDMwNzIsImV4cCI6MTcwMDgxMjY3Mn0.m4a72RFt16Fio7Qj6dSirjfZJk7srWAS7drV9EY-ezs"
                  }
                }
              );
              if (!response.ok) {
                throw new Error("Something went wrong");
              }
              console.log("Product deleted");
            } catch (error) {
              console.error("Error:", error);
            }
            getRequest();
          });

          cardFooter.appendChild(deleteButton);
        } else {
          const buyButton = document.createElement("button");
          buyButton.className = "btn btn-success ms-2";
          buyButton.innerText = "Buy ";
          buyButton.addEventListener("click", addToCart);
          cardFooter.appendChild(buyButton);

          const cartIcon = document.createElement("span");
          cartIcon.className = "bi bi-cart4";
          buyButton.appendChild(cartIcon);
        }

        if (product._id) {
          const productId = document.createElement("p");
          productId.className =
            "product-id m-0 text-secondary mt-auto position-absolute bottom-0 left-0 right-0";
          productId.textContent = product._id;
          productId.style.fontSize = "8px";
          cardFooter.appendChild(productId);
        }

        console.log("createProductCard:");
      });
    })
    .catch((error) => {
      console.log("Error: " + error.message);
    });
  console.log("getRequest: completed");

  if (sessionStorage.getItem("userType" !== "guest")) {
    const loginButton = document.getElementById("login-button");
    loginButton.classList.remove("d-none");
  }

  if (sessionStorage.getItem("isAdmin" === "true")) {
    const backOfficeButton = document.getElementById("back-office-button");
    backOfficeButton.classList.remove("d-none");
  }
}

async function openItem(innerText) {
  console.log(innerText);
  console.log("openItem");

  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${innerText}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZTI4MDI1NGU4ODAwMTgzZjE4NjciLCJpYXQiOjE2OTk2MDMwNzIsImV4cCI6MTcwMDgxMjY3Mn0.m4a72RFt16Fio7Qj6dSirjfZJk7srWAS7drV9EY-ezs",
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const product = await response.json();
    console.log("Success:", product);
    loadViewCardPage(product);
  } catch (error) {
    console.log("Error:", error);
  }
}

function loadViewCardPage(item) {
  const viewCardPage = document.getElementById("view-card-page");
  viewCardPage.innerHTML = "";
  viewCardPage.classList.remove("d-none");

  const card = document.createElement("div");
  card.className = "card col-12 h-100 w-100 p-4 rounded-4 max-height-auto";
  viewCardPage.appendChild(card);

  const cardImage = document.createElement("img");
  cardImage.className = "product-img object-fit-contain card-img-top rounded-4";
  cardImage.src = item.imageUrl;
  card.appendChild(cardImage);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body m-0 p-0 py-4 pb-3 text-decoration-none";
  card.appendChild(cardBody);

  const cardTitle = document.createElement("h3");
  cardTitle.className = "product-name card-title no-truncate";
  cardTitle.innerText = item.name;
  cardBody.appendChild(cardTitle);

  const cardBrand = document.createElement("h5");
  cardBrand.className = "card-text mt-3 disabled";
  cardBrand.innerText = item.brand;
  cardBody.appendChild(cardBrand);

  const cardDescription = document.createElement("p");
  cardDescription.className = "card-text no-truncate";
  cardDescription.innerText = item.description;
  cardBody.appendChild(cardDescription);

  const cardFooter = document.createElement("div");
  cardFooter.className =
    "card-footer d-flex align-items-center mt-auto bg-white p-0 pt-3 mb-2";
  card.appendChild(cardFooter);

  if (item.price) {
    const cardPrice = document.createElement("span");
    cardPrice.className = "product-price me-auto";
    cardPrice.textContent = item.price + "€";
    cardFooter.appendChild(cardPrice);
  }

  if (item._id) {
    const cardId = document.createElement("p");
    cardId.className =
      "product-id m-0 text-secondary mt-auto position-absolute bottom-0 left-0 right-0";
    cardId.textContent = item._id;
    cardId.style.fontSize = "8px";
    cardFooter.appendChild(cardId);
  }

  if (sessionStorage.getItem("isAdmin") === "true") {
    console.log("Adding Admin tools");
    const editButton = document.createElement("button");
    editButton.id = "edit-button";
    editButton.className = "btn btn-warning";
    editButton.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    editButton.addEventListener("click", editItem);
    cardFooter.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.id = "delete-button";
    deleteButton.className = "btn btn-danger";
    deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
    deleteButton.setAttribute("data-card-id", item._id);
    deleteButton.addEventListener("click", async () => {
      const shopPage = document.getElementById("shop-page");
      shopPage.innerHTML = "";
      const closestCard = e.target.closest(".card");
      if (closestCard) {
        closestCard.remove();
      }
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/product/${item._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZTI4MDI1NGU4ODAwMTgzZjE4NjciLCJpYXQiOjE2OTk2MDMwNzIsImV4cCI6MTcwMDgxMjY3Mn0.m4a72RFt16Fio7Qj6dSirjfZJk7srWAS7drV9EY-ezs"
            }
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        console.log("Product deleted");
      } catch (error) {
        console.error("Error:", error);
      }
      getRequest();
    });

    cardFooter.appendChild(deleteButton);
  } else {
    const buyButton = document.createElement("button");
    buyButton.className = "btn btn-success ms-2";
    buyButton.innerText = "Buy ";
    buyButton.addEventListener("click", addToCart);
    cardFooter.appendChild(buyButton);

    const cartIcon = document.createElement("span");
    cartIcon.className = "bi bi-cart4";
    buyButton.appendChild(cartIcon);
  }

  console.log("loadViewCardPage:");
}

function hideShop() {
  const shopPage = document.getElementById("shop-page");
  if (shopPage) {
    shopPage.classList.add("d-none");
  }
  console.log("hideShop");
  console.log(" -------------------");
}

function logout() {
  const logoutButton = document.getElementById("logout-button");
  logoutButton.classList.add("d-none");
  sessionStorage.clear();
  console.log("sessionStorage.clear():", sessionStorage.clear());

  const navUsername = document.getElementById("nav-username");
  navUsername.classList.add("d-none");

  const backofficeButton = document.getElementById("back-office-button");
  backofficeButton.classList.add("d-none");

  console.log("logout:");

  hideBackOfficePage();
  console.log("hideBackOfficePage");

  hideLoginPage();
  console.log("hideLoginPage");

  const loginButton = document.getElementById("login-button");
  loginButton.classList.remove("d-none");

  const shopPage = document.getElementById("shop-page");
  shopPage.innerHTML = "";

  getRequest();
}

function showlogoutButton() {
  const userLogged = sessionStorage.getItem("userType") === "user";
  console.log("userLogged:", userLogged);
  if (userLogged) {
    const logoutButton = document.getElementById("logout-button");
    logoutButton.classList.remove("d-none");
    logoutButton.addEventListener("click", logout);
  }

  console.log("showlogoutButton");
}

// Hide login page
function hideLoginPage() {
  const loginPage = document.getElementById("login-page");
  loginPage.classList.add("d-none");

  console.log("hideLoginPage");
}

// Hide back-office page
function hideBackOfficePage() {
  const backOfficePage = document.getElementById("back-office-page");
  backOfficePage.classList.add("d-none");

  console.log("hideBackOfficePage");
}
