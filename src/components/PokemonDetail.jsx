import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
      setIsLoading(false);
    };

    fetchPokemonDetails();
  }, [name]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 text-white">
        <svg
          className="animate-spin h-10 w-10 text-gray-500"
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
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 text-white">
      <Link to="/" className="inline-flex p-4 rounded-md font-semibold items-center bg-blue-500 text-white mb-4">
        <FaArrowLeft className="mr-2" /> Back to List
      </Link>
      <div className="max-w-md mx-auto mt-8 p-4 rounded-lg shadow-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg text-white">
        <img
          className="w-full rounded-lg"
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
        />
        <h2 className="text-2xl text-center font-bold my-4 capitalize">{pokemon.name}</h2>
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p><strong>Abilities:</strong></p>
        <ul className="list-disc list-inside">
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
