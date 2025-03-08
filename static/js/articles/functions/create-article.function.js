export function createArticleFunction(id, name, theme, date, fileName, smallText) {
  const divCol = document.createElement("div");
  divCol.className = "col s12 m12 l4 wrapper__articles-item";

  const divCard = document.createElement("div");
  divCard.className = "card pa-10";

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = `Назва: ${name}`;

  const themeDiv = document.createElement("div");
  themeDiv.className = "mt-20";
  themeDiv.textContent = `Тема: ${theme}`;

  const dateDiv = document.createElement("div");
  dateDiv.className = "mt-20";
  dateDiv.textContent = `Дата публікації: ${date}`;

  const textWrapper = document.createElement("div");
  textWrapper.className = "mt-20 wrapper__articles-item-small-text";

  textWrapper.innerHTML = smallText;

  const cardAction = document.createElement("div");
  cardAction.className = "card-action";
  const link = document.createElement("a");
  link.href = `/articles/${fileName}`;
  link.className = "grey-text text-darken-3";
  link.textContent = "Читати";
  cardAction.appendChild(link);

  divCard.append(title, themeDiv, dateDiv, textWrapper, cardAction);
  divCol.appendChild(divCard);

  return divCol;
}
