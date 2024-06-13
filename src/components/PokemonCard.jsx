import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <div className="relative max-w-xs rounded-lg overflow-hidden shadow-lg p-2 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg border border-gray-200">
        <div className="relative">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <svg
                className="animate-spin h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          )}
          <img
            className={`w-full ${isLoading ? 'hidden' : 'block'}`}
            src={pokemon.image}
            alt={pokemon.name}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="px-4 py-2">
          <div className="font-bold text-xl mb-2 text-center capitalize" style={{ color: getRandomColor() }}>{pokemon.name}</div>
        </div>
      </div>
    </Link>
  );
};

const getRandomColor = () => {
  const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default PokemonCard;
