// @ts-expect-error using alias as import so not an error
import { IFilter, IPaginationProps, ISort, Types } from '@/types'
import { useEffect, useState, Fragment } from 'react';

// @ts-expect-error using alias as import so not an error
import { useGetAllBooks } from '@/hooks/api/books/useGetAllBooks'
// @ts-expect-error using alias as import so not an error
import { useGlobalContext } from '@/context/GlobalContext'

const PER_PAGE = 10;

const BookListing = () => {
  const { state: { books, paginationInfo }, dispatch } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState<string>('');
  const [sortBy, setSortBy] = useState<ISort[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([{
    column: '',
    operator: '=',
    value: ''
  }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<IPaginationProps>(paginationInfo);

  const fetchAllBooks = useGetAllBooks();

  const fetchBooks = async () => {
    const params = {
      search: searchTerm,
      sort: sortBy,
      page: currentPage,
      filter: filters,
      first: PER_PAGE,
    };

    const response = await fetchAllBooks(params);

    if (response.status == 200) {
      dispatch({
        type: Types.AddBooks,
        payload: [...books, ...response.data]
      })

      dispatch({
        type: Types.Pagination,
        payload: response.paginatorInfo
      })

      setPagination(response.paginatorInfo);
    }
  };

  useEffect(() => {
    if (books.length === 0) void fetchBooks();
  }, [books]);

  useEffect(() => {
    if (searchTerm || currentPage > 1 || sortBy.length > 0) void fetchBooks();
  }, [searchTerm, currentPage, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    
    setSortValue(value)
    setSortBy([{ column: value.split('-')[0], order: value.split('-')[1] }]);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const toggleModal = () => {
    document.getElementById('modal')!.classList.toggle('hidden');
  }

  const submitFilter = () => {
    console.log('submit')
  }

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
          <select value={sortValue} onChange={handleSortChange} className="border border-gray-300 rounded-md px-3 py-2">
            <option value="title-asc">Title Ascending</option>
            <option value="author-asc">Author Ascending</option>
            <option value="title-desc">Title Descending</option>
            <option value="author-desc">Author Descending</option>
          </select>
          <div className="ml-4">
            <button
              className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-700 transition font-medium duration-500" 
              onClick={toggleModal}
            >
              SHOW Filter
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} title={book.title} author={book.author} image={book.image} />
        ))}
      </div>
      {pagination?.hasMorePages && (
        <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Load More
        </button>
      )}
      <FilterModal
        filters={filters}
        setFilters={setFilters}
        toggleModal={toggleModal}
        submitFilter={submitFilter}
      />
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

const FilterModal = ({ filters, setFilters, toggleModal, submitFilter }) => {
  const updateFilter = () => {
    submitFilter()
  }

  const handleFilterChange = (value, index, type) => {
    const filter = filters[index];
    filter[type] = value;

    setFilters([...filters, filter]);
  };

  const addFilterItem = () => {
    setFilters([
      ...filters,
      {
        column: '',
        operator: '=',
        value: ''
      }
    ])
  }

  const removeFilterItem = (index) => {
    if (filters.length === 1) {
      return;
    }

    // const updatedFilterItems = filters.filter((item, i) => i !== index)
    filters.splice(index, 1)
    setFilters([...filters]);
  }

  return (
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block align-center bg-white rounded-lg text-left overflow-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {
              filters.map((filter: IFilter, index: number) => (
                <Fragment key={index}>
                  <div>
                    <label className="font-medium text-gray-800">Column</label>

                    <select
                      id="filter"
                      value={filter.column}
                      onChange={(e) => handleFilterChange(e.target.value, index, 'column')}
                      className="w-full outline-none rounded bg-gray-100 p-3 mt-2 mb-3"
                    >
                      <option value="title">Title</option>
                      <option value="subtitle">Subtitle</option>
                      <option value="description">Description</option>
                      <option value="publisher">Publisher</option>
                      <option value="published_date">Published Date</option>
                      <option value="language">Language</option>
                      <option value="number_of_pages">Number of pages</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="font-medium text-gray-800">Value</label>
                    <div className="flex justify-between">
                      <input
                        type="text"
                        placeholder="start typing..."
                        value={filter.value}
                        onChange={(e) => handleFilterChange(e.target.value, index, 'value')}
                        className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                      />
                      <span
                        className="text-red-500 hover:text-red-800 aling-item-center cursor-pointer"
                        onClick={() => removeFilterItem(index)}
                      >X</span>
                    </div>
                  </div>
                </Fragment>
              ))
            }
          </div>

          <div className="flex justify-end align-item-center">
            <Button
              name="Add"
              classname="py-1 px-4 bg-green-500 text-white rounded font-small hover:bg-green-700 mr-2 mb-3 transition duration-500"
              action={addFilterItem}
            />
          </div>

          <div className="bg-gray-200 px-4 py-3 text-right">
            <Button
              name="Cancel"
              classname="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              action={toggleModal}
            />
            
            <Button
              name="Filter"
              classname="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
              action={updateFilter}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Button({ name, classname, action }) {
  return (
    <button type="button" className={classname} onClick={action}>{name}</button>
  )
}

export default BookListing;
