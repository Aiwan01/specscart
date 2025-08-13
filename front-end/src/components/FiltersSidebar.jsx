import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange, setCategoryFilter, setBrandFilter, setColorFilter } from '../features/products/productSlice';
import { useState, useRef, useEffect } from 'react';

export default function FiltersSidebar() {
  
  const dispatch = useDispatch();
  const { categories, brands, colors, filters } = useSelector((state) => state.products);
  const [isDragging, setIsDragging] = useState(null); // 'min' or 'max' or null
  const sliderRef = useRef(null);

  const toggleCategory = (category) => {
    dispatch(setCategoryFilter(category));
  };

  const toggleBrand = (brand) => {
    dispatch(setBrandFilter(brand));
  };

  const toggleColor = (color) => {
    dispatch(setColorFilter(color));
  };

  const getPercentage = (value) => {
    return ((value - 0) / (10000 - 0)) * 100;
  };

  const getValueFromPercentage = (percentage) => {
    return Math.round((percentage / 100) * 10000);
  };

  const handleMouseDown = (e, type) => {
    setIsDragging(type);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const value = getValueFromPercentage(percentage);

    if (isDragging === 'min') {
      if (value <= filters.price[1]) {
        dispatch(setPriceRange([value, filters.price[1]]));
      }
    } else if (isDragging === 'max') {
      if (value >= filters.price[0]) {
        dispatch(setPriceRange([filters.price[0], value]));
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

   return (
    <div className='w-64 px-4 py-6 border rounded-md bg-white shadow-md'>
      {/* Categories */}
      <h3 className='font-bold mb-2 text-lg'>Categories</h3>
      {categories?.length > 0 && categories.map((category) => (
        <label key={category.id} className='block mb-2 cursor-pointer'>
          <input
            type='checkbox'
            checked={filters.category.includes(category)}
            onChange={() => toggleCategory(category)}
          />{' '}
          {category}
        </label>
      ))}

      {/* Brands */}
      <div className='mt-4'>
        <h3 className='font-bold mb-2 text-lg'>Brands</h3>
        {brands?.length > 0 && brands.map((brand) => (
          <label key={brand.id} className='block mb-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={filters.brand.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />{' '}
            {brand}
          </label>
        ))}
      </div>

      {/* Colors */}
      <div className='mt-4'>
        <h3 className='font-bold mb-2 text-lg'>Colors</h3>
        {colors?.length > 0 && colors.map((color) => (
          <label key={color.id} className='block mb-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={filters.color.includes(color)}
              onChange={() => toggleColor(color)}
            />{' '}
            {color}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className='mt-4'>
        <h3 className='font-bold mb-2 text-lg'>Price Range</h3>
        
        {/* Custom Dual Range Slider */}
        <div className='relative h-8 mb-4'>
          {/* Track */}
          <div 
            ref={sliderRef}
            className='absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-200 rounded-full cursor-pointer'
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percentage = ((e.clientX - rect.left) / rect.width) * 100;
              const value = getValueFromPercentage(percentage);
              
              // Determine which handle to move based on proximity
              const minDist = Math.abs(percentage - getPercentage(filters.price[0]));
              const maxDist = Math.abs(percentage - getPercentage(filters.price[1]));
              
              if (minDist < maxDist) {
                if (value <= filters.price[1]) {
                  dispatch(setPriceRange([value, filters.price[1]]));
                }
              } else {
                if (value >= filters.price[0]) {
                  dispatch(setPriceRange([filters.price[0], value]));
                }
              }
            }}
          >
            {/* Selected Range */}
            <div 
              className='absolute h-full bg-blue-500 rounded-full'
              style={{
                left: `${getPercentage(filters.price[0])}%`,
                width: `${getPercentage(filters.price[1]) - getPercentage(filters.price[0])}%`
              }}
            />
          </div>

          {/* Min Handle */}
          <div
            className='absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md cursor-pointer hover:bg-blue-700'
            style={{ left: `${getPercentage(filters.price[0])}%`, marginLeft: '-8px' }}
            onMouseDown={(e) => handleMouseDown(e, 'min')}
          />

          {/* Max Handle */}
          <div
            className='absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md cursor-pointer hover:bg-blue-700'
            style={{ left: `${getPercentage(filters.price[1])}%`, marginLeft: '-8px' }}
            onMouseDown={(e) => handleMouseDown(e, 'max')}
          />
        </div>
        
        <div className='flex justify-between text-sm bg-gray-100 p-2 rounded'>
          <span className='font-medium'>₹{filters.price[0].toLocaleString()}</span>
          <span className='text-gray-500'>to</span>
          <span className='font-medium'>₹{filters.price[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

}
