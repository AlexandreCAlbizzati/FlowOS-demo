export let generateNotepad = (obj) => {
    let message = obj.data.text;
    return `
    <style>
    .menu-notepad {
      flex-grow: 0;
      display: flex;
      flex-direction: row;
      padding: 5px;
      font-size: 11px;
      font-family: Arial, Helvetica, sans-serif;
      border-bottom: 1px solid #D8D2BD;
      background-color: #f0f0e7;
    }
    .menu-notepad > li {
      padding: 1px 5px;
      border: 1px solid transparent;
    }
    .menu-notepad>li:hover {
      border: 1px solid #D8D2BD;
      background-color:#FFF
    }
  
    textarea.notepad {
      flex-grow: 1;
      display: block;
      background-color: white;
      margin-left: 3px;
      padding-left: 2px;
      padding-top: 2px;
      width: calc(100% - 3px);
      overflow: scroll;
      resize: none;
    }
    textarea.notepad:focus{
        outline: 0;
      }

  </style>
    <ul class="menu-notepad">
      <li>File</li>
      <li>Edit</li>
      <li>Format</li>
      <li>View</li>
      <li>Help</li>
    </ul>
    <textarea class="notepad">${message}</textarea>  
  `
};

export let generateIE = (obj) => {
  return `
  <style>

  .ie-app{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #D8D2BD;
    background-color: #f0f0e7;
  }
    .menu-ie {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      padding: 5px;
      font-size: 11px;
      font-family: Arial, Helvetica, sans-serif;
    }
    .winlogo {
      flex-grow: 0;
    }

    .menu-ie > li {
      padding: 1px 5px;
      border: 1px solid transparent;
    }
    .menu-ie>li:hover {
      border: 1px solid #D8D2BD;
      background-color:#FFF
    }

    .menu-ie-btns{
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #D8D2BD;
      background-color: #f0f0e7;
    }
    .address-bar{
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid #D8D2BD;
      font-size: 12px;
      font-family: Arial;
      font-weight: lightest;
      color: #777;
      padding: 1px 2px;
      height: 22px;
      background-color: #f0f0e7;
    }
    .address-bar-front {
      padding: 2px 5px;
      flex-grow: 0;
    }
    div.input {
      display: flex;
      align-items: center;
      height: 20px;
      width: 100%;
      padding-left: 3px;
      background-color: white;
      border: 1px solid #7F9DB9;
      margin-left: 7px;
    }
    .address-bar-links{
      border-left: 1px solid #D8D2BD;
      padding: 3px;
      color: black;
      margin-left: 5px;
      margin-right: 7px;
    }
    .address-bar-go{
      margin-left: 5px;
      margin-right: 7px;
      color: black;
    }

    .url-address{
      padding-left: 2px;
      color: black;
      outline: none;
      border: none;
      width: 100%;
    }
    .url-address-form{
      flex-grow: 1;
    }

    .logo-sizing {
      width: 500px;
      height: auto;
    }

    </style>
    <div class="ie-app">
      <ul class="menu-ie">
        <li>File</li>
        <li>Edit</li>
        <li>Format</li>
        <li>View</li>
        <li>Help</li>
      </ul>
      <img class="winlogo" src='../assets/windowslogo.png' width="40px" height="23px" />
    </div>

    <div class="menu-ie-btns">
        <img src="../assets/ie1.png"/>
        <img src="../assets/ie2.png"/>
        <img src="../assets/ie3.png"/>
        <img src="../assets/ie4.png"/>
        <img src="../assets/ie5.png"/>
        <img src="../assets/ie-sep.png"/>
        <img src="../assets/ie6.png"/>
        <img src="../assets/ie7.png"/>
        <img src="../assets/ie8.png"/>
        <img src="../assets/ie9.png"/>
        <img src="../assets/ie-sep.png"/>
        <img src="../assets/ie10.png"/>
        <img src="../assets/ie11.png"/>
        <img src="../assets/ie12.png"/>
    </div>
    <div class="address-bar">
      <p class="address-bar-front">Address</p>
      <div class="input">
        <img src="../assets/ie-addressbar-ico.png" />
        <div class="url-address">https://www.flowos.app/</div>
      </div>
      <img src="../assets/greenGo.png" class="pd-left-2" />
      <p class="address-bar-go">Go</p>
      <p class="address-bar-links">Links</p>
    </div>
    <section style="display: flex; flex-direction: column; align-items: center;
    flex-grow: 1; background-color: dimgray; padding: 3px; overflow: scroll; gap: 10px;">
      <img src="../assets/flow.png" class="logo-sizing" style="padding: 10px"/>  
      <p style="padding: 2em; color: whitesmoke; font-family: Arial">There is still some work going around here. More to come.</p>
      <h3 style="color: whitesmoke">Thanks, Alex</h3>
      <br>
    </section>
  `
};

export let generateCMD = (obj) => {
  return `
    <style>
      .cmd-app {
        padding: 7px;
        flex-grow: 1;
        background-color: black;
        color: whitesmoke;
        font-weight: bold;
        font-family: monospace;
      }
    </style>
  <div class="cmd-app">C:\\></div>  
  `
};

export let generateSite = (myWindow) => {
  return generateIE(myWindow) + `
  <style>iframe { flex-grow: 1; }</style>
  <iframe src="https://bing.com/"></iframe>`;
}

let appGenerator = {
  notepad: generateNotepad,
  IE: generateIE,
  cmd: generateCMD,
  bing: generateSite,
  
};
export default appGenerator;
