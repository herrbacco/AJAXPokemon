$(function(){

$('#button');
  var $display = $('#displayDiv');
  var $start = $('#start');
  var $stop =$('#stop');

  var slideshow;

  var index = 0;
  var cards = [];

  $start.on('click',function(){
    console.log('start clicked');
    $start.hide();
    $stop.show();
    slideshow = setInterval(loadNextPokemon, 3000);
  });

  $stop.on('click', function(){
    console.log('stop clicked');
    $stop.hide();
    $start.show();
    clearInterval(slideshow);
  })

  var loadNextPokemon = function(){
    $.ajax({
      type:'GET',
      url: 'https://api.pokemontcg.io/v1/cards',
      data: cards,
      success: function(cards){

        var $nameH2 = '<h2>'+cards.cards[index].name+"</h2>";
        var $picIMG = '<img src="'+cards.cards[index].imageUrl+'">';
        var $textH3 = '<h3>Art by: '+cards.cards[index].artist+'</h3>';

        $display.empty();

        $display.append($nameH2);
        $display.append($picIMG);
        $display.append($textH3);

        console.log("cards retrieved");

        index = (index >= 99 ? 0:index+1);
      },
      error: function(){
        alert('error getting pokemon cards');
      }
    })
  };

});
