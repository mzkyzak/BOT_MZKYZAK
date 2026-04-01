const fs = require('fs')
const { version } = require("./package.json")

//SETTING BOT

global.owner = "6285810192529"
global.nobot = "6287729525734"
global.namaowner = "Taufiq ikhsan muzaky"
global.namaweb = "https://portfolio-mzkyzak.vercel.app/"
global.namaBot = "mzkyzak"
global.title = "mzkyzak-AI"

global.creator = `${owner}@s.whatsapp.net` 
global.foother = `© ${namaBot}`
global.versi = "3.0"
global.nama = namaBot 
global.namach = nama 
global.namafile = foother 
global.author = namaowner
 
global.status = true
global.owneroff = true
global.autoread = true
global.autotyping = true
global.Antilinkgc = true
global.Antilinkch = true
global.antispam = true
global.onlygc = false

global.dana = "085810192529"

global.ch = 'https://whatsapp.com/channel/0029Vb2K7scK0IBkPoAGgk28'
global.idch = '120363368222492263@newsletter'
global.linkgc = 'https://chat.whatsapp.com/FKLOiDRsK4T9DcSvFGxNBx'
global.yt = 'https://youtube.com/@xx'
global.nekorin = "https://api.nekorinn.my.id"
global.idgc = "120363399209756764@g.us"
global.setprefix = ".", "/", "#"

global.tt = "@mzky896"
global.ig = "@mzky_zak"

global.doToken = "APIKEY"
global.linodeToken = "APIKEY"

global.egg = "15" 
global.nestid = "5" 
global.loc = "1" 
global.domain = "https://"
global.apikey = "ptla" 
global.capikey = "ptlc" 

global.thumbnail = 'https://files.catbox.moe/m9ritn.jpg'

global.mess = {
    owner: "Khusus mzkyzak",
    prem: "Khusus Premium",
    group: "Khusus di Group Chat",
    admin: "Khusus Admin",
    botadmin: "Bot Harus Jadi Admin",
    private: "Khusus di Private Chat",
    done: "Sukses"
}

global.packname = nama
global.author = namaBot

//
global.gamewaktu = 60 // Game waktu
global.suit = {};
global.tictactoe = {};
global.petakbom = {};
global.kuis = {};
global.siapakahaku = {};
global.asahotak = {};
global.susunkata = {};
global.caklontong = {};
global.family100 = {};
global.tebaklirik = {};
global.tebaklagu = {};
global.tebakgambar2 = {};
global.tebakkimia = {};
global.tebakkata = {};
global.tebakkalimat = {};
global.tebakbendera = {};
global.tebakanime = {};
global.kuismath = {};


let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
