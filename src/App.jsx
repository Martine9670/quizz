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
      confetti(); // Cotillons par défaut (zéro config style dans le JS)
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
          <h1 className="main-title">{score === questionsDuNiveau.length ? "👑 ROI !" : "FIN !"}</h1>
          <p className="subtitle">Ton score est de {score} sur {questionsDuNiveau.length}</p>
          <button onClick={resetQuizz} className="btn-primary">REJOUER</button>
        </div>
      </div>
    );
  }

  if (!niveau) {
    return (
      <div className="app-container">
        <div className="card">
          <h1 className="main-title">QUIZZY!</h1>
          <p className="subtitle">Prêt à t'amuser ?</p>
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

  return (
    <div className="app-container">
      <div className="card">
        <span className="level-badge">{niveau}</span>
        <p className="subtitle">Question {indexQuestion + 1} / {questionsDuNiveau.length}</p>
        <p className="question-text">{questionsDuNiveau[indexQuestion].q}</p>
        
        <form onSubmit={validerReponse}>
          <input 
            autoFocus
            className="input-field"
            type="text" 
            value={reponse} 
            onChange={(e) => setReponse(e.target.value)} 
            placeholder="Tape ici..."
          />
          <button type="submit" className="btn-primary">VALIDER</button>
        </form>
        <button onClick={resetQuizz} className="btn-link">Abandonner</button>
      </div>
    </div>
  );
}

export default App;