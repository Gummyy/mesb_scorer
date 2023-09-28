import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Tournament from './Tournament';
import TournamentInscriptions from './TournamentInscriptions';
import TournamentReport from './TournamentReport';

export default function App() {
  /*let players_data = undefined;
  //let results = [];
  let rounds = [];
  let new_results_data = [];
  let new_scenario = "";
  let new_round_data = {};
  let new_round_displayed = false;
  let tables_names = [];*/

  let [save_loaded, setSaveLoaded] = React.useState(false);
  let [players_data, setPlayersData] = React.useState([]);
  let [results, setResults] = React.useState([]);
  let [rounds, setRounds] = React.useState([]);
  let [new_results_data, setNewResultsData] = React.useState([]);
  let [new_scenario, setNewScenario] = React.useState("");
  let [new_round_data, setNewRoundData] = React.useState({});
  let [new_round_displayed, setNewRoundDisplayed] = React.useState(false);
  let [tables_names, setTablesNames] = React.useState([]);
  let [teams, setTeams] = React.useState([]);
  
  let [view, setView] = React.useState("menu");

  let players_data_load = undefined;
  let tables_names_data = undefined;

  const analyze_save_file = (saveData) => {
    try {
      console.log(saveData);

      players_data_load = saveData["players_data"];
      tables_names_data = saveData["tables_names"];
      setResults(saveData["results"]);
      setRounds(saveData["rounds"]);
      setNewResultsData(saveData["new_results_data"]);
      setNewScenario(saveData["new_scenario"]);
      setNewRoundData(saveData["new_round_data"]);
      setNewRoundDisplayed(saveData["new_round_displayed"]);

      if(tables_names_data !== undefined && players_data_load === undefined) {
        players_data_load = Array.from({length: tables_names_data.length*2}, (_, i) => {
          return {
            "name": `Joueur ${i}`,
            "full_name": "",
            "armee": "",
            "points": [],
            "goalaverages": [],
            "results_with_goalaverage": [],
            "tables_played": [],
            "opponents_played": []
          };
        });
      } else {
        if(players_data_load === undefined) {
          /*players_data_load = ["Own3d", "Dracovitch", "Bob-razowski", "Ikorih", "Hugzzzy", "Thorondin", "Le_B / Babeer", "Raphdu78", "Asdru_", "Kenny_Sth", "FRERES-D-EREBOR", "Thorongil",
                          "Nibli", "LeMaitreDesDES", "Thelion_AOE", "ChauveQuiPeut", "Pierro_de_la_Comte", "The_Executeur", "LHaoru", "Frere_derebor1", "Lexou", "glordfindel",
                          "Grhim", "Ironpint", "Barbecue", "Le-Voyageur", "Krand", "VedenFrozen", "Puech", "G0rbag", "decalogus", "Granadamax", "Teroenza", "rr-lagachette",
                          "LURTZ37", "Fehol", "Captnnarsice", "CharlesJohn", "Prosper", "Jammi", "Ar-Mando", "Nihilakh", "Fleau_le_Preux", "Ljos", "Gazpashow", "Sarn", "HeStan",
                          "Alexdu78", "PapiBasic", "Bababibel", "Kord", "Carpu", "Valsorian", "Fingol", "Fornie", "Vulturnus", "Titus01", "Prodamp", "Le_Preux_Shawn", "Haltha",
                          "Gorbat74", "Olive", "Hyxperion", "Creepistar", "Gilldorc", "ScorpionTau38", "Patch", "Muxi01", "DaVaX", "SixSilver", "Meltam", "Olympia", "Ghosten",
                          "Coco_painting_stuff", "rumir", "SoulSn", "Castellans", "Bendrums", "Dpat", "Rammeloo", "Shuun", "PetitGrizz", "Captnfrene", "Edoras", "Darkmikel", 
                          "Kroakaaris", "tordek_urside", "Mailliw", "GigaDerz", "sephir0th", "Masterpine", "Cham", "Imrahilovic", "L_Auvergnat", "Manadar", "Asuna", "Aira_Mornie",
                          "Winny22", "GrumpyGrizzly", "Pinedhuitre", "Dolrudir", "Detrakor"];*/
          players_data_load = [];
    
          players_data_load = players_data_load.map((player) => {
            return {
              "name": player,
              "full_name": "",
              "armee": "",
              "points": [],
              "goalaverages": [],
              "results_with_goalaverage": [],
              "tables_played": [],
              "opponents_played": []
            };
          });
        }
        if(players_data_load.length %2 == 1) {
          players_data_load.push({
            "name": " ",
            "full_name": "",
            "armee": "",
            "points": [],
            "goalaverages": [],
            "results_with_goalaverage": [],
            "tables_played": [],
            "opponents_played": []
          });
        }
        if(tables_names_data === undefined) {
          tables_names_data = Array.from({length: players_data_load.length/2}, (_, i) => "");
        }
      }
    
      setPlayersData(players_data_load);
      setTablesNames(tables_names_data);
      setSaveLoaded(true);

    } catch(e) {
      console.log("Sauvegarde invalide");
    }
  };

  const switchToTournaments = () => {
    setView("tournament");
  }

  const switchToInscriptions = () => {
    setView("inscriptions");
  }

  const handleStartTournament = (event) => {
    event.preventDefault();
    setView("tournament");
  }

  const handleViewInscriptions = (event) => {
    event.preventDefault();
    setView("inscriptions");
  }

  const backToMenu = (event) => {
    event.preventDefault();
      setView("menu");
  }

  const handleFileChange = (event) => {
    var reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
      try {
        let saveData = JSON.parse(reader.result);
        analyze_save_file(saveData);
      } catch(e) {
        console.log("Invalid json file");
      }
      //console.log(JSON.parse(reader.result));
      //var obj = JSON.parse(event.target.result);
    };
    //console.log(event.target.value);
    //reader.readAsText(event.target.files[0]);
  }

  return (
    <div>
      {view == "tournament" && 
      <Tournament players_data={players_data} results={results} rounds={rounds} new_results_data={new_results_data} new_scenario={new_scenario}
      new_round_data={new_round_data} new_round_displayed={new_round_displayed} tables_names={tables_names} backToMenu={backToMenu} switchToInscriptions={switchToInscriptions}
      setPlayersData={setPlayersData} setResults={setResults} setRounds={setRounds} setNewResultsData={setNewResultsData} setNewScenario={setNewScenario}
      setNewRoundData={setNewRoundData} setNewRoundDisplayed={setNewRoundDisplayed} setTablesNames={setTablesNames} />}

      {view == "menu" &&
      <div className="row" style={{minHeight: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', margin: 0}}>
        <div className='col text-center'>
          <h1 className='display-1'>MESBG Scorer</h1>
          
          <div className='row'>
            <div className='col-4' />
            <div className='col-4'>
              <input type='file' name="load_save" id="load_save" className='form-control' onChange={handleFileChange} />
            </div>
            <div className='col-4' />
          </div>
          
          <h3>{save_loaded !== undefined ? "" : "Aucune donnée trouvée"}</h3>
          <button className="btn btn-outline-primary m-4" onClick={handleStartTournament}>Tournoi</button>
          <button className="btn btn-outline-primary m-4" onClick={handleViewInscriptions}>Inscriptions</button>

          {save_loaded !== undefined && 
          <div>
            <h3>{rounds.length > 0 ? "Tournoi en cours" : "Nouveau tournoi"}</h3>

            <p>{`${players_data.length} joueurs inscrits`}</p>

            {rounds.length > 0 && (
            <div className='row'>
              <div className='col-4'></div>
              <div className='col-4 text-start'>
                <p>{rounds[rounds.length - 1]["state"] == "Terminé" ? (rounds.length > 1 ? `Les ${rounds.length} premiers rounds sont terminés` : `Le premier round est terminé`) : `Le round ${rounds.length} est en cours`}</p>
                <p>{`${results.filter((result) => result["state"] == "Terminé").length} parties jouées`}</p>
              </div>
              <div className='col-4'></div>
            </div>
            )}
          </div>
          }
        </div>
      </div>}

      {view == "inscriptions" &&
      <TournamentInscriptions switchToTournaments={switchToTournaments} players_data={players_data} results={results} backToMenu={backToMenu} tables_names={tables_names}
      setPlayersData={setPlayersData} setResults={setResults} setTablesNames={setTablesNames} rounds={rounds} teams={teams} setTeams={setTeams} />
      }
    </div>
  );

}

//ReactDOM.render(<App />, document.getElementById('app'));
createRoot(document.getElementById('main')).render(<App />);