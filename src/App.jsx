import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import PokemonCard from './components/PokemonCard';
import PokemonDetail from './components/PokemonDetail';
import './index.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const location = useLocation(); // Menggunakan useLocation di dalam komponen App

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      const promises = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          name: pokemon.name,
          image: details.sprites.other['official-artwork'].front_default,
          url: pokemon.url,
        };
      });
      const results = await Promise.all(promises);
      setPokemons(results);
    };

    fetchPokemons();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchIconClick = () => {
    setShowSearchInput(true);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isDetailPage = location.pathname.startsWith('/pokemon/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 text-white">
      <nav className="bg-black bg-opacity-50 shadow-lg mb-8 p-4 rounded-lg mx-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-gray-100" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            PokemonApp
          </Link>
          {!isDetailPage && (
            <div className="flex items-center">
              {!showSearchInput && (
                <button
                  onClick={handleSearchIconClick}
                  className="bg-blue-500 text-white p-2 rounded-md ml-2"
                >
                  <FaSearch />
                </button>
              )}
              {showSearchInput && (
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onBlur={() => setShowSearchInput(false)}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Search Pokemon..."
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  />
                  <FaSearch className="absolute right-3 top-3 text-gray-500" />
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
              {filteredPokemons.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon} />
              ))}
            </div>
          }
        />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
      <div className='text-white font-lg font-semibold'>Dibuat oleh Faris Ramadhan 2024</div>
    </div>
  );
};

export default App;
