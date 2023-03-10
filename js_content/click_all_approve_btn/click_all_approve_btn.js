var approveButtonText = 'Approve';

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

    var matchText = 'Approve';

    //
    //
    //  For clicking using algorithm 1 start
    //
    //
    // final function for clicking
    function startClickAlgo1ButtonFinal() {
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

    // final function for clicking
    function startClickAlgo1AnchorFinal() {
        var clicked = false;
        var buttons = document.getElementsByTagName("button");
        for (var counter = 0; counter < buttons.length; counter++) {
            var target = buttons[counter];
            var text = target.innerText.trim();
            if (text == approveButtonText) {
                target.click();
                //target.focus();
                clicked = true;
                target.remove();
                break;
            }
        }
        if (clicked) {
            return true;
        } else {
            return startClickAlgo1ButtonFinal();
        }
    }

    function startClickAlgo1() {
        if (enableScrolling) {
            // eslint-disable-next-line no-undef
            scrollToBottom();
        }
        // eslint-disable-next-line no-undef
        disableSubmit();
        if (startClickAlgo1AnchorFinal()) {
            // eslint-disable-next-line no-undef
            autoClickClose();
            toastr.success('"Approve" button is clicked.');
            // some button found and it is clicked
            setTimeout(function () {
                startClickAlgo1();
                // eslint-disable-next-line no-undef
            }, getDelayInMSUsingInterval(delayBeginRange, delayEndRange));
        } else {
            // no button found it is not clicked
            var tmp2 = 'No "Approve" buttons found for clicking.';
            toastr.error(tmp2);
            alert(tmp2);
            // eslint-disable-next-line no-undef
            enableSubmit();
        }
    }

    // eslint-disable-next-line no-undef
    disableSubmit();
    startClickAlgo1();
}
