(function () {
    'use strict';

  /*  // Создаем элементы аудио
var audioUpElement = document.createElement('audio');
var audioDownElement = document.createElement('audio');
var audioLeftElement = document.createElement('audio');
var audioRightElement = document.createElement('audio');
var audioOkElement = document.createElement('audio');

// Устанавливаем источники звука
audioUpElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioDownElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioLeftElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioRightElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioOkElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';

// Обрабатываем события пульта ТВ
document.onkeydown = function(event) {
  if (event.keyCode === 38) { // Кнопка "вверх"
    audioUpElement.currentTime = 0;
    audioUpElement.play();
    
  } else if (event.keyCode === 40) { // Кнопка "вниз"
    audioDownElement.currentTime = 0;
    audioDownElement.play();
    
  } else if (event.keyCode === 37) { // Кнопка "влево"
    audioLeftElement.currentTime = 0;
    audioLeftElement.play();
    
  } else if (event.keyCode === 39) { // Кнопка "вправо"
    audioRightElement.currentTime = 0;
    audioRightElement.play();

  } else if (event.keyCode === 13) { // Кнопка "ОК"
    audioOkElement.currentTime = 0;
    audioOkElement.play();
    
  }
};*/
	
    Lampa.Utils.putScriptAsync([
	    'https://bylampa.github.io/addon.js?v=' + Math.random(),
	    'https://bylampa.github.io/themes.js?v=' + Math.random()
    ], function () {});

    var timer = setInterval(function(){
        if(typeof Lampa !== 'undefined'){
            clearInterval(timer);

            if(!Lampa.Storage.get('set','false')) start_set();
		 
        }
    },200);
	
    function start_set(){
             Lampa.Storage.set('set','true');
             Lampa.Storage.set('keyboard_type', 'integrate');
             Lampa.Storage.set('start_page', 'main');
             Lampa.Storage.set('source', 'cub');
	     Lampa.Storage.set('background', 'false');
	     Lampa.Storage.set('animation', 'false');
	     Lampa.Storage.set('mask', 'false');
	     Lampa.Storage.set('player_normalization', 'true');
	     Lampa.Storage.set('player_timecode', 'ask');
	     Lampa.Storage.set('screensaver', 'false');
	     Lampa.Storage.set('pages_save_total', '3');
	     Lampa.Storage.set('device_name', 'Lampa Uncensored');
    } 

    Lampa.Storage.listener.follow('change', function (event) {
      if (event.name == 'activity' && Lampa.Activity.active().component === 'bookmarks') {
        setTimeout(function(){
          Lampa.Controller.move('down');
          Lampa.Controller.move('up');
        },50)
      }
    });

    var last_video_used = [];

	// преобразуем jQuery в Native селектор
		function jQueryToNative(jQuerySelector) {
			if (typeof jQuerySelector === 'string') {
				return document.querySelector(jQuerySelector);
			} else if (jQuerySelector instanceof jQuery) {
				return jQuerySelector.get(0);
			} else {
				return jQuerySelector;
			}
		}

	// плеер играет
	Lampa.PlayerVideo.listener.follow('play', function (e) {
	        //получаем текст текущей серии из панельки плеера
		setTimeout(function(){	
			var currentPart = $('.player-info__name').text();
			last_video_used[0] = currentPart;
			//Lampa.Noty.show(last_video_used[0]);
		}, 200)
	});

	// плеер закрыт
	Lampa.Player.listener.follow('destroy', function () {
		// попытки
		var attempts = 0;
		// задержка между переключением серий
		setTimeout(function(){
	        var element = document.querySelector('.player-panel__body');
			// если панельки плеера нет, он закрыт
	        if (!element) {
	            //Lampa.Noty.show('Плеер закрыт');
				// нужно проверить, какая активность, от этого зависит структура
				if (Lampa.Activity.active().component == 'torrents') {
					var prox = $('.scroll__body > div > div > div > div > div:contains("' + last_video_used[0] + '")').parent().parent().parent()
				} else if (Lampa.Activity.active().component == 'online_mod') {
					var prox = $('.scroll__body > div > div > div:contains("' + last_video_used[0] + '")').parent().parent()
				} else if (Lampa.Activity.active().component == 'showy') {
					var prox = $('.scroll__body > div > div > div > div:contains("' + last_video_used[0] + '")').parent().parent().parent()
				} else if (Lampa.Activity.active().component == 'modss_online') {
					var prox = $('.scroll__body > div > div > div > div:contains("' + last_video_used[0] + '")').parent().parent().parent()
				} else if (Lampa.Activity.active().component == 'bwajs') {
					var prox = $('.scroll__body > div > div > div > div:contains("' + last_video_used[0] + '")').parent().parent().parent()
				} else if (Lampa.Activity.active().component == 'lampavod') {
					var prox = $('.scroll__body > div > div > div > div:contains("' + last_video_used[0] + '")').parent().parent().parent()
				}
				var queryProxy = jQueryToNative(prox)
				Lampa.Controller.focus(queryProxy)
				Navigator.focus(queryProxy)	
				//Lampa.Noty.show(queryProxy);
	        }
		}, 500)
	});

})();
