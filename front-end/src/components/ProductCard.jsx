import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div
      key={product.id}
      className="bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col"
    >
     <div className="w-full aspect-square mb-4">
  <img
    src={product.imageUrl[0]}
    alt={product.name}
    className="w-full h-full object-cover rounded-md"
  />
</div>
      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 ">
        {product.name}
      </h3>
      <span className='flex justify-between mt-2'>
      <p className="text-gray-600 text-lg">Price - ${product.price}</p>
      <p className="text-md text-gray-500 text-lg">Category - {product.categories[0]}</p>
      </span>
      <span className='flex justify-between text-lg'>
      <p className="text-md text-gray-500">Brand - {product.brand}</p>
      <p className="text-md text-gray-500">Color - {product.color}</p>
      </span>
    </div>
  )
}
