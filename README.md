Cette application a pour objectif de permettre la saisie des scores et la gestion des appariements dans un tournoi.

# Introduction
L'objectif principal de cette application est de remplacer les fichiers Excel habituels, tout en gardant un fonctionnement similaire, notamment dans la structure des appariements.
En effet, la saisie de données dans un document excel comporte un certain nombre de problèmes :
 * Nécessité de maîtriser le formalisme d'excel et les opérations utiles à la résolution des appariements, qui peuvent être complexes
 * Lourdeur des opérations de recherche et de l'interface, qui peuvent rendre difficile l'accès à des informations régulièrement nécessaires
 * Nécessité de saisir beaucoup de données additionnelles et de gérer beaucoup d'éléments à la main, pouvant entraîner des erreurs en plus des erreurs de saisie

Afin de faciliter la gestion des résultats au cours d'un tournoi et de ne conserver que la saisie des scores pour l'utilisateur, cette application dispose des fonctionnalités suivantes :

 * Gestion automatique des appariements, permettant de générer des appariements valides respectant le plus précisément possible les méthodes actuellement mises en place, avec un certain nombre d'options permettant de maîtriser au mieux ce qui est réalisé.
 * Recherche rapide des informations : on peut rechercher un résultat par le nom d'un des deux joueurs, le numéro de la table, le nom de la table s'il y en a et le round
 * Saisie contrôlée des résultats : on ne doit saisir que le score de la partie, dont on vérifie qu'il correspond bien à deux entiers entre 0 et 12. Les points issus de ce résultat sont calculés et attribués aux joueurs en fin de round.
 * Modification de toutes les données d'intérêt à tout instant : scores ayant déjà été saisis, appariements insatisfaisants.
 * Possibilité de sauvegarder la totalité des données sous la forme d'un fichier JSON et de repartir d'une sauvegarde.
 * Possibiltié d'utiliser l'application sans Internet à condition de posséder son fichier html et un navigateur.
 * Possibilité d'utiliser l'application sur un téléphone mobile, grace à une interface adaptée
 
# Installation
Voici les étapes à suivre pour installer l'application. J'ai séparé cette section en une rubrique `Développeurs` pour les personnes souhaitant contribuer au projet et une rubrique `Utilisateurs` pour les personnes souhaitant simplement utiliser l'application.

