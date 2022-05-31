import { useState, useEffect } from 'react';
import qs from 'qs'
import { SearchInput } from './components/input';
import { Pagination } from './pagination';
import './App.css';

const LIMIT = 15

function App() {
  const [text, setText] = useState('')
  const [info, setInfo] = useState({})
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    
    const query = {
      page: {
        limit: LIMIT,
        offset,
      }
    };
    if (text){
      query.filter = {
        text: text
      }
    }

      //setInfo({})
      fetch(`https://kitsu.io/api/edge/anime?${qs.stringify(query)}`)
      .then((response)=> response.json())
      .then((response) => {
        setInfo(response)
      })
    
  }, [text, offset])

  const cleanSearch = () => {
    setInfo({})
    setText('')

  }
  

  return (
    <div className="App">
      <h1>Animes List</h1>
      <SearchInput className="input" value={text} onChange={(search) => setText(search)}/>
      <button onClick={cleanSearch} className="cleanBtn">Limpar Pesquisa</button>
      {text && !info.data && (
        <span>Carregando...</span>
      )}
      {info.data && (
        <ul className='anime--list'>
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle}/>
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
      {info.meta && (
      <Pagination limit={LIMIT} total={info.meta.count} offset={offset} setOffset={setOffset}/>
      )}
      <footer>
        Feito por Eduardo Rodrigues&copy; 
       
        Dados pegos no Site <a target="_blank" href="https://kitsu.docs.apiary.io">kitsu</a>
      </footer>
    </div>
  );
}

export default App;
