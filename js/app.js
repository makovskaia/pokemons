
var nextPokemons = "";

var typesHtml = "";

var filter = 'all'; 

function getTypes(element) {
  typesHtml += '<span class="type '+element.name+'">'+element.name+'</span>';
}

function newPokemonCards(data){
  data.objects.forEach(function(pokemon){

    typesHtml = "";

    pokemon.types.forEach(getTypes);

    var divCard = '';

    if( filter == 'all' || typesHtml.includes(filter)){
      divCard = '<div class="card" id="'+pokemon.national_id+'">';
    }else{
      divCard = '<div class="card" style="display: none" id="'+pokemon.national_id+'">';
    }

    var html = '<div class="col-xs-4 small-card">' +
                  divCard + 
                    '<img class="img-responsive" src="http://pokeapi.co/media/img/'+pokemon.national_id+'.png"/>' +
                    '<h4>'+pokemon.name+'</h4>' +
                    '<p>'+typesHtml+'</p>' +
                  '</div>' +
                '</div>';

    $('#cards').append(html);

    nextPokemons = data.meta.next;

  });

}

$.ajax({
  url: 'http://pokeapi.co/api/v1/pokemon/?limit=12',
  dataType: 'json',
  success: newPokemonCards
});

function getPokemonCard(data){

  typesHtml = "";

  data.types.forEach(getTypes);

  var html = '<div class="selected-pokemon">' +
                '<img class="img-responsive" src="http://pokeapi.co/media/img/'+data.national_id+'.png"/>' +
                '<h3>'+data.name+' #'+data.national_id+'</h3>' +
                '<table>' +
                  '<tr>' +
                    '<td>Type</td>' +
                    '<td>'+typesHtml+'</td>' +
                  '</tr>' +
                  '<tr>'+
                    '<td>Attack</td>'+
                    '<td>'+data.attack+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<td>Defense  </td>'+
                    '<td>'+data.defense+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<td>HP</td>'+
                    '<td>'+data.hp+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<td>SP Attack</td>'+
                    '<td>'+data.sp_atk+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<td>SP Defense</td>'+
                    '<td>'+data.sp_def+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<td>Speed</td>'+
                    '<td>'+data.speed+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<td>Weight</td>'+
                    '<td>'+data.weight+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<td>Total Moves</td>'+
                    '<td>'+data.moves.length+'</td>'+
                  '</tr>'+
                '</table>'+
              '</div>';

  $("#selected-card").html(html);

}

$(document).ready(function(){
  $('#cards').on('click', '.card', function(){
    $.ajax({
      url: 'http://pokeapi.co/api/v1/pokemon/'+$(this).attr('id'),
      dataType: 'json',
      success: getPokemonCard
    });
  });
  
  $(".btn").on('click', function(){
    $.ajax({
      url: 'http://pokeapi.co'+nextPokemons,
      dataType: 'json',
      success: newPokemonCards
    });
  });

$(".container").on('click', '.type', function(){
  filter = $(this).html();
  applyFilter();
});

});

function applyFilter(){
  if (filter !== 'all'){
    for (var i=1; i<=12; i++){
      var currentCard = $('.col-xs-8 .small-card:nth-child('+i+')');
      if(currentCard.find("span").attr('class').includes(filter)){
        currentCard.css('display', 'inline');
      }else{
        currentCard.css('display', 'none');
      }
    } 
  }else{
    $('.col-xs-8').children().css('display', 'inline');
  }
}