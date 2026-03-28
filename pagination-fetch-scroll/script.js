const postsContainer = document.querySelector(".posts-section");
const loader = document.querySelector(".loader");
const API_URL = (pageNumber, numberPerPage) => `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${numberPerPage}`;
let pageNumber = 1;
let numberPerPage = 10;
let allPostsLoaded = false;

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
    const posts = await fetchPosts(pageNumber);
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

// Implement scroll Pagination logic

// show and hide loader
const showLoader = () => loader.style.opacity = 1;
const hideLoader = () => loader.style.opacity = 0;

// show posts on screen after scrolled to bottom
const showPostsOnScreen = async () => {
    if (allPostsLoaded) return;
    showLoader();
    pageNumber++;
    const posts = await fetchPosts(pageNumber);
    if (posts.length === 0) {
        allPostsLoaded = true;
        hideLoader();
        return;
    }
    addPostsToContainer(posts);
    hideLoader();
}

// Scroll event logic. Always compare scrollTop + clientHeight + 5 to be greater than scrollHeight.
// 5 is overlap height before viewpost when event should trigger.
window.addEventListener("scroll", async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        await showPostsOnScreen();
    }
});

