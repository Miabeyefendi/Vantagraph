// Vantagraph Theme JS
// Features: waitForElement utility, scroll fade, progress tooltip, version detection, sidebar observer
// Based on Dribbblish's proven approach, adapted for Vantagraph

function waitForElement(els, func, timeout = 100) {
    const queries = els.map(el => document.querySelector(el));
    if (queries.every(a => a)) {
        func(queries);
    } else if (timeout > 0) {
        setTimeout(waitForElement, 300, els, func, --timeout);
    }
}

// Scroll fade effect for sidebar playlist list
waitForElement([".main-navBar-mainNav .os-viewport"], ([scrollNode]) => {
    scrollNode.setAttribute("fade", "bottom");
    scrollNode.addEventListener("scroll", () => {
        if (scrollNode.scrollTop === 0) {
            scrollNode.setAttribute("fade", "bottom");
        } else if (scrollNode.scrollHeight - scrollNode.clientHeight - scrollNode.scrollTop === 0) {
            scrollNode.setAttribute("fade", "top");
        } else {
            scrollNode.setAttribute("fade", "full");
        }
    });
});

// Adjust topbar margin with left sidebar width
waitForElement([".Root__nav-bar, #Desktop_LeftSidebar_Id"], ([resizer]) => {
    function updateVariable() {
        const computedStyle = getComputedStyle(resizer);
        const value = Number(computedStyle.getPropertyValue("--left-sidebar-width").trim()) || resizer.clientWidth;
        waitForElement([".Root__globalNav"], ([globalNav]) => {
            globalNav.style.setProperty("--left-sidebar-width", value);
        });
    }
    const observer = new ResizeObserver(updateVariable);
    observer.observe(resizer);
    updateVariable();
});

// Version detection + dynamic progress tooltip
(function Vantagraph() {
    const progBar = document.querySelector(".playback-bar");

    if (!Spicetify.Player.origin || !progBar) {
        setTimeout(Vantagraph, 300);
        return;
    }

    const version = Spicetify.Platform.PlatformData.event_sender_context_information.client_version_int;

    // Version format: MAJOR * 100000000 + MINOR * 1000000 + PATCH * 10000
    // 121400000 = Spotify 1.2.14 which introduced the new YLX layout
    if (version >= 121400000) {
        document.documentElement.classList.add("vg-ylx");
    }

    // Dynamic progress tooltip
    const tooltip = document.createElement("div");
    tooltip.className = "vg-prog-tooltip";
    progBar.append(tooltip);

    function updateProgTime({ data: e }) {
        const maxWidth = progBar.offsetWidth;
        const curWidth = Spicetify.Player.getProgressPercent() * maxWidth;
        const ttWidth = tooltip.offsetWidth / 2;
        const edgePadding = 12;
        if (curWidth < ttWidth + edgePadding) {
            tooltip.style.left = edgePadding + "px";
        } else if (curWidth > maxWidth - ttWidth - edgePadding) {
            tooltip.style.left = String(maxWidth - ttWidth * 2 - edgePadding) + "px";
        } else {
            tooltip.style.left = String(curWidth - ttWidth) + "px";
        }
        tooltip.innerText =
            Spicetify.Player.formatTime(e) +
            " / " +
            Spicetify.Player.formatTime(Spicetify.Player.getDuration());
    }

    Spicetify.Player.addEventListener("onprogress", updateProgTime);
    updateProgTime({ data: Spicetify.Player.getProgress() });
})();
