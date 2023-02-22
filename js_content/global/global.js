// toastr options used by content files
if (toastr) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
    };
}
console.log("toastr_opts_content.js loaded");

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// eslint-disable-next-line no-unused-vars
function getDelayInMSUsingInterval(delayBeginRange, delayEndRange) {
    return randomIntFromInterval(delayBeginRange, delayEndRange) * 1000;
}

// eslint-disable-next-line no-unused-vars
function enableSubmit() {
    console.log('enableSubmit is called');
    // eslint-disable-next-line no-undef
    dartEnableSubmit();
}

/// for checking if an element is hidden or not
// eslint-disable-next-line no-unused-vars
function isHidden(el) {
    var style = window.getComputedStyle(el);
    return ((style.display === 'none') || (style.visibility === 'hidden'));
}

/// for checking if an element is visible or not
// eslint-disable-next-line no-unused-vars
function isVisible(el) {
    return !isHidden(el);
}

// function for disabling start clicking buttons
// eslint-disable-next-line no-unused-vars
function disableSubmit() {
    console.log('disableSubmit is called');
    // eslint-disable-next-line no-undef
    dartDisableSubmit();
}

// eslint-disable-next-line no-unused-vars
function scrollToBottom() {
    console.log('scrolled to bottom');
    var pos = window.pageYOffset || document.documentElement.scrollTop;
    window.scrollTo(0, pos + 999999);
}

function autoClickCloseExit() {
    clickDivWithAreaLabel('Close');
    setTimeout(function () {
        clickDivWithAreaLabel('Exit');
    }, 1000);
}

// for automatically clicking close buttons when add button is clicked
// eslint-disable-next-line no-unused-vars
function autoClickClose() {
    try {
        autoClickCloseExit();
    }catch (e) {
        //
    }
}

function clickDivWithAreaLabel(labelName) {
    var clicked = false;
    var buttons = document.getElementsByTagName("div");
    for (var counter = 0, length = buttons.length; counter < length; counter++) {
        var target = buttons[counter];
        if (target) {
            var ariaLabel = target.getAttribute("aria-label");
            // console.log("ariaLabel is", ariaLabel);
            if (ariaLabel) {
                var text = ariaLabel.trim();
                if (text == labelName) {
                    target.click();
                    target.focus();
                    clicked = true;
                    target.remove();
                    break;
                }
            }
        }
    }
    if (clicked) {
        // eslint-disable-next-line no-undef
        // autoClickClose();
        // eslint-disable-next-line no-undef
        // autoClickAllExitButtons();
        return true;
    } else {
        return false;
    }
}

// for automatically clicking delete buttons
// eslint-disable-next-line no-unused-vars
function autoClickDelete() {
    var deleteButtonText = 'Delete';
    try {
        var btnList = document.getElementsByTagName('button');
        for (var index = 0, len = btnList.length; index < len; index++) {
            var elem = btnList[index];
            var elemText = elem.innerText.trim();
            //console.log(elemText);
            if (elemText == deleteButtonText) {
                elem.click();
            }
        }
        var btnList2 = document.getElementsByTagName('a');
        for (var index2 = 0, len2 = btnList2.length; index2 < len2; index2++) {
            var elem2 = btnList2[index2];
            var elemText2 = elem2.innerText.trim();
            //console.log(elemText);
            if (elemText2 == deleteButtonText) {
                elem2.click();
            }
        }
    } catch (e) {
        //
    }
}

// for automatically clicking delete buttons
// eslint-disable-next-line no-unused-vars
function autoClickAllExitButtons() {
    try {
        autoClickCloseExit();
    }catch (e) {
        //
    }
}

// eslint-disable-next-line no-unused-vars
function sleep(ms) {
    // eslint-disable-next-line no-undef
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

// eslint-disable-next-line no-unused-vars
function removeParentOfClassName(className, shouldNotContainClass) {
    var outgoingElem = document.getElementsByClassName(className);
    if (outgoingElem == null || outgoingElem.length == 0) {
        return;
    }
    var removedCount = 0;
    for (var index = 0, len = outgoingElem.length; index < len; index++) {
        if (outgoingElem[index] == null) {
            break;
        }
        if (shouldNotContainClass != null) {
            if (outgoingElem[index].className.match(new RegExp(shouldNotContainClass, 'ig'))) {
                console.log('not matched continuing with it');
                continue;
            } else {
                outgoingElem[index].parentElement.remove();
                removedCount++;
            }
        }
    }
    if (removedCount != 0) {
        removeParentOfClassName(className);
    }
}

// for automatically clicking confirm buttons when add button is clicked
// eslint-disable-next-line no-unused-vars
function autoClickConfirm() {
    if (!confirm) {
        return;
    }
    try {
        var btnList = document.getElementsByTagName('button');
        for (var index = 0, len = btnList.length; index < len; index++) {
            var elem = btnList[index];
            var elemText = elem.innerText.trim();
            // console.log(elemText);
            if (elemText == "Confirm") {
                elem.click();
                // var clicked=true;
            }
        }

        var btnList2 = document.getElementsByTagName('a');
        for (var index2 = 0, len2 = btnList2.length; index2 < len2; index2++) {
            var elem2 = btnList2[index2];
            var elemText2 = elem2.innerText.trim();
            // console.log(elemText);
            if (elemText2 == "Confirm") {
                elem2.click();
                // var clicked=true;
            }
        }
    } catch (e) {
        //
    }
    // auto click close button if not clicked already
    // if(!clicked){
    setTimeout(autoClickClose, 200);
    // }
}
