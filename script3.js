const postTitleInput = document.querySelector("#postTitle");
const postArticleInput = document.querySelector("#postArticle");
const btnCreatePost = document.querySelector(".btnCreatePost");

function addPost() {
  let postsContainer = document.getElementById("posts-container");
  if (!postsContainer) {
    postsContainer = document.createElement("div");
    postsContainer.id = "posts-container";
    document.body.appendChild(postsContainer);
  }

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: postTitleInput.value,
      body: postArticleInput.value,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const newPost = document.createElement("div");
      newPost.classList.add("post");
      newPost.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.body}</p>
      `;

      postsContainer.appendChild(newPost);

      postTitleInput.value = "";
      postArticleInput.value = "";
    })
    .catch(() => {
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error");
      errorMessage.textContent = "Ошибка. Запрос не выполнен.";
      postsContainer.appendChild(errorMessage);
    });
}

btnCreatePost.addEventListener("click", addPost);
