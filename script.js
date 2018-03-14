$(function(){


  var $sidenav = $('.sidenav');
  var $cardDeck = $('.container');
  var $start = $('#start');
  var $stop =$('#stop');

  var slideshow;

  var index = 0;
  var cards = [];

  var loadSideNav = function(){
    $.ajax({
      type:'GET',
      url: 'https://api.pokemontcg.io/v1/cards',
      data: cards,
      success: function(cards){

        for(let z =0; z<cards.cards.length; z++)
        {
          $sidenav.append('<div id="'+z+'">'+cards.cards[z].name+'</div>');
        }

        console.log("LoadSideNav");
      },
      error: function(e){
        alert('error getting pokemon cards for side nav: '+ e);
      }
    });
  }
  loadSideNav();

  function loadPokemon(data){
    var whichPokemon = ($(this).attr('id') ? $(this).attr('id') : data.data.ind);

    console.log(whichPokemon);

    $stop.click();
    $.ajax({
      type:'GET',
      url: 'https://api.pokemontcg.io/v1/cards',
      data: cards,
      success: function(cards){

        var newCard = $('<div class="card inactive" id="'+whichPokemon.toString()+'th"></div>');

        newCard.append('<h2>'+cards.cards[whichPokemon].name+"</h2>");
        newCard.append('<img src="'+cards.cards[whichPokemon].imageUrl+'">');
        newCard.append('<h3>Art by: '+cards.cards[whichPokemon].artist+'</h3>');

        $cardDeck.append(newCard);

        $('.active').toggleClass('active inactive');
        setTimeout(function(){
          $('#'+whichPokemon.toString()+'th').toggleClass('active');
          $('#'+whichPokemon.toString()+'th').toggleClass('inactive');
        }, 500);
//        $display.empty();
//
//        $display.append('<h2>'+cards.cards[whichPokemon].name+"</h2>");
//        $display.append('<img src="'+cards.cards[whichPokemon].imageUrl+'">');
//        $display.append('<h3>Art by: '+cards.cards[whichPokemon].artist+'</h3>');

        console.log("LoadPokemon");
        index = (parseInt(whichPokemon) >= 99 ? 0 : parseInt(whichPokemon)+1);
      },
      error: function(){
        alert('error getting pokemon cards:LoadPokemon');
      }
    });
  }


  $sidenav.on('click','div',loadPokemon);

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


        $display.empty();
        console.log(index);
        $display.append('<h2>'+cards.cards[index].name+"</h2>");
        $display.append('<img src="'+cards.cards[index].imageUrl+'">');
        $display.append('<h3>Art by: '+cards.cards[index].artist+'</h3>');

        console.log("LoadNextPokemon");
        index = (index >= 99 ? 0 :index+1);
      },
      error: function(){
        alert('error getting pokemon cards: loadNextPokemon');
      }
    })
  };

});
