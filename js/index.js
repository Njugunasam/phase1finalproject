document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultsContainer = document.getElementById("results");

    async function fetchBooks(query) {
        try {
            const response = await fetch('https://my-json-server.typicode.com/Njugunasam/phase1finalproject/books'); // Assuming db.json is in the same directory
            const data = await response.json();
            
            resultsContainer.innerHTML = '';

            data.books
                .filter(book => book.title.toLowerCase().includes(query.toLowerCase()))
                .forEach(book => {
                    const bookCard = `
                        <div class="card">
                            <img src="${book.imageLink}" class="card-img-top" alt="${book.title}">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">${book.author}</p>
                            </div>
                        </div>
                    `;
                    resultsContainer.innerHTML += bookCard;
                });
        } catch (error) {
            console.error(error);
        }
    }

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query !== "") {
            fetchBooks(query);
        }
    });
});
