"use strict"
// pseudocodigo:
// obtener cantidad de miembros del senado.
// obtener cantidad de miembros del senado por partido
// cada valor grabarlo en en json.


//obtener cantidad de miembros house y senate.
var miembrosSenado = dataSenate.results[0].members;
var cantidadSenado = dataSenate.results[0].members.length;

//json de para mostrar y grabar: statisticsSenate.
var datosAtteSenado = statisticsSenate.results[0].partys;

//elemento tabla donde se vana  mostrar los datos del json
var listarAtteSenado = document.getElementById("senateGlance");

function readyAtteSenado(array, elementHTML){
  const table = elementHTML;
  const row = table.insertRow(-1)
  row.innerHTML = `
    <th>${"Party"}</th>
    <th>${"No. of Reps"}</th>
    <th>${"% voted w/ Party"}</th>
  `;
  array.forEach((element) => {
    const row = table.insertRow(-1)
    row.innerHTML = `
      <td>${element.description}</td>
      <td>${element.number_of_Reps}</td>
      <td>${element.pc_voted_with_Prty + "%"}</td>
    `;

  });
};

obtenerMiembrosPartido(miembrosSenado);
calculateStatisticsGlance();

function obtenerMiembrosPartido(data) {

    data.forEach(element => {
        if (element.party === 'D') {
            statisticsSenate.results[0].partys[0].members.push(element);
        }

        if (element.party === 'R') {
            statisticsSenate.results[0].partys[1].members.push(element);
        }

        if (element.party === 'I') {
            statisticsSenate.results[0].partys[2].members.push(element);
        }
    });

}

console.log(statisticsSenate.results[0].partys[1].members);


function calculateStatisticsGlance() {

    let totalNumberOfReps = 0;
    let totalPctVotedWithParty = 0;

    statisticsSenate.results[0].partys.forEach(element => {
        element.number_of_Reps = element.members.length;
        element["pc_voted_with_Prty"] = (element.members.reduce(function(a, b) { return a + b["votes_with_party_pct"] }, 0) / element.members.length).toFixed(2);
        totalNumberOfReps = totalNumberOfReps + element.members.length;
        totalPctVotedWithParty = (element["pc_voted_with_Prty"] / 3).toFixed(2);

    });

    statisticsSenate.results[0]["total_number_of_reps"] = totalNumberOfReps;
    statisticsSenate.results[0]["total_%_voted_with_prty"] = totalPctVotedWithParty;

}

console.log(statisticsSenate);

//  Cargamos los datos en el html (table).
readyAtteSenado(datosAtteSenado, listarAtteSenado); //listar para senadores
