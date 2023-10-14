// ==UserScript==
// @name         [Experimental] Code Handler
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uhaul.net
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    const UpdateVal = 1;
    const now = new Date();
    const minutes = Math.floor(now.getMinutes() / UpdateVal) * UpdateVal;
    const timeString = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getHours() + ':' + minutes;

    // Modify the object with the correct website names and scripts.
    const Redirects = {
        "amt.uhaul.net": ["WorkspaceAMT/Experimental/Core"],
        "vceccefinlpa002.amerco.net": ["WorkspaceCisco/main/Core"],
        "ubox.uhaul.net": ["WorkspaceUbox/main/Core"],
    };

    const hostname = window.location.hostname;
    const websiteRedirects = Redirects[hostname];

    if (websiteRedirects) {
        for (const redirect of websiteRedirects) {
            const githubURL = `https://raw.githubusercontent.com/SillyMeTimbers/${redirect}.user.js?time=${timeString}`;

            try {
                const response = await fetch(githubURL);

                if (response.ok) {
                    const scriptText = await response.text();
                    const script = document.createElement('script');
                    script.textContent = scriptText;
                    document.head.appendChild(script);
                } else {
                    console.log(`Failed to fetch script: ${redirect}`);
                }
            } catch (error) {
                console.log(`An error occurred while fetching script: ${redirect}`);
                console.error(error);
            }
        }
    }
})();
