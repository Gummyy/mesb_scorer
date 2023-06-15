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
 * Possibilité d'utiliser l'application sur un téléphone mobile, grace à une interface responsive
 
# Installation
Pour la version hors-ligne, télécharger l'application sous la forme d'un fichier unique mesbg_scorer.html, disponible à cette adresse `http://lien.vers.le/fichier_compile.html`
Pour la version en ligne, se rendre à l'adresse `http://adresse.de.lappli/`. Il est nécessaire de créer un compte.
Pour gérer les inscriptions du tournoi plusieurs possibilités :
 * Le site web de DAVAX, via l'option `Générer un fichier d'inscriptions pour MESBG_scorer`. Pour la version hors-ligne, après avoir téléchargé ce fichier, il suffit de le placer à côté de mesbg_scorer.html. Pour la version en ligne, utiliser l'option `Importer les inscriptions depuis le site de DAVAX`
 * L'application possède également une interface permettant de saisir les pseudos, les noms des joueurs et le nom de l'armée des participants
Une fois les inscriptions importées ou créées, l'application n'a plus besoin d'aucune ressource exterieure pour fonctionner

# Utilisation
Une vidéo explicative des différentes fonctionnalités détaillées dans cette section est disponible à cette adresse : `http://www.youtube.com/video`

## Gestion des appariements
La gestion des appariements utilise les options sélectionnables suivantes :
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
Lors de la création du round, l'option "Ignorer les groupes d'affinité" est par défaut décochée et permet aux joueurs d'un même groupe régulier de ne pas s'affronter.

### Rounds suivants
L'appariement utilise cet algorithme :
```
La liste des joueurs est triée, selon le score total (prennant en compte le goal aveerage)
Pour chaque joueur, sélectionné dans l'ordre, du mieux classé au moins bien classé :
	On lui cherche un adversaire parmi les joueurs non encore appareillés, toujours triés par ordre de leur classement :
	Pour chaque joueur, on vérifie si l'appariement que l'on est en train de créer n'a pas encore eu lieu si l'option "Ignorer les précédents appariements" est déselectionnée.
	Pour chaque joueur, on vérifie si les deux joueurs n'appartiennent pas au même groupe de joueurs jouant souvent ensemble si l'option "Ignorer les groupes d'affinité" est déselectionnée.
	
	On cherche désormais une table pour cet appariement, parmi la liste des tables non encore utilisées pour un autre appariement, triée de la plus forte à la plus faible table.
	Pour chaque table, on vérifie si aucun des deux joueurs n'a déjà joué dessus si l'option "Ignorer les précédentes tables occupées" est déselectionnée. 
```
Cet algorithme est imparfait mais réplique le fonctionnement des appariements qui est réalisé par les fichiers Excel actuellement utilisés en ajoutant la gestion des options. Si l'on sélectionne toutes les options, on obtient exactement le comportement des excels habituels où l'on gère tous les confilts à la main.
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
Une fois l'appariement terminé, une page permet de réaliser les annonces des appariements et, en cas de problème, de revenir en arrière pour modifier des éléments.
Si auune incohérence n'est soulignée par les joueurs, on peut démarrer le round (ce qui initialise l'heure de début du round)

## Saisie des scores
Le round passe en mode "En cours"
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
Il est possible à tout moment (pendant l'appariement, la saisie des scores, avant l'appariement du prochain round, ...) de sauvegarder l'ensemble des données de l'application en utilisant le bouton "Sauvegarder".
Ce bouton déclenche le téléchargement d'un fichier nommé save.json.

Si l'on souhaite poursuivre un tournoi sur un autre périphérique ou reprendre dans tout autre cas à partir d'une sauvegarde, il est nécessaire de :
 * Pour la version hors-ligne : placer le fichier save.json à côté de mesbg_scorer.html avant de lancer l'application
 * Pour la version en ligne : utiliser l'option "Charger une sauvegarde" dans la version

Dans les deux cas, l'application rechargera l'ensemble des données présentes lors de la sauvegarde à l'exception des filtres et de la recherche en cours, qui seront donc à saisir à nouveau.

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