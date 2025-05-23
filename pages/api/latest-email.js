export default async function handler(req, res) {
  const address = "redbliss@dcpa.net";
  const password = "zaQ5@hPcw5";

  // 1. Get access token
  const loginResp = await fetch("https://api.mail.tm/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });

  if (!loginResp.ok) {
    return res.status(401).json({ error: "Login failed" });
  }

  const { token } = await loginResp.json();

  // 2. Fetch messages
  const msgListResp = await fetch("https://api.mail.tm/messages", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const msgList = await msgListResp.json();
  const messages = msgList["hydra:member"];

  const targetMsg = messages.find(
    (m) => m.from.address === "no-reply@skinape.com"
  );

  if (!targetMsg) {
    return res.json({ body: "No email from no-reply@skinape.com yet." });
  }

  // 3. Get full message
  const msgResp = await fetch(`https://api.mail.tm/messages/${targetMsg.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const fullMessage = await msgResp.json();
  res.json({ body: fullMessage.text || fullMessage.html });
}
