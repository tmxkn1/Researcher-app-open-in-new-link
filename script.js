// ==UserScript==
// @name         Researcher-app open article in new tab
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.researcher-app.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=researcher-app.com
// @grant        none
// ==/UserScript==

function addPaperLink(node) {
    const paperId = node.getAttribute('x-track-detail').split(':')[1].split('}')[0];
    node.firstChild.innerHTML += `<a href="${'/paper/' + paperId}" target="_blank" class="${node.firstChild.firstChild.getAttribute('class')}">open article in new tab</a>`
}

(function() {
    'use strict';
    const docMutationCallback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    try {
                        if (node.getAttribute('x-track-id') === 'paper' && document.location.href.endsWith('feed/all')) {
                            addPaperLink(node);
                        }
                    } catch (err) {
                        if (err.name == 'TypeError') {
                            continue;
                        }
                    }
                }
            }
        }
    }
    const docMutationObserver = new MutationObserver(docMutationCallback);
    docMutationObserver.observe(document, { attributes: false, childList: true, subtree: true});
})();