## Utilisateurs
Télécharger la dernière version de l'application sous la forme d'un fichier unique mesbg_scorer.html, disponible à cette adresse `https://github.com/Gummyy/mesb_scorer/releases/`
Pour gérer les inscriptions du tournoi plusieurs possibilités :
 * (à venir) `mesbg-army-tracker.com`, via l'option `Générer un fichier d'inscriptions pour MESBG_scorer`. Après avoir téléchargé ce fichier, il est possible de l'importer dans MESBG_Scorer.
 * L'application possède également une interface permettant de saisir les pseudos, les noms des joueurs et le nom de l'armée des participants
Une fois les inscriptions importées ou créées, l'application n'a plus besoin d'aucune ressource exterieure pour fonctionner

## Développeurs
Afin de contribuer au projet, cloner le répertoire sur son espace personnel, créer une nouvelle branche (il est impossible de pusher sur la master) et exécuter :
```
npm install
```

Une fois ceci fait, il est normalement possible de lancer
```
npm run dev
```
qui va lancer webpack en mode dev (tout changement d'un fichier source lance une "recompilation" du projet sans entrer de nouvelles commandes). Il est possible que certains paquets ne soient pas encore installés sur votre machine, ne pas hésiter à les récupérer également avec les `npm install` nécessaires.

Une fois que `npm run dev` est lancé, vous pouvez faire vos modifications dans les fichiers contenus dans `src` et observer le résultat en ouvrant `frontend/MESBG_scrorer.html` dans votre navigateur.
L'installation est très légère car c'est comme ça que j'aime travailler et je vis bien avec les incovénients de ne pas avoir d'espace de stockage ni de serveur en dev, car l'un des objectifs est de ne pas nécessiter de connexion internet.

### Présentation des dossiers
Pour les développeurs qui voudraient contribuer au projet, voici une présentation des répertoires :
 * `notes` contient l'ensemble des notes prises au cours du développement du programme. Le seul fichier susceptible d'intéresser un développeur est `notes/new_release.txt` qui contient la description des nouveautés / modifications depuis la dernière release et qui me permet de générer le contenu de la release sans avoir à naviguer dans les noms des commits, qui sont donc laissés plus courts.
 * `saves` contient une liste de sauvegardes m'ayant servi à tester l'application. Je conduis mes tests unitaires sur ces sauvegardes lorsque je n'ai pas envie d'entrer toutes les inscriptions.
 * `src` contient le répertoire npm de l'application, avec l'ensemble du code, les modules npm (ici non clonés) et les fichiers de config permettant, je l'espère, de pouvoir rapidement récupérer le projet sur une nouvelle machine.
 * `static` contient les données statiques de l'application. Etant donné qu'il n'y a ni image ni css supplémentaire, il s'agit en réalité de bootstrap et du fichier `static/frontend/main.js` (il fait également partie du git ignore désormais) qui correspond à la version "compilée" de `src/sources/index.js` par webpack
 * `template` contient les fichiers template. Son utilisation est superflu ici puisqu'il n'y a que `frontend/MESBG_scrorer.html` qui contient la page html important le JS de l'application. Attention, pour les releases, le fichier ne contient plus les liens vers les différents fichiers mais bien le contenu intégral 

# Utilisation
Une vidéo de présentation de l'application est disponible à [cette adresse](https://www.youtube.com/watch?v=rw5fiCCqzaA)

Lorsque l'on ouvre le fichier `mesbg_scorer.html`, l'application propose de charger les données d'une sauvegarde (le terme sauvegarde est générique et correspond également à des données ne contenant que les inscriptions, comme par exemple le fichier obtenu en passant par `mesbg-army-tracker.com`).
Une fois un fichier de sauvegarde choisi, diverses informations comme le nombre de joueurs inscrits, de rounds terminés, de parties jouées sont affichées.
Si aucune sauvegarde n'est choisi, il est possible de poursuivre et de générer les inscriptions à la main en utilisant le bouton *Inscriptions*

L'interface se décopose en deux vues distinctes :
 * la vue *Inscriptions* permettant de réaliser les inscriptions
 * la vue *Tournoi*

On passe de l'une à l'autre à l'aide du bouton gris tout en haut de la page que l'on soit sur la vue *Inscriptions* ou la vue *Tournoi*

## Vue *Inscriptions*
Une page permettant de rentrer les pseudonymes, noms et armées des joueurs est disponible en cliquant sur le bouton *Inscriptions* présent sur la page d'accueil et également en gris depuis la vue *Tournoi* pendant le tournoi. On peut, à tout moment, corriger le pseudonyme d'un joueur, ajouter des informations concernant son nom ou son armée afin de pouvoir par la suite effectuer des recherches sur ces données.

Cette interface s'articule en deux vues :
 * la vue *Joueurs* permettant d'ajouter ou de supprimer des joueurs, ainsi que d'éditer les informations de chaque joueur
 * la vue *Tables* permettant de préciser le nom des différentes tables, ce qui peut être utile lorsqu'il y en a beaucoup pour les différencier ou pour indiquer aux joueurs où elles se trouvent.

Il est impossible de supprimer un joueur ayant déjà participé à des parties pendant le tournoi, car cela ferait planter l'application (on a toujours besoin de ses informations pour les rounds précédents). On peut seulement modifier son pseudonyme pour en faire un joueur mort en lui donnant un pseudonyme avec des espaces tel que ' '.

Il est possible d'ajouter un nouveau joueur en cours de tournoi, ce qui ajoutera automatiquement un joueur mort avec lui afin de préserver un nombre de joueurs pair. Etant donné qu'il est impossible de supprimer un autre joueur mort qui aurait déjà fait des parties (des joueurs auraient été appareillés avec lui lors de précédents rounds), il est donc possible d'avoir plusieurs joueurs morts. Même dans le cas où il y a plusieurs joueurs morts, les joueurs morts sont automatiquement appareillés entre eux, sauf s'il y en a un nombre impair (ce qui signifie que le nombre de joueurs réels est également impair), auquel cas l'un d'eux sera utilisé lors des appariements des vrais joueurs.

## Vue *Tournoi*
Toutes les autres fonctionnalités présentées dans la suite de cette section sont présentes dans la vue tournoi. Elle permet :
 * de créer de nouveaux rounds et de gérer les appariements
 * de saisir et de consulter les résultats des parties
 * de consulter les scores des joueurs à la fin de chaque round
 * de sauvegarder l'ensemble des données du tournoi à tout instant

## Gestion des appariements
La gestion des appariements utilise les options sélectionnables (ou déselectionnables) suivantes :
 * Ignorer les précédents appariements (deux joueurs s'étant déjà rencontrés peuvent rejouer ensemble)
 * Ignorer les précédentes tables occupées (un joueur peut jouer plusieurs fois sur la même table)
 * Ignorer les groupes d'affinité (des joueurs habitués à jouer ensemble peuvent s'affronter)

Pendant la phase d'appariement, le round est dans l'état "Création en cours"
La première étape consiste à choisir le scénario du round. Si le scénario n'est pas sélectionné, il sera impossible de valider l'appariement.
La deuxième étape crée l'appariement.

### Premier round
Pour le premier round, deux méthodes sont possibles :
 * Utiliser l'ordre d'importation des données, si l'appariement a déjà été fait au préalable via une autre méthode
 * Utiliser un ordre aléatoire, que l'on peut régénérer autant de fois qu'on le souhaite et modifier, si on le souhaite, les appariements restants à la main

Lors de la création du round, l'option "Ignorer les groupes d'affinité" est par défaut décochée et permet aux joueurs jouant régulièrement ensemble de ne pas s'affronter.
Par défaut, la première proposition d'appariements utilise l'ordre d'importation des données, que l'on peut ensuite rendre aléatoire à l'aide du bouton *Régénérer*

### Rounds suivants
L'appariement utilise cet algorithme :
```
La liste des joueurs est triée, selon le score total (prennant en compte le goal average)
Pour chaque joueur, sélectionné dans l'ordre, du mieux classé au moins bien classé :
	On lui cherche un adversaire parmi les joueurs non encore appareillés, toujours triés par ordre de leur classement :
	Pour chaque joueur, on vérifie si l'appariement que l'on est en train de créer n'a pas encore eu lieu si l'option "Ignorer les précédents appariements" est déselectionnée.
	Pour chaque joueur, on vérifie si les deux joueurs n'appartiennent pas au même groupe de joueurs jouant souvent ensemble si l'option "Ignorer les groupes d'affinité" est déselectionnée.
	
	On cherche désormais une table pour cet appariement, parmi la liste des tables non encore utilisées pour un autre appariement, triée de la plus forte à la plus faible table.
	Pour chaque table, on vérifie si aucun des deux joueurs n'a déjà joué dessus si l'option "Ignorer les précédentes tables occupées" est déselectionnée. 
