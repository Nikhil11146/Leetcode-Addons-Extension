// ==UserScript==
// @name         Leetcode Addons
// @namespace    http://tampermonkey.net/
// @version      2026-06-02
// @description  try to take over the world!
// @author       You
// @match        https://leetcode.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function createDialog(time, space, message) {
        // Overlay
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";

        // Modal
        const modal = document.createElement("div");
        modal.className = "modal";

        modal.innerHTML = `
        <div class="modal-header">
            <h2>Leetcode Complexity Analyzer</h2>
        </div>
        <div class="modal-body">
            <p>Time Complexity: ${time}</p>
            <p>Space Complexity: ${space}</p>
            <p>${message}</p>
        </div>
        <div class="modal-footer">
            <button class="close-btn">Close</button>
        </div>
    `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.querySelector(".close-btn").addEventListener("click", () => {
            overlay.remove();
        });

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    function createD(ques, days) {
        const d = document.createElement('div');

        d.id = 'questions-per-day';
        d.className = 'mr-4.5 space-x-1';

        d.innerHTML = `
        <span class="text-label-3 dark:text-dark-label-3">
            Questions/day:
        </span>
        <span class="font-medium text-label-2 dark:text-dark-label-2">
            ${(ques / days).toFixed(2)}
        </span>
    `;

        return d;
    }

    function addD() {
        if (document.getElementById('questions-per-day')) return true;

        const activeDaysLabel = [...document.querySelectorAll('span')]
            .find(el => el.textContent.includes('Total active days'));

        if (!activeDaysLabel) return false;

        const activeDays = parseInt(
            activeDaysLabel.nextElementSibling.textContent
        );

        const statsBar = activeDaysLabel.closest('div.flex.items-center.text-xs');

        console.log("statsBar:", statsBar);

        if (!statsBar) return false;

        console.log("activeDaysText:", activeDays);

        const solvedElement = [...document.querySelectorAll('span')]
            .find(el =>
                /^\d+$/.test(el.textContent) &&
                el.parentElement?.textContent.includes('/')
            );

        console.log("solvedElement:", solvedElement);

        const solved = parseInt(solvedElement.textContent);

        statsBar.prepend(
            createD(solved, activeDays)
        );

        return true;
    }


    const observer = new MutationObserver(() => {
        addD();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();