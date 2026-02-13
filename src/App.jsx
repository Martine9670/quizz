import { useState, useEffect } from 'react';
import { questions } from './data';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [niveau, setNiveau] = useState(null);
  const [questionsDuNiveau, setQuestionsDuNiveau] = useState([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [termine, setTermine] = useState(false);
  const [reponse, setReponse] = useState("");

  // Effet de cotillons : On ne passe pas d'objet de couleurs pour éviter l'injection de style via JS
  useEffect(() => {
    if (termine && score === questionsDuNiveau.length && score > 0) {
      confetti(); 
    }
  }, [termine, score, questionsDuNiveau.length]);

  const resetQuizz = () => {
    setNiveau(null);
    setQuestionsDuNiveau([]);
    setIndexQuestion(0);
    setScore(0);
    setTermine(false);
    setReponse("");
  };

  const handleDemarrer = (choix) => {
    // Logique de pioche : mélange (shuffle) puis sélection des 5 premières (slice)
    const selection = [...questions[choix]]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    
    setQuestionsDuNiveau(selection);
    setNiveau(choix);
    setIndexQuestion(0);
    setScore(0);
    setTermine(false);
    setReponse("");
  };

  const validerReponse = (e) => {
    e.preventDefault();
    if (!reponse.trim()) return;

    const bonneReponse = questionsDuNiveau[indexQuestion].a;
    
    // Comparaison insensible à la casse et aux espaces
    if (reponse.trim().toLowerCase() === bonneReponse.toLowerCase()) {
      setScore(s => s + 1);
    }

    if (indexQuestion + 1 < questionsDuNiveau.length) {
      setIndexQuestion(i => i + 1);
      setReponse("");
    } else {
      setTermine(true);
    }
  };

  // --- ECRAN FINAL ---
  if (termine) {
    const isParfait = score === questionsDuNiveau.length;
    return (
      <div className="app-container">
        <div className="card">
          <h1 className="main-title">{isParfait ? "👑 MASTER !" : "FIN !"}</h1>
          <p className="subtitle">Tu as obtenu {score} / {questionsDuNiveau.length}</p>
          <button onClick={resetQuizz} className="btn-primary">REJOUER</button>
        </div>
      </div>
    );
  }

// --- ECRAN DE SELECTION ---
if (!niveau) {
  return (
    <div className="app-container">
      <h2 className="welcome-text">Bienvenue sur mon Quizz ! <br /> 
      Un petit jeu pour un peu de détente...</h2>
      <div className="card">
        <h1 className="main-title">QUIZZY!</h1>
        <p className="subtitle">Sélectionne un niveau pour piocher 5 questions au hasard</p>
        <div className="level-grid">
          {Object.keys(questions).map((lv) => (
            <button key={lv} onClick={() => handleDemarrer(lv)} className={`btn-level ${lv}`}>
              {lv.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

  // --- ECRAN DE JEU ---
  return (
    <div className="app-container">
      <h2 className="welcome-text">À toi de jouer ! </h2>

      <div className="card">
        <span className={`level-badge ${niveau}`}>{niveau}</span>
        <p className="subtitle">Question {indexQuestion + 1} / {questionsDuNiveau.length}</p>
        <p className="question-text">{questionsDuNiveau[indexQuestion].q}</p>
        
        <form onSubmit={validerReponse}>
          <input 
            autoFocus
            className="input-field"
            type="text" 
            value={reponse} 
            onChange={(e) => setReponse(e.target.value)} 
            placeholder="Ta réponse..."
          />
          <button type="submit" className="btn-primary">VALIDER</button>
        </form>
        
        <button onClick={resetQuizz} className="btn-abandon">ABANDONNER</button>
      </div>
    </div>
  );
}

export default App;