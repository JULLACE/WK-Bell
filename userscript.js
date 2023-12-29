// ==UserScript==
// @name         Wanikani: Wake-up Bell
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Rings a bell when you've taken too long to answer
// @author       Jullace
// @match        https://www.wanikani.com/*
// @match        https://preview.wanikani.com/*
// @grant        none
// ==/UserScript==

;(async function ($, wkof) {

    // Initiate WKOF
    await confirm_wkof()
    wkof.include('Menu,Settings')
    wkof.ready('Settings,Menu,Apiv2')

    // Makes sure that WKOF is installed
    async function confirm_wkof() {
        if (!wkof) {
            let response = confirm(
                `requires WaniKani Open Framework.\nClick "OK" to be forwarded to installation instructions.`,
            )
            if (response) {
                window.location.href =
                    'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549'
            }
        }
    }

    console.log("I am loaded")

    var countdown = 10;
    var setTime = 10;

    var timer = setInterval(function(){
        if (countdown <= 0) {
            console.log("times up.");
        }

        countdown -= 1;
    }, setTime * 100);

    // Detect change in SRS
    window.addEventListener('didAnswerQuestion', (e) => {
        countdown = 10;
    })


})(window.jQuery, window.wkof)
