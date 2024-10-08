
// 实现最近对话的收起和展开
const conversation = document.querySelector(".recentConversation");

const hideConversation = document.querySelector(".allConversation");

const hideArraw = document.querySelector(".arraw");

const menu1 = document.querySelector(".menu1 div");

conversation.addEventListener("click", function () {
    if (hideConversation.style.display === "flex") {
        hideConversation.style.display = "none";
        hideArraw.src = "photos/arrawRight.png";
        menu1.style.display = "block";
    }else {
        hideConversation.style.display = "flex";
        hideArraw.src = "photos/arrawDown.png";
        menu1.style.display = "none";
    }
})

//实现资助计划的删除
const deleteAd = document.querySelector(".cancel");

const ad = document.querySelector(".ad");

deleteAd.addEventListener("click", function () {
    ad.style.display = "none";
})
    
//发送按钮样式变化
const send = document.querySelector(".send");

const input = document.querySelector(".input");

input.addEventListener("input", function () {
    if (input.value.trim() !== "") {
        send.disabled = false;
        send.add("enabled");
    } else {
        send.disabled = true;
    }
})

// 登录与注册页面的打开与关闭
const openLogin = document.querySelector(".userName");

const loginAndSignup = document.querySelector(".loginAndSignup");

const closeLogin = document.querySelector(".closeLogin");
const closeSignup = document.querySelector(".closeSignup");

closeLogin.addEventListener("click", function () {
    loginAndSignup.style.display = "none";
})
closeSignup.addEventListener("click", function () {
    loginAndSignup.style.display = "none";
})

openLogin.addEventListener("click", function () {
    loginAndSignup.style.display = "flex";
})

//按钮的点击效果

//注册登录界面切换
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");

const switchSignup = document.querySelector("#signup");
const switchLogin = document.querySelector("#login");

switchSignup.addEventListener("click", function () {
    login.style.display = "none";
    signup.style.display = "flex";
})
switchLogin.addEventListener("click", function () {
    login.style.display = "flex";
    signup.style.display = "none";
})


//登录注册邮箱验证
const checkmail = function (email,error) {
    const inputMail = document.querySelector(email);
    const theError = document.querySelector(error);
    inputMail.onblur = function () {
        if (!inputMail.value.includes("@")) {
            inputMail.classList.add("invalid");
            inputMail.style.border = "1px solid red";
            theError.innerHTML = "*请输入正确的邮箱";
        }
    };
    inputMail.onfocus = function () {
        if (this.classList.contains("invalid")) {
            this.style.border = "none";
            inputMail.classList.remove("invalid");
            theError.innerHTML = "";
        }
    };
}
checkmail(".loginEmail","#loginError");
checkmail(".signupEmail", "#signupError");

//登录与注册按钮验证
const checkButton = function (selectButton,selectEmail,selectPassword) {
    const button = document.querySelector(selectButton);
    const email = document.querySelector(selectEmail);
    const password = document.querySelector(selectPassword);
    password.addEventListener("input", function () {
    if (email.value.includes("@") && password.value.trim() !== "") {
        button.disabled = false;
        button.add("enabled");
    } else {
        button.disabled = true;
        }
        });
}
checkButton(".loginBtn", ".loginEmail", ".loginPassword");
checkButton(".signupBtn", ".signupEmail", ".signupPassword");

//实现注册
const signupBtn = document.querySelector(".signupBtn");
signupBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.querySelector(".username").value;
    const signupEmail = document.querySelector(".signupEmail").value;
    const signupPassword = document.querySelector(".signupPassword").value;
    const getUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = getUsers.find(user => user.email === signupEmail);
    if (user) {
        alert("该邮箱已被注册!");
        return;
    }else{
    const newUser = {
        username: username,
        email: signupEmail,
        password: signupPassword
    };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("注册成功!");
        window.location.href = "fakeAI.html";
    }
});
//实现登录
const loginBtn = document.querySelector(".loginBtn");
loginBtn.addEventListener("click", function (event) {
    event.preventDefault();
const getUsers = JSON.parse(localStorage.getItem("users")) || [];
const loginEmail = document.querySelector(".loginEmail").value;
    const loginPassword = document.querySelector(".loginPassword").value;
    const wrong = document.querySelector(".wrong");
    const userName = document.querySelector(".userName");
    const loginAndSignup = document.querySelector(".loginAndSignup");
const user = getUsers.find(user => user.email === loginEmail && user.password === loginPassword);
if (user) {
    alert("登录成功!");
    userName.innerHTML = user.username;
    loginAndSignup.style.display = "none";
    localStorage.setItem("isLoggedIn","true")
} else {
    wrong.innerHTML = "*邮箱或密码错误";
    }
});

const logged = localStorage.getItem("isLoggedIn");
const userImg = document.querySelector(".userImg");
const loggedout = document.querySelector("nav ul li:nth-child(n+2)");
if (logged === "true") {
}

// 实现聊天页面的发送消息
const chatWindow = document.querySelector(".chatWindow");
const messageInput = document.querySelector(".input");
const sendBtn = document.querySelector(".send");
const apikey ="pat_JnNMsEt95DVXH2n8keT76tP6IDh83sLPTGiSQYVv2MjrHFlce7yPzpxcvdPG1v6d";

//发起对话
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", function (send) {
    if (send.key === "Enter") {
        sendMessage();
    }
});
function displayMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message.content;
    chatWindow.appendChild(messageDiv);
}
async function sendMessage() {
    const message = messageInput.value.trim();
    if (message === "") {
        return;
    } else {
        const userMessage = {
            "role": "user",
            "content":message,
            "content_type": "text"
        };
        displayMessage(userMessage);
        chatHistory.push(userMessage);
        saveChatHistory();
        messageInput.value = "";
        sendBtn.disabled = true;
        try {
            async function newChat() {
                const response = await fetch("https://api.coze.cn/v3/chat", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${apikey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "bot_id": "7423349399562158116",
                        "user_id": "257",
                        "stream": false,
                        "auto_save_history": true,
                        "additional_message": [userMessage]
                    })
                });
                let data = await response.json();
                console.log(data.data.status);
                console.log(data.code);
                console.log(data.data.status);
                async function pollStatus() {
                    const poll = await fetch(`https://api.coze.cn/v3/chat/retrieve?chat_id=${data.data.id}&conversation_id=${data.data.conversation_id}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${apikey}`,
                            "Content-Type": "application/json",
                        },
                    });
                    const pollData = await poll.json();
                    console.log("poll data", pollData);
                    console.log(pollData.data.status);
                    if (pollData.data.status === "completed") {
                        fetchResponse(pollData.data.conversation_id, pollData.data.id);
                    } else {
                        setTimeout(pollStatus, 3000);
                    }
                }
                // pollStatus();
                async function fetchResponse(conversation_id, id) {
                    const getResponse = await fetch(`https://api.coze.cn/v3/chat/message/list?chat_id=${id}&conversation_id=${conversation_id}`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${apikey}`,
                            "Content-Type": "application/json",
                        },
                    });
                    console.log(data.data.conversation_id);
                    const response = await getResponse.json();
                    console.log(response.code);
                    console.log(response.data);
                }
            }
            newChat();
        } catch (error) {
            console.error("出现错误：", error);
        }
    }
}

// async function fetchGPTResponse(prompt) {
//     const response = await fetch(" https://api.coze.cn/v3/chat", {
//         method: "POST",
//         headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${apikey}`,
//         },
//         body:JSON.stringify({
//             bot_id: "7423071031990157362",
//             user_id: "123456",
//         enterMessage: [{ role: "user", content: prompt }],
//         }),
//     });
//     const back = await response.json();
//     return back.data.message;
// }

//     try {
//         const gptResponse = await fetchGPTResponse(message);
//         const gptMessage = {
//         sender: "ChatGPT",
//         text: aiResponse,
//         };
//         chatHistory.push(botMessage);
//         displayMessage(gptMessage);
//         saveChatHistory();
//     } catch (error) {
//         console.error("出现错误：", error);
//     }
//     }
// }
let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
window.onload = function () {
    loadChatHistory();
}
function loadChatHistory() {
    chatHistory.forEach(message => {
        displayMessage(message);
    });
}
function saveChatHistory() {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}