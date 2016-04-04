$.ajax({
  url: 'http://pokeapi.co/api/v1/pokemon/?limit=12',
  dataType: 'json',
  success: function(data){
    data.objects.forEach(function(pokemon){
      var typesHtml = "";
      function getTypes(element) {
        typesHtml += '<span class="'+element.name+'">'+element.name+'</span>';
      }
  pokemon.types.forEach(getTypes);
      var html = '<div class="col-xs-4 card"><div><img class="img-responsive" src="http://pokeapi.co/media/img/'+pokemon.national_id+'.png"/><h3>'+pokemon.name+'</h3><p>'+typesHtml+'</p></div></div>';
      $("#cards").append(html);
    });
  }
});


