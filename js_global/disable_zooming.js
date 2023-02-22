// This will disable ctrl + , - and mousewheel zooms for a page
// mousewheel disable
function mousewheelfn(a) {
    if (a.ctrlKey) {
        a.preventDefault();
        a.stopPropagation();
    }
}
window.onmousewheel = document.onmousewheel = mousewheelfn;
// disable ctrl + and - zooms
document.onkeydown = function(e) {
    e = e || window.event;//Get event
    if (e.ctrlKey) {
        var c = e.which || e.keyCode;//Get key code
        console.log(c);
        switch (c) {
            case 187://Block Ctrl++ zoom
            case 189://and ctrl - zoom
                e.preventDefault();
                e.stopPropagation();
                break;
        }
    }
};