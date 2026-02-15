const API_URL = "http://localhost:1337/api/questions";

// Simulation de l'import (ou copie tes données ici pour plus de simplicité)
// Je te conseille de copier ici le contenu de ton objet 'questions' de data.js
const questionsData = {
    facile: [
        { q: "Exemple ?", a: "Réponse" },
        // ... colle tes questions ici ...
    { q: "Quelle est la capitale de la France ?", a: "Paris" },
    { q: "Combien font 2 + 2 ?", a: "4" },
    { q: "Quel animal fait 'Meuh' ?", a: "Vache" },
    { q: "Quelle est la couleur du ciel par beau temps ?", a: "Bleu" },
    { q: "Dans quel pays se trouve la Tour de Pise ?", a: "Italie" },
    { q: "Combien y a-t-il de jours dans une semaine ?", a: "7" },
    { q: "Quelle est la femelle du taureau ?", a: "Vache" },
    { q: "Quelle langue parle-t-on au Brésil ?", a: "Portugais" },
    { q: "Quel astre nous éclaire le jour ?", a: "Soleil" },
    { q: "Combien de doigts a une main humaine ?", a: "5" },
    { q: "Quel est le nom du plombier rouge de Nintendo ?", a: "Mario" },
    { q: "Comment s'appelle le petit de la poule ?", a: "Poussin" },
    { q: "Quelle est la couleur d'une émeraude ?", a: "Vert" },
    { q: "Quel langage utilise-t-on pour le style web ?", a: "CSS" },
    { q: "Quel est le plus grand chiffre sur un dé ?", a: "6" },
    { q: "Dans quel pays sont les pyramides de Gizeh ?", a: "Egypte" },
    { q: "Qui est le meilleur ami de Mickey ?", a: "Dingo" },
    { q: "Combien de minutes y a-t-il dans une heure ?", a: "60" },
    { q: "Quel est le nom de l'ogre vert au cinéma ?", a: "Shrek" },
    { q: "Quelle est la capitale du Royaume-Uni ?", a: "Londres" },
    { q: "Quel Pokémon est jaune avec des joues rouges ?", a: "Pikachu" },
    { q: "De quel pays vient la pizza ?", a: "Italie" },
    { q: "Quel animal a une très longue trompe ?", a: "Elephant" },
    { q: "Comment s'appelle l'os qui protège le cerveau ?", a: "Crane" },
    { q: "Quel est le moteur de recherche de Google ?", a: "Google" },
    { q: "Quel fruit produit le pommier ?", a: "Pomme" },
    { q: "Combien d'ailes a une abeille ?", a: "4" },
    { q: "Quelle est la capitale de l'Allemagne ?", a: "Berlin" },
    { q: "Quel est l'opposé de 'vrai' ?", a: "Faux" },
    { q: "Qui est le chevalier noir de Gotham ?", a: "Batman" },
    { q: "Quel instrument a des touches noires et blanches ?", a: "Piano" },
    { q: "Quelle saison vient après l'hiver ?", a: "Printemps" },
    { q: "Combien font 10 x 10 ?", a: "100" },
    { q: "Quel océan borde l'île de la Réunion ?", a: "Indien" },
    { q: "Quel animal est le roi de la jungle ?", a: "Lion" },
    { q: "Quel est le pays de la K-Pop ?", a: "Coree du Sud" },
    { q: "Le nom du bonhomme de neige dans La Reine des Neiges ?", a: "Olaf" },
    { q: "Quelle est la capitale des Etats-Unis ?", a: "Washington" },
    { q: "L'oiseau bleu était le logo de quel réseau ?", a: "Twitter" },
    { q: "Symbole HTML pour ouvrir une balise ?", a: "<" },
    { q: "Combien de secondes dans une minute ?", a: "60" },
    { q: "Quelle est la couleur principale du Père Noël ?", a: "Rouge" },
    { q: "Le nom de la planète où nous vivons ?", a: "Terre" },
    { q: "Qui a écrit le conte Cendrillon ?", a: "Charles Perrault" },
    { q: "Quelle est la langue la plus parlée en Chine ?", a: "Mandarin" },
    { q: "Quel sport se joue avec un ballon ovale ?", a: "Rugby" },
    { q: "Quelle est la capitale de l'Italie ?", a: "Rome" },
    { q: "Combien de côtés a un triangle ?", a: "3" },
    { q: "Quel animal est célèbre pour sa lenteur ?", a: "Paresseux" },
    { q: "Quel est le prénom du frère de Mario ?", a: "Luigi" }
 
    ],
    moyen: [ { q: "Quel est le plus grand océan du monde ?", a: "Pacifique" },
    { q: "Qui a peint la Joconde ?", a: "Leonard de Vinci" },
    { q: "Combien de planètes compte le système solaire ?", a: "8" },
    { q: "Pays vainqueur de la Coupe du Monde 2018 ?", a: "France" },
    { q: "Quelle est la capitale de l'Espagne ?", a: "Madrid" },
    { q: "Quel est l'organe qui pompe le sang ?", a: "Coeur" },
    { q: "En quelle année est tombé le mur de Berlin ?", a: "1989" },
    { q: "Quel métal est liquide à température ambiante ?", a: "Mercure" },
    { q: "Quel est le plus grand mammifère terrestre ?", a: "Elephant" },
    { q: "Qui a écrit 'Le Petit Prince' ?", a: "Saint-Exupery" },
    { q: "Quel studio a créé Star Wars ?", a: "Lucasfilm" },
    { q: "Le langage de script standard pour le web ?", a: "JavaScript" },
    { q: "Quel chanteur est le 'King of Pop' ?", a: "Michael Jackson" },
    { q: "Dans quel jeu trouve-t-on Master Chief ?", a: "Halo" },
    { q: "Quelle est la monnaie du Japon ?", a: "Yen" },
    { q: "Quel élément chimique a pour symbole 'H' ?", a: "Hydrogene" },
    { q: "Quel pays a offert la Statue de la Liberté ?", a: "France" },
    { q: "Ville surnommée 'La Grosse Pomme' ?", a: "New York" },
    { q: "Qui a fondé Facebook ?", a: "Mark Zuckerberg" },
    { q: "Quel est le plus long fleuve d'Europe ?", a: "Volga" },
    { q: "Quel est le nom de l'IA dans Portal ?", a: "GLaDOS" },
    { q: "Dans quel groupe chantait Freddie Mercury ?", a: "Queen" },
    { q: "Format d'image web gérant la transparence ?", a: "PNG" },
    { q: "Quelle est la capitale de la Russie ?", a: "Moscou" },
    { q: "Réalisateur du film 'Inception' ?", a: "Christopher Nolan" },
    { q: "Framework PHP célèbre commençant par L ?", a: "Laravel" },
    { q: "Le cerveau d'un ordinateur (sigle) ?", a: "CPU" },
    { q: "Quelle est la capitale de la Turquie ?", a: "Ankara" },
    { q: "Quel est le cri du hibou ?", a: "Hululement" },
    { q: "Jeu vidéo de briques créé par Pajitnov ?", a: "Tetris" },
    { q: "Qui a écrit Harry Potter ?", a: "J.K. Rowling" },
    { q: "Le plus grand désert froid du monde ?", a: "Antarctique" },
    { q: "Quel pays est désormais le plus peuplé ?", a: "Inde" },
    { q: "Qui a fondé la société SpaceX ?", a: "Elon Musk" },
    { q: "Gaz absorbé par les plantes et rejeté par l'homme ?", a: "CO2" },
    { q: "Pays surnommé 'l'Empire du Milieu' ?", a: "Chine" },
    { q: "Qui a découvert la loi de la gravitation ?", a: "Isaac Newton" },
    { q: "Le nom de code de l'agent 007 ?", a: "James Bond" },
    { q: "Langage pour requêter une base de données ?", a: "SQL" },
    { q: "Quelle est la capitale du Canada ?", a: "Ottawa" },
    { q: "L'animal terrestre le plus rapide ?", a: "Guepard" },
    { q: "Co-fondateur d'Apple avec Steve Jobs ?", a: "Steve Wozniak" },
    { q: "Quelle ville a accueilli les JO d'été 2024 ?", a: "Paris" },
    { q: "Prénom de la compagne de Spider-Man ?", a: "Mary Jane" },
    { q: "Pays ayant pour capitale Lisbonne ?", a: "Portugal" },
    { q: "Fleur symbole des Pays-Bas ?", a: "Tulipe" },
    { q: "Un des trois protagonistes de GTA V ?", a: "Franklin" },
    { q: "Interprète de la chanson 'Blinding Lights' ?", a: "The Weeknd" },
    { q: "La planète surnommée 'la planète rouge' ?", a: "Mars" },
    { q: "Balise HTML pour une liste à puces ?", a: "ul" }
  /* ... */ ],
    difficile: [ { q: "Quel est le symbole chimique de l'or ?", a: "Au" },
    { q: "Année du premier pas de l'homme sur la lune ?", a: "1969" },
    { q: "Combien de coeurs possède une pieuvre ?", a: "3" },
    { q: "Quelle est la capitale de l'Australie ?", a: "Canberra" },
    { q: "Le plus long fleuve du monde ?", a: "Amazone" },
    { q: "Qui a découvert la pénicilline ?", a: "Fleming" },
    { q: "Élément le plus abondant dans l'univers ?", a: "Hydrogene" },
    { q: "Où se trouve le siège principal de l'ONU ?", a: "New York" },
    { q: "Le nom de notre galaxie ?", a: "Voie Lactee" },
    { q: "Qui a peint le tableau 'Guernica' ?", a: "Picasso" },
    { q: "Philosophe auteur de 'Ainsi parlait Zarathoustra' ?", a: "Nietzsche" },
    { q: "Vitesse de la lumière (en milliers de km/s) ?", a: "300" },
    { q: "Le nom de l'IA accompagnant Major-General dans Halo ?", a: "Cortana" },
    { q: "Année de création du noyau Linux ?", a: "1991" },
    { q: "Compositeur de 'La Flute enchantee' ?", a: "Mozart" },
    { q: "La première femme programmeuse ?", a: "Ada Lovelace" },
    { q: "Protagoniste principal de Metal Gear Solid ?", a: "Solid Snake" },
    { q: "Protocole de transfert de fichiers (sigle) ?", a: "FTP" },
    { q: "Compositeur de la 9ème symphonie (Ode à la joie) ?", a: "Beethoven" },
    { q: "Créateur du langage de programmation C ?", a: "Dennis Ritchie" },
    { q: "Jeu 'Battle Royale' ayant lancé la mode en 2017 ?", a: "PUBG" },
    { q: "Quelle est la capitale de l'Islande ?", a: "Reykjavik" },
    { q: "Le plus petit pays du monde ?", a: "Vatican" },
    { q: "Auteur du roman complexe 'Ulysse' ?", a: "James Joyce" },
    { q: "Particule de charge négative dans l'atome ?", a: "Electron" },
    { q: "Nom de l'algorithme de classement initial de Google ?", a: "PageRank" },
    { q: "Capitale actuelle du Kazakhstan ?", a: "Astana" },
    { q: "Inventeur du World Wide Web (nom complet) ?", a: "Tim Berners-Lee" },
    { q: "Pays abritant le temple d'Angkor Wat ?", a: "Cambodge" },
    { q: "Quelle est la monnaie de la Suisse ?", a: "Franc Suisse" },
    { q: "IA sarcastique dans le film Interstellar ?", a: "TARS" },
    { q: "Mathématicien ayant cassé le code Enigma ?", a: "Alan Turing" },
    { q: "Élément chimique au numéro atomique 1 ?", a: "Hydrogene" },
    { q: "Capitale de la Corée du Nord ?", a: "Pyongyang" },
    { q: "Auteur des aventures de Sherlock Holmes ?", a: "Arthur Conan Doyle" },
    { q: "Inventeur de la première pile électrique ?", a: "Alessandro Volta" },
    { q: "Premier satellite artificiel mis en orbite ?", a: "Spoutnik" },
    { q: "Opéra de Bizet se déroulant à Séville ?", a: "Carmen" },
    { q: "Plus haut sommet du continent africain ?", a: "Kilimandjaro" },
    { q: "Créateur du langage Python ?", a: "Guido van Rossum" },
    { q: "Quelle est la capitale du Vietnam ?", a: "Hanoi" },
    { q: "Siècle de la Renaissance italienne (chiffre) ?", a: "15" },
    { q: "Pays possédant le plus grand nombre d'îles ?", a: "Suede" },
    { q: "Peintre expressionniste auteur du 'Cri' ?", a: "Edvard Munch" },
    { q: "Quelle est la capitale du Nigeria ?", a: "Abuja" },
    { q: "Processeur spécialisé dans le calcul graphique ?", a: "GPU" },
    { q: "Auteur du roman dystopique '1984' ?", a: "George Orwell" },
    { q: "Le plus grand lac d'Afrique ?", a: "Victoria" },
    { q: "Année de naissance du langage JavaScript ?", a: "1995" },
    { q: "Nom de l'IA créée par Tony Stark ?", a: "JARVIS" }
  ]
};

async function seed() {
    console.log("🚀 Début de l'importation...");

    for (const [niveau, liste] of Object.entries(questionsData)) {
        for (const item of liste) {
            const payload = {
                data: {
                    intitule: item.q,
                    reponse: item.a,
                    niveau: niveau
                }
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (response.ok) {
                    console.log(`✅ Ajouté (${niveau}) : ${item.q.substring(0, 30)}...`);
                }
            } catch (error) {
                console.error("❌ Erreur :", error);
            }
        }
    }
    console.log("🏁 Importation terminée !");
}

seed();