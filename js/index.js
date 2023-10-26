document.addEventListener('DOMContentLoaded', function() {
    const bookList = document.getElementById('bookList');
    const searchInput = document.getElementById('searchInput');
    const apiUrl = 'https://my-json-server.typicode.com/Njugunasam/phase1finalproject/books';

    // Function to fetch book data and display it
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
                    `;
                    bookList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching data: ' + error));
    }

    // Function to create the 5-star rating
    function createStarRating(bookTitle) {
        const starRating = `
            <span class="star" data-title="${bookTitle}">★</span>
            <span class="star" data-title="${bookTitle}">★</span>
            <span class="star" data-title="${bookTitle}">★</span>
            <span class="star" data-title="${bookTitle}">★</span>
            <span class="star" data-title="${bookTitle}">★</span>
        `;
        return starRating;
    }

    // Add event listener to toggle star ratings and change cursor to pointer
    bookList.addEventListener('click', function(e) {
        if (e.target.classList.contains('star')) {
            const title = e.target.getAttribute('data-title');
            const stars = document.querySelectorAll(`.star[data-title="${title}`);
            
            const clickedIndex = Array.from(stars).indexOf(e.target);

            stars.forEach((star, index) => {
                if (index <= clickedIndex) {
                    star.classList.add('selected');
                    star.style.color = 'yellow';
                } else {
                    star.classList.remove('selected');
                    star.style.color = '';
                }
            });


        }
    });

    // Add cursor pointer to star ratings and filter books on search
    bookList.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('star')) {
            e.target.style.cursor = 'pointer';
        }
    });

    // Add event listener for the search input
    searchInput.addEventListener('input', function() {
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