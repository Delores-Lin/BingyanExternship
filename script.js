const conversation = document.querySelector(".recentConversation");

const hideConversation = document.querySelector(".allConversation");

const hideArraw = document.querySelector(".arraw");
conversation.addEventListener("click", function () {
    if (hideConversation.style.display === "flex") {
        hideConversation.style.display = "none";
        hideArraw.src = "photos/arrawRight.png";
    }else {
        hideConversation.style.display = "flex";
        hideArraw.src = "photos/arrawDown.png";
    }
})