// Function to fetch data from db.json and populate book listings
function fetchAndDisplayBooks() {
  fetch('db.json') // Replace 'db.json' with the correct path to your JSON file
    .then((response) => response.json())
    .then((data) => {
      const bookListContainer = document.getElementById('bookList');
      const searchInput = document.getElementById('searchInput');

      data.books.forEach((book) => {
        const card = createBookCard(book);
        bookListContainer.appendChild(card);
      });

      // Add an event listener to search for books
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        bookListContainer.innerHTML = ''; // Clear the current book listings

        data.books.forEach((book) => {
          if (book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)) {
            const card = createBookCard(book);
            bookListContainer.appendChild(card);
          }
        });
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to create a book card
function createBookCard(book) {
  const card = document.createElement('div');
  card.className = 'col-md-4 mb-4';
  card.innerHTML = `
    <div class="card h-100">
      <img src="${book.imageLink}" class="card-img-top" alt="${book.title}">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">Author: ${book.author}</p>
        <p class="card-text">Year: ${book.year}</p>
        <button class="btn btn-primary btn-sm view-details-button" data-toggle="modal" data-target="#bookDetailsModal">View Details</button>
      </div>
    </div>
  `;

  card.querySelector('.view-details-button').addEventListener('click', () => {
    populateModal(book);
  });

  return card;
}

// Function to populate the modal with book details
function populateModal(book) {
  const modalBookDetails = document.getElementById('modalBookDetails');
  modalBookDetails.innerHTML = `
    <h5>${book.title}</h5>
    <p>Author: ${book.author}</p>
    <p>Year: ${book.year}</p>
    <!-- Add more book details here -->
  `;
}

// Fetch and display books when the page loads
fetchAndDisplayBooks();
