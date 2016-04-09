
var nextPokemons = "";

var typesHtml = "";

var filter = 'all'; 

var spinner = '<div class="spinner">' +
                '<img src="http://25.media.tumblr.com/c99a579db3ae0fc164bf4cca148885d3/tumblr_mjgv8kEuMg1s87n79o1_400.gif" />' +
                '<p>Loading</p>' +
            '</div>';

function getTypes(element) {
  typesHtml += '<span class="type '+element.name+'">'+element.name+'</span>';
}

function newPokemonCards(data){
  $('.spinner').hide();
  $('button').prop('disabled', false);
  data.objects.forEach(function(pokemon){

    typesHtml = "";

    pokemon.types.forEach(getTypes);

    var html = '<div class="col-xs-4 small-card">' +
                  '<div class="card" id="'+pokemon.national_id+'">' + 
                    '<img class="img-responsive" src="http://pokeapi.co/media/img/'+pokemon.national_id+'.png"/>' +
                    '<p>'+pokemon.name+'</p>' +
                    '<p>'+typesHtml+'</p>' +
                  '</div>' +
                '</div>';

    $('#cards').append(html);

    nextPokemons = data.meta.next;

  });

  applyFilter();

}

$.ajax({
  url: 'http://pokeapi.co/api/v1/pokemon/?limit=12',
  dataType: 'json',
  success: newPokemonCards
});

function getPokemonCard(data){

  typesHtml = "";

  data.types.forEach(getTypes);

  var html = '<img class="img-responsive" src="http://pokeapi.co/media/img/'+data.national_id+'.png"/>' +
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
                '</table>';

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('.modal-body').html(html);
    $('#card-modal').modal('show');
  }else{

    $("#selected-card").html('<div class="selected-pokemon">' + html + '</div>');
  }
}

$(document).ready(function(){
  $('#cards').on('click', '.card', function(){
    $('#selected-card').html(spinner);
    $.ajax({
      url: 'http://pokeapi.co/api/v1/pokemon/'+$(this).attr('id'),
      dataType: 'json',
      success: getPokemonCard
    });
  });
  
  $(".btn").on('click', function(){
    $('#cards').append(spinner);
    $(this).prop('disabled', true);
    $.ajax({
      url: 'http://pokeapi.co'+nextPokemons,
      dataType: 'json',
      success: newPokemonCards
    });
  });

$(".main").on('click', '.type', function(){
  filter = $(this).html();
  applyFilter();
});

});

function applyFilter(){
  var $card = $('.small-card');
  if (filter !== 'all'){
    $card.hide();
    $('.small-card .'+filter).parents('.small-card').show();
  }else{
    $card.css('display', 'inline');
  }
  $('.types li').css('border-bottom', 'none');
  $('.types .'+filter+'').css('border-bottom', '4px solid white');
}

//for mobile version

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  $('.main').attr('class','container-flow main');
  $('.container-flow').css('margin','30px');
  $('.large').css('display','none');
  $('#cards').attr('class','col-xs-12');
  $('.small-card').attr('class', 'col-xs-6 small-card');
  $('.buttonDiv').attr('class','col-xs-12 buttonDiv');
  $('body').css('font-size','25px');
}
