import React from 'react';
import CommentService from './components/CommentService';

function App() {
  const apiUrl = "http://localhost:5001";  // URL de test de ton API

  return (
    <div className="App">
      <h1>Micro-service de commentaires</h1>
      <CommentService  />  {/* Tester le composant avec l'URL */}
    </div>
  );
}

export default App;
