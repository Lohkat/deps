/* dark mode btn */
const darkModeButtons = Array.from(document.getElementsByClassName("toggle-dark-mode"));
function makeBodyDark() { 
    darkModeButtons.forEach(e => e.setAttribute("state", "black"));
    document.body.classList.add("dark-mode");
    localStorage.setItem("state-dark-mode", "black");
}
function makeBodyWhite() {
    darkModeButtons.forEach(e => e.setAttribute("state", "white"));
    document.body.classList.remove("dark-mode");
    localStorage.setItem("state-dark-mode", "white");
}
darkModeButtons.forEach(element => {
    element.addEventListener("click", () => {
        const state = element.getAttribute("state");
        if (state == "white") {
            makeBodyDark();
        } else {
            makeBodyWhite();
        }
    });
});
if (localStorage.getItem("state-dark-mode") === "black") { makeBodyDark(); }

/* go home btn */
const goHomeButtons = Array.from(document.getElementsByClassName("go-home"));
goHomeButtons.forEach(element => {
    element.addEventListener("click", () => {
        window.location.replace("/");
    });
});

const changeLanguage = Array.from(document.getElementsByClassName("change-lang"));
function refreshLanguageTexts() {
    const idiom = `translate-${localStorage.getItem("language") ?? "us"}`;

    Array.from(document.querySelectorAll(`[${idiom}]`)).forEach(el => {
        const new_text = el.getAttribute(idiom);
        el.textContent = new_text;
    });
}
changeLanguage.forEach(element => {
    element.addEventListener("click", () => {
        let state = localStorage.getItem("language");

        switch(state) {
        case "br":
            state = "us";
            break;
        case "us":
            state = "br";
            break;
        default:
            state = "us";
            break;
        }
        localStorage.setItem("language", state);
        element.setAttribute("state", state);
        
        refreshLanguageTexts();
    });
});
refreshLanguageTexts();

/* go home and dark mode hide on no mouse movement */
const handleUserInputShowButtons = () => {
    if (window.MouseMovementEventId)
        clearTimeout(window.MouseMovementEventId);

    const hideElements = [...goHomeButtons, ...darkModeButtons];
    hideElements.forEach(el => el.classList.remove("inactive"));

    window.MouseMovementEventId = setTimeout(() => {
        hideElements.forEach(el => el.classList.add("inactive"));
    }, 5000);
};
document.body.addEventListener("mousemove", handleUserInputShowButtons);
document.body.addEventListener("touchmove", handleUserInputShowButtons);
document.body.dispatchEvent(new MouseEvent('mousemove', {
  clientX: 0, // X coordinate relative to the viewport
  clientY: 0, // Y coordinate relative to the viewport
  bubbles: true, // Allows the event to bubble up the DOM tree
  cancelable: true // Allows the event to be canceled
}));

/* control bars (horizontal-bar) */
Array.from(document.querySelectorAll("[type=horizontal-bar]")).forEach(el => {
    function handleEvents(ev) {
        if (ev.buttons == 0 && ev.type != "mouseup") return -1;
        if (ev.type == "mouseleave") return -1;
        if (!ev.target) return -1;

        const dx = ev.clientX;
        let percx = (dx - ev.target.offsetLeft) / ev.target.offsetWidth;
        if (percx < 0) percx = 0;
        if (percx > 1) percx = 1;
        
        ev.target.style.background = 
            "linear-gradient(90deg, var(--sub-bg-color) " + (100 * (percx)) + "%, " +
            "var(--sub3-bg-color) " + (100 * (percx + 0.001)) + "%)";
        // background: linear-gradient(90deg, var(--sub2-bg-color) 50%, var(--sub-bg-color) 50.01%);

        ev.target.setAttribute("percentage", 100 * percx);
        if (ev.target.children.length > 0)
            ev.target.children[0].innerText = Math.round(percx * 100) + "%";
        
        if (ev.target.PercentageCallback)
            ev.target.PercentageCallback(percx);
    };
    el.addEventListener("mousemove", (e) => handleEvents(e));
    el.addEventListener("mousedown", (e) => handleEvents(e));
    el.addEventListener("mouseup",   (e) => handleEvents(e));
    el.addEventListener("mouseleave",(e) => handleEvents(e));
});

