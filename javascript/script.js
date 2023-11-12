// function addProductIdDetails() {
//   const productIdInput = document.getElementById("id-input");

//   fetch(
//     `https://striveschool-api.herokuapp.com/api/product/${productIdInput.value}`,
//     {
//       headers: {
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZTI4MDI1NGU4ODAwMTgzZjE4NjciLCJpYXQiOjE2OTk2MDMwNzIsImV4cCI6MTcwMDgxMjY3Mn0.m4a72RFt16Fio7Qj6dSirjfZJk7srWAS7drV9EY-ezs"
//       }
//     }
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(
//           `Error fetching product details: ${response.statusText}`
//         );
//       }
//       return response.json();
//     })
//     .then((data) => {
//       populateForm(data);
//     })
//     .catch((error) => {
//       console.error(error.message);
//     });
// }

// function populateForm(productData) {
//   document.getElementById("product-name").value = productData.name || "";
//   document.getElementById("product-description").value =
//     productData.description || "";
//   document.getElementById("product-brand").value = productData.brand || "";
//   document.getElementById("product-price").value = productData.price || "";
//   document.getElementById("product-url").value = productData.imageUrl || "";

//   // const editItemButton edit-item-button
//   // submit-new-item-button
//   // delete-item-button
// }

// function loadBackOffice() {
//   const shop = document.getElementById("shop");
//   shop.classList.add("d-none");

//   const backOffice = document.getElementById("back-office");
//   backOffice.classList.remove("d-none");
// }
