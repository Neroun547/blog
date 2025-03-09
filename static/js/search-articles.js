const wrapperSearchBtn = document.querySelector(".wrapper__search-btn");
const wrapperSearchInput = document.querySelector(".wrapper__search-input");

wrapperSearchBtn.addEventListener("click", function () {
  window.location.href = `/articles/search-by-name-page/?name=${wrapperSearchInput.value}`;
});
