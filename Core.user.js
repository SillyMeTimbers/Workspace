// ==UserScript==
// @name         [Experimental] Code Handler
// @namespace    http://tampermonkey.net/
// @author       You
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uhaul.net
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    const UpdateVal = 1;
    const now = new Date();
    const minutes = Math.floor(now.getMinutes() / UpdateVal) * UpdateVal;
    const timeString = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getHours() + ':' + minutes;

    let url;
    const hostname = window.location.hostname;

    if (hostname === 'amt.uhaul.net') {
        url = "https://raw.githubusercontent.com/SillyMeTimbers/WorkspaceAMT/Experimental/Core.user.js?time=" + timeString;
    } else if (hostname === 'vceccefinlpa002.amerco.net') {
        url = "https://raw.githubusercontent.com/SillyMeTimbers/WorkspaceCisco/main/Core.user.js?time=" + timeString;
    } else {
        // You can add a fallback URL or do nothing.
    }

    if (url) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response) {
                const script = document.createElement('script');
                script.textContent = response.responseText;
                document.head.appendChild(script);
            }
        });
    }
})();
