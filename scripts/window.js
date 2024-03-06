import appGenerator, {generateNotepad} from './applications.js';

// || Declarations and Definitions
let startButton = document.querySelector(".start-button");

//Window Type Object
let winType = {
  application: "IE",
  title: "First Window",
  icon: "ie16.png",
};

let wnGroup = document.querySelector(".windowGroup");
let taskbarApps = document.querySelector(".taskbar-applications");

// Window Object (member of myWindows):
/* 
{
    "id": newID,
    "maximized": false, 
    "dragging": false,
    "resizeLeft": false,
    "resizeTop": false,
    "resizeBottom": false,
    "resizeRight": false,
    "resizeTopLeftCorner": false,
    "resizeTopRightCorner": false,
    "resizeBottomLeft": false,
    "resizeBottomRight": false,
    "resizeActive": false,
    "container": wnContainer
}

*/
export let myWindows = [];

// || Auxiliary Methods:

let findIndexWithID = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i;
    }
  }
  return -1;
};

let swapMaxZIndex = (id) => {
  let maxZIndex = 0;
  let posic = 0;
  let myZIndex = parseInt(myWindows[findIndexWithID(myWindows, id)].container.style.zIndex);

  // Identify maxZIndex
  for (let i = 0; i < myWindows.length; i++) {
    if (parseInt(myWindows[i].container.style.zIndex) > maxZIndex) {
      maxZIndex = parseInt(myWindows[i].container.style.zIndex);
      posic = i;
    }
  }

  // Reduces 1 for all that had zIndex > myZIndex
  for(let i = 0; i < myWindows.length; i++){
    let currentZIndex = parseInt(myWindows[i].container.style.zIndex);
    if(currentZIndex > myZIndex){
      myWindows[i].container.style.zIndex = currentZIndex - 1;
    }
  }

  // Makes target window the maxZIndex
  myWindows[findIndexWithID(myWindows, id)].container.style.zIndex = maxZIndex;

  updateTaskbarButtonsFocus();
};

let generateNewID = (winType) => {
  if (myWindows.length === 0) {
    return 1;
  }
  let lastID = myWindows[myWindows.length - 1].id;
  return lastID ? lastID + 1 : 1;
};

export let getWindowPart = (window, part) => {
  for (const node of window.container.childNodes) {
    if (node.id === `${part}_${window.id}`) {
      part = node;
      break;
    }
  }
  return part;
};

// || Main Methods

// || Adding Button to Taskbar
/*
<li id="1" class="app-button">
    <img src="../assets/ie16.png" class="pd-top-5" alt="ie16 icon" />
    <p class="pd-top-5 pd-left-2">Internet Explorer</p>
</li>
*/
let addTaskbarButton = (winType, newID) => {
  let taskbarButton = document.createElement("li");
  taskbarButton.setAttribute("id", `btn_${newID}`);
  taskbarButton.setAttribute("class", "app-button");

  let taskbarBtnImg = document.createElement("img");
  taskbarBtnImg.setAttribute("src", `../assets/${winType.icon}`);
  taskbarBtnImg.setAttribute("class", "pd-top-5");
  taskbarBtnImg.setAttribute("alt", "ie16 icon");

  let taskbarBtnText = document.createElement("p");
  taskbarBtnText.setAttribute("class", "pd-top-5 pd-left-2");
  taskbarBtnText.innerText = winType.title;

  taskbarButton.appendChild(taskbarBtnImg);
  taskbarButton.appendChild(taskbarBtnText);

  taskbarApps.appendChild(taskbarButton);
  return taskbarButton;
};

