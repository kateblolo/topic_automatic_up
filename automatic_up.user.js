// ==UserScript==
// @name         Topic automatic up
// @version      0.2
// @description  Script pour UP les topics automatiquement
// @author       kateblolo
// @match        https://www.jeuxvideo.com/forums/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

var titre = $("#bloc-title-forum").text().replace(/\s+/g, '');
var instant = false;

function start(){
    GM.setValue(titre, true);
    $('#message_topic').val(":up:");
    var delMsg = $( "p:has(img[title=':up:'])" ).parent().parent().parent().find("span.picto-msg-croix");
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
    $("#demarrerScript").html("Start UP");
    document.getElementById("demarrerScript").addEventListener ("click", start, false);
    instant = true;
}

GM.getValue(titre).then(function(value) {
    if(value){
        $('.bloc-outils-top').find('.group-two').append("<button class='btn btn-actu-new-list-forum' id='demarrerScript'>Stop UP</button>");
        document.getElementById("demarrerScript").addEventListener ("click", stop, false);
        start();
    }
    else{
        $('.bloc-outils-top').find('.group-two').append("<button class='btn btn-actu-new-list-forum' id='demarrerScript'>Start UP</button>")
        document.getElementById("demarrerScript").addEventListener ("click", start, false);
        instant = true;
    }
});