```
Cet algorithme est imparfait mais réplique le fonctionnement des appariements qui est réalisé par les fichiers Excel actuellement utilisés en ajoutant la gestion des options. Si l'on sélectionne toutes les options, on obtient exactement le comportement des excels habituels où l'on gère tous les confilts à la main après avoir trié les joueurs selon leurs scores.
A l'inverse, l'utilisation des trois options en mode désactivée permet d'assurer un contrôle supplémentaire sur l'appariement mais occasionne des situations où des joueurs sont appareillés avec un plus gros écart de classement.

### Manipulations
L'application propose dans un premier temps un appariement automatique en fonction des options sélectionnées. Même si toutes les options sont sélectionnées, l'algorithme peut produire des situations où il n'a pas réussi à satisfaire toutes les contraintes qu'on lui a imposées, en particulier pour les appariements des derniers joueurs et des dernières tables.
Cet appariement est affiché avec des messages pour indiquer les problèmes suivants :
 * Les deux joueurs appartiennent au même groupe d'affinité
 * L'un des deux joueurs a déjà joué sur la table sur laquelle on l'a appareillé.
 * Les deux joueurs ont déjà joué l'un contre l'autre.
 * Un écart de score total entre les deux joueurs supérieur à 3 est observé

Dans un second temps, il est possible de réaliser des modifications à la main si certains problèmes subsistent.
Il est possible d'échanger l'un des deux joueurs ou la table de deux appariements différents autant de fois qu'on le souhaite.

### Début du round
Une fois l'appariement terminé, une page permet de réaliser les annonces des appariements et de renseigner l'heure de commencement des parties. C'est à ce moment-là que les joueurs sont
informés de leurs appariements. En cas de problème, il est donc possible de revenir en arrière pour modifier des éléments.
Si aucune incohérence n'est soulignée par les joueurs, on peut démarrer le round.

## Saisie des scores
Le round passe en mode "En cours". On voit alors affiché l'heure de début des parties si elle n'est pas encore passée. Dès qu'on a passé l'heure de début des parties, on voit alors l'heure du dernier round, qui devient rouge lorsque est également passée, afin de rappeler aux organisateurs de l'annoncer aux joueurs.
La saisie des scores permet de saisir trois informations sur une partie :
 * le score du joueur 1
 * le score du joueur 2
 * le nombre de tours joués

En plus des informations saisies, l'application enregistre également l'heure à laquelle les résultats sont renseignés afin de déterminer la durée de la partie.

### Manipulations
Afin de trouver la table où reseigner un résultat, il est possible de s'aider de l'interface pour :
 * Rechercher un joueur ou une table (la recherche peut porter sur le nom/prénom du joueur, son pseudo, le numéro de la table, le nom de la table, l'armée)
 * Afficher les parties en cours
 * Afficher les parties terminées
 * Afficher les parties du round X, X pouvant également être "Tous les rounds"

Ces options permettent de naviguer facilement dans les résultats et ne pas surcharger l'affichage.
A tout moment, où que l'on se trouve dans la vue *Tournoi*, il est possible de revenir à la barre de recherche en appuyant sur *F*

#### Editer un résultat
Pour éditer un résultat, se placer dans la vue "Round" et sélectionner le résultat, puis cliquer sur éditer.
Après avoir entré les nouvelles valeurs et confirmer, deux cas sont possibles :
 * soit la modification porte sur le round en cours, auquel cas les points de victoire ne sont pas encore attribués.
 * soit la modification porte sur un round terminé, auquel cas il va passer de l'état "Terminé" à l'état "En cours", permettant de modifier éventuellement d'autres erreurs.
 
Dans tous les cas, les modifications du round sur les scores des joueurs ne seront prises en compte que lorsque le bouton "Terminer le round" sera à nouveau pressé, pour faire passer le round de "En cours" à "Terminé".

### Vue round
La vue round permet de voir les informations des rounds, triées par table, de la plus forte table (au moment de la création de l'appariement du round affiché) à la plus faible table.
C'est dans cette vue que l'on saisit les informations. On peut y accéder de deux manières différentes :
 * Le bouton "Rounds" : il conserve les recherches et les filtres appliqués et passe simplement de la vue "Résultat" à la vue "Rounds"
 * Le bouton "Round actuel" : il supprime les recherches et les filtres en cours pour afficher tous les résultats du dernier round
 
### Vue résultat
La vue "résultat" permet de voir les scores des joueurs, triés par score du joueur, du joueur le mieux classé au joueur le moins bien classé.
Cette vue permet d'accéder au classement. Elle est accessible de deux manières :
 * Le bouton "Résultats" : il conserve les recherches et les filtres appliqués et passe simplement de la vue "Rounds" à la vue "Résultats"
 * Le bouton "Résultats finaux" : il supprime les recherches et les filtres apliqués pour afficher les scores du dernier round. Si le dernier round est encore en cours, aucun résultat n'est visible.
 
### Fin du round
Lorsque tous les résultats du round sont renseignés, l'option "Terminer le round" est disponible. Ce n'est qu'après avoir fini un round que l'on peut consulter les résultats du round.

## Sauvegarder
Il est possible à tout moment (pendant les inscriptions, l'appariement, la saisie des scores, avant l'appariement du prochain round, ...) de sauvegarder l'ensemble des données de l'application en utilisant le bouton "Sauvegarder".
Ce bouton déclenche le téléchargement d'un fichier nommé selon la date et l'heure du moment du clic avec le format suivant :
```
YY-MM-DD__hh-mm-ss
```

Si l'on souhaite poursuivre un tournoi sur un autre périphérique ou reprendre à partir d'une sauvegarde, il suffit de recharger la page ou de relancer le fichier MESBG_Scorer.html et d'importer la sauvegarde ainsi obtenue en utilisant le bouton *Parcourir* de l'interface.

Après avoir choisi un fichier, l'application recharge l'ensemble des données présentes lors de la sauvegarde à l'exception des filtres et de la recherche en cours, qui seront donc à saisir à nouveau.

# Export
Les résultats au sein de l'application peuvent se représenter sous la forme d'un fichier JSON qui a cette structure :
```
{
   "results":[
      {
         "round_number":1,
         "player1":"Own3d",
         "player2":"Dracovitch",
         "table":1,
         "player1_score":"5",
         "player2_score":"0",
         "player1_points":5,
         "player2_points":1,
         "duration":4697576,
         "nb_tours":5,
         "state":"Terminé",
         "commentaires":[
            "Victoire mineure de Own3d contre Dracovitch (5 - 0)",
            "Victoire mineure de Own3d contre Dracovitch (5 - 0)"
         ]
      },
      {
         "round_number":1,
         "player1":"Bob-razowski",
         "player2":"Ikorih",
         "table":2,
         "player1_score":"0",
         "player2_score":"10",
         "player1_points":0,
         "player2_points":6,
         "duration":5017963,
         "nb_tours":8,
         "state":"Terminé",
         "commentaires":[
            "Victoire majeure de Ikorih contre Bob-razowski (10 - 0)",
            "Victoire majeure de Ikorih contre Bob-razowski (10 - 0)"
         ]
      },
	  ...
   ],
   "players_data":[
      {
         "name":"Edoras",
         "points":[
            6,
            12,
            17,
            23
         ],
         "goalaverages":[
            9,
            21,
            23,
            33
         ],
         "results_with_goalaverage":[
            6.09,
            12.209999999999999,
            17.23,
            23.330000000000002
         ],
         "tables_played":[
            42,
            5,
            1,
            "2"
         ],
         "opponents_played":[
            "Captnfrene",
            "Bendrums",
            "Ar-Mando",
            "HeStan"
         ]
      },
      {
         "name":"Asdru_",
         "points":[
            6,
            12,
            17,
            23
         ],
         "goalaverages":[
            7,
            18,
            21,
            33
         ],
         "results_with_goalaverage":[
            6.07,
            12.18,
            17.21,
            23.330000000000002
         ],
         "tables_played":[
            5,
            6,
            "3",
            "1"
         ],
         "opponents_played":[
            "Kenny_Sth",
            "Raphdu78",
            "Ikorih",
            "Coco_painting_stuff"
         ]
      },
	  ...
   ],
   "rounds":[
      {
         "round_number":1,
         "state":"Terminé",
         "scenario":"Scenario 7 - Récupérer l'artefact",
         "started_at":1685175871035
      },
      {
         "round_number":2,
         "state":"Terminé",
         "scenario":"Scenario 1 - Domination",
         "started_at":1685185701237
      },
      {
         "round_number":3,
         "state":"Terminé",
         "scenario":"Scenario 6 - Affrontement au clair de lune",
         "started_at":1685196740808
      },
      {
         "round_number":4,
         "state":"Terminé",
         "scenario":"Scenario 3 - Tenez vos positions !",
         "started_at":1685255655173
      },
      {
         "round_number":5,
         "state":"En cours",
         "scenario":"Scenario 5 - Reconnaissance",
         "started_at":1685267176298
      }
   ],
   "new_results_data":[
      
   ],
   "new_scenario":"",
   "new_round_data":{
      "round_number":5,
      "state":"Création en cours",
      "scenario":""
   },
   "new_round_displayed":false,
   "tables_names":[
      "Grande salle 1",
      "Grande salle 2",
      "Grande salle 3",
      "Grande salle 4",
      "Grande salle 5",
      "Grande salle 6",
      "Grande salle 7",
      "Grande salle 8",
      "Grande salle 9",
      "Grande salle 10",
      "Grande salle 11",
      "Grande salle 12",
      "Erebor 1",
      ...
   ]
}
```
Il s'agit en réalité du fichier save.json, généré à chaque fois que l'utilisateur clique sur le bouton "Sauvegarder"
Des options d'export supplémentaires sont possibles si d'autres applications désirent mener des analyses sur ces résultats. Contacter Shaka pour formuler des demandes spécifiques.
