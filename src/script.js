import { getMovieById, getMovieByQuery } from "./movieService";

const formEle = document.getElementById("form-search");
const resultEle = document.getElementById("results");
const modalEle = document.getElementById("modal");
const modalEleContent = document.getElementById("modal-content");

formEle.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputEle = e.target[0];
  const query = inputEle.value.toLowerCase().trim();
  if (query.length < 3) return;
  inputEle.value = "";
  const data = await getMovieByQuery(query);
  _renderSearchResults(data);
});

resultEle.addEventListener("click", async (e) => {
  const ele = e.target.closest(".info");
  if (ele === null) return;
  const details = await getMovieById(ele.id);
  _renderMovieDetails(details);
  modalEle.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "backdrop-blur-sm",
    "z-10"
  );
  modalEle.classList.remove("hidden");
});

modalEle.addEventListener("click", (e) => {
  const contentEle = e.target.closest("#modal-content");
  if (contentEle) return;
  modalEle.classList.remove(
    "flex",
    "justify-center",
    "items-center",
    "backdrop-blur-sm",
    "z-10"
  );
  modalEle.classList.add("hidden");
  modalEleContent.innerText = "";
});

function _renderSearchResults(data) {
  console.log(data);
  const resultEle = document.getElementById("results");
  resultEle.innerText = "";
  data.Search.forEach((r) => {
    resultEle.insertAdjacentHTML(
      "beforeend",
      `
        <div class="w-28 h-48 lg:w-36 lg:h-52 p-1 border border-transparent rounded-lg shadow-lg shadow-pink-400 ">
            <img class="h-32 w-full border rounded-lg border-transparent shadow-xl shadow-blue-400"
                src=${r.Poster} />
            <div class="m-1 flex flex-col">
                <h2 class="text-xs text-center lg:text-sm">${r.Title}</h2>
                <div class="flex justify-between mt-1 mx-1">
                    <h4 class="text-xs">${r.Year.substring(0, 4)}</h4>
                    <button id=${
                      r.imdbID
                    } class="info text-sm hover:scale-125 lg:text-lg">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                </div>
            </div>
        </div>
        `
    );
  });
}

function _renderMovieDetails(details) {
  console.log(details);
  modalEleContent.innerText = "";
  modalEleContent.insertAdjacentHTML(
    "beforeend",
    `
    <div class="w-1/3">
        <img class="h-full border border-transparent rounded-lg"
            src=${details.Poster} />
    </div>
    <div class="w-2/3">
        <h3 class="font-extrabold">${details.Title}</h3>
        <p class="mt-1">${details.Plot}</p>
        <h4 class="mt-1"><span class="font-bold">Released on :</span><span>${details.Released}</span></h4>
        <h4 class="mt-1"><span class="font-bold">Genre :</span><span>${details.Genre}</span>
        </h4>
        <h4 class="mt-1"><span class="font-bold">Actors :</span><span>${details.Actors}</span>
        </h4>
        <h4 class="mt-1"><span class="font-bold">Available in :</span><span>${details.Language}</span>
        </h4>
    </div>
    `
  );
}
