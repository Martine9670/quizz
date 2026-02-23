import React, { useState } from 'react';
import axios from 'axios';

const Contact = ({ onBack }) => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, message } = e.target;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value)) {
      setStatus("Veuillez entrer une adresse email valide.");
      return;
    }

    if (message.value.length < 10) {
      setStatus("Votre message doit faire au moins 10 caractères.");
      return;
    }

    try {
      setStatus("Envoi en cours...");

      // Requête vers Strapi
      await axios.post('http://localhost:1337/api/messages', {
        data: {
          email: email.value,
          contenu: message.value 
        }
      });

      setStatus("Succès ! Votre message a été envoyé.");
      e.target.reset();

    } catch (error) {
      console.error("Erreur Strapi:", error);
      setStatus("Erreur lors de l'envoi. Vérifiez que Strapi est lancé.");
    }
  };

  return (
    <div className="card animate-fade-in contact-card-fix">
      <h2 className="main-title">Contactez-nous</h2>
      <p className="subtitle">Une question ? Un bug ? Un encouragement ? N'hésitez pas à nous envoyer un message !</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input 
          type="email" 
          name="email" 
          placeholder="Ton email" 
          className="input-field" 
          required 
        />
        <textarea 
          name="message" 
          placeholder="Ton message..." 
          className="input-field textarea-field" 
          required
        ></textarea>

        {status && (
          <p className={status.includes("Succès") ? "status-success" : "error-message"}>
            {status}
          </p>
        )}

        <div className="button-group">
          <button type="submit" className="btn-primary">Envoyer</button>
          <button type="button" onClick={onBack} className="toggle-auth">Retour au jeu</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;