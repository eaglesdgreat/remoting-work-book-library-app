import { useState, useEffect } from 'react';
import axios from 'axios';

const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title'); // Default sort by title
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const PER_PAGE = 10; // Number of books per page

  useEffect(() => {
    const fetchBooks = async () => {
      const params = {
        q: searchTerm, // Search term
        sort: sortBy, // Sort by field
        page: currentPage, // Current page number
      };
      const response = await axios.get('/api/books', { params }); // Replace '/api/books' with your actual endpoint
      setBooks(response.data.books);
      setHasMore(response.data.hasMore);
    };

    fetchBooks();
  }, [searchTerm, sortBy, currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page on search
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book Listing</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={handleSearch}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mr-2"
          />
          <select value={sortBy} onChange={handleSortChange} className="border border-gray-300 rounded-md px-3 py-2">
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} title={book.title} author={book.author} image={book.image} />
        ))}
      </div>
      {hasMore && (
        <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Load More
        </button>
      )}
    </div>
  );
};

const BookCard = ({ title, author, image }) => (
  <div className="rounded-md border border-gray-300 shadow-sm p-4">
    <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-2" />
    <h3 className="text-lg font-medium mb-1">{title}</h3>
    <p className="text-gray-600">{author}</p>
  </div>
);

export default BookListing;