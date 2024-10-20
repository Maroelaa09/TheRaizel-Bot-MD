// الراجل الغامض، عمك

const userSpamData = {}
let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems}) {
  const chat = global.db.data.chats[m.chat]
  if (!m.isGroup) return
  if (chat.modoadmin) return  
  if (isOwner || isAdmin || !isBotAdmin || isPrems) return

  let user = global.db.data.users[m.sender]
  const sender = m.sender
  const currentTime = new Date().getTime()
  const timeWindow = 5000 // المدة الزمنية اللي مسموح بيها
  const messageLimit = 5 // عدد الرسائل في الوقت ده

  let time, time2, time3, mensaje
  time = 60000 // 1 دقيقة
  time2 = 120000 // 2 دقيقة
  time3 = 360000 // 4 دقائق

  if (!(sender in userSpamData)) {
    userSpamData[sender] = {
      lastMessageTime: currentTime,
      messageCount: 1,
      antiBan: 0, 
      message: 0,
      message2: 0,
      message3: 0,
    }
  } else {
    const userData = userSpamData[sender]
    const timeDifference = currentTime - userData.lastMessageTime

    if (userData.antiBan === 1) {
      if (userData.message < 1) {
        userData.message++  
        mensaje = `*بقولك يا @${m.sender.split`@`[0]} خف علينا شوية مش كده! 😂*\n*خدلك دقيقة بريك من الأوامر*\n\n*عشانك سبام بسيط*\n\n⚠️ \`\`\`1/3 ده أول إنذار\`\`\` ⚠️`
        await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] })  
      }
    } else if (userData.antiBan === 2) {
      if (userData.message2 < 1) {
        userData.message2++  
        mensaje = `*يا @${m.sender.split`@`[0]}، انت لسه مكمل في السبام؟ 🙄*\n*خد دقيقتين بريك دلوقتي*\n*لو كملت، هنضطر نخرجك من الجروب*\n\n⚠️ \`\`\`2/3 ده تاني إنذار\`\`\` ⚠️`
        await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] })  
      }
    } else if (userData.antiBan === 3) {
      if (userData.message3 < 1) {
        userData.message3++  
        mensaje = `*يا @${m.sender.split`@`[0]}، انت بتهزر معانا؟ 😂*\n*كفاية بقى سبام، هنتصرف معاك دلوقتي!\nبرا يحيوان🤡\n\n⚠️ \`\`\` الانذار التالت دة 3/3\`\`\` ⚠️`*`
        await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] })  
        await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
      }
    }

    if (timeDifference <= timeWindow) {
      userData.messageCount += 1

      if (userData.messageCount >= messageLimit) {
        const mention = `@${sender.split("@")[0]}`
        const warningMessage = `*يا ${mention}، متعملش كده تاني، السبام مش مرحب بيه هنا!*`
        if (userData.antiBan > 2) return
        await conn.reply(m.chat, warningMessage, m, { mentions: [m.sender] })  
        user.banned = true
        userData.antiBan++
        userData.messageCount = 1
                
        if (userData.antiBan === 1) {
          setTimeout(() => {
            if (userData.antiBan === 1) {
              userData.antiBan = 0
              userData.message = 0
              userData.message2 = 0
              userData.message3 = 0
              user.banned = false
            }
          }, time) 
        } else if (userData.antiBan === 2) {
          setTimeout(() => {
            if (userData.antiBan === 2) {
              userData.antiBan = 0
              userData.message = 0
              userData.message2 = 0
              userData.message3 = 0
              user.banned = false
            }
          }, time2) 
        } else if (userData.antiBan === 3) {
          setTimeout(() => {
            if (userData.antiBan === 3) {
              userData.antiBan = 0
              userData.message = 0
              userData.message2 = 0
              userData.message3 = 0
              user.banned = false
            }
          }, time3)
        }
      }
    } else {
      if (timeDifference >= 2000) {
        userData.messageCount = 1
      }
    }
    userData.lastMessageTime = currentTime
  }
}

export default handler