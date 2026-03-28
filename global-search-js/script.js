const postsContainer = document.querySelector(".posts-section");
const API_URL = (pageNumber, numberPerPage) => `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${numberPerPage}`;
let pageNumber = 1;
let numberPerPage = 12;
let posts = [];


const fetchPosts = async (page) => {
    try {
        const response = await fetch(API_URL(page, numberPerPage));
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error(error);
    }
}

// Initial Loading of Posts
const loadInitialPosts = async () => {
    posts = [...await fetchPosts(pageNumber)];
    addPostsToContainer(posts);
}

// Add posts into container
const addPostsToContainer = (posts) => {
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add('post-card');
        postElement.innerHTML = `
            <div class="post-card-body">
                <h2 class="post-card-title">${post.title}</h2>
                <p class="post-card-description">${post.body}</p>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Call func to load initial posts
loadInitialPosts();

// Implement Pagination logic
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

nextBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    pageNumber++;
    postsContainer.innerHTML = "";
    const posts = await fetchPosts(pageNumber);
    addPostsToContainer(posts);
});

prevBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (pageNumber === 1) return;
    pageNumber--;
    postsContainer.innerHTML = "";
    posts = [...await fetchPosts(pageNumber)];
    addPostsToContainer(posts);
});

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || post.body.toLowerCase().includes(searchTerm)
    );
    postsContainer.innerHTML = "";
    addPostsToContainer(filteredPosts);
});

