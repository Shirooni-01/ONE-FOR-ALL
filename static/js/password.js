// ==========================================
// PASSWORD.JS
// One For All
// ==========================================


// ===============================
// PAGE LOAD
// ===============================

window.addEventListener("load",()=>{

    document.body.classList.add("fade");

});


// ===============================
// PASSWORD COPY
// ===============================

const passwordInput=document.getElementById("password");
const copyBtn=document.getElementById("copyBtn");

if(copyBtn && passwordInput){

    copyBtn.addEventListener("click",()=>{

        if(passwordInput.value===""){

            showToast("Generate a password first.");

            return;

        }

        navigator.clipboard.writeText(passwordInput.value);

        showToast("Password copied!");

    });

}


// ===============================
// SHOW / HIDE HISTORY PASSWORD
// ===============================

document.querySelectorAll(".show-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const input=btn.closest(".history-card")
        .querySelector(".history-password");

        const icon=btn.querySelector("i");

        if(input.type==="password"){

            input.type="text";

            icon.className="fa-regular fa-eye-slash";

        }

        else{

            input.type="password";

            icon.className="fa-regular fa-eye";

        }

    });

});


// ===============================
// COPY HISTORY PASSWORD
// ===============================

document.querySelectorAll(".copy-history").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const input=btn.closest(".history-card")
        .querySelector(".history-password");

        navigator.clipboard.writeText(input.value);

        showToast("Password copied!");

    });

});


// ===============================
// STRENGTH BAR ANIMATION
// ===============================

const fill=document.querySelector(".strength-fill");

if(fill){

    const width=fill.style.width;

    fill.style.width="0";

    setTimeout(()=>{

        fill.style.width=width;

    },300);

}


// ===============================
// GENERATE BUTTON LOADING
// ===============================

const form=document.querySelector("form");
const generateBtn=document.querySelector(".generate-btn");

if(form && generateBtn){

    form.addEventListener("submit",()=>{

        generateBtn.disabled=true;

        generateBtn.innerHTML=

        '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

    });

}


// ===============================
// RIPPLE EFFECT
// ===============================

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("click",function(e){

        const circle=document.createElement("span");

        const diameter=Math.max(

            this.clientWidth,

            this.clientHeight

        );

        circle.style.width=diameter+"px";
        circle.style.height=diameter+"px";

        circle.style.left=

        e.clientX-

        this.getBoundingClientRect().left-

        diameter/2+"px";

        circle.style.top=

        e.clientY-

        this.getBoundingClientRect().top-

        diameter/2+"px";

        circle.className="ripple";

        const ripple=this.querySelector(".ripple");

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});


// ===============================
// CTRL + C
// ===============================

document.addEventListener("keydown",function(e){

    if(e.ctrlKey && e.key.toLowerCase()==="c"){

        if(

            document.activeElement===passwordInput

        ){

            navigator.clipboard.writeText(

                passwordInput.value

            );

            showToast("Password copied!");

        }

    }

});


// ===============================
// CTRL + G
// ===============================

document.addEventListener("keydown",function(e){

    if(e.ctrlKey && e.key.toLowerCase()==="g"){

        e.preventDefault();

        if(generateBtn){

            generateBtn.click();

        }

    }

});


// ===============================
// AUTO SELECT PASSWORD
// ===============================

if(passwordInput){

    passwordInput.addEventListener("click",()=>{

        passwordInput.select();

    });

}


// ===============================
// TOAST
// ===============================

function showToast(message){

    let toast=document.querySelector(".toast");

    if(!toast){

        toast=document.createElement("div");

        toast.className="toast";

        document.body.appendChild(toast);

    }

    toast.innerText=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2200);

}


// ===============================
// HISTORY HOVER
// ===============================

document.querySelectorAll(".history-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-5px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});


// ===============================
// DISABLE EMPTY COPY
// ===============================

if(passwordInput){

    if(passwordInput.value===""){

        copyBtn.disabled=true;

        copyBtn.style.opacity=".5";

    }

}


// ===============================
// END
// ===============================