// =========================================
// QUIZ.JS
// One For All - Quiz Module
// =========================================


// ===============================
// PAGE LOADED
// ===============================

window.addEventListener("load", () => {

    document.body.classList.add("fade");

});


// ===============================
// PROGRESS BAR ANIMATION
// ===============================

const progress = document.querySelector(".progress-fill");

if (progress) {

    const width = progress.style.width;

    progress.style.width = "0";

    setTimeout(() => {

        progress.style.width = width;

    }, 300);

}


// ===============================
// OPTION SELECTION
// ===============================

const optionCards = document.querySelectorAll(".option-card");

optionCards.forEach(card => {

    const radio = card.querySelector("input");

    card.addEventListener("click", () => {

        optionCards.forEach(c => {

            c.classList.remove("selected");

        });

        card.classList.add("selected");

        radio.checked = true;

    });

});


// ===============================
// NEXT BUTTON CHECK
// ===============================

const quizForm = document.getElementById("quizForm");

if (quizForm) {

    quizForm.addEventListener("submit", function(e){

        const checked = document.querySelector(
            "input[name='answer']:checked"
        );

        if(!checked){

            e.preventDefault();

            alert("Please choose an answer.");

        }

    });

}


// ===============================
// KEYBOARD SUPPORT
// 1 2 3 4
// ===============================

document.addEventListener("keydown", function(e){

    if(e.key==="1") chooseOption(0);

    if(e.key==="2") chooseOption(1);

    if(e.key==="3") chooseOption(2);

    if(e.key==="4") chooseOption(3);

});


function chooseOption(index){

    if(optionCards.length>index){

        optionCards[index].click();

    }

}


// ===============================
// ENTER SUBMIT
// ===============================

document.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        if(quizForm){

            const checked = document.querySelector(
                "input[name='answer']:checked"
            );

            if(checked){

                quizForm.submit();

            }

        }

    }

});


// ===============================
// HOVER SOUND (OPTIONAL)
// ===============================

optionCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-5px) scale(1.01)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});


// ===============================
// BUTTON RIPPLE
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

        circle.classList.add("ripple");

        const ripple=this.getElementsByClassName("ripple")[0];

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});


// ===============================
// RESULT PAGE ANIMATION
// ===============================

const scoreCircle=document.querySelector(".score-circle");

if(scoreCircle){

    scoreCircle.animate([

        {

            transform:"scale(.5)",
            opacity:0

        },

        {

            transform:"scale(1)",
            opacity:1

        }

    ],{

        duration:700,

        easing:"ease"

    });

}


// ===============================
// RESULT CARD STAGGER
// ===============================

const resultCards=document.querySelectorAll(".result-card");

resultCards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateY(30px)";

    setTimeout(()=>{

        card.style.transition=".5s";

        card.style.opacity="1";

        card.style.transform="translateY(0)";

    },300+(index*200));

});


// ===============================
// PERFORMANCE BOX
// ===============================

const performance=document.querySelector(".performance-box");

if(performance){

    setTimeout(()=>{

        performance.style.opacity="1";

        performance.style.transform="translateY(0)";

    },900);

}


// ===============================
// AUTO FOCUS
// ===============================

const firstSelect=document.querySelector("select");

if(firstSelect){

    firstSelect.focus();

}


// ===============================
// DISABLE DOUBLE SUBMIT
// ===============================

if(quizForm){

    quizForm.addEventListener("submit",()=>{

        const btn=document.querySelector(".next-btn");

        if(btn){

            btn.disabled=true;

            btn.innerHTML="Submitting...";

        }

    });

}


// ===============================
// CONFETTI (A GRADE)
// ===============================

const grade=document.querySelector(".performance-box h2");

if(grade){

    if(grade.innerText.includes("Outstanding")){

        for(let i=0;i<40;i++){

            const conf=document.createElement("div");

            conf.className="confetti";

            conf.style.left=Math.random()*100+"vw";

            conf.style.animationDelay=
            Math.random()*3+"s";

            document.body.appendChild(conf);

        }

    }

}


// ===============================
// START BUTTON LOADING
// ===============================

const startBtn=document.querySelector(".start-btn");

if(startBtn){

    startBtn.addEventListener("click",()=>{

        startBtn.innerHTML=

        '<i class="fa-solid fa-spinner fa-spin"></i> Starting...';

    });

}


// ===============================
// RETRY BUTTON
// ===============================

const retry=document.querySelector(".retry-btn");

if(retry){

    retry.addEventListener("click",()=>{

        retry.innerHTML=

        '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';

    });

}


// ===============================
// HOME BUTTON
// ===============================

const home=document.querySelector(".home-btn");

if(home){

    home.addEventListener("click",()=>{

        home.innerHTML=

        '<i class="fa-solid fa-spinner fa-spin"></i> Opening...';

    });

}


// ===============================
// END
// ===============================