// || Generating the Window
/*
<div class="wnContainer">
    <div class="wnBar">My First Window</div>
    <div class="wnBarButtons"></div>
    <div class="wnTopBorder"></div>
    <div class="wnRightBorder"></div>
    <div class="wnBottomBorder"></div>
    <div class="wnLeftBorder"></div>

    <div class="wnTopLeftCorner"></div>
    <div class="wnTopRightCorner"></div>
    <div class="wnBottomLeftCorner"></div>
    <div class="wnBottomRightCorner"></div>  
    <div class="wnArea"></div>
</div>
*/
let addWindow = (winType, newID) => {
  let wnContainer = document.createElement("div");
  wnContainer.setAttribute("id", `wn_${newID}`);
  wnContainer.setAttribute("class", "wnContainer");
  wnContainer.style.top = `${25 * newID}px`;
  wnContainer.style.left = `${25 * newID}px`;

  //Set Window's Elements
  let wnBar = document.createElement("div");
  wnBar.setAttribute("class", "wnBar");
  wnBar.setAttribute("id", `wnBar_${newID}`);
  wnBar.innerHTML = `<img src="../assets/${winType.icon}" width="20px" height="20px" /> <p class="pd-left-3 pd-top-4 sz10 family-mono">${winType.title}</p>`;

  let wnBarButtons = document.createElement("div");
  wnBarButtons.setAttribute("class", "wnBarButtons");
  wnBarButtons.setAttribute("id", `wnBarButtons_${newID}`);
  //Add top-right buttons
  wnBarButtons.innerHTML = `<div class="wnBarButtons_min"></div>
                       <div class="wnBarButtons_res"></div>
                       <div class="wnBarButtons_close"></div>`;

  let wnLeftBorder = document.createElement("div");
  wnLeftBorder.setAttribute("class", "wnLeftBorder");
  wnLeftBorder.setAttribute("id", `wnLeftBorder_${newID}`);
  let wnTopBorder = document.createElement("div");
  wnTopBorder.setAttribute("class", "wnTopBorder");
  wnTopBorder.setAttribute("id", `wnTopBorder_${newID}`);
  let wnRightBorder = document.createElement("div");
  wnRightBorder.setAttribute("class", "wnRightBorder");
  wnRightBorder.setAttribute("id", `wnRightBorder_${newID}`);
  let wnBottomBorder = document.createElement("div");
  wnBottomBorder.setAttribute("class", "wnBottomBorder");
  wnBottomBorder.setAttribute("id", `wnBottomBorder_${newID}`);
  let wnTopLeftCorner = document.createElement("div");
  wnTopLeftCorner.setAttribute("class", "wnTopLeftCorner");
  wnTopLeftCorner.setAttribute("id", `wnTopLeftCorner_${newID}`);
  let wnTopRightCorner = document.createElement("div");
  wnTopRightCorner.setAttribute("class", "wnTopRightCorner");
  wnTopRightCorner.setAttribute("id", `wnTopRightCorner_${newID}`);
  let wnBottomLeftCorner = document.createElement("div");
  wnBottomLeftCorner.setAttribute("class", "wnBottomLeftCorner");
  wnBottomLeftCorner.setAttribute("id", `wnBottomLeftCorner_${newID}`);
  let wnBottomRightCorner = document.createElement("div");
  wnBottomRightCorner.setAttribute("class", "wnBottomRightCorner");
  wnBottomRightCorner.setAttribute("id", `wnBottomRightCorner_${newID}`);
  let wnArea = document.createElement("div");
  wnArea.setAttribute("class", "wnArea");
  wnArea.setAttribute("id", `wnArea_${newID}`);

  wnContainer.appendChild(wnBar);
  wnContainer.appendChild(wnBarButtons);
  wnContainer.appendChild(wnLeftBorder);
  wnContainer.appendChild(wnTopBorder);
  wnContainer.appendChild(wnRightBorder);
  wnContainer.appendChild(wnBottomBorder);
  wnContainer.appendChild(wnTopLeftCorner);
  wnContainer.appendChild(wnTopRightCorner);
  wnContainer.appendChild(wnBottomLeftCorner);
  wnContainer.appendChild(wnBottomRightCorner);
  wnContainer.appendChild(wnArea);
  wnGroup.appendChild(wnContainer);

  wnContainer.style.zIndex = newID;

  return wnContainer;
};

// || Wiring the events...

