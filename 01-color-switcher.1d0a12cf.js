!function(){var e,t=document.querySelector("[data-start]"),o=document.querySelector("[data-stop]"),n=document.querySelector("body");console.log(n),t.addEventListener("click",(function(){e=setInterval((function(){document.getElementsByTagName("body")[0].style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.disabled=!0,o.disabled=!1})),o.addEventListener("click",(function(){clearInterval(e),t.disabled=!1,o.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.1d0a12cf.js.map
