/*
    Set this tag for index.html for correct work ->
     -> <body id="body" style="opacity:0%">
*/

export function removeFlickering(){
    setTimeout(function () {
        document.getElementById("body").style.opacity = "100%";
    }, 200);
}

