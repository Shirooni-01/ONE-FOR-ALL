// ==========================================
// DOM ELEMENTS
// ==========================================

const chatBox = document.getElementById("chatBox");

const userInput = document.getElementById("userInput");

const sendBtn = document.getElementById("sendBtn");

const typingIndicator = document.getElementById("typingIndicator");

const clearBtn = document.getElementById("clearChatBtn");

const newChatBtn = document.getElementById("newChatBtn");

const toast = document.getElementById("toast");



// ==========================================
// TOAST
// ==========================================

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}



// ==========================================
// APPEND MESSAGE
// ==========================================

function addMessage(text,type){

    const message = document.createElement("div");

    message.className = `message ${type}`;

    const icon =

        type==="user"

        ? "fa-user"

        : "fa-robot";

    message.innerHTML = `

        <div class="avatar">

            <i class="fa-solid ${icon}"></i>

        </div>

        <div class="bubble">

            ${text.replace(/\n/g,"<br>")}

        </div>

    `;

    chatBox.insertBefore(

        message,

        typingIndicator

    );

    chatBox.scrollTop = chatBox.scrollHeight;

}



// ==========================================
// SEND MESSAGE
// ==========================================

async function sendMessage(){

    const message = userInput.value.trim();

    if(message===""){

        return;

    }

    addMessage(message,"user");

    userInput.value="";

    userInput.style.height="55px";

    typingIndicator.style.display="flex";

    chatBox.scrollTop=chatBox.scrollHeight;

    sendBtn.disabled=true;

    sendBtn.classList.add("loading");

    try{

        const response = await fetch("/chat",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                user_input:message

            })

        });

        const data = await response.json();

        typingIndicator.style.display="none";

        addMessage(data.response,"ai");

    }

    catch(error){

        typingIndicator.style.display="none";

        addMessage(

            "❌ Unable to connect to AI.",

            "ai"

        );

    }

    sendBtn.disabled=false;

    sendBtn.classList.remove("loading");

}



// ==========================================
// SEND BUTTON
// ==========================================

sendBtn.addEventListener(

    "click",

    sendMessage

);



// ==========================================
// ENTER KEY
// Shift+Enter = New Line
// ==========================================

userInput.addEventListener(

    "keydown",

    function(e){

        if(

            e.key==="Enter"

            &&

            !e.shiftKey

        ){

            e.preventDefault();

            sendMessage();

        }

    }

);



// ==========================================
// AUTO HEIGHT
// ==========================================

userInput.addEventListener(

    "input",

    ()=>{

        userInput.style.height="55px";

        userInput.style.height=

        userInput.scrollHeight+"px";

    }

);



// ==========================================
// CLEAR CHAT
// ==========================================

clearBtn.addEventListener(

    "click",

    ()=>{

        chatBox.innerHTML="";

        chatBox.appendChild(

            typingIndicator

        );

        showToast("Chat Cleared");

    }

);



// ==========================================
// NEW CHAT
// ==========================================

newChatBtn.addEventListener(

    "click",

    ()=>{

        chatBox.innerHTML="";

        chatBox.appendChild(

            typingIndicator

        );

        addMessage(

            "👋 New conversation started.",

            "ai"

        );

        showToast("New Chat");

    }

);



// ==========================================
// COPY AI MESSAGE
// Double Click Bubble
// ==========================================

chatBox.addEventListener(

    "dblclick",

    function(e){

        const bubble =

        e.target.closest(".bubble");

        if(!bubble) return;

        navigator.clipboard.writeText(

            bubble.innerText

        );

        showToast("Copied");

    }

);



// ==========================================
// RIPPLE EFFECT
// ==========================================

document.querySelectorAll("button")

.forEach(btn=>{

    btn.addEventListener(

        "click",

        function(e){

            const circle=

            document.createElement("span");

            const d=Math.max(

                this.clientWidth,

                this.clientHeight

            );

            circle.style.width=d+"px";

            circle.style.height=d+"px";

            circle.style.left=

            e.clientX-

            this.getBoundingClientRect().left-

            d/2+"px";

            circle.style.top=

            e.clientY-

            this.getBoundingClientRect().top-

            d/2+"px";

            circle.className="ripple";

            const old=

            this.querySelector(".ripple");

            if(old) old.remove();

            this.appendChild(circle);

        }

    );

});



// ==========================================
// AUTO FOCUS
// ==========================================

window.addEventListener(

    "load",

    ()=>{

        userInput.focus();

    }

);