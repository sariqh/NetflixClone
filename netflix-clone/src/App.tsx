import React from 'react';
import './App.css';
import '../styles/Row.scss'
import {requests} from './request'
import {Row} from './Row'

function App() {
  return (
    <div className="App">
        <Row title="NETFLIX ORIGINALS" fetchUrl={requests.feachNetflixOriginals} isLargeRow />
        <Row title="Top Rated" fetchUrl={requests.feactTopRated} />
        <Row title="Action Movies" fetchUrl={requests.feactActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.feactComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.feactHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.feactRomanceMovies} />
        <Row title="DOcumentaries" fetchUrl={requests.feactDocumentMovies} />
    </div>
  );
}

export default App;
