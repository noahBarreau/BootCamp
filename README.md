<!-- Explication du fonctionnement de BLACKJACK 

.-----------------------------------------------------------------------------
|   Pour lancer le projet :
|       1. ouvrir un terminal a la racine du projet
|       1.1 se rendre dans le dossier bootcamp-backend
|       1.2 lancer le serveur ('py manage.py runserver'/'python manage.py runserver'par exemple
|       1.3 ouvrir le lien proposer 'http://127.0.0.1:8000/' par exemple
|
|       2 Ouvrir un 2eme terminal ( il est possible de le faire dans le meme qu'avant )
|       2.1 se rendre dans le dossier bootcamp-frontend
|       2.2 lancer le serveur avec 'npm run dev' par exemple
|       2.3 ouvrir le lien proposer 'http://localhost:5173/' par exemple
*---------------------------------------------------------------------------------

.---------------------------------------------------------------------------------
| Tout a été lancé et les pages nécessaires également : lien utile ( adapter liens si besoin)
|    -> pour se rendre sur l'api du jeu -> http://127.0.0.1:8000/apiGame/docs
|    -> pour se rendre sur l'admin -> http://127.0.0.1:8000/admin
|    -> pour se rendre sur la page de jeu ( pour jouer ) -> http://localhost:5173/
|    -> pour se rendre sur la page pour jouer il faut creer une game ou ..5173/playGame
*---------------------------------------------------------------------------------

.---------------------------------------------------------------------------------
|    Sur la page d'accueil du jeu : 
|      |  un input pour choisir le nom de la game
|      |  pour ajouter des joueurs : 
|      |      rentrez le nom du joueur dans le input
|      |      cliquez sur 'ajoutez un joueur'
|      |  repetez l'operation pour chaque joueur
|      |  lorsque tout les joueurs ont été ajoutez, cliquez sur 'créer la game'
|
|    Si tout c'est bien passé apres avoir cliqué sur créer la game, une redirection 
|    vers une autre page c'est effectué
|
|    Sur la page du jeu :
|      |  Le nom du joueur qui joue ( tour actuel ) est affiché
|      |  Son score est affiché
|      |  Chaque joueur a la possibilité de :
|      |      choisir son nombre de dés
|      |      lancer les dés
|      |      finir son tourÉ
|      |  Si le joueur fini son tour, le score est affiché dans le tableau scoreboard et
|      |  la base de données est mise a jour également
|    
|    Lorsque tout les joueurs ont joué, le scoreboard affiche le/les vainqueurs si il y en a
|    ( si tout les joueurs ont dépassé 21, personne n'a gagné)
|
|     -- Bonus : si un joueur fait pile 21, une alert 'BlackJack !' apparait et le joueur doit
|    CLIQUÉ SUR FINIR LE TOUR, si il clique sur relancer les des, son score depassera 21 et il 
|    aura perdu
|
|     -- Info : lorsque PARTIE est TERMINÉ, le dernier joueur peut continuer a lancer les dés
|    mais son score ne changera pas pour autant car il a déjà joué.
|
|     -- Tips : en cas d'erreur dans la console de type 'location.state is null' il faut
|    repartir sur la page d'accueil ( http://localhost:5173/ ) et recreer une game
*---------------------------------------------------------------------------------

-->