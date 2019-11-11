const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const mac = require('getmac') 
const fs = require('fs');

//限制exe只能打开一次
let win 

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
}
//  限制exe只能打开一次 end

console.log('chrome version:'+process.versions.chrome);

// 注意这个autoUpdater不是electron中的autoUpdater
const { autoUpdater } = require("electron-updater")

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

// 运行环境判断
var args = process.argv.slice(1);
dev = args.some(function (val) { return val === '--dev'; });

console.log(dev);
// 设置调试环境和运行环境 的渲染进程路径
const winURL = dev ? 'http://localhost:4200' :
`file://${__dirname}/dist/index.html`;



function createWindow() {
 

  win = new BrowserWindow({ width: 1920, height: 1080,
  //  frame:false,
    webPreferences: {
        webSecurity: false
    },
    webPreferences: { nodeIntegration: true }})
   
  // load the dist folder from Angular
  win.loadURL(winURL);

  // Open the DevTools optionally:
  // win.webContents.openDevTools()
 

  win.on('closed', () => {
    win = null
  })
}
 

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  console.log(__static)
  if (win === null) {
    createWindow()
  }
})

// 主进程监听渲染进程传来的信息
ipcMain.on('update', (e, arg) => {
  console.log("update");
  updateHandle();
});

//系统需要使用mac地址是通过事件请求主进程
ipcMain.on('license-request', (event, arg) => {   
 
  // mac.getMac(function(err, macAddress){  
  //   macAddress= 'd230361aaebb11e9951c00ff10d0f1a3';
  //   event.sender.send('license-reply', macAddress)
  // }); 
  var path1 = "C:\\license\\key.txt"; 

  fs.readFile(path1, 'utf8', function (err, data) {

    let messgae = '';
    if (err) {
      messgae =  'error';
    }
    else{
      messgae =   data;
    }

    event.sender.send('license-reply', messgae)
  });
});


// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function updateHandle() {
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，系统将在后台自动下载更新，下载完成后将提示您安装更新...',
    updateNotAva: '现在使用的就是最新版本，不用更新',
  };
  const os = require('os');
  //   更新文件所在服务器地址
  autoUpdater.setFeedURL('http://localhost:8081/');
  autoUpdater.on('error', function (error) {
    //sendUpdateMessage(message.error)
  });
  autoUpdater.on('checking-for-update', function () {
    //sendUpdateMessage(message.checking)
  });
  autoUpdater.on('update-available', function (info) {
    sendUpdateMessage(message.updateAva)
  });
  autoUpdater.on('update-not-available', function (info) {
    //sendUpdateMessage(message.updateNotAva)
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', (progressObj) => {
    win.webContents.send('downloadProgress', progressObj)
  })
  // 下载完成事件
  autoUpdater.on('update-downloaded',  (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
    ipcMain.on('isUpdateNow', (e, arg) => {
      // 关闭程序安装新的软件
      autoUpdater.quitAndInstall();
    })
    win.webContents.send('isUpdateNow')
  });

  //执行自动更新检查
  autoUpdater.checkForUpdates();
}

// 通过main进程发送事件给renderer进程，提示更新信息
// win = new BrowserWindow()
function sendUpdateMessage(text) {
  win.webContents.send('message', text)
}