// Dragging Event
let wireDraggingEvent = (myWindow) => {
  //let dragging = myWindow.dragging;
  let wnBar = getWindowPart(myWindow, "wnBar");

  //Initial Position:
  let offsetX = myWindow.container.getBoundingClientRect().left;
  let offsetY = myWindow.container.getBoundingClientRect().top;
  let clickX = offsetX;
  let clickY = offsetY;

  wnBar.addEventListener("mousedown", (e) => {
    clickX = e.clientX - myWindow.container.getBoundingClientRect().left;
    clickY = e.clientY - myWindow.container.getBoundingClientRect().top;
    myWindow.dragging = true;
  });

  wnBar.addEventListener("mouseup", () => {
    myWindow.dragging = false;
  });

  window.addEventListener("mouseup", () => (myWindow.dragging = false));
  window.addEventListener("mousemove", (e) => {
    if (myWindow.dragging && !myWindow.fullMaximized) {
      let xPosition = Math.max(
        Math.min(e.clientX - clickX, screen.width - 50),
        -wnBar.getBoundingClientRect().width - offsetX + 50
      );
      let yPosition = Math.max(
        Math.min(
          e.clientY - clickY,
          startButton.getBoundingClientRect().top -
            wnBar.getBoundingClientRect().height
        ),
        -3
      );
      myWindow.container.style.left = `${xPosition}px`;
      myWindow.container.style.top = `${yPosition}px`;
    }
  });
};

let updateTaskbarButtonsFocus = () => {
  let maxZIndex = 0;
  let posic = -1;
  
  for (let i = 0; i < myWindows.length; i++) {
    myWindows[i].focus = false;

    if (parseInt(myWindows[i].container.style.zIndex) > maxZIndex && myWindows[i].container.style.visibility === "visible") {
      maxZIndex = parseInt(myWindows[i].container.style.zIndex);
      posic = i;
    }
    document.querySelector(`#btn_${myWindows[i].id}`).style.backgroundPosition = "left 0px top 0px";
  }

  if (posic >= 0){
    let myID = myWindows[posic].id;
    let myTaskbarBtn = document.querySelector(`#btn_${myID}`);
    myTaskbarBtn.style.backgroundPosition = "left 0px top 68px";
    myWindows[posic].focus = true;
  }

};

//Maximize / Minimize and Highlight taskbar events from taskbar...
let wireMaximizationState = (myWindow, taskbarButton) => {
  //let maximized = myWindow.maximized;
  //Set initial state:
  if (myWindow.maximized === true) {
    myWindow.container.style.visibility = "visible";
    taskbarButton.style.backgroundPosition = "left 0px top 68px";
  } else {
    myWindow.container.style.visibility = "hidden";
    taskbarButton.style.backgroundPosition = "left 0px top 0px";
  }

  taskbarButton.addEventListener("click", () => {
    if (!myWindow.maximized) {
      taskbarButton.style.backgroundPosition = "left 0px top 68px";
      myWindow.container.style.visibility = "visible";
      myWindow.maximized = true;
      swapMaxZIndex(myWindow.id);
    } else {
      if(myWindow.focus) {
        taskbarButton.style.backgroundPosition = "left 0px top 0px";
        myWindow.container.style.visibility = "hidden";
        myWindow.maximized = false;
      }else{
        swapMaxZIndex(myWindow.id);
      }
    }
    updateTaskbarButtonsFocus();
  });
  taskbarButton.addEventListener("mouseover", () => {
    if (!myWindow.maximized) {
      taskbarButton.style.backgroundPosition = "left 0px top 34px";
    }
  });
  taskbarButton.addEventListener("mouseout", () => {
    if (!myWindow.maximized) {
      taskbarButton.style.backgroundPosition = "left 0px top 0px";
    }
  });
  updateTaskbarButtonsFocus();
};

// Resizing of Window
// Window Object (member of myWindows):
/* 
{
    "id": newID,
    "maximized": false, 
    "dragging": false,
    "resizeLeft": false,
    "resizeTop": false,
    "resizeBottom": false,
    "resizeRight": false,
    "resizeTopLeftCorner": false,
    "resizeTopRightCorner": false,
    "resizeBottomLeft": false,
    "resizeBottomRight": false,
    "resizeActive": false,
    "container": wnContainer
}
*/

