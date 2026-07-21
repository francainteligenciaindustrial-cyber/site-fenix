const crypto = require('crypto');
const { createSessionCookie } = require('../lib/session');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { password } = req.body || {};
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!password || !adminPassword) {
    res.status(401).json({ error: 'Credenciais inválidas' });
    return;
  }

  const a = Buffer.from(password);
  const b = Buffer.from(adminPassword);
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!valid) {
    res.status(401).json({ error: 'Credenciais inválidas' });
    return;
  }

  res.setHeader('Set-Cookie', createSessionCookie());
  res.status(200).json({ ok: true });
};
