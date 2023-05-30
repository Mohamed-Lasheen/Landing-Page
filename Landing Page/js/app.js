/* Variables that will be needed
to add the navigation links and sections of the page */
let navigationLinks = [];
let pageSection = document.querySelectorAll('section');

/**
@description Creates and adds elements to the navigation bar
*/
(function Main() {

    // Getting the top navigation bar and its elements
    let navElem = document.getElementById('Top_Navigation');
    let navList = document.getElementById('Top_Navigation_List');
    let navItem, navLink;

    navElem.appendChild(navList);
    // Creating list and anchor elements for each navigation item
    for (let i = 0; i < pageSection.length; i++) {
        navItem = document.createElement('li');
        navLink = document.createElement('a');

        // Setting the properties for the anchor
        navLink.id = pageSection[i].id;
        navLink.innerHTML = pageSection[i].id.replaceAll('_', ' ');
        navLink.href = '#' + pageSection[i].id;
        navigationLinks[i] = navLink;

        /* Adding anchor to the list item,
        and then the list item to the list itself*/
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    }

    // Adding navigation bar to body
    document.body.appendChild(navElem);

}());


/**
@description Removes the active class from all navigation links and sections
*/
function RemoveActiveFromAll() {
    for (let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].classList.remove('active');
        pageSection[i].classList.remove('active');
    }
}

/**
@description Highlights the active section of the page and navigation item
*/
window.addEventListener('scroll', () => {
    for (let i = 0; i < pageSection.length; i++) {
        // Calculating the section top for when the scrollbar is near it
        const sectionTop = (pageSection[i].getBoundingClientRect().top +
            window.pageYOffset) - 230;
        const sectionHeight = pageSection[i].offsetHeight;
        // Condition to change which section should be highlighted
        if (window.pageYOffset > sectionTop &&
            window.pageYOffset <= (sectionTop + sectionHeight)) {
            RemoveActiveFromAll();
            navigationLinks[i].classList.add('active');
            pageSection[i].classList.add('active');
        }
    }
});

/**
@description Makes the scrolling to a section smoother
*/
function clickOnNavigationLinks(e) {
    e.preventDefault();
    const href = this.getAttribute('href');

    document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
    });
}

// Adding a click listener to the navigation menu items
for (const navigationItem of navigationLinks) {
    navigationItem.addEventListener('click', clickOnNavigationLinks);
}
