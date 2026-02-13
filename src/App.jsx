import { useState, useEffect } from 'react';
import { questions } from './data';
import confetti from 'canvas-confetti';
import './App.css';

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

function App() {
  const [niveau, setNiveau] = useState(null);
  const [questionsDuNiveau, setQuestionsDuNiveau] = useState([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [termine, setTermine] = useState(false);
  const [reponse, setReponse] = useState("");

  useEffect(() => {
    if (termine && score === questionsDuNiveau.length && score > 0) {
      // On retire les couleurs du JS pour laisser la lib utiliser ses réglages par défaut
      // ou on utilise des couleurs système
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
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
    setQuestionsDuNiveau(shuffle(questions[choix]));
    setNiveau(choix);
  };

  const validerReponse = (e) => {
    e.preventDefault();
    if (!reponse.trim()) return;
    const bonneReponse = questionsDuNiveau[indexQuestion].a;
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

  if (termine) {
    return (
      <div className="app-container">
        <div className="card">
          <h1>{score === questionsDuNiveau.length ? "🏆 PARFAIT !" : "Fin !"}</h1>
          <p className="score-final">Score : <strong>{score} / {questionsDuNiveau.length}</strong></p>
          <button onClick={resetQuizz} className="btn-primary">Rejouer</button>
        </div>
      </div>
    );
  }

  if (!niveau) {
    return (
      <div className="app-container">
        <h1 className="main-title">Quizz Master</h1>
        <div className="level-grid">
          {Object.keys(questions).map((lv) => (
            <button key={lv} onClick={() => handleDemarrer(lv)} className={`btn-level ${lv}`}>
              {lv}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Calcul du pourcentage pour la barre
  const pourcentage = ((indexQuestion + 1) / questionsDuNiveau.length) * 100;

  return (
    <div className="app-container">
      <div className="card">
        {/* AUCUN STYLE ICI : on utilise un attribut data personnalisé */}
        <div className="progress-container">
            <div className="progress-bar" data-pct={Math.round(pourcentage)}></div>
        </div>
        
        <span className="level-badge">{niveau}</span>
        <h2>Question {indexQuestion + 1}</h2>
        <p className="question-text">{questionsDuNiveau[indexQuestion].q}</p>
        
        <form onSubmit={validerReponse}>
          <input 
            autoFocus
            className="input-field"
            type="text" 
            value={reponse} 
            onChange={(e) => setReponse(e.target.value)} 
            placeholder="Réponse..."
          />
          <button type="submit" className="btn-primary">OK</button>
        </form>
        <button onClick={resetQuizz} className="btn-link">Abandonner</button>
      </div>
    </div>
  );
}

export default App;