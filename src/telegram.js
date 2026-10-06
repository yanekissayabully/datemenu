const TOKEN = import.meta.env.VITE_TG_TOKEN
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID

export const telegramConfigured = Boolean(TOKEN && CHAT_ID)

export function buildMessage({ steak, doneness, side, drink, comment }) {
  const lines = [
    '💗 <b>DATEMENU: Tomimimi сделала выбор</b>',
    '',
    `🥩 Стейк: <b>${steak.name}</b> (${steak.meta})`,
    `🔥 Прожарка: <b>${doneness.name}</b> (${doneness.desc})`,
    `🍟 Гарнир: <b>${side.name}</b>`,
    '🥗 Салат: входит в набор',
    `🥤 Напиток: <b>${drink.name}</b>`,
  ]
  if (comment.trim()) lines.push('', `💬 Пожелание: ${escapeHtml(comment.trim())}`)
  return lines.join('\n')
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function sendToTelegram(order) {
  if (!telegramConfigured) throw new Error('Telegram не настроен')
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: buildMessage(order),
      parse_mode: 'HTML',
    }),
  })
  if (!res.ok) throw new Error(`Telegram ответил ${res.status}`)
}