let wireResizingEvent = (myWindow) => {
  //Left
  let wnLeftBorder = getWindowPart(myWindow, "wnLeftBorder");
  wnLeftBorder.addEventListener("mouseover", (e) => {
    if (!myWindow.cornerActive && !myWindow.dragging) {
      e.target.style.cursor = "col-resize";
      myWindow.resizeTop = false;
      myWindow.resizeRight = false;
      myWindow.resizeBottom = false;
      myWindow.resizeLeft = true;
      myWindow.resizeTopLeftCorner = false;
      myWindow.resizeTopRightCorner = false;
      myWindow.resizeBottomLeftCorner = false;
      myWindow.resizeBottomRightCorner = false;
    }
  });
  wnLeftBorder.addEventListener("mousedown", (e) => {
    myWindow.resizeActive = true;
    document.body.style.cursor = "col-resize";
  });
  window.addEventListener("mousemove", (e) => {
    if (myWindow.resizeLeft && myWindow.resizeActive) {
      let offsetX = myWindow.container.getBoundingClientRect().left;
      let xResize = Math.max(-1 * (e.clientX - offsetX) + myWindow.container.getBoundingClientRect().width, 600);
      myWindow.container.style.width = `${xResize}px`;
      myWindow.container.style.left = `${e.clientX}px`;
    }
  });

  //Right
  let wnRightBorder = getWindowPart(myWindow, "wnRightBorder");
  wnRightBorder.addEventListener("mouseover", (e) => {
    if (!myWindow.cornerActive && !myWindow.dragging) {
      e.target.style.cursor = "col-resize";
      myWindow.resizeTop = false;
      myWindow.resizeRight = true;
      myWindow.resizeBottom = false;
      myWindow.resizeLeft = false;
      myWindow.resizeTopLeftCorner = false;
      myWindow.resizeTopRightCorner = false;
      myWindow.resizeBottomLeftCorner = false;
      myWindow.resizeBottomRightCorner = false;
    }
  });

  wnRightBorder.addEventListener("mousedown", (e) => {
    myWindow.resizeActive = true;
    document.body.style.cursor = "col-resize";
  });
  window.addEventListener("mousemove", (e) => {
    if (myWindow.resizeRight === true && myWindow.resizeActive === true) {
      let offsetX = myWindow.container.getBoundingClientRect().left;
      let xResize = Math.max(e.clientX - offsetX, 600);
      myWindow.container.style.width = `${xResize}px`;
    }
  });

  //Top
  let wnTopBorder = getWindowPart(myWindow, "wnTopBorder");
  wnTopBorder.addEventListener("mouseover", (e) => {
    if (!myWindow.cornerActive && !myWindow.dragging) {
      e.target.style.cursor = "row-resize";
      myWindow.resizeTop = true;
      myWindow.resizeRight = false;
      myWindow.resizeBottom = false;
      myWindow.resizeLeft = false;
      myWindow.resizeTopLeftCorner = false;
      myWindow.resizeTopRightCorner = false;
      myWindow.resizeBottomLeftCorner = false;
      myWindow.resizeBottomRightCorner = false;
    }
  });
  //Este evento eh necessario pois quando usamos "e.target.style" estamos setando o CSSOM, alterando diretamente o CSS. No caso do cursor com 
  // mouseover event, estamos fazendo elemento:hover e setando o cursor. Isso bypassa a condicao do JS code, fazendo com que toda vez que :hover o elemento,
  // o cursor seja alterado. Colocando "mouseout" estamos desregistrando a mudanca de cursor do CSSOM, retirando o :hover do elemento.
  wnTopBorder.addEventListener("mouseout", (e) => e.target.style.cursor = "auto");

  wnTopBorder.addEventListener("mousedown", (e) => {
    myWindow.resizeActive = true;
    document.body.style.cursor = "row-resize";
  });
  window.addEventListener("mousemove", (e) => {
    if (myWindow.resizeTop === true && myWindow.resizeActive === true) {
      let offsetY = myWindow.container.getBoundingClientRect().top;
      let yResize = -1 * (e.clientY - offsetY) + myWindow.container.getBoundingClientRect().height;
      if (-1 * (e.clientY - offsetY) < offsetY){
        myWindow.container.style.height = `${yResize}px`;
      }
      myWindow.container.style.top = `${Math.max(e.clientY,0)}px`;
    }
  });

  //Bottom
  let wnBottomBorder = getWindowPart(myWindow, "wnBottomBorder");
  wnBottomBorder.addEventListener("mouseover", (e) => {
    if (!myWindow.cornerActive && !myWindow.dragging) {
      e.target.style.cursor = "row-resize";
      myWindow.resizeTop = false;
      myWindow.resizeRight = false;
      myWindow.resizeBottom = true;
      myWindow.resizeLeft = false;
      myWindow.resizeTopLeftCorner = false;
      myWindow.resizeTopRightCorner = false;
      myWindow.resizeBottomLeftCorner = false;
      myWindow.resizeBottomRightCorner = false;
    }
  });
  wnBottomBorder.addEventListener("mousedown", (e) => {
    myWindow.resizeActive = true;
    document.body.style.cursor = "row-resize";
  });
  window.addEventListener("mousemove", (e) => {
    if (myWindow.resizeBottom === true && myWindow.resizeActive === true) {
      let offsetY = myWindow.container.getBoundingClientRect().bottom;
      let yResize = e.clientY - offsetY + myWindow.container.getBoundingClientRect().height;
      myWindow.container.style.height = `${yResize}px`;
    }
  });

  //TopRightCorner
  let wnTopRightCorner = getWindowPart(myWindow, "wnTopRightCorner");
  wnTopRightCorner.addEventListener("mouseover", (e) => {
    e.target.style.cursor = "nesw-resize";

    myWindow.resizeTop = false;
    myWindow.resizeRight = false;
    myWindow.resizeBottom = false;
    myWindow.resizeLeft = false;
    myWindow.resizeTopLeftCorner = false;
    myWindow.resizeTopRightCorner = true;
    myWindow.resizeBottomLeftCorner = false;
    myWindow.resizeBottomRightCorner = false;
  });
  wnTopRightCorner.addEventListener("mousedown", (e) => {
    document.body.style.cursor = "nesw-resize";
    myWindow.resizeActive = true;
    myWindow.cornerActive = true;
  });
  window.addEventListener("mousemove", (e) => {
    if (myWindow.resizeTopRightCorner && myWindow.resizeActive) {
      let offsetY = myWindow.container.getBoundingClientRect().top;
      let yResize =
        -1 * (e.clientY - offsetY) +
        myWindow.container.getBoundingClientRect().height;
      myWindow.container.style.height = `${yResize}px`;
      myWindow.container.style.top = `${e.clientY}px`;

      let offsetX = myWindow.container.getBoundingClientRect().left;
      let xResize = Math.max(e.clientX - offsetX, 600);
      myWindow.container.style.width = `${xResize}px`;
    }
  });

  //BottomLeftCorner
  let wnBottomLeftCorner = getWindowPart(myWindow, "wnBottomLeftCorner");
  wnBottomLeftCorner.addEventListener("mouseover", (e) => {
    e.target.style.cursor = "nesw-resize";

    myWindow.resizeTop = false;
    myWindow.resizeRight = false;
    myWindow.resizeBottom = false;
    myWindow.resizeLeft = false;
    myWindow.resizeTopLeftCorner = false;
    myWindow.resizeTopRightCorner = false;
    myWindow.resizeBottomLeftCorner = true;
    myWindow.resizeBottomRightCorner = false;
  });
  wnBottomLeftCorner.addEventListener("mousedown", (e) => {
    document.body.style.cursor = "nesw-resize";
    myWindow.resizeActive = true;
    myWindow.cornerActive = true;
  });
  window.addEventListener("mousemove", (e) => {
    if (myWindow.resizeBottomLeftCorner && myWindow.resizeActive) {
      let offsetY = myWindow.container.getBoundingClientRect().bottom;
      let yResize =
        e.clientY - offsetY + myWindow.container.getBoundingClientRect().height;
      myWindow.container.style.height = `${yResize}px`;

      let offsetX = myWindow.container.getBoundingClientRect().left;
      let xResize =
        Math.max(-1 * (e.clientX - offsetX) +
        myWindow.container.getBoundingClientRect().width, 600);
      myWindow.container.style.width = `${xResize}px`;
      myWindow.container.style.left = `${e.clientX}px`;
    }
  });

  //TopLeftCorner
  let wnTopLeftCorner = getWindowPart(myWindow, "wnTopLeftCorner");
  wnTopLeftCorner.addEventListener("mouseover", (e) => {
    e.target.style.cursor = "nwse-resize";

    myWindow.resizeTop = false;
    myWindow.resizeRight = false;
    myWindow.resizeBottom = false;
    myWindow.resizeLeft = false;
    myWindow.resizeTopLeftCorner = true;
    myWindow.resizeTopRightCorner = false;
    myWindow.resizeBottomLeftCorner = false;
    myWindow.resizeBottomRightCorner = false;
  });
  wnTopLeftCorner.addEventListener("mousedown", (e) => {
    document.body.style.cursor = "nwse-resize";
    myWindow.resizeActive = true;
    myWindow.cornerActive = true;
  });
  window.addEventListener("mousemove", (e) => {
    if (myWindow.resizeTopLeftCorner && myWindow.resizeActive) {
      let offsetY = myWindow.container.getBoundingClientRect().top;
      let yResize =
        -1 * (e.clientY - offsetY) +
        myWindow.container.getBoundingClientRect().height;
      myWindow.container.style.height = `${yResize}px`;
      myWindow.container.style.top = `${e.clientY}px`;

      let offsetX = myWindow.container.getBoundingClientRect().left;
      let xResize =
        Math.max(-1 * (e.clientX - offsetX) +
        myWindow.container.getBoundingClientRect().width, 600);
      myWindow.container.style.width = `${xResize}px`;
      myWindow.container.style.left = `${e.clientX}px`;
    }
  });

  //BottomRightCorner
  let wnBottomRightCorner = getWindowPart(myWindow, "wnBottomRightCorner");
  wnBottomRightCorner.addEventListener("mouseover", (e) => {
    e.target.style.cursor = "nwse-resize";

    myWindow.resizeTop = false;
    myWindow.resizeRight = false;
    myWindow.resizeBottom = false;
    myWindow.resizeLeft = false;
    myWindow.resizeTopLeftCorner = false;
    myWindow.resizeTopRightCorner = false;
    myWindow.resizeBottomLeftCorner = false;
    myWindow.resizeBottomRightCorner = true;
  });
  wnBottomRightCorner.addEventListener("mousedown", (e) => {
    document.body.style.cursor = "nwse-resize";
    myWindow.resizeActive = true;
    myWindow.cornerActive = true;
  });
  window.addEventListener("mousemove", (e) => {
    if (myWindow.resizeBottomRightCorner && myWindow.resizeActive) {
      let offsetY = myWindow.container.getBoundingClientRect().bottom;
      let yResize =
        e.clientY - offsetY + myWindow.container.getBoundingClientRect().height;
      myWindow.container.style.height = `${yResize}px`;

      let offsetX = myWindow.container.getBoundingClientRect().left;
      let xResize = Math.max(e.clientX - offsetX, 600);
      myWindow.container.style.width = `${xResize}px`;
    }
  });

  window.addEventListener("mouseup", (e) => {
    document.body.style.cursor = "auto";
    myWindow.resizeTop = false;
    myWindow.resizeBottom = false;
    myWindow.resizeLeft = false;
    myWindow.resizeRight = false;
    myWindow.resizeTopLeftCorner = false;
    myWindow.resizeTopRightCorner = false;
    myWindow.resizeBottomRightCorner = false;
    myWindow.resizeBottomLeftCorner = false;
    myWindow.resizeActive = false;
    myWindow.cornerActive = false;
  });
};

let wireZIndexBehavior = (myWindow) => {
  myWindow.container.addEventListener("click", (e) => {
    swapMaxZIndex(myWindow.id);
  });
};

let wireWnBarButtonsBehavior = (myWindow) => {
  let wnBarButtons = getWindowPart(myWindow, "wnBarButtons");
  let minBtn = wnBarButtons.querySelector('.wnBarButtons_min');
  minBtn.addEventListener('click', () => {
      taskbarApps.querySelector(`#btn_${myWindow.id}`).style.backgroundPosition = "left 0px top 0px";
      myWindow.container.style.visibility = "hidden";
      myWindow.maximized = false;
  });

  let closeBtn = wnBarButtons.querySelector('.wnBarButtons_close');
  closeBtn.addEventListener('click', (e) => {
      excludeWindow(myWindow.id);
      //Stop propagation to avoid any exceptions being thrown because of non-existent window
      e.stopPropagation();
  });

  let resizeBtn = wnBarButtons.querySelector('.wnBarButtons_res');
  resizeBtn.addEventListener('click', (e) => {
      if (!myWindow.fullMaximized){
        myWindow.posicAndSize = myWindow.container.getBoundingClientRect();
        myWindow.container.style.height = 'calc(100vh - 31px)';
        myWindow.container.style.width = 'calc(100vw + 3px)';
        myWindow.container.style.top = '-3px';
        myWindow.container.style.left = '0';
        myWindow.fullMaximized = true;
      }else {
        myWindow.container.style.top = `${myWindow.posicAndSize.top}px`;
        myWindow.container.style.left = `${myWindow.posicAndSize.left}px`;
        myWindow.container.style.width = `${myWindow.posicAndSize.width}px`;
        myWindow.container.style.height = `${myWindow.posicAndSize.height}px`;
        myWindow.fullMaximized = false;
        myWindow.posicAndSize = myWindow.container.getBoundingClientRect();
      }
      
  });

  updateTaskbarButtonsFocus();
};

// || Coordinates everything
let createWindow = (winType) => {
  let newID = generateNewID(winType);

  //Add Taskbar Button
  let taskbarButton = addTaskbarButton(winType, newID);

  //Create New Window
  let wnContainer = addWindow(winType, newID);

  //Create Reference to new Window in myWindows Array
  myWindows.push({
    id: newID,
    maximized: true,
    focus: true,
    dragging: false,
    container: wnContainer,
    resizeLeft: false,
    resizeTop: false,
    resizeBottom: false,
    resizeRight: false,
    resizeTopLeftCorner: false,
    resizeTopRightCorner: false,
    resizeBottomLeft: false,
    resizeBottomRight: false,
    resizeBottomRightCorner: false,
    resizeActive: false,
    cornerActive: false,
    data: winType.data,
  });

  //Add Application
  let _wnArea = getWindowPart(myWindows[myWindows.length-1], "wnArea");
  _wnArea.innerHTML = appGenerator[winType.application](myWindows[myWindows.length-1]);

  //Wire the events
  wireDraggingEvent(myWindows[findIndexWithID(myWindows, newID)]);
  wireMaximizationState(myWindows[findIndexWithID(myWindows, newID)], taskbarButton);
  wireResizingEvent(myWindows[findIndexWithID(myWindows, newID)]);
  wireZIndexBehavior(myWindows[findIndexWithID(myWindows, newID)]);
  wireWnBarButtonsBehavior(myWindows[findIndexWithID(myWindows, newID)]);

  updateTaskbarButtonsFocus();
};
export default createWindow;

export let excludeWindow = (myID) => {
  let arrIndex = findIndexWithID(myWindows, myID);
  let excludingWindow = myWindows[arrIndex].container;
  excludingWindow.remove();
  let btnX = document.querySelector(`#btn_${myID}`);
  btnX.remove();
  myWindows.splice(arrIndex, 1);
};
