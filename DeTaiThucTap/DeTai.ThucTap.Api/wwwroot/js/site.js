// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const { pathname } = location
const ControllerName = pathname.split('/')[2];
if (ControllerName) {
    const regex = new RegExp(`(\\W|^|\\\\)(${ControllerName})(\\W|\$)`,'gi');
    const itemLis = document.querySelectorAll('.sidebar-wrapper  li')
    itemLis.forEach(item => {
        const href = item.querySelector('a').getAttribute('href')
        if (regex.test(href)) {
            item.classList.add("active")
        }
        console.log(href, ControllerName)
    })
}
