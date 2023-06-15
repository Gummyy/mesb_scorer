import React, { useEffect, useCallback } from 'react';
import {saveAs} from 'file-saver'

import Round from './Round.js';
import Scoreboard from './Scoreboard.js'

export default function Tournament(props) {
    let [randomize_first_pairs, setRandomizeFirstPairs] = React.useState(false);
    
    let [research, setResearch] = React.useState('');
    let [viewUnfinished, setViewUnfinished] = React.useState(true);
    let [viewFinished, setViewFinished] = React.useState(true);
    let [detailedView, setDetailedView] = React.useState(false);
    let [active_round, setActiveRound] = React.useState(1);
    
    let [results, setResults] = [props.results, props.setResults];
    let [players_data, setPlayersData] = [props.players_data, props.setPlayersData];
    let [rounds, setRounds] = [props.rounds, props.setRounds]

    let [new_results_data, setNewResultsData] = [props.new_results_data, props.setNewResultsData]
    let [new_round_displayed, setNewRoundDisplayed] = [props.new_round_displayed, props.setNewRoundDisplayed];
    let [new_round_data, setNewRoundData] = [props.new_round_data, props.setNewRoundData];
    let [new_scenario, setNewScenario] = [props.new_scenario, props.setNewScenario];
    /*let [results, setResults] = React.useState(props.results);
    let [players_data, setPlayersData] = React.useState(props.players);
    let [rounds, setRounds] = React.useState(props.rounds);

    let [new_results_data, setNewResultsData] = React.useState(props.new_results_data);
    let [new_round_displayed, setNewRoundDisplayed] = React.useState(props.new_round_displayed);
    let [new_round_data, setNewRoundData] = React.useState(props.new_round_data);
    let [new_scenario, setNewScenario] = React.useState(props.new_scenario)*/
    
    let [current_view, setCurrentView] = React.useState("rounds");
    let [view_resultats_finaux, setViewResultatsFinaux] = React.useState(false);
    let [ignoreTables, setIgnoreTables] = React.useState(false);
    let [ignorePairs, setIgnorePairs] = React.useState(false);
    let [ignoreAffinities, setIgnoreAffinities] = React.useState(false);

    let tables_names = props.tables_names;

    /*
        {
            "round_number": 1,
            "started_at": %TIMESTAMP%
            "scenario": "Lord of the Rings",
            "state": "ready"
        }
    */

    const scenario_options = [
        "Domination",
        "A la mort !",
        "Tenez vos positions !",
        "Seigneurs de guerre",
        "Reconnaissance",
        "Affrontement au clair de lune",
        "Récupérer l'artefact",
        "Combat des champions",
        "Capture et contrôle",
        "Relique des âges passés",
        "Brouillard de guerre",
        "Attaque de campement",
        "Contrôle du champ de bataille",
        "Extraction",
        "Percée",
        "Détruire les réserves",
        "Diviser et conquérir",
        "Assassinat"
    ].map((scenario, index) => `Scenario ${index+1} - ${scenario}`);

    const players_affinity = [
        [
            "Manadar", "decalogus"
        ],
        [
            "Fleau_le_Preux", "Le_Preux_Shawn"
        ],
        [
            "Thelion_AOE", "Raphdu78", "Alexdu78"
        ],
        [
            "Captnnarsice", "Captnfrene", "Hugzzzy"
        ],
        [
            "HeStan", "tordek_urside", "Le-Voyageur"
        ],
        [
            "Frere_derebor1", "FRERES-D-EREBOR"
        ]
    ]

    const handleKeyPress = useCallback((event) => {
        //console.log(`Key pressed: ${event.key}`);
        if(event.key == "f") {
            //console.log("Activating the focus !")
            document.getElementById("research").focus();
        }
    }, []);

    useEffect(() => {
    // attach the event listener
    document.addEventListener('keyup', handleKeyPress);

    // remove the event listener
    return () => {
        document.removeEventListener('keyup', handleKeyPress);
    };
    }, [handleKeyPress]);

    const are_same_affinity = (player1_name, player2_name) => {
        for(let i = 0; i < players_affinity.length; i++) {
            if(players_affinity[i].includes(player1_name) && players_affinity[i].includes(player2_name)) {
                return true;
            }
        }

        return false;
    }

    // Makes the pairings of the first round
    const first_pairs = function() {
        let first_results = [];
        if(!randomize_first_pairs) {
            for(let i = 0; i < players_data.length/2; i++) {
                let new_result = {
                    "round_number": 1,
                    "player1": players_data[2*i]["name"],
                    "player2": players_data[2*i + 1]["name"],
                    "table": i+1,
                    "player1_score": "",
                    "player2_score": "",
                    "player1_points": 0,
                    "player2_points": 0,
                    "duration": 0,
                    "nb_tours": "",
                    "state": "Création en cours",
                    "commentaires": []
                }
                first_results.push(new_result);
                //console.log(JSON.stringify(new_result))
            }
        } else {
            let players_with_order = players_data.map(elt => {
                return {
                    "name": elt["name"],
                    "seed": elt["name"] == " " ? 0 : Math.random()
                }
            }).sort((a, b) => {
                return b.seed - a.seed;
            });

            if(players_with_order.length % 2 != 0) {
                alert("Attention, le nombre de joueurs est impair. La création du joueur mort a échoué !")
            }
            for(let i = 0; i < players_with_order.length/2; i++) {
                let new_result = {
                    "round_number": 1,
                    "player1": players_with_order[2*i]["name"],
                    "player2": players_with_order[2*i + 1]["name"],
                    "table": i+1,
                    "player1_score": "",
                    "player2_score": "",
                    "player1_points": 0,
                    "player2_points": 0,
                    "duration": 0,
                    "nb_tours": "",
                    "state": "Création en cours",
                    "commentaires": []
                }
                first_results.push(new_result);
                //console.log(JSON.stringify(new_result))
            }
        }
        console.log("Round 1")
        console.log(first_results);
        console.log("Randomize = ");
        console.log(randomize_first_pairs);
        setRandomizeFirstPairs(true);
        setNewResultsData(first_results);
    };


    const filterResults = function() {
        let valid_players = players_data.filter((player) => {
            return player["name"].toLowerCase().includes(research.toLowerCase()) || player["full_name"] !== undefined && player["full_name"].toLowerCase().includes(research.toLowerCase()) || player["armee"] !== undefined && player["armee"].toLowerCase().includes(research.toLowerCase());
        }).map((elt) => elt["name"]);
        return results.filter((elt) => {
            return ((   valid_players.includes(elt["player1"]) || valid_players.includes(elt["player2"]) ||
                        research.toLowerCase().includes(elt["table"].toString()) || tables_names[elt["table"] - 1].toLowerCase().includes(research.toLowerCase()) ||
                        research=="/" && elt["commentaires"].length > 1) &&
                    (elt["round_number"] == active_round || active_round == -1) && ((elt["state"] == "Terminé" && viewFinished) || (elt["state"] != "Terminé" && viewUnfinished)));
        });
    }

    const filterRounds = function() {
        return rounds.filter((elt) => {
            return (elt["round_number"] == active_round || active_round == -1);
        });
    }

    const filterPlayers = function() {
        let valid_players = results.filter((elt) => {
            return ((   research.toLowerCase().includes(elt["table"].toString()) || tables_names[elt["table"] - 1].toLowerCase().includes(research.toLowerCase()) ||
                        research=="/" && elt["commentaires"].length > 1) &&
                    (elt["round_number"] == active_round || active_round == -1) && ((elt["state"] == "Terminé" && viewFinished) || (elt["state"] != "Terminé" && viewUnfinished)));
        }).reduce((accumulator, result) => [...accumulator, result["player1"], result["player2"]], []);

        /*console.log("Valid players :")
        console.log(valid_players);*/

        let ans_names = players_data.filter((player) => {
            return player["name"].toLowerCase().includes(research.toLowerCase()) || player["full_name"] !== undefined && player["full_name"].toLowerCase().includes(research.toLowerCase()) || player["armee"] !== undefined && player["armee"].toLowerCase().includes(research.toLowerCase());
        });

        let ans_tables = players_data.filter((elt) => {
            return valid_players.includes(elt["name"]) && !ans_names.map((elt) => elt["name"]).includes(elt["name"])
        });

        /*console.log("Player :")
        console.log([...ans_names, ...ans_tables]);*/

        return [...ans_names, ...ans_tables];
    }

    const handleResearchChange = function(event) {
        setResearch(event.target.value);
        //console.log("Research changed to " + event.target.value);
    }

    const handleViewUnfinishedChange = function(event) {
        setViewUnfinished(event.target.checked);
        //console.log("View unfinished changed to " + event.target.checked);
    }

    const handleViewFinishedChange = function(event) {
        setViewFinished(event.target.checked);
        //console.log("View finished changed to " + event.target.checked);
    }

    const handleDetailedViewChange = function(event) {
        setDetailedView(event.target.checked);
        //console.log("View finished changed to " + event.target.checked);
    }

    const handleRoundChange = function(event) {
        setActiveRound(event.target.value);
        //console.log("Round changed to " + event.target.value);
    }

    const handleSearch = function(event) {
        event.preventDefault();
        //console.log("Researching " + research);
    }

    const saveAll = function(event) {
        event.preventDefault();
        const data = {
            "results": results,
            "players_data": players_data,
            "rounds": rounds,
            "new_results_data": new_results_data,
            "new_scenario": new_scenario,
            "new_round_data": new_round_data,
            "new_round_displayed": new_round_displayed,
            "tables_names": tables_names
        }

        const blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "save.json");
    }

    const get_last_round = function() {
        return rounds.reduce((acc, elt) => {
            if(elt["round_number"] > acc)
                return elt["round_number"];
            else
                return acc;
        }, 0);
    }

    const toLastRound = function(event) {
        event.preventDefault();
        const last_round = get_last_round();
        setActiveRound(last_round);
        setResearch("");
        setCurrentView("rounds");
        setViewFinished(true);
        setViewUnfinished(true);
        setViewResultatsFinaux(false);
    }

    const toRoundView = function(event) {
        event.preventDefault();
        setCurrentView("rounds");
        setViewResultatsFinaux(false);
    }

    const toScoreBoard = function(event) {
        event.preventDefault();
        //alert("Scoreboard not implemented yet !");
        setCurrentView("scoreboard");
        setViewResultatsFinaux(false);
    }
    
    const toLastScoreBoard = function(event) {
        event.preventDefault();
        const last_round = get_last_round();
        setActiveRound(last_round);
        setResearch("");
        setCurrentView("scoreboard");
        setViewFinished(true);
        setViewUnfinished(true);
        setViewResultatsFinaux(true);
    }

    const saveScore = function(event) {
        event.preventDefault();
        const cur_round = event.currentTarget.getAttribute("round");
        const cur_table = event.currentTarget.getAttribute("table");
        const cur_player1_score = event.currentTarget.getAttribute("player1_score");
        const cur_player2_score = event.currentTarget.getAttribute("player2_score");
        const nb_tours = event.currentTarget.getAttribute("nb_tours");
        
        let points = result_to_points(cur_player1_score, cur_player2_score);
        

        //alert("score = "+ cur_player1_score+ " - "+ cur_player2_score + `\nRound : ${cur_round}\nTable : ${cur_table}`);
        //alert("Points = "+ points[0]+ " - "+ points[1] + `\nRound : ${cur_round}\nTable : ${cur_table}`)

        let player1_name = undefined;
        let player2_name = undefined;

        setResults((results) => {
            return results.map(result => {
                if(result.round_number == cur_round && result.table == cur_table) {
                        result.player1_score = cur_player1_score;
                        result.player2_score = cur_player2_score;
                        result.player1_points = points[0];
                        result.player2_points = points[1];
                        result.nb_tours = parseInt(nb_tours);
                        result.duration = result.duration == 0 ? new Date().getTime() - rounds[active_round - 1]["started_at"] : result.duration;
                        result.state = "Terminé";
                        console.log("Saving score : " + JSON.stringify(result));

                        player1_name = result.player1;
                        player2_name = result.player2;
                }
                return result;
            })
        })
    }

    const result_to_points = function(player1_score, player2_score) {
        player1_score = parseInt(player1_score);
        player2_score = parseInt(player2_score);
        if (player1_score > player2_score) {
            if(player1_score >= player2_score + 6)
                return [6, 0];  // Victoire majeure
            else
                return [5, 1];  // Victoire mineure
        } else if (player1_score == player2_score) {
            return [2, 2];  // Egalité
        } else {
            // The player2 won
            if(player2_score >= player1_score + 6)
                return [0, 6];
            else
                return [1, 5];
        }
    }

    const handleEditAppariement = function(event) {
        let edittype = event.currentTarget.getAttribute("edit_type");
        let old_value = event.currentTarget.getAttribute("previous_value");
        let new_value = event.currentTarget.getAttribute("new_value");

        console.log("Called with :");
        console.log("edittype = "+ edittype);
        console.log("previous_value = "+ old_value);
        console.log("new_value = "+ new_value);

        setNewResultsData((new_results_data) => {
            return new_results_data.map((result) => {
                if( (edittype == "table" && result["table"] == old_value) ||
                    (edittype == "player1" && result["player1"] == old_value) ||
                    (edittype == "player2" && result["player2"] == old_value)) {
                    if(edittype == "table") {
                        result["table"] = parseInt(new_value);
                    } else if(edittype == "player1") {
                        result["player1"] = new_value;
                    } else if(edittype == "player2") {
                        result["player2"] = new_value;
                    }
                } else if(  (edittype == "table" && result["table"] == new_value) ||
                            (edittype == "player1" && (result["player1"] == new_value || result["player2"] == new_value)) ||
                            (edittype == "player2" && (result["player1"] == new_value || result["player2"] == new_value))) {
                    if(edittype == "table") {
                        result["table"] = parseInt(old_value);
                    } else if(edittype == "player1") {
                        if(result["player1"] == new_value) {
                            result["player1"] = old_value;
                        } else {
                            result["player2"] = old_value;
                        }
                    } else if(edittype == "player2") {
                        if(result["player1"] == new_value) {
                            result["player1"] = old_value;
                        } else {
                            result["player2"] = old_value;
                        }
                    }
                }
                //console.log(result)
                return result;
            });
        });
    }
    
    const make_pairs = function() {
        // Sorts the players by their score and pair them
        const cur_round = rounds.length + 1;
        
        const sorted_players = players_data.sort((a, b) => {
            return b.results_with_goalaverage[cur_round - 2] - a.results_with_goalaverage[cur_round - 2];
        });

        let new_results = [];
        for(let i = 0; i < sorted_players.length; i++) {
            // Checks if the players has already been added to the new_results :
            if(new_results.map((result) => result["player2"]).includes(sorted_players[i]["name"])) {
                continue;
            }
            console.log("Player "+ sorted_players[i]["name"] +" (" + (i+1) +") has "+ sorted_players[i]["results_with_goalaverage"][cur_round - 2] +" points");
            // Search for his next opponent
            let player2 = -1;
            for(let j = i+1; j < sorted_players.length; j++) {
                // We check if the player has already been added to the new_results
                if(new_results.map((result) => result["player2"]).includes(sorted_players[j]["name"])) {
                    continue;
                }

                if(ignorePairs && ignoreAffinities) {
                    player2 = j;
                    break;
                } 
                else if(ignoreAffinities) {
                    if(!sorted_players[i]["opponents_played"].includes(sorted_players[j]["name"])) {  // We check if they have already played together
                        player2 = j;
                        break;
                    }
                } else if(ignorePairs) {
                    if(!are_same_affinity(sorted_players[i]["name"], sorted_players[j]["name"])) {
                        player2 = j;
                        break;
                    }
                } else {  // We don't ignore the affinity and the 
                    if(!are_same_affinity(sorted_players[i]["name"], sorted_players[j]["name"]) && !sorted_players[i]["opponents_played"].includes(sorted_players[j]["name"])) {
                        player2 = j;
                        break;
                    }
                }
            }
            if(player2 == -1) {
                //alert("Le joueur "+ sorted_players[i]["name"] +" a déjà joué contre tous les joueurs non appareillés !");
            } else {  // We found a player to play with
                console.log("Player "+ sorted_players[player2]["name"] +" (" + (player2+1) +") has "+ sorted_players[player2]["results_with_goalaverage"][cur_round - 2] +" points");
                let player1 = i;
                // Search for the next table
                let played_tables = [...sorted_players[player1]["tables_played"], ...sorted_players[player2]["tables_played"], ...new_results.map((result) => result["table"])];
                console.log("Played tables : ")
                console.log(played_tables);
                let table = -1
                for(let k = 1; k <= sorted_players.length / 2; k++) {
                    if(ignoreTables && !new_results.map((result) => result["table"]).includes(k)) {
                        table = k;
                        break;
                    } else if(!played_tables.includes(k)) {
                        table = k;
                        break;
                    }
                }

                if(table == -1) {
                    // alert("Les joueurs "+ sorted_players[player1]["name"] + " et "+ sorted_players[player2]["name"] +" ont, à eux deux, déjà joué sur toutes les tables disponibles !")
                    // We search for another table which is just available
                    played_tables = new_results.map((result) => result["table"]);
                    for(let k = 1; k <= sorted_players.length / 2; k++) {
                        if(!played_tables.includes(k)) {
                            table = k;
                        }
                    }
                    if(table == -1) {
                        //alert("Il n'y a plus de tables disponibles !");
                        return new_results;
                    }
                }
                console.log("Table : "+ table +"\n-----------------\n");
                new_results.push({
                    "round_number": cur_round,
                    "player1": sorted_players[player1]["name"],
                    "player2": sorted_players[player2]["name"],
                    "table": table,
                    "player1_score": "",
                    "player2_score": "",
                    "player1_points": 0,
                    "player2_points": 0,
                    "duration": 0,
                    "nb_tours": "",
                    "state": "Création en cours",
                    "commentaires": []
                });
            }
        }

        console.log("Round "+ cur_round +" :");
        console.log(new_results);
        setNewResultsData(new_results);
    }

    const handleNewRound = function(event) {
        event.preventDefault();
        setNewRoundDisplayed((elt) => !elt);
        if(new_round_displayed) {
            setNewResultsData([])  // We reset the new_round_data
            setNewRoundData({})
        } else {
            if(rounds.length == 0) {
                first_pairs();
            } else {
                make_pairs();
            }

            setNewRoundData({
                "round_number": rounds.length + 1,
                "state": "Création en cours",
                "scenario": ""
            })
        }
    }

    const handleBackToPairs = (event) => {
        const cur_round = event.currentTarget.getAttribute("round");
        setRounds((rounds) => {
            return rounds.filter((round) => {
                if(round["round_number"] == cur_round) {
                    setNewRoundData({
                        ...round,
                        "state": "Création en cours",
                    });
                    setNewScenario(round["scenario"]);
                    return false;
                } else {
                    return true;
                }
            });
        });

        setResults((results) => {
            return results.filter((cur_result) => {
                if(cur_result["round_number"] == cur_round) {
                    //alert("Changing " + JSON.stringify(cur_result))
                    setNewResultsData((new_results_data) => {return [...new_results_data, {...cur_result, "state": "Création en cours"}]});
                    return false;
                } else {
                    return true;
                }
            })
        })

        setNewRoundDisplayed(true);
    }
    
    const handleStartRound = function(event) {
        event.preventDefault();
        const cur_round = event.currentTarget.getAttribute("round");
        const dateStart = event.currentTarget.getAttribute("datestart");
        let hours = parseInt(dateStart.slice(0, 2));
        let minutes = parseInt(dateStart.slice(3, 5));
        let day = new Date().getUTCDate(); let month = new Date().getMonth(); let year = new Date().getFullYear();
        if(new Date().getHours() > hours || (new Date().getHours() == hours && new Date().getMinutes() > minutes)) {  // It is a new day
            day = new Date(new Date().getTime() + 24*60*60*1000).getUTCDate();
            month = new Date(new Date().getTime() + 24*60*60*1000).getMonth();
            year = new Date(new Date().getTime() + 24*60*60*1000).getFullYear();
            
            const ans = confirm(`L'heure de départ spécifiée (${dateStart}) est déjà passée ou correspond au jour suivant. Êtes-vous sûr de vouloir la conserver ? `);
            if(!ans) {
                return;
            }
        }
        /*console.log(minutes)
        console.log(hours)
        console.log(day);
        console.log(month);
        console.log(year);*/
        setRounds((rounds) => {
            return rounds.map((round) => {
                if(round["round_number"] == cur_round) {
                    return {
                        ...round,
                        "state": "En cours",
                        "started_at": new Date(year, month, day, hours, minutes).getTime()
                    }
                } else {
                    return round;
                }
            });
        });

        setResults((results) => {
            return results.map((cur_result) => {
                if(cur_result["round_number"] == cur_round) {
                    //alert("Changing " + JSON.stringify(cur_result))
                    return {...cur_result, "state": "En cours"};
                } else {
                    return cur_result;
                }
            })
        })
    }

    const handleEditRound = function(event) {
        event.preventDefault();
        const cur_round = event.currentTarget.getAttribute("round");

        setRounds((rounds) => {
            return rounds.map((round) => {
                if(round["round_number"] == cur_round) {
                    return {
                        ...round,
                        "state": "En cours"
                    }
                } else {
                    return round;
                }
            });
        });
    }

    const handleEndRound = function(event) {
        event.preventDefault();
        const cur_round = event.currentTarget.getAttribute("round");

        setRounds((rounds) => {
            return rounds.map((round) => {
                if(round["round_number"] == cur_round) {
                    console.log({
                        ...round,
                        "state": "Terminé"
                    });
                    return {
                        ...round,
                        "state": "Terminé"
                    }
                } else {
                    return round;
                }
            });
        });

        setResults((results) => {
            return results.map((result) => {
                if(result["round_number"] != cur_round) {
                    return result
                } else {
                    const player1 = result["player1"];
                    const player2 = result["player2"];
                    const player1_score = parseInt(result["player1_score"]);
                    const player2_score = parseInt(result["player2_score"]);
                    const [player1_points, player2_points] = result_to_points(player1_score, player2_score);
                    let commentaires = ""
                    if(player1_score > player2_score) {
                        if(player1_score >= player2_score + 6) {
                            commentaires = `Victoire majeure de ${player1} contre ${player2}`
                        } else {
                            commentaires = `Victoire mineure de ${player1} contre ${player2}`
                        }
                    } else if(player2_score > player1_score) {
                        if(player2_score >= player1_score + 6) {
                            commentaires = `Victoire majeure de ${player2} contre ${player1}`
                        } else {
                            commentaires = `Victoire mineure de ${player2} contre ${player1}`
                        }
                    } else {  // Scores are equal
                        commentaires = "Egalité"
                    }

                    if(player1_score >= player2_score) {
                        commentaires += ` (${player1_score} - ${player2_score})`
                    } else {
                        commentaires += ` (${player2_score} - ${player1_score})`
                    }
                    
                    setPlayersData((players_data) => {
                        return players_data.map((player) => {
                            if(player["name"] == player1) {
                                if(player["points"].length < cur_round) {  // If the player has not played in this round yet
                                    console.log({
                                        ...player,
                                        "points": [...player["points"], cur_round == 1 ? player1_points : player["points"][cur_round - 2] + player1_points],
                                        "goalaverages": [...player["goalaverages"], cur_round == 1 ? player1_score - player2_score : player["goalaverages"][cur_round - 2] + player1_score - player2_score],
                                        "results_with_goalaverage": [...player["results_with_goalaverage"], cur_round == 1 ? player1_points + 0.01*(player1_score - player2_score) : player["results_with_goalaverage"][cur_round - 2] + player1_points + 0.01 * (player1_score - player2_score)],
                                        "opponents_played": [...player["opponents_played"], player2],
                                        "tables_played": [...player["tables_played"], result["table"]]
                                    })
                                    return {
                                        ...player,
                                        "points": [...player["points"], cur_round == 1 ? player1_points : player["points"][cur_round - 2] + player1_points],
                                        "goalaverages": [...player["goalaverages"], cur_round == 1 ? player1_score - player2_score : player["goalaverages"][cur_round - 2] + player1_score - player2_score],
                                        "results_with_goalaverage": [...player["results_with_goalaverage"], cur_round == 1 ? player1_points + 0.01*(player1_score - player2_score) : player["results_with_goalaverage"][cur_round - 2] + player1_points + 0.01 * (player1_score - player2_score)],
                                        "opponents_played": [...player["opponents_played"], player2],
                                        "tables_played": [...player["tables_played"], result["table"]]
                                    }
                                } else {  // We go back from the previous round and update the points until we reach the last round
                                    let new_points = player["points"];
                                    let new_goalaverage = player["goalaverages"];
                                    let new_results_with_goalaverage = player["results_with_goalaverage"]

                                    let previous_points = cur_round-2 >= 0 ? new_points[cur_round - 2]: 0;
                                    let previous_goalaverage = cur_round-2 >= 0 ? new_goalaverage[cur_round - 2]: 0;

                                    let correction_points = new_points[cur_round-1] - previous_points - player1_points;
                                    let correction_goalaverage = new_goalaverage[cur_round-1] - previous_goalaverage - (player1_score - player2_score);
                                    let correction_results_with_goalaverage = correction_points + 0.01 * correction_goalaverage;
                                    for(let i = cur_round-1; i < new_points.length; i++) {
                                        new_points[i] -= correction_points;
                                        new_goalaverage[i] -= correction_goalaverage;
                                        new_results_with_goalaverage[i] -= correction_results_with_goalaverage;
                                    }
                                    console.log({
                                        ...player,
                                        "points": new_points,
                                        "goalaverages": new_goalaverage,
                                        "results_with_goalaverage": new_results_with_goalaverage
                                    })
                                    return {
                                        ...player,
                                        "points": new_points,
                                        "goalaverages": new_goalaverage,
                                        "results_with_goalaverage": new_results_with_goalaverage
                                    }
                                }
                            } else if(player["name"] == player2) {
                                if(player["points"].length < cur_round) {  // If the player has not played in this round yet
                                    console.log({
                                        ...player,
                                        "points": [...player["points"], cur_round == 1 ? player2_points : player["points"][cur_round - 2] + player2_points],
                                        "goalaverages": [...player["goalaverages"], cur_round == 1 ? player2_score - player1_score : player["goalaverages"][cur_round - 2] + player2_score - player1_score],
                                        "results_with_goalaverage": [...player["results_with_goalaverage"], cur_round == 1 ? player2_points + 0.01*(player2_score - player1_score) : player["results_with_goalaverage"][cur_round - 2] + player2_points + 0.01 * (player2_score - player1_score)],
                                        "opponents_played": [...player["opponents_played"], player1],
                                        "tables_played": [...player["tables_played"], result["table"]]
                                    })
                                    return {
                                        ...player,
                                        "points": [...player["points"], cur_round == 1 ? player2_points : player["points"][cur_round - 2] + player2_points],
                                        "goalaverages": [...player["goalaverages"], cur_round == 1 ? player2_score - player1_score : player["goalaverages"][cur_round - 2] + player2_score - player1_score],
                                        "results_with_goalaverage": [...player["results_with_goalaverage"], cur_round == 1 ? player2_points + 0.01*(player2_score - player1_score) : player["results_with_goalaverage"][cur_round - 2] + player2_points + 0.01 * (player2_score - player1_score)],
                                        "opponents_played": [...player["opponents_played"], player1],
                                        "tables_played": [...player["tables_played"], result["table"]]
                                    }
                                } else {  // We go back from the previous round and update the points until we reach the last round
                                    let new_points = player["points"];
                                    let new_goalaverage = player["goalaverages"];
                                    let new_results_with_goalaverage = player["results_with_goalaverage"]

                                    let previous_points = cur_round-2 >= 0 ? new_points[cur_round - 2]: 0;
                                    let previous_goalaverage = cur_round-2 >= 0 ? new_goalaverage[cur_round - 2]: 0;

                                    let correction_points = new_points[cur_round-1] - previous_points - player2_points;
                                    let correction_goalaverage = new_goalaverage[cur_round-1] - previous_goalaverage - (player2_score - player1_score);
                                    let correction_results_with_goalaverage = correction_points + 0.01 * correction_goalaverage;
                                    for(let i = cur_round-1; i < new_points.length; i++) {
                                        new_points[i] -= correction_points;
                                        new_goalaverage[i] -= correction_goalaverage;
                                        new_results_with_goalaverage[i] -= correction_results_with_goalaverage;
                                    }
                                    console.log({
                                        ...player,
                                        "points": new_points,
                                        "goalaverages": new_goalaverage,
                                        "results_with_goalaverage": new_results_with_goalaverage
                                    })
                                    return {
                                        ...player,
                                        "points": new_points,
                                        "goalaverages": new_goalaverage,
                                        "results_with_goalaverage": new_results_with_goalaverage
                                    }
                                }
                            } else {
                                return player;
                            }
                        }
                    )})
                    return result["commentaires"].includes(commentaires) ? result : {...result, "commentaires": [...result["commentaires"], commentaires]}
                }
            });
        });
    }

    const handleRegenerate = function(event) {
        event.preventDefault();
        
        setNewResultsData([])  // Reset the new_round_data
        setNewRoundData({})
        
        if(rounds.length == 0) {
            first_pairs();
        } else {
            make_pairs();
        }

        setNewRoundData({
            "round_number": rounds.length + 1,
            "state": "Création en cours",
            "scenario": ""
        })
    }


    const handleSaveRound = function(event) {
        event.preventDefault();
        const round_number = new_round_data["round_number"];
        if(new_scenario == "") {
            alert("Veuillez choisir un scénario !");
            return;
        } else if(rounds.map((elt) => elt["scenario"]).includes(new_scenario)) {
            alert("Le scenario "+ new_scenario +" a déjà été joué");
            return;
        }

        setNewRoundDisplayed((elt) => !elt);
        //setNewRoundData((elt) => {return {...elt, "state": "Prêt à commencer", "scenario": new_scenario}});
        const cur_new_round = {...new_round_data, "scenario": new_scenario, "state": "Prêt à commencer"};
        setRounds((elt) => [...elt, cur_new_round]);
        setResults((elt) => [...elt, ...new_results_data.map((new_results) => { return {...new_results, "state": "Prêt à commencer"}})]);
        //console.log("Création du round " + JSON.stringify(cur_new_round) + " avec les résultats " + JSON.stringify(new_results_data) + " !");
        console.log(results);

        setNewResultsData([]);
        setNewScenario("");
        setActiveRound(round_number);
    }

    const handleNewScenarioChange = function(event) {
        setNewScenario(event.target.value);
    }

    const handleIgnorePairsChanged = function(event) {
        setIgnorePairs(event.target.checked);
    }

    const handleIgnoreAffinitiesChanged = function(event) {
        setIgnoreAffinities(event.target.checked);
    }

    const handleIgnoreTablesChanged = function(event) {
        setIgnoreTables(event.target.checked);
    }

    const handleStartInscriptions = (event) => {
        event.preventDefault();
        props.switchToInscriptions();
    }

    let filtered_results = filterResults();
    let filtered_rounds = filterRounds();
    let filtered_players = filterPlayers();
    let all_rounds_finished = rounds.map((round) => round["state"]).every((state) => state == "Terminé");

    console.log(filtered_results);

    return (
        <div className="container">
            <h1 className='text-center'>MESBG Scorer - Tournoi</h1>
            <div className='row'>
                <div className='col text-center'>
                    <button type="button" className='btn btn-secondary my-2' onClick={handleStartInscriptions}>Inscriptions</button>
                </div>
            </div>
            <form>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="research" className="form-label">Recherche</label>
                            <input type="text" className="form-control" id="research" name="research" value={research}
                            placeholder="Entrez le nom d'un joueur ou le numéro d'une table" onChange={handleResearchChange} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="round" className="form-label">Round</label>
                            <select className="form-select" id="round" name="round" value={active_round} onChange={handleRoundChange}>
                                <option value="-1">Tous</option>
                                {rounds.map((round) => {
                                    return <option value={round["round_number"]} key={round["round_number"]}>{`Round ${round["round_number"]} - ${round["scenario"]}`}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-end">
                        <button type="submit" className="btn btn-outline-success mt-1" onClick={handleSearch}>Rechercher</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <button className="btn btn-outline-primary m-2" onClick={toLastRound}>Round actuel</button>

                        <button className="btn btn-outline-primary m-2" onClick={toRoundView}>Rounds</button>
                    
                        <button className="btn btn-outline-primary m-2" onClick={toScoreBoard}>Résultats</button>

                        <button className="btn btn-outline-primary m-2" onClick={toLastScoreBoard}>Résultats finaux</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <button className="btn btn-success m-2" onClick={saveAll}>Sauvegarder</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col text-begin">
                        <label htmlFor="viewUnfinishedRounds" className="form-check-label mx-1">Rounds en cours</label>
                        <input type="checkbox" className="form-check-input me-5" id="viewUnfinishedRounds" name="viewUnfinishedRounds" checked={viewUnfinished} onChange={handleViewUnfinishedChange} />
                        <label htmlFor="viewFinishedRounds" className="form-check-label mx-1">Rounds terminés</label>
                        <input type="checkbox" className="form-check-input" id="viewFinishedRounds" name="viewFinishedRounds" checked={viewFinished} onChange={handleViewFinishedChange} />
                    </div>
                    <div className='col text-end'>
                        <label htmlFor="detailedView" className="form-check-label mx-1">Vue détaillée</label>
                        <input type="checkbox" className="form-check-input" id="detailedView" name="detailedView" checked={detailedView} onChange={handleDetailedViewChange} />
                    </div>
                </div>
            </form>
            {current_view == "rounds" && filtered_rounds.map((round) => {
                return <Round   key={round["round_number"]} round={round} results={filtered_results.filter((result) => result["round_number"] == round["round_number"])}
                                players={players_data} saveScore={saveScore} handleStartRound={handleStartRound} handleEndRound={handleEndRound} handleEditRound={handleEditRound}
                                handleEditAppariement={handleEditAppariement} tables_names={tables_names} handleBackToPairs={handleBackToPairs} detailedView={detailedView}/>
                })}

                {current_view == "rounds" && 
                    (new_round_displayed ? 
                    <button className="btn btn-danger mt-5" onClick={handleNewRound}>Annuler</button> : 
                    <button className={all_rounds_finished ?
                                            "btn btn-success mt-5" :
                                            "btn btn-outline-warning mt-5"}
                                        title={all_rounds_finished ?
                                            "Créer un novueau round" :
                                            "Le round en cours n'est pas encore terminé !"}
                                        onClick={handleNewRound}>Nouveau round</button>)
                }
            {current_view == "rounds" && 
            <div style={new_round_displayed ? {display: "block"} : {display: "none"}}>
                <h2>Nouveau round :</h2>
                <form>
                    <div className='row'>
                        <div className='col'>
                            <label htmlFor="newScenario" className="form-label">Scénario</label>
                            <select className="form-select" id="newScenario" name="newScenario" value={new_scenario} onChange={handleNewScenarioChange}>
                                <option value=""></option>
                                {scenario_options.map((scenario) => {
                                    return <option value={scenario} key={scenario}>{scenario}</option>
                                })}
                            </select>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor="ignoreTables" className="form-check-label mx-1 mt-3">Ignorer les précédentes tables occupées </label>
                                </div>
                                <div className='col'>
                                    <input type="checkbox" className="form-check-input mt-3" id="ignoreTables" name="ignoreTables" checked={ignoreTables} onChange={handleIgnoreTablesChanged} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor="ignorePairs" className="form-check-label mx-1 mt-3">Ignorer les précédents apparillements </label>
                                </div>
                                <div className='col'>
                                    <input type="checkbox" className="form-check-input mt-3" id="ignorePairs" name="ignorePairs" checked={ignorePairs} onChange={handleIgnorePairsChanged} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor="ignoreAffinities" className="form-check-label mx-1 mt-3">Ignorer les joueurs qui jouent souvent ensemble </label>
                                </div>
                                <div className='col'>
                                    <input type="checkbox" className="form-check-input mt-3" id="ignoreAffinities" name="ignoreAffinities" checked={ignoreAffinities} onChange={handleIgnoreAffinitiesChanged} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col text-center">
                            <button className="btn btn-success mt-5" onClick={handleRegenerate}>Régénérer</button>
                        </div>
                    </div>
                </form>
                <Round  round={new_round_data} results={new_results_data} saveScore={undefined} players={players_data} handleStartRound={undefined} handleEndRound={undefined}
                        handleEditRound={undefined} handleEditAppariement={handleEditAppariement} tables_names={tables_names} handleBackToPairs={undefined} detailedView={true} />
                <form>
                    <div className="row">
                        <div className="col text-end">
                            <button className="btn btn-success mt-5" onClick={handleSaveRound}>Sauvegarder</button>
                        </div>
                    </div>
                </form>
            </div>}
            {current_view == "scoreboard" &&
                <Scoreboard players_data={filtered_players} rounds_data={filtered_rounds.filter((round) => round["state"] == "Terminé")} resultats_finaux={view_resultats_finaux}
                            tables_names={tables_names} />
            }
        </div>
    );
}