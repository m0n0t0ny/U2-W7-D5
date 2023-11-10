window.onload = () => {
  const shopButton = document.getElementById("shop-button");
  shopButton.addEventListener("click", loadShop);

  const backOfficeBtn = document.getElementById("back-office-btn");
  backOfficeBtn.addEventListener("click", loadBackOffice);

  const editItemButton = document.getElementById("edit-item-button");
  editItemButton.addEventListener("click", addProductIdDetails);

  document.addEventListener("DOMContentLoaded", function () {
    const submitNewItemButton = document.getElementById("submitNewItemButton");
    submitNewItemButton.addEventListener("click", function (event) {
      event.preventDefault();

      const isConfirmed = confirm("⚠ Are you sure to post this new article?");

      if (isConfirmed) {
        const productId = document.getElementById("id-input").value;

        const requestData = {
          name: document.getElementById("product-name").value,
          description: document.getElementById("product-description").value,
          brand: document.getElementById("product-brand").value,
          price: document.getElementById("product-price").value,
          imageUrl: document.getElementById("product-url").value
        };

        fetch(
          `https://striveschool-api.herokuapp.com/api/product/${productId}`,
          {
            method: "PUT",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZTI4MDI1NGU4ODAwMTgzZjE4NjciLCJpYXQiOjE2OTk2MDMwNzIsImV4cCI6MTcwMDgxMjY3Mn0.m4a72RFt16Fio7Qj6dSirjfZJk7srWAS7drV9EY-ezs",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });

    const editItemButton = document.getElementById("edit-item-button");
    editItemButton.addEventListener("click", addProductIdDetails);
  });
};

function addProductIdDetails() {
  const productIdInput = document.getElementById("id-input");

  fetch(
    `https://striveschool-api.herokuapp.com/api/product/${productIdInput.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("product-name").value = data.name;
      document.getElementById("product-description").value = data.description;
      document.getElementById("product-brand").value = data.brand;
      document.getElementById("product-price").value = data.price;
      document.getElementById("product-url").value = data.imageUrl;
    })
    .catch((error) => console.error("Error fetching product details:", error));
}

function loadBackOffice() {
  const shop = document.getElementById("shop");
  shop.classList.add("d-none");

  const backOffice = document.getElementById("back-office");
  backOffice.classList.remove("d-none");
}
