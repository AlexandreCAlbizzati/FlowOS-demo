import { notepadData } from "./data.js";

//DOM ELEMENT DECLARATIONS
let pageWrap = document.querySelector(".page-wrap");
let startButton = document.querySelector(".start-button");
let startMenu = document.querySelector(".start-menu");

// CONTEXT-MENU
pageWrap.addEventListener('contextmenu', e => e.preventDefault());

// EVENT HANDLING: TASKBAR AND START MENU
pageWrap.addEventListener("click", () => {
    startButton.classList.toggle("start-button-clicked", false);
    startMenu.classList.toggle("start-menu-visible", false);
});
startButton.addEventListener("click", (e) => {
    startButton.classList.toggle("start-button-clicked");
    startMenu.classList.toggle("start-menu-visible");
    e.stopPropagation();
});
startMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});

// TOP CARDS - START MENU (HOVER)
let startMenuTopCards = document.querySelectorAll("li.sm-topcard");
startMenuTopCards.forEach((topCard)=> {
    let myLine2 = topCard.querySelector(".sm-topcard-line2");
    topCard.addEventListener("mouseover", () => {
        myLine2.style.color = "white";
    });
    topCard.addEventListener("mouseout", () => {
        myLine2.style.color = "#7e7e7e";
    });
});

// LOGOFF AND SHUTDOWN (HOVER)
let footerCards = document.querySelectorAll(".footer-card");
footerCards.forEach((footerCard)=> {
    let myImg = footerCard.querySelector("img");
    myImg.style.clipPath = "inset(0px 0px 33px 0px)";
    myImg.style.transform = "translateY(0px)";
    footerCard.addEventListener("mouseover", () => {
        myImg.style.clipPath = "inset(33px 0px 0px 0px)";
        myImg.style.transform = "translateY(-33px)";
        footerCard.style.backgroundColor = "#1062CF";
    });
    footerCard.addEventListener("mouseout", () => {
        myImg.style.clipPath = "inset(0px 0px 33px 0px)";
        myImg.style.transform = "translateY(0px)";
        footerCard.style.backgroundColor = "transparent";
    });
});

// ALL PROGRAMS - START MENU (HOVER)
let allPrograms = document.querySelector(".allprograms");
let allProgramsMenu = document.querySelector(".allprograms-menu");
let overAllPrograms = false;
let overAllProgramsMenu = false;

function updateMenuState() {
    if (overAllPrograms || overAllProgramsMenu || overAccessoriesMenu || overGamesMenu) {
        allPrograms.style.backgroundColor = "#316ac5";
        allPrograms.style.color = "#fff";
        allProgramsMenu.classList.toggle("allprograms-menu-hidden",false);
    }else{
        allPrograms.style.backgroundColor = "white";
        allPrograms.style.color = "#000";
        allProgramsMenu.classList.toggle("allprograms-menu-hidden",true);
    }
}
allPrograms.addEventListener("mouseover", () => {
    overAllPrograms = true;
    updateMenuState();
});
allProgramsMenu.addEventListener("mouseover", () => {
    overAllProgramsMenu = true;
    updateMenuState();
});
allPrograms.addEventListener("mouseout", () => {
    overAllPrograms = false;
    updateMenuState();
});
allProgramsMenu.addEventListener("mouseout", () => {
    overAllProgramsMenu = false;
    updateMenuState();
});

// RECENT PROGRAMS MENU (HOVER)
let recent = document.querySelector(".recent");
let recentMenu = document.querySelector(".recent-menu");
let overRecent = false;
let overRecentMenu = false;

function updateRecentMenuState() {
    if (overRecent || overRecentMenu) {
        recent.style.backgroundColor = "#316ac5";
        recent.style.color = "#fff";
        recent.style.backgroundPosition = 'right 6px top 8px';
        recentMenu.classList.toggle("recent-menu-hidden",false);
    }else{
        recent.style.backgroundColor = "transparent";
        recent.style.color = "#000";
        recent.style.backgroundPosition = 'right 6px bottom 9px';
        recentMenu.classList.toggle("recent-menu-hidden",true);
    }
}
recent.addEventListener("mouseover", () => {
    overRecent = true;
    updateRecentMenuState();
});
recentMenu.addEventListener("mouseover", () => {
    overRecentMenu = true;
    updateRecentMenuState();
});
recent.addEventListener("mouseout", () => {
    overRecent = false;
    updateRecentMenuState();
});
recentMenu.addEventListener("mouseout", () => {
    overRecentMenu = false;
    updateRecentMenuState();
});

