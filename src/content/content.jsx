/* global document */

import React from "react";
import ReactDOM from "react-dom";
import ext from "../utils/ext";

const startAutobook = () => {
    var script = document.createElement("script");
    script.textContent = `
        var count = document.querySelector(".summary-text").innerText;

        console.log("~~~~~~~~~~~ count", count);

        var oldXHROpen = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function(
            method,
            url,
            async,
            user,
            password
        ) {
            this.addEventListener("load", function() {
                console.log("~~~~~~~~~~~", url);
                if (url.startsWith("/api/tours/loadboard")) {
                    if (
                        count ===
                        document.querySelector(".summary-text").innerText
                    ) {
                        document.querySelector('.fa.fa-refresh.reload-icon').click();
                    } else {
                        count = document.querySelector(".summary-text")
                            .innerText;
                        registerBookClicks();
                    }
                }
            });

            return oldXHROpen.apply(this, arguments);
        };

        function registerBookClicks() {
            var bookBtns = document.querySelectorAll(
                ".tour-header__accept-button--loadboard button.btn"
            );
            bookBtns[0].click();
            setTimeout(()=>{
                const confirmBtn = document.querySelector(
                    "button.confirmation-body__footer__confirm-button"
                );
                confirmBtn.click();
                document.querySelector('.fa.fa-refresh.reload-icon').click();
            }, 100);
        }
        `;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
    document.querySelector(".fa.fa-refresh.reload-icon").click();
};

const Main = () => {
    startAutobook();
    return <></>;
};

const documentReady = () => {
    // good to go!
    console.log("~~~~~~~~ ready");
    const loadBoard = document.querySelector("div.loadboard-reload");
    loadBoard.setAttribute("style", "display: flex;align-items: center;");
    const app = document.createElement("div");
    app.id = "my-extension-root";
    loadBoard.insertBefore(app, loadBoard.childNodes[0]);
    ReactDOM.render(<Main />, app);
};

// Polling for the sake of my intern tests
var interval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(interval);
        documentReady();
    }
}, 100);
