document.addEventListener('DOMContentLoaded', function() {
    const bookList = document.getElementById('bookList');
    const searchInput = document.getElementById('searchInput');
    const apiUrl = 'https://my-json-server.typicode.com/Njugunasam/phase1finalproject/books';

    // Function to fetch data and dispalying the books
    function fetchBooks() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(book => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listItem.innerHTML = `
                        <img src="${book.imageLink}" alt="${book.title}" class="img-thumbnail" style="max-width: 100px;">
                        <h3>${book.title}</h3>
                        <p>Author: ${book.author}</p>
                        <a href="${book.link}" target="_blank">Read Book</a>
                        <div class="star-rating" data-title="${book.title}">
                            ${createStarRating(book.title)}
                        </div>
                        <button class="like-button" data-title="${book.title}">Like</button>
                    `;
                    bookList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching data: ' + error));
    }

    // Function to create the star rating
    function createStarRating(bookTitle) {
        const starRating = Array(5)
            .fill('<span class="star" data-title="${bookTitle}">★</span>')
            .join('');

        return starRating;
    }

    // Add event listener to toggle star ratings
    bookList.addEventListener('click', function (e) {
        if (e.target.classList.contains('star')) {
            const title = e.target.getAttribute('data-title');
            const stars = document.querySelectorAll(`.star[data-title="${title}`);

            const clickedIndex = Array.from(stars).indexOf(e.target);

            stars.forEach((star, index) => {
                if (index <= clickedIndex) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
        }

        // Like button functionality
        if (e.target.classList.contains('like-button')) {
            const title = e.target.getAttribute('data-title');
            alert(`You liked the book: ${title}`);
        }
    });

    // Add event listener for the search input
    searchInput.addEventListener('input', function () {
        const searchValue = searchInput.value.toLowerCase();
        const bookItems = bookList.querySelectorAll('li');

        bookItems.forEach(item => {
            const bookTitle = item.querySelector('h3').textContent.toLowerCase();
            if (bookTitle.includes(searchValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Fetch and display books
    fetchBooks();
});