// ACCESSORIES PROGRAMS MENU (HOVER)
let accessories = document.querySelector(".accessories");
let accessoriesMenu = document.querySelector(".accessories-menu");
let overAccessories = false;
let overAccessoriesMenu = false;

function updateAccessoriesMenuState() {
    if (overAccessories || overAccessoriesMenu) {
        accessories.style.backgroundColor = "#316ac5";
        accessories.style.color = "#fff";
        accessories.style.backgroundPosition = "right 6px top 8px";
        accessoriesMenu.classList.toggle("accessories-menu-hidden",false);
    }else{
        accessories.style.backgroundColor = "transparent";
        accessories.style.color = "#000";
        accessories.style.backgroundPosition = "right 6px bottom 9px";
        accessoriesMenu.classList.toggle("accessories-menu-hidden",true);
    }
}
accessories.addEventListener("mouseover", () => {
    overAccessories = true;
    updateAccessoriesMenuState();
    updateMenuState();
});
accessoriesMenu.addEventListener("mouseover", () => {
    overAccessoriesMenu = true;
    updateAccessoriesMenuState();
    updateMenuState();
});
accessories.addEventListener("mouseout", () => {
    overAccessories = false;
    updateAccessoriesMenuState();
    updateMenuState();
});
accessoriesMenu.addEventListener("mouseout", () => {
    overAccessoriesMenu = false;
    updateAccessoriesMenuState();
    updateMenuState();
});

// GAMES PROGRAMS MENU (HOVER)
let games = document.querySelector(".games");
let gamesMenu = document.querySelector(".games-menu");
let overGames = false;
let overGamesMenu = false;

function updateGamesMenuState() {
    if (overGames || overGamesMenu) {
        games.style.backgroundColor = "#316ac5";
        games.style.color = "#fff";
        games.style.backgroundPosition = "right 6px top 8px";
        gamesMenu.classList.toggle("games-menu-hidden",false);

    }else{
        games.style.backgroundColor = "transparent";
        games.style.color = "#000";
        games.style.backgroundPosition = "right 6px bottom 9px";
        gamesMenu.classList.toggle("games-menu-hidden",true);
    }
}
games.addEventListener("mouseover", () => {
    overGames = true;
    updateGamesMenuState();
    updateMenuState();
});
gamesMenu.addEventListener("mouseover", () => {
    overGamesMenu = true;
    updateGamesMenuState();
    updateMenuState();
});
games.addEventListener("mouseout", () => {
    overGames = false;
    updateGamesMenuState();
    updateMenuState();
});
gamesMenu.addEventListener("mouseout", () => {
    overGamesMenu = false;
    updateGamesMenuState();
    updateMenuState();
});


// Clock
function adjustClock(){
    let horario = new Date();
    horario = horario.toTimeString().slice(0,5);
    let relogio = document.querySelector(".systemtray-time");
    relogio.innerText = horario;
    setInterval(() => {
        horario = new Date();
        horario = horario.toTimeString().slice(0,5);
        relogio.innerText = horario;
    },1000);
}
adjustClock();

import createWindow, {myWindows, getWindowPart, excludeWindow, minimizeWindow} from "./window.js";
//createWindow({ application: "IE", title: "Internet Explorer", icon: "ie16.png" });
createWindow({ application: "notepad", title: "Notepad", icon: "notepad.png", data: {text: notepadData['hello']} });
//createWindow({ application: "IE", title: "Internet Explorer", icon: "ie16.png" });
//createWindow({ application: "notepad", title: "WordPad", icon: "wordpad.png" });
//createWindow({ application: "cmd", title: "Command Prompt", icon: "cmd.png" });

//let myElementArea = getWindowPart(myWindows[0], 'wnArea');
// myElementArea.innerHTML += `<h1>This is amazing!</h1>
// <p>Now, due to this level of abstraction we got a whole new set of possibilities!!!</p>`;

// createWindow({ application: "IE", title: "Second Window", icon: "ie16.png" });
// createWindow({ application: "IE", title: "First Window", icon: "ie16.png" });
// createWindow({ application: "IE", title: "Second Window", icon: "ie16.png" });

// // Sun
let sun = document.querySelector(".sun");
//Initial Position:
let offsetX = sun.getBoundingClientRect().left;
let offsetY = sun.getBoundingClientRect().top;
let clickX = offsetX;
let clickY = offsetY;
let sunDragging = false;

sun.addEventListener("mousedown", (e) => {
    clickX = e.clientX - sun.getBoundingClientRect().left;
    clickY = e.clientY - sun.getBoundingClientRect().top;
    sunDragging = true;
});
sun.addEventListener("mouseup", () => {
    sunDragging = false;
});
pageWrap.addEventListener("mousemove",(e) => {
    if (sunDragging) {
        sun.style.transform = `translate(${e.clientX-offsetX-clickX}px,${e.clientY-offsetY-clickY}px)`;
    }
});
sun.addEventListener("mousemove",(e) => {
    if (sunDragging) {
        sun.style.transform = `translate(${e.clientX-offsetX-clickX}px,${e.clientY-offsetY-clickY}px)`;
    }
});

//UI Interactivity:
let ie = document.querySelectorAll('.sm-topcard')[0];
ie.addEventListener('click', () => {
    createWindow({ application: "IE", title: "Internet Explorer", icon: "ie16.png" });
    startMenu.classList.toggle("start-menu-visible", false);
    startButton.classList.toggle("start-button-clicked", false);
});
let executeCMD = document.querySelector('#cmd-rapid-menu');
executeCMD.addEventListener('click', () => {
    createWindow({ application: "cmd", title: "Command Prompt", icon: "cmd.png" });
    startMenu.classList.toggle("start-menu-visible", false);
    startButton.classList.toggle("start-button-clicked", false);
});
let executeNotepad = document.querySelector('#accessories-notepad');
executeNotepad.addEventListener('click', () => {
    createWindow({ application: "notepad", title: "Notepad", icon: "notepad.png", data: {text: notepadData['empty']} });
    startMenu.classList.toggle("start-menu-visible", false);
    startButton.classList.toggle("start-button-clicked", false);
});
let mensagem = document.querySelector("#mensagem");
mensagem.addEventListener('click', () => {
    createWindow({ application: "notepad", title: "Notepad", icon: "notepad.png", data: {text: notepadData['mensagem']}});
    startMenu.classList.toggle("start-menu-visible", false);
    startButton.classList.toggle("start-button-clicked", false);
});
let leftMenuNotepad = document.querySelector('#left-menu-notepad');
leftMenuNotepad.addEventListener('click', ()=> {
    createWindow({ application: "notepad", title: "Notepad", icon: "notepad.png", data: {text: notepadData['empty']} });
    startMenu.classList.toggle("start-menu-visible", false);
    startButton.classList.toggle("start-button-clicked", false);
});
let notFound = document.querySelectorAll('.no-app');
notFound.forEach(app => app.addEventListener('click', () => {
    createWindow({ application: "error", title: "Error", icon: "critical.png", dimensions:{width: 500, height: 200}, modal:true});
    startMenu.classList.toggle("start-menu-visible", false);
    startButton.classList.toggle("start-button-clicked", false);
}));


let desktopButton = document.querySelector(".quicklaunch-desktop");
desktopButton.addEventListener('click',()=>{
    myWindows.forEach(wnd => minimizeWindow(wnd.id));
});
let quickLaunchIE = document.querySelector('.quicklaunch-ie');
quickLaunchIE.addEventListener('click', () => {
    createWindow({ application: "IE", title: "Internet Explorer", icon: "ie16.png"});
});
let quickLaunchCMD = document.querySelector('.quicklaunch-cmd');
quickLaunchCMD.addEventListener('click', () => {
    createWindow({ application: "cmd", title: "Command Prompt", icon: "cmd.png" });
});
let quickLaunchWinamp = document.querySelector('.quicklaunch-winamp');
quickLaunchWinamp.addEventListener('click', () => {
    createWindow({ application: "error", title: "Error", icon: "critical.png", dimensions:{width: 500, height: 200}, modal:true});
});



// Key combination (only for testing)
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key == 'm') {
        if (myWindows[1].container.style.visibility === 'visible')
            myWindows[1].container.style.visibility = 'hidden';
        else
            myWindows[1].container.style.visibility = 'visible';
    }
    if (e.ctrlKey && e.key == 'x') {
        excludeWindow(myWindows[myWindows.length-1].id);
    }
    if (e.ctrlKey && e.key == 'q') {
        if (document.querySelector('.sun').style.visibility === 'visible'){
            document.querySelector('.sun').style.visibility = 'hidden';
        }else{
            document.querySelector('.sun').style.visibility = 'visible';
        }
        
    }
});