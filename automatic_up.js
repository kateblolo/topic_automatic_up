// ==UserScript==
// @name         Topic automatic up
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.jeuxvideo.com/forums/42-51-*
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

var titre = $("#bloc-title-forum").text().replace(/\s+/g, '');
var instant = false;

function start(){
    GM.setValue(titre, true);
    $('#message_topic').val("Up!");
    var delMsg = $( "p:contains('Up!')" ).parent().parent().parent().find("span.picto-msg-croix");
    if(delMsg.length == 0) { $('.btn.btn-poster-msg.datalayer-push.js-post-message').click(); }
    else if ( instant) delMsg.click();
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    sleep(10000).then(() => {
        GM.getValue(titre).then(function(value) {
            if(value) delMsg.click();
        });
    });
}
function stop(){
    GM.setValue(titre, false);
    $("#demarrerScript").html("Demarrer");
    $("#demarrerScript").css('color','green');
    document.getElementById("demarrerScript").addEventListener ("click", start, false);
    instant = true;
}

GM.getValue(titre).then(function(value) {
    if(value){
        $(".titre-bloc.titre-bloc-forum").append("<button id='demarrerScript'>Stop</button>");
        $("#demarrerScript").css('color','red');
        document.getElementById("demarrerScript").addEventListener ("click", stop, false);
        console.log("start executé ...");
        start();
    }
    else{
        $(".titre-bloc.titre-bloc-forum").append("<button id='demarrerScript'>Demarrer</button>")
        $("#demarrerScript").css('color','green');
        document.getElementById("demarrerScript").addEventListener ("click", start, false);
        instant = true;
    }
});
