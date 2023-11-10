window.onload = () => {
  const shopButton = document.getElementById("shop-button");
  shopButton.addEventListener("click", loadShop);

  const backOfficeBtn = document.getElementById("back-office-btn");
  backOfficeBtn.addEventListener("click", loadBackOffice);
};

function loadBackOffice() {
  const shop = document.getElementById("shop");
  shop.classList.add("d-none");

  const backOffice = document.getElementById("back-office");
  backOffice.classList.remove("d-none");
}
