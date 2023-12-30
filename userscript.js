// ==UserScript==
// @name         Wanikani: Wake-up Bell
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Rings a bell when you've taken too long to answer
// @author       Jullace
// @match        https://www.wanikani.com/dashboard
// @match        https://www.wanikani.com/subjects/*
// @match        https://preview.wanikani.com/subjects/*

// @grant        none
// ==/UserScript==

;(async function ($, wkof) {
    let settings = {}
    let timeUntil
    var href = window.location.pathname


    // Script info
    const script_id = 'wakeup_bell'
    const script_name = 'Wake-up Bell'

    // Initiate WKOF
    await confirm_wkof()
    wkof.include('Settings,Menu')
    wkof.ready('Settings,Menu').then(load_settings).then(install_menu)

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

    // Load WKOF settings
    async function load_settings() {
        const defaults = {
            time: 15
        }
        settings = await wkof.Settings.load(script_id, defaults)
        return settings
    }

    // Installs the options button in the menu
    function install_menu() {
        const config = {
            name: script_id,
            submenu: 'Settings',
            title: script_name,
            on_click: open_settings,
        }
        wkof.Menu.insert_script_link(config)
    }

    // Opens settings dialogue when button is pressed
    function open_settings() {
        const config = {
            script_id,
            title: script_name,
            on_save: () => {},
            content: {
                bell: {
                    type: 'number',
                    default: 15,
                    label: 'Timer duration',
                    hover_tip: 'Duration until warning timer will ring (5 seconds minimum)',
                    min: 5
                },
            },
        }
        new wkof.Settings(config).open()
    }

    console.log('i am loaded')

    // Only run script on review or extra study pages
    if (href.includes('review') || href.includes('extra_study')) {
        console.log('script running')

        var countdown = 15
        setInterval(() => {
            if (countdown == 0) {
                console.log("times up.")
            }
            countdown -= 1
        }, 15 * 100)

        // Detect change in SRS
        window.addEventListener('didAnswerQuestion', (e) => {
            countdown = 10
        })
    }


})(window.jQuery, window.wkof)
