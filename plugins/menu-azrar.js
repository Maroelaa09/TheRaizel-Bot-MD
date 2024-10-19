import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

const handler = async (m, { conn, usedPrefix }) => {
    let d = new Date();
    d.setTime(d.getTime() + 3600000); // تعديل وقت الساعة بإضافة ساعة
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender] || {};
    let name = conn.getName(m.sender) || 'مستخدم';
    let { dollar = 0, gold = 0, exp = 0, level = 0, role = 'مستخدم' } = user;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered === true).length;

    await conn.sendMessage(m.chat, { react: { text: '📜', key: m.key } });

    // إرسال المقطع الصوتي أولاً
    await conn.sendMessage(m.chat, { 
        audio: { 
            url: 'https://files.catbox.moe/rwgiqt.aac' 
        }, 
        mimetype: 'audio/mpeg', 
        ptt: true 
    }, { quoted: m });

    // تجهيز الصورة
    const images = [
        'https://envs.sh/I_W.jpg',
        'https://envs.sh/pFb.jpg',
        'https://envs.sh/pFi.jpg'
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];
    var messa = await prepareWAMessageMedia({ image: { url: randomImage } }, { upload: conn.waUploadToServer });

    // إرسال القائمة
    conn.relayMessage(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: `˼🦇˹↜ مـࢪحـبـا بـك/ي @${mentionId.split('@')[0]}
*⌊🪪┇مـعـلـومـاتـك┇🪪⌉*
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
*【⚜️┇مـــســـتواك ⟣  ${level} 】*
*【💫┇رتـبـتـك ⟣  ${role} 】*
*【💷┇فــلــوســك ⟣  ${dollar} 】*
*【🪙┇الــذهــب ⟣  ${gold} 】*
*【🦇┇الـنـقـاط ⟣  ${exp} 】*
*●━── ⊱•┇«🦇»┇•⊰ ──━●*
*⌊🤖┇الــبــوت┇🤖⌉*
*●━── ⊱•┇«🦇»┇•⊰ ──━●*
*【🦇┇اسم البوت ⟣  رايـزل 】*
*【📌┇الـتـشـغـيل ⟣  ${uptime} 】*
*【📅┇الــيــوم ⟣  ${week} 】*
*【🎶┇الــمــســتـخـدمـيـن ⟣  ${rtotalreg} 】*
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
> © 𝐍𝐀𝐑𝐔𝐓𝐎 & 𝐙𝐀𝐂𝐊 2025`
                    },
                    footer: {
                        text: 'By © 𝐍𝐀𝐑𝐔𝐓𝐎 & 𝐙𝐀𝐂𝐊'
                    },
                    header: {
                        title: '',
                        hasMediaAttachment: true,
                        imageMessage: messa.imageMessage,
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({
                                    title: '⌈🦇╎اوامــر الــبــوت╎🦇⌋',
                                    sections: [
                                        {
                                            title: 'اوامــر المطور',
                                            rows: [
                                                { header: 'تعريف المطور', title: 'تعريف المطور', id: '.المعرف' },
                                                { header: 'قائمه المطور', title: 'قسم المطور', id: '.ق3' }
                                            ]
                                        },
                                        {
                                            title: 'القسم الاول',
                                            rows: [
                                                { header: '⌈🦇╎قائمة الاعضاء╎🦇⌋', title: '⌈🦇╎الاعضاء╎🦇⌋', id: '.ق1' },
                                                { header: 'قائمة البحث', title: 'البحث', id: '.ق11' },
                                                { header: 'قائمة الAi', title: 'Ai', id: '.ق7' }
                                            ]
                                                                                  },
                                        {
                                            title: 'القسم الاول',
                                            rows: [
                                                { header: 'قائمة التنزيلات', title: 'التنزيلات', id: '.ق4' },
                                                { header: 'قائمة البحث', title: 'البحث', id: '.ق11' },
                                                { header: 'قائمة الAi', title: 'Ai', id: '.ق7' }
                                            ]
                                        }
                                    ]
                                }),
                                messageParamsJson: "Raizel Bot"
                            }
                        ]
                    }
                }
            }
        }
    }, {});
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['اوامر', 'الاوامر', 'menu', 'ازرار'];
