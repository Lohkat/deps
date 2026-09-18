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