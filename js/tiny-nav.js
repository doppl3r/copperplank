/*
 *
 * tiny-nav.js
 * (c) doppl3r
 *
 * To enable, just link this .js file to your html page
 *
*/

//initialize navigation bar
$(document).ready(function(){	setToggle("ON"); });

//enable hovering for desktop users
$( ".tiny-nav ul" ).hover(
    function() { setToggle("OFF"); },
    function() { setToggle("ON"); }
);

//let users toggle the navbar up or down
function toggle(button)
{
    if(document.getElementById("tiny-nav-button").value=="OFF"){setToggle("ON");}
    else if(document.getElementById("tiny-nav-button").value=="ON"){setToggle("OFF");}
}

//manually set toggle
function setToggle(binary){
    $('.tiny-nav ul a').stop();
    if (binary == "ON") {$('.tiny-nav ul a').animate({height: "0",padding: "0px 32px",visibility: "hidden",opacity: "0"},500);}
    else {$('.tiny-nav ul a').animate({height: "58",padding: "12px 32px",visibility: "visible",opacity: "1"},500);}
    document.getElementById("tiny-nav-button").value=binary;
}