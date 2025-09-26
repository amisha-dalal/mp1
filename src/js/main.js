/* Your JS here. */

//Carousel Scroll Button implementation -- consulted ChatGPT for this part, as seen in llm_logs
const list = document.getElementById("carousel-list");
const style = window.getComputedStyle(list);
const gap = parseInt(style.columnGap || style.gap) || 0;

const itemWidth = list.querySelector(".carousel-list-item").offsetWidth + gap;

document.querySelector(".carousel-btn.left").onclick = () => {
    list.scrollBy({left: -itemWidth, behavior: "smooth"});
};
document.querySelector(".carousel-btn.right").onclick = () => {
    list.scrollBy({left: itemWidth, behavior: "smooth"});
};

//Modal Image implementation -- referenced https://www.w3schools.com/howto/howto_css_modal_images.asp
//in the example they only had one image
//need to re-work this so it can apply to all "modal-img"

//first get the relevant elements
var modal = document.getElementById("myModal");
var img_ = document.getElementById("img_");
var caption = document.getElementById("caption");

//get all images under class modal-img
var images = document.querySelectorAll(".modal-img");

//now make an event that applies to all of the images if you click on it
//should be passing in to the function an img
images.forEach(function(img) {
    img.addEventListener("click", function() {
        //when you click, display the modal (initially set to display none)
        modal.style.display="flex";
        //make the image displayed the one we clicked on
        img_.src = this.src;
        //set the caption to be what we wrote in the alt description for the image
        caption.innerHTML = this.alt;
    })
})

//lastly need to set the display back to none when close (x "button") is clicked
var close = document.getElementById("close");
close.onclick = function () {
    modal.style.display = "none";
}

//Resizing navbar on scroll -- referenced https://www.w3schools.com/howto/howto_js_navbar_shrink_scroll.asp
window.addEventListener("scroll", navbarScrollFunction);
//window.onscroll = function() {navbarScrollFunction()};
function navbarScrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("navbar").style.padding = "10px 40px";
        //also want to make the text smaller
        document.getElementById("navbar").style.fontSize = "12px";
    } else {
        //we want to restore back to the original size if we are back at the top
        document.getElementById("navbar").style.padding = "15px 40px";
        document.getElementById("navbar").style.fontSize = "18px";
    }
}

//implementing smooth scrolling from navbar -- referenced https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
//need to account for adding an offset because of sticky navbar
//also used this for reference -- https://stackoverflow.com/questions/49820013/javascript-scrollintoview-smooth-scroll-and-offset

//get all elements that are links in the navbar (classified as navlink)
var navlinks = document.querySelectorAll(".navlink");

//for all of the navlinks, see if it got clicked
navlinks.forEach(function(a) {
    a.addEventListener("click", function(e) {
        //first need to make sure to block default event (jumps to part without smooth scrolling & offset)
        e.preventDefault();
        //now need to figure out which section we need to jump to
        //figured out I could use getAttribute("href") to get access to this
        //each section has unique id
        var targetId = a.getAttribute("href");
        //need to do substring(1) because first character of the targetId will be "#"
        var targetSection = document.getElementById(targetId.substring(1));

        if (targetSection) {
            //now we want to figure out the offset from the header/navbar
            //and also the position of the section (right now top part covered by header)
            var navbar = document.getElementById("navbar");
            var navOffset = navbar.clientHeight;
            var sectionPosition = targetSection.getBoundingClientRect().top;
            //now we can calculate the target position (accounting for navbar offset)
            var targetPosition = sectionPosition + window.pageYOffset - navOffset;

            //now we can actually scroll to this target position
            window.scrollTo({
                top: targetPosition, behavior: "smooth"
            });

            //now we need to update the url hash to where we are
            window.location.hash = targetId;
        }
    });
});

//lastly need to implement the position indicator
//right now intro section set as default active
//when we scroll, want to be watching to see if we are at a different section
//if so, set that section link on navbar to active
//and make sure all others are not active
//can use similar method from resizing navbar?
//document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 -- something like that
//but instead of 50 it would be the position of the section
window.addEventListener("scroll", positionIndicator);
//window.onscroll = function() {positionIndicator()};
function positionIndicator() {
    //need the different sections
    var sections = document.querySelectorAll("section");
    //also need the navlinks
    var navlinks = document.querySelectorAll(".navlink");
    //also need the navbar itself
    var navbar = document.getElementById("navbar");

    //need to figure out which section is right below bottom margin of navbar
    //navbar is always on top
    //so bottom of navbar would be its offsetHeight
    var navbarBottom = navbar.offsetHeight;
    //window.scrollY is the amount the user has scrolled down
    var scrollY = window.scrollY;
    //so go through the sections and check to see if we are in it ? and also update active ?
    //by default, want it to be the top section
    var currSectionId = sections[0].id;
    sections.forEach(function(section) {
        var sectionTop = section.offsetTop;
        if (scrollY + navbarBottom >= sectionTop) {
            currSectionId = section.id;
        }
    });
    //now that we know which section we are in, we can update the navbar links
    //actually before that, there is potential that we are at the bottom of the page
    //meaning last section should be active 
    //(basically have dance be active even though we can still see bottom of favorites section)
    //not sure why but wasn't working until i added the -1? played around with it
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
        currSectionId = sections[sections.length - 1].id;
    }


    navlinks.forEach(function(a) {
        //at first just remove active from all of them
        a.classList.remove("active");
        //then for the current section, make that one active
        if (a.getAttribute("href").substring(1) == currSectionId) {
            a.classList.add("active");
        }
    });

}