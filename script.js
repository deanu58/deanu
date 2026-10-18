/* Small pop-up message in the corner */
function toast(text) {
    const old = document.querySelector(".toast");
    if (old) old.remove();

    const box = document.createElement("div");
    box.className = "toast";
    box.textContent = text;
    document.body.appendChild(box);

    setTimeout(function () { box.remove(); }, 3000);
}

/* Highlight the clicked menu link */
const links = document.querySelectorAll("nav a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        links.forEach(function (item) { item.classList.remove("active"); });
        this.classList.add("active");
    });
});

/* Logout button */
function logout() {
    toast("You have been logged out. See you soon! 👋");
}

/* Explore Dashboard button: scroll to the stats */
function showMessage() {
    document.getElementById("courses").scrollIntoView({ behavior: "smooth" });
    toast("Welcome! Check your courses, attendance and tasks. 🎓");
}

/* View All Tasks button: show or hide extra tasks */
let expanded = false;

function viewTasks() {
    const panel = document.getElementById("profile");
    const button = panel.querySelector(".view-btn");

    if (!expanded) {
        const extra = [["Database Quiz", "Database Management", "Oct 22"], ["Data Science Notes", "Data Science", "Oct 25"]];

        extra.forEach(function (t) {
            const row = document.createElement("div");
            row.className = "task extra";
            row.innerHTML = "<div><h3>" + t[0] + "</h3><p>" + t[1] + "</p></div><span class=\"deadline\">" + t[2] + "</span>";
            panel.insertBefore(row, button);
        });

        button.textContent = "Show Less";
    } else {
        panel.querySelectorAll(".extra").forEach(function (row) { row.remove(); });
        button.textContent = "View All Tasks";
    }

    expanded = !expanded;
}

/* Count up the numbers on the cards */
document.querySelectorAll(".card h2").forEach(function (el) {
    const to = parseInt(el.textContent, 10);
    if (isNaN(to)) return;

    const suffix = el.textContent.replace(String(to), "");
    const start = performance.now();

    function tick(now) {
        const p = Math.min((now - start) / 1200, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
});
