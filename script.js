const accessKey = "av5VPdTXREH7i3rAusedRiqHLHJF_y2_FMXB9T0QG3w";
let page = 1;
let keyword = "";
let input = document.querySelector(".search-box input");
let btn = document.querySelector(".btn button");
let images = document.querySelector(".images");
let load = document.querySelector("#load");

function download(imgurl) {
  fetch(imgurl)
    .then((res) => res.blob())
    .then((blob) => {
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = new Date().getTime() + "image.jpg";
      a.click();
    })
    .catch(() => alert("download failed!"));
}

async function getResponse() {
  keyword = input.value;
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
  let response = await fetch(url);
  let data = await response.json();
  let results = data.results;

  if (page == 1) {
    images.innerHTML = ""; //remove previous images
  }
  load.style.display = "none";
  results.map((result) => {
    let li = document.createElement("li"); //create li element same as in html
    li.classList.add("image"); //add class
    let html = `<img src="${result.urls.small}" alt="img" class="photo" />
          <div class="details">
            <div class="user">
              <img src="images/camera.svg" alt="img" />
              <span>${result.user.name}</span>
            </div>
            <div class="download" onclick=download("${result.urls.small}")>
              <img src="images/download.svg" alt="img" />
            </div>
          </div>`;
    li.innerHTML = html;
    images.appendChild(li);
  });
}
input.addEventListener("keyup", (e) => {
  // we can search images by pressing enter key in search box
  page = 1;
  if (e.key == "Enter") {
    getResponse();
  }
});
btn.addEventListener("click", () => {
  page = 1;
  getResponse();
});
load.addEventListener("click", () => {
  page++;
  getResponse(); //it load more images
});
