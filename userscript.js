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
    wkof.ready('Settings,Menu')

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
})(window.jQuery, window.wkof)
