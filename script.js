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

  $sidenav.on('click','div',loadPokemon);

  function loadPokemon(ind){

    var whichPokemon;

    if($(this).attr('id')){
      whichPokemon = $(this).attr('id');
      $stop.click();
    }
    else{
      whichPokemon = ind;
    }

    console.log(whichPokemon);

    //if card for this pokemon exists already
    if($('#'+whichPokemon.toString()+'th').length){

      //transition to that card by toggling active/inactive classes
      $('.active').toggleClass('active inactive');
      setTimeout(function(){
        $('#'+whichPokemon.toString()+'th').toggleClass('active');
        $('#'+whichPokemon.toString()+'th').toggleClass('inactive');
      }, 200);

      index = (parseInt(whichPokemon) >= 99 ? 0 : parseInt(whichPokemon)+1);
    }
    //else load new Pokemon card and transition to it
    else{
      $.ajax({
        type:'GET',
        url: 'https://api.pokemontcg.io/v1/cards',
        data: cards,
        success: function(cards){

          //newCard is built as inactive and then is transitioned to
          var newCard = $('<div class="card inactive" id="'+whichPokemon.toString()+'th"></div>');

          newCard.append('<h2>'+cards.cards[whichPokemon].name+"</h2>");
          newCard.append('<img src="'+cards.cards[whichPokemon].imageUrl+'">');
          newCard.append('<h3>Art by: '+cards.cards[whichPokemon].artist+'</h3>');

          $cardDeck.append(newCard);

          //transition to new card
          $('.active').toggleClass('active inactive');
          setTimeout(function(){
            $('#'+whichPokemon.toString()+'th').toggleClass('active');
            $('#'+whichPokemon.toString()+'th').toggleClass('inactive');
          }, 200);

          console.log("load new pokemon");

          //increment counter to prepare for slideshow
          index = (parseInt(whichPokemon) >= 99 ? 0 : parseInt(whichPokemon)+1);
        },
        error: function(){alert('error getting pokemon cards:LoadPokemon');}
      });
    }
  }

  $start.on('click',function(){
    console.log('start clicked');
    $start.css('display', 'none');
    $stop.css('display', 'inline-block');
    slideshow = setInterval(loadNextPokemon, 3000);
  });

  $stop.on('click', function(){
    console.log('stop clicked');
    $stop.css('display', 'none');
    $start.css('display', 'inline-block');
    clearInterval(slideshow);
  })

  var loadNextPokemon = function(){

    loadPokemon(index);

    console.log("LoadNextPokemon "+ index);
  };

});
