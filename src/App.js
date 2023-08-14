import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  const fetchApi = async () => {
    //aca vamos a validar si exite el nombre del pokemon, cosa q si no existe no consultamos por las 
    if (pokemonName) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.name) {
          setTodos([responseJSON]); 
          setError(false);
        } else {
          setTodos([]);
          setError(true);
        }
      } else {
        setTodos([]);
        setError(true); 
      }
    }
  }

  return (
    <header className="App-header">
      <div className="App">
        <input type="text" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} />
        <button onClick={fetchApi}>Consultar</button><br />
        {/* aca valdamos si hay algun error en la consulta, si hay mostramos el siguiente enunciado*/}
        {error ? (
          <p>Pokémon no encontrado o respuesta inválida.</p>
        ) : todos.length === 0 ? (
          <p>Ingresa el nombre de un Pokémon.</p>
        ) : (
          <div>
            <h5>{todos[0].name}</h5>
            <img src={todos[0].sprites?.front_default} />
          </div>
        )}
      </div>
    </header>
  );
}
export default App;
