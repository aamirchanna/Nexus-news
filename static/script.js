const url = "/api/news";

async function fetchNews(query) {
  try {
    const response = await fetch(`${url}/${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    bindData(data);
  } catch (error) {
    console.error("Error fetching news", error);
  }
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return; //if there is missing img it will not show any
    //deep clone clone all data templee title desc

    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

//  fill data in template

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} ● ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "main");
  });
}
//  click on nav item

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id); //id works query
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav?.classList.add("active");
}

// click on search button

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
});

window.addEventListener("load", () => {
  fetchNews("default");
});
