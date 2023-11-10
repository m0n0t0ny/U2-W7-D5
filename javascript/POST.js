document.addEventListener("DOMContentLoaded", function () {
  const submitNewItemButton = document.getElementById("submitNewItemButton");

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
});

// * Product image live update

const productUrl = document.getElementById("product-url");
productUrl.addEventListener("change", displayUrlImage);

function displayUrlImage() {
  const imageUrl = productUrl.value;
  const productImagePreview = document.getElementById("product-image-preview");

  if (imageUrl) {
    productImagePreview.src = imageUrl;
  }
}
