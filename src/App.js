import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [todos, setTodos] = useState([]);

  const fetchApi = async () => {
    if (pokemonName) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const responseJSON = await response.json();
      setTodos(responseJSON);
    }
  }
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <header className="App-header">
      <div className="App">
        <input type="text" value={pokemonName} 
        onChange={(e) => setPokemonName(e.target.value)}/>
        <button onClick={fetchApi}>Consultar</button><br></br>
        {!todos.sprites ? (
          ''
        ) : (
          <img src={todos.sprites?.front_default}/>
        )}
        
      </div>
    </header>

  );
}
export default App;
