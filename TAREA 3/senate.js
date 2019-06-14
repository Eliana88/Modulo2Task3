"use strict"
//  Obtener los elementos filtrados.
var miembrosSenado = dataSenate.results[0].members;
var listarSenado = document.getElementById("dataSenate");

//  Cargamos los datos en el html cada vez que ingresemos a la pagina.
readySenado(miembrosSenado, listarSenado); //listar para senadores

function readySenado(array, elementHTML){
  const table = elementHTML;
  const row = table.insertRow(-1)
  row.innerHTML = `
    <th>${"Name"}</th>
    <th>${"Last Name"}</th>
    <th>${"Party"}</th>
    <th>${"Seniority"}</th>
    <th>${"State"}</th>
    <th>${"% Votes"}</th>
  `;
  array.forEach((element) => {
    const row = table.insertRow(-1)
    row.innerHTML = `
      <td>${element.first_name}</td>
      <td>${element.last_name}</td>
      <td>${element.party}</td>
      <td>${element.seniority}</td>
      <td>${element.state}</td>
      <td>${element.votes_with_party_pct + "%"}</td>
    `;
  });
};

//-------------------------

document.getElementById('filtros').addEventListener('change', function() {

    //se limpia la tabla cada vez que se modifica un checkbox
    document.getElementById('dataSenate').innerHTML = "";

    let checkeds = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(element => element.value);
    console.log(checkeds);

    readySenado(filtrar(checkeds, miembrosSenado), listarSenado); //la funcion devuelve los items(elemetos) filtrados.

});

function filtrar(partys, members) {
    let items = [];
    let aux = [];
    partys.forEach(element => {
        aux = [];
        aux = members.filter(item => item.party === element);
        items.push.apply(items, aux); //	Concateno los arrays.
    })

    console.log(aux);
    return items;
}

document.getElementById('states').addEventListener('change', function() {

    //se limpia la tabla cada vez que se modifica un checkbox
    document.getElementById('dataSenate').innerHTML = "";

    var selected = document.getElementById("select-states").value;

    console.log(selected);

    filtrarEstado(selected, miembrosSenado);

    readySenado(filtrarEstado(selected, miembrosSenado), listarSenado); //la funcion devuelve los items(elemetos) filtrados.

});

function filtrarEstado (select, members){
  let items = [];
  let aux = [];
  members.forEach(element => {
      aux = [];
      aux = members.filter(item => item.state === select);
      items.push.apply(items, aux); //	Concateno los arrays.
  })

  console.log(aux);
  return items;
}
