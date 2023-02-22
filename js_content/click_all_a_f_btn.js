var unable_to_find="Unable to find add friend buttons.";
var clicked="Add friend button is clicked.";
var all_clicked='All add friend buttons are clicked.';
// for passing message to iframe
function passMessage(data) {
	var elem = document.getElementById("tff_frame");
	elem.contentWindow.postMessage(data, "*");
}

function enableSubmit() {
	var data = {};
	data.todo = "enable_submit";
	passMessage(data);
}

// function for disabling start clicking buttons
function disableSubmit() {
	var data = {};
	data.todo = "disable_submit";
	passMessage(data);
}

// for removing invisible add friend buttons from screen
function removeUnnecessary(){
    $("#fbRequestsFlyout").remove();
    $("#fbRequestsJewel").remove();
}

//
//
//  For clicking using algorithm 1 start
//
//
// final function for clicking
function startClickAlgo1Final(){
    var clicked=false;
    var buttons=document.getElementsByTagName("button");
    for(var counter=0; counter<buttons.length; counter++){
        var target=buttons[counter];
        var text=target.innerText.trim();
        if(text=="Add Friend"){
            target.click();
            target.focus();
            clicked=true;
            target.remove();
            break;
        }
    }
    if(clicked){
        return true;
    }else{
        return false;
    }
}

function startClickAlgo1(delay) {
    disableSubmit();
	if(startClickAlgo1Final()){
        var tmp='"Add Friend" button is clicked.';
        toastr.success(tmp);
        // some button found and it is clicked
        setTimeout(function(){
            startClickAlgo1(delay);
        }, delay);
    }else{
        // no button found it is not clicked
        var tmp2='No "Add Friend" buttons found for clicking.';
        toastr.error(tmp2);
        alert(tmp2);
        enableSubmit();
    }
}

//for clicking button
// eslint-disable-next-line no-unused-vars
function clickNowAlgo1(delayStr) {
    removeUnnecessary();
    console.log("delayStr = "+delayStr);
    var delay=parseInt(delayStr) *1000||1000;
	startClickAlgo1(delay);
	// for clicking add friend buttons on group member sections
	// click_all_add_friend_buttons_2();
}
//
//
//  For clicking using algorithm 2 start
//
//
//for clicking correct buttons from validcounter
function clickAddFriendButtons(validCounter, delay){
	var counter=0;
	function click(){
		var target=document.getElementsByTagName('button')[validCounter[counter]];
        target.click();
		toastr.success(clicked);
		counter++;
		if(validCounter[counter]!=undefined){
			setTimeout(click, delay);
		}else{
            toastr.info(all_clicked);
            enableSubmit();
		}
	}
	click();
}

//for clicking all active add friend buttons
function click_all_add_friend_buttons(delay) {
    // for storing index values for buttons 
    // that can be clicked
	var validCounter=[];
	var button=document.getElementsByTagName("button");
	for(var counter=0; counter<button.length; counter++){
		var mat=button[counter].innerText.match(/add friend/ig);
		if(mat){
			if(mat[0]){
				validCounter.push(counter);
			}else{
				console.log('stopped');
			}
		}else{
			console.log('stopped');
		}
	}
	console.log("validCounter");
	console.log(validCounter);
	//check if buttons are found
	if(validCounter.length){
		clickAddFriendButtons(validCounter, delay);
	}else{
        toastr.error(unable_to_find);
        enableSubmit();
	}
}

//for clicking button
// eslint-disable-next-line no-unused-vars
function clickNowAlgo2(delayStr) {
    removeUnnecessary();
    console.log("delayStr = "+delayStr);
    var delay=parseInt(delayStr) *1000||1000;
	// for clicking add friend buttons on group member sections as well
	click_all_add_friend_buttons(delay);
}