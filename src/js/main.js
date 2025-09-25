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