import pkg from '@whiskeysockets/baileys';
const { prepareWAMessageMedia } = pkg;

const handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🏦', key: m.key } });

    const zack = 'https://envs.sh/WDg.jpg';
    let { dollar, limit, level, role, crystal, health, upgrader, wood, gold } = global.db.data.users[m.sender]
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let messageContent = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: { title: 'Zack' },
                    body: {
                        text: `˼🏦˹↜ مـࢪحـبـا بـك/ي ${taguser}
> ˼🪪˹↜ مــعــلــومــاتــك  ↶
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
*【⚜️┇مـــســـتواك ⟣  ${level} 】*
*【💫┇رتـبـتـك ⟣  ${role} 】*
*【🪙┇الــذهــب ⟣  ${gold} 】*
*【💷┇فــلــوســك ⟣  ${dollar} 】*
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
> ˼🏦˹↜  قــســم الــبــنـك↶
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
*❐『.بنك』*
*❐『.سحب』*
*❐『.ايداع』*
*❐『.ذهبي』*
*❐『.محفظة』*
*❐『.منجم_الذهب』*
*❐═━━━═╊⊰🦇⊱╉═━━━═❐*
> © 𝐵𝛩𝑇_𝑀𝐴𝑁𝐷𝛩 2025`,
                        subtitle: "HARLEY"
                    },
                    header: {
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({ image: { url: zack } }, { upload: conn.waUploadToServer }, { quoted: m }))
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "cta_url",
                                buttonParamsJson: '{"display_text":"⌈🤖╎قـنـاة الــبــوت╎🤖⌋","url":"https://whatsapp.com/channel/0029VarJdJO7dmeZS5ZKft1U","merchant_url":"https://api.whatsapp.com/send?phone=+201144987551"}'
                            },
                            {
                                name: "cta_url",
                                buttonParamsJson: '{"display_text":"⌈📲╎قـنـاة الـمـطـور╎📲⌋","url":"https://whatsapp.com/channel/0029VarJdJO7dmeZS5ZKft1U","merchant_url":"https://whatsapp.com/channel/0029VarJdJO7dmeZS5ZKft1U"}'
                            }
                        ]
                    }
                }
            }
        }
    };

    conn.relayMessage(m.chat, messageContent, {});
};

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['بنكك', 'bank', 'Bank', 'BANK'];

export default handler;
