const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld(
  'betiza',
  {
    saveContent: (content) => ipcRenderer.send('saveContent', content)
  } 
)