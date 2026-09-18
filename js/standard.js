/* dark mode btn */
Array.from(document.getElementsByClassName("toggle-dark-mode")).forEach(element => {
    element.addEventListener("click", () => {
        const state = element.getAttribute("state");
        if (state == "white") {
            element.setAttribute("state", "black");
            document.body.classList.add("dark-mode");
        } else {
            element.setAttribute("state", "white");
            document.body.classList.remove("dark-mode");
        }
    })
});