(function () {
    'use strict';

    Lampa.Storage.set('device_name', 'Lampa Uncensored');
	
    Lampa.Utils.putScriptAsync([
	    'https://bylampa.github.io/addon.js?v=' + Math.random(),
	    'http://79.137.205.41/themes.js?v=' + Math.random()
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
    } 

})();
