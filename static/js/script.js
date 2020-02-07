$("#alert").hide();
var nbRandom;
var RandomPage;
$("#btn").click(function(){
    $("#contSpinner").append("<div class='spinner-border text-warning' role='status' id='loading'></div>");
    try{


     RandomPage =Math.floor(Math.random() * 4)+1;
    $.get("https://swapi.co/api/starships/?page="+RandomPage,result);
        document.getElementById('alert').className="alert alert-success";
        $("#alert").text("Vous avez Réussie a charger le vaisseau ! FELICITATION");
        $("#alert").show();
    }
    catch (e) {
        document.getElementById('alert').className="alert alert-danger";
        $("#alert").text("Vous n'avez pas réussie a chasrger le vaisseau ! SORRY");
        $("#alert").show();

    }
$("#loading").remove();
});
function result(donnee,status) {
    console.log(donnee);
    nbRandom=random();
    $("#btn").attr("disabled", true);
    $("#nomShip").text(donnee.results[nbRandom].name);
    $("#modShip").text(donnee.results[nbRandom].model);
    $("#classShip").text(donnee.results[nbRandom].starship_class);
    $("#fabShip").text(donnee.results[nbRandom].manufacturer);
    $("#coutShip").text(donnee.results[nbRandom].cost_in_credits);
    $("#capMax").text(donnee.results[nbRandom].cargo_capacity);
    $("#tailleShip").text(donnee.results[nbRandom].length);
    $("#nbMem").text(donnee.results[nbRandom].crew);
    $("#nbPass").text(donnee.results[nbRandom].passengers);
    var Parent = document.getElementById("tablePerso");
    while(Parent.hasChildNodes())
    {
        Parent.removeChild(Parent.firstChild);
    }
    $("#tablePerso").append("<tr><th>nom</th><th>sexe</th></tr>");
    donnee.results[nbRandom].pilots.forEach(function(item,index){
        $.get(item,loadPilote)
    });
    var Parent = document.getElementById("tableFilm");
    while(Parent.hasChildNodes())
    {
        Parent.removeChild(Parent.firstChild);
    }
    $("#tableFilm").append("<tr><th>titre</th><th>directeur</th><th>date de sortie</th></tr>");
    donnee.results[nbRandom].films.forEach(function(item,index){
        $.get(item,loadFilms)
    });
    $('#btn').attr("disabled", false);
};


function loadPilote(donnee,status) {
    var txt2 = "<tr>";
    var txt3 = $("<td></td>").text(donnee.name);
    var txt4 = $("<td></td>").text(donnee.gender);
    var txt5= "</tr>";
    $("#tablePerso").append(txt2,txt3,txt4,txt5);
}


function loadFilms(donnee,status) {
    console.log(donnee);
    var txt2 = "<tr>";
    var txt3 = $("<td></td>").text(donnee.title);
    var txt4 = $("<td></td>").text(donnee.director);
    var txt5 = $("<td></td>").text(donnee.release_date);
    var txt6= "</tr>";
    $("#tableFilm").append(txt2,txt3,txt4,txt5,txt6);

}
function random()
{
    if(RandomPage===4)
    {
        return Math.floor(Math.random() * 6);
    }
   else{
        return Math.floor(Math.random() * 10);
    }
}