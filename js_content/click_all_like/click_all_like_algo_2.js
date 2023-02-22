// content script used by click like functionality

// eslint-disable-next-line no-unused-vars
async function clickNowAlgo2(enableScrolling, delayBeginRange, delayEndRange) {
    // eslint-disable-next-line no-undef
    // if (!isFacebookLanguageEnglish()) {
    //     // eslint-disable-next-line no-undef
    //     enableSubmit();
    //     return;
    // }
    console.log('clickNowAlgo2 called');
    console.log(enableScrolling, delayBeginRange, delayEndRange);

    var clickableElementList = [];

    var matchText = 'Like';

    // final function for clicking
    // eslint-disable-next-line no-unused-vars
    function genClickableElementList() {
        var buttons = document.getElementsByTagName('div');
        for (var counter = 0, length = buttons.length; counter < length; counter++) {
            var target = buttons[counter];
            if (target) {
                var ariaLabel = target.getAttribute("aria-label");
                // console.log("ariaLabel is", ariaLabel);
                if (ariaLabel) {
                    var text = ariaLabel.trim();
                    if (text == matchText) {
                        clickableElementList.push(target);
                        continue;
                    }
                }
            }
        }
    }

    async function clickElementList() {
        console.log('clickableElementList');
        console.log(clickableElementList);
        if (!clickableElementList || clickableElementList.length == 0) {
            // no button found it is not clicked
            var tmp2 = 'No "Like" buttons found for clicking.';
            toastr.error(tmp2);
            alert(tmp2);
            // eslint-disable-next-line no-undef
            enableSubmit();
            return;
        }
        for (var index = 0, len = clickableElementList.length; index < len; index++) {
            // eslint-disable-next-line no-undef
            disableSubmit();
            // eslint-disable-next-line no-undef
            autoClickClose();
            if (enableScrolling) {
                // eslint-disable-next-line no-undef
                scrollToBottom();
            }
            var element=clickableElementList[index];
            element.click();
            element.focus();
            element.remove();
            var tmp = '"Like" button is clicked.';
            toastr.success(tmp);
            // eslint-disable-next-line no-undef
            autoClickClose();
            // eslint-disable-next-line no-undef
            await sleep(getDelayInMSUsingInterval(delayBeginRange, delayEndRange));
        }
    }

    genClickableElementList();
    await clickElementList();
}

