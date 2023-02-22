// eslint-disable-next-line no-unused-vars
function clickNowAlgo1(enableScrolling, delayBeginRange, delayEndRange) {
    // eslint-disable-next-line no-undef
    // if (!isFacebookLanguageEnglish()) {
    //     // eslint-disable-next-line no-undef
    //     enableSubmit();
    //     return;
    // }
    console.log('clickNowAlgo1 called');
    console.log(enableScrolling, delayBeginRange, delayEndRange);

    var matchText = 'Confirm';

    // final function for clicking
    function acceptSingleClickFinal() {
        var clicked = false;
        var buttons = document.getElementsByTagName("div");
        for (var counter = 0, length = buttons.length; counter < length; counter++) {
            var target = buttons[counter];
            if (target) {
                var ariaLabel = target.getAttribute("aria-label");
                // console.log("ariaLabel is", ariaLabel);
                if (ariaLabel) {
                    var text = ariaLabel.trim();
                    if (text === matchText) {
                        target.click();
                        // target.focus();
                        clicked = true;
                        target.remove();
                        break;
                    }
                }
            }
        }
        if (clicked) {
            return true;
        } else {
            return false;
        }
    }

    // todo: fix
    // for removing invisible add friend buttons from screen
    function removeUnnecessary() {
        $("#fbRequestsFlyout").remove();
        $("#fbRequestsJewel").remove();
    }

    function acceptAllFRequestsFinal() {
        // eslint-disable-next-line no-undef
        disableSubmit();
        if (acceptSingleClickFinal()) {
            // eslint-disable-next-line no-undef
            autoClickClose();
            // some button found and it is clicked
            setTimeout(function () {
                acceptAllFRequestsFinal();
                // eslint-disable-next-line no-undef
            }, getDelayInMSUsingInterval(delayBeginRange, delayEndRange));
            var tmp = '"Confirm" button is clicked.';
            toastr.success(tmp);
            if (enableScrolling) {
                // eslint-disable-next-line no-undef
                scrollToBottom();
            }
        } else {
            // no button found it is not clicked
            var tmp2 = 'No "Confirm" buttons found for clicking.';
            toastr.error(tmp2);
            alert(tmp2);
            // eslint-disable-next-line no-undef
            enableSubmit();
        }
    }

    removeUnnecessary();
    // eslint-disable-next-line no-undef
    disableSubmit();
    acceptAllFRequestsFinal();
}