const username = `linoleparquet`;
const RSSUrl = `https://medium.com/feed/@${username}`;
const RSSConverter = `https://api.rss2json.com/v1/api.json?rss_url=${RSSUrl}`;

const $text = document.querySelector(".text");
const $textList = document.querySelector(".textList");

export const getMediumData = async () => {
  try {
    const response = await fetch(RSSConverter);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getSingleText = async () => {
  const posts = await getMediumData();
  const post = posts.items[1]; // latest text (0 to 9)
  const title = post.title;
  const pubDate = post.pubDate;
  const link = post.link;
  const author = post.author;
  const content = post.content;

  const newText = document.createElement("div");
  newText.className = "text";
  newText.innerHTML = `<h1>${title}</h1>
    <a href="${link}"><h2>Published ${pubDate} by ${author}</h2></a>
    ${content}`;

  $text.appendChild(newText);
};

const getLatestTextsList = async () => {
  const posts = await getMediumData();
  for (let post of posts.items) {
    const newItem = document.createElement("li");
    const title = post.title;
    const link = post.link;
    const thumbnail = post.thumbnail;

    newItem.innerHTML = `<img src="${thumbnail}" alt=""><a href="${link}"><h3>${title}</h3></a>`;

    $textList.appendChild(newItem);
  }
};

const $medium = document.querySelector(".medium");

getMediumData();

const getTextToCard = async () => {
  const posts = await getMediumData();
  for (let post of posts.items) {
    const newItem = document.createElement("div");
    newItem.className = "col-md-4 d-flex ftco-animate";

    const title = post.title;
    const link = post.link;
    const thumbnail = post.thumbnail;
    const pubDate = post.pubDate;

    // formatDate
    const date = new Date(pubDate);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = dateFormatter.format(date).toUpperCase();

    newItem.innerHTML = `
      <div class="blog-entry justify-content-end">
        <a
          href="${link}"
          class="block-20"
          style="background-image: url('${thumbnail}')"
        ></a>
        <div class="text mt-3 float-right d-block">
          <div class="d-flex align-items-center mb-3 meta">
            <p class="mb-0">
              <span class="mr-2">${formattedDate}</span>
            </p>
          </div>
          <h3 class="heading">
            <a href="${link}">${title}</a>
          </h3>
          <p>
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </p>
        </div>
      </div>`;

    $medium.appendChild(newItem);
  }
  contentWayPoint();
};

const getFeedTitle = async () => {
  const data = await getMediumData();
};

const contentWayPoint = function () {
  var i = 0;
  $(".ftco-animate").waypoint(
    function (direction) {
      if (direction === "down" && !$(this.element).hasClass("ftco-animated")) {
        i++;

        $(this.element).addClass("item-animate");
        setTimeout(function () {
          $("body .ftco-animate.item-animate").each(function (k) {
            var el = $(this);
            setTimeout(
              function () {
                var effect = el.data("animate-effect");
                if (effect === "fadeIn") {
                  el.addClass("fadeIn ftco-animated");
                } else if (effect === "fadeInLeft") {
                  el.addClass("fadeInLeft ftco-animated");
                } else if (effect === "fadeInRight") {
                  el.addClass("fadeInRight ftco-animated");
                } else {
                  el.addClass("fadeInUp ftco-animated");
                }
                el.removeClass("item-animate");
              },
              k * 50,
              "easeInOutExpo"
            );
          });
        }, 100);
      }
    },
    { offset: "95%" }
  );
};

getFeedTitle();
getTextToCard();
contentWayPoint();
