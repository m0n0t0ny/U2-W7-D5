// * Load Login

function loadLogin() {
  const backOffice = document.getElementById("back-office");
  backOffice.classList.add("d-none");

  const pageIndex = document.getElementById("page-index");
  pageIndex.innerText = "Shop";

  if (document.getElementById("shop")) {
    const shop = document.getElementById("shop");
    shop.classList.remove("d-none");
  } else {
    getRequest();
  }
}
