function createPostHTML(post) {
  return `
    <div class="post">
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    </div>`;
}

function addPostToContainer(container, postHTML) {
  container.innerHTML += postHTML;
}

async function fetchAndDisplayPost() {
  try {
    const container = document.createElement("div");
    container.id = "posts-container";
    document.body.appendChild(container);

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    posts.forEach((post) => {
      const postHTML = createPostHTML(post);
      addPostToContainer(container, postHTML);
    });
  } catch (error) {
    container.innerHTML = `Ошибка. Запрос не выполнен`;
  }
}

fetchAndDisplayPost();
