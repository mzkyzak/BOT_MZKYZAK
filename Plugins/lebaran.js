module.exports = async (m, { mzkyzak }) => {

const delay = ms => new Promise(res => setTimeout(res, ms))

const text = `Halo 👋 kawan-kawanku semuanya.

Saya adalah bot mzkyzak yang berjalan secara otomatis 🤖, jadi mohon untuk tidak melakukan spam agar bot tetap berjalan dengan baik dan tidak mengalami error ⚠️.

Menjelang Hari Raya Idul Fitri 1447 H yang insyaAllah akan kita rayakan besok, 21 Maret 2026, saya ingin menyampaikan sesuatu kepada kalian semua nihh🥺🥺

saya Taufiq ingin memohon maaf yang sebesar-besarnya yaa temen-teman. 🙏🙏
Apabila selama ini ada perkataan, sikap, ataupun perbuatan saya yang kurang baik, membuat kalian tidak nyaman, tersinggung, atau merasa tidak dihargai, baik yang disengaja maupun yang tidak disengaja, saya dengan tulus memohon maaf yaa dari hati yang paling dalam. 😔🙏

Saya menyadari bahwa sebagai manusia tidak luput dari kesalahan. Oleh karena itu, di hari yang baik ini saya berharap kita semua bisa saling memaafkan, melupakan kesalahan di masa lalu, dan memulai kebaikan di masa depan dan kembali dengan hati yang lebih bersih serta hubungan yang lebih baik.

Semoga di hari yang penuh berkah ini Allah SWT memberikan kita kesehatan, umur yang panjang, keberkahan dalam hidup, serta menjadikan kita pribadi yang lebih baik dari sebelumnya.😭😭🥺

Selamat Hari Raya Idul Fitri 1447 H.🙏🙏🙏

Taqabbalallahu minna wa minkum, shiyamana wa shiyamakum.
Minal aidin wal faizin.
Mohon maaf lahir dan batin.

Semoga Allah SWT menerima amal ibadah kita semua dan amal kebaikan kita menjadikan kita yang lebih baik di masa yang akan datang. 🤲🤲🤲✨

INGIN BERMAIN BOT ?? KETIK (.menu) wajib di pribadi. Tapi ini hanya sementara saja??
`

const aiQuotes = [
"Memaafkan bukan berarti melupakan, tapi memilih untuk melepaskan beban di hati agar kita bisa melangkah dengan lebih tenang dan damai.",
"Di hari yang suci ini, mari kita belajar untuk saling memaafkan, karena setiap hati pasti pernah salah dan setiap jiwa layak mendapatkan kesempatan.",
"Tidak ada manusia yang sempurna, tapi dengan saling memaafkan, kita bisa memperbaiki hubungan dan menjadi pribadi yang lebih baik.",
"Kadang yang paling sulit bukan meminta maaf, tapi membuka hati untuk memaafkan. Namun di situlah letak keindahan sebuah kedamaian.",
"Memaafkan adalah langkah kecil yang membawa perubahan besar, karena dari hati yang bersih lahir hubungan yang lebih indah.",
"Maaf yang tulus mampu menghapus jarak, memperbaiki hubungan, dan menguatkan kembali kebersamaan.",
"Di balik kata maaf, ada harapan untuk memperbaiki dan memulai kembali dengan hati yang lebih baik.",
"Memaafkan adalah bentuk kekuatan, bukan kelemahan, karena hanya hati yang besar yang mampu melakukannya."
]

const quote = aiQuotes[Math.floor(Math.random() * aiQuotes.length)]

try {

await mzkyzak.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

const msg = await mzkyzak.sendMessage(
m.chat,
{ text: "🤖 Memulai mode silaturahmi..." },
{ quoted: m }
)

// INTRO BOT
const introLines = [
"🤖 Mengaktifkan sistem bot mzkyzak...",
"⚙️ Memuat modul silaturahmi...",
"📡 Menghubungkan ke server kebaikan...",
"💡 Menyiapkan pesan penuh makna...",
"✨ Hampir selesai, bot akan mengetik.."
]

let introOutput = ""

for (let line of introLines) {
introOutput += line + "\n"

await mzkyzak.sendMessage(m.chat, {
text: introOutput + "▌",
edit: msg.key
})

await delay(3000)
}

// LOADING
const loading = [
"[░░░░░░░░░░] 0%",
"[██░░░░░░░░] 20%",
"[████░░░░░░] 40%",
"[██████░░░░] 60%",
"[████████░░] 80%",
"[██████████] 100%"
]

for (let step of loading) {
await delay(4000)

await mzkyzak.sendMessage(m.chat, {
text: step,
edit: msg.key
})
}


// ANIMASI PER 1 HURUF
let output = ""

for (let i = 0; i < text.length; i++) {

  output += text[i]

  await mzkyzak.sendMessage(m.chat, {
    text: output + "▌",
    edit: msg.key
  })

  await delay(40) 
}

// PENUTUP
const finalMsg = `${output}

╭───「 💡 AI Motivation 」
│
│ "${quote}"
│
╰────────────`

await delay(2000)

await mzkyzak.sendMessage(m.chat, {
text: finalMsg,
edit: msg.key
})

// 🎵 AUDIO DI AKHIR (FIX DI SINI)
await mzkyzak.sendMessage(m.chat, {
audio: require("fs").readFileSync("./Audio_mzkyzak.mp3"),
mimetype: "audio/mpeg",
ptt: true
})

await mzkyzak.sendMessage(m.chat, {
react: { text: "🎉", key: m.key }
})

} catch (err) {
console.error("Error silaturahmi:", err)
}

}

module.exports.command = ["silaturahmi"]