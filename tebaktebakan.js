const { fetchUrl, sleep } = require("../../lib/Function")

module.exports = {
    name: "tebaktebakan",
    alias: ["tebakan"],
    desc: "Entertaiment Tebak Tebakan",
    type: "entertainment",
    start: async(GojoMdNx, m) => {
        if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
        let fetch = await fetchUrl(global.api("zenz", "/api/tebaktebakan", {}, "apikey"))
        let result = await fetch.result
        GojoMdNx.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
            tebaktebakan[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
            console.log("Jawaban: " + result.jawaban)
        })
        await sleep(30000)
        if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0])) {
            GojoMdNx.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tebaktebakan[m.sender.split('@')[0]]}`, m)
            delete tebaktebakan[m.sender.split('@')[0]]
        }
    }
}
