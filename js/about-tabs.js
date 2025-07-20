function showTab(tabName) {
    // Get all tab content elements and hide them
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });

    // Get all tab button elements and remove the active class
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active-tab');
    });

    // Show the selected tab content and mark the button as active
    document.getElementById(tabName + '-content').classList.remove('hidden');
    document.getElementById(tabName + '-tab').classList.add('active-tab');
}

// Set the initial active tab on page load
document.addEventListener('DOMContentLoaded', () => {
    showTab('experience');
});
