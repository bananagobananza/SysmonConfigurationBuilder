let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
    if (!sidebarOpen) {
        sidebar.classList.add('sidebar-responsive');
        sidebarOpen = true;
    }
}

function closeSidebar() {
    if (sidebarOpen) {
        sidebar.classList.remove('sidebar-responsive');
        sidebarOpen = false;
    }
}

function toggleSidebar() {
    document.querySelectorAll(".sidebar-list-item").forEach(item => {
        item.addEventListener("click", function () {
            const link = this.querySelector("a");
            if (link) {
                window.location.href = link.href;
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    toggleSidebar();
});


