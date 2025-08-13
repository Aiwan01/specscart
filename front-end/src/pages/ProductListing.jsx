import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort, fetchProducts, setSearch, setPage } from '../features/products/productSlice';
import FiltersSidebar from '../components/FiltersSidebar';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';


export default function ProductListing() {
  const dispatch = useDispatch();
  const { productList, page, totalPages, loading, search, sortBy, order, filters } = useSelector((state) => state.products);
  const [searchDebouncing, setSearchDebouncing] = useState(search);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, search, sortBy, order, page, filters]);


  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(setSearch(searchDebouncing));
      dispatch(fetchProducts());
    }, 500);

    return () => clearTimeout(delay);
  }, [searchDebouncing, dispatch]);

  // Create the combined sort value for the select element
  const currentSortValue = `${sortBy}_${order}`;

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-lg shadow h-fit sticky top-4">
        <FiltersSidebar />
      </aside>

      {/* Main Content */}
      <main className="w-[calc(100%-256px)] overflow-x-hidden">
        {/* Search & Sort */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchDebouncing}
              onChange={(e) => setSearchDebouncing(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={currentSortValue}
              onChange={(e) => {
                dispatch(setSort(e.target.value));
                dispatch(fetchProducts());
              }}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A-Z</option>
              <option value="name_desc">Name: Z-A</option>
            </select>
          </div>
        </div>

        {/* Loader */}
        {loading && <Loader />}

        {/* Product Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productList?.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8 mb-6">
          <button
            onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md border transition-colors ${page === 1
              ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
              }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-medium">Page</span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-md font-semibold">
              {page}
            </span>
            <span className="font-medium">of</span>
            <span className="font-semibold">{totalPages}</span>
          </div>

          <button
            onClick={() => dispatch(setPage(Math.min(totalPages, page + 1)))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md border transition-colors ${page === totalPages
              ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
              }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>

  );
}
