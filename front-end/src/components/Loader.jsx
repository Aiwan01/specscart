import React from 'react'

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* The main spinner element */}
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      
      {/* Optional loading text */}
      <p className="mt-4 text-gray-400 text-lg">Loading...</p>
    </div>
  );
}
