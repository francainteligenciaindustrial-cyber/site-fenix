const { getSql, ensureTable } = require('../lib/db');
const { isValidSession } = require('../lib/session');

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const sql = getSql();
    await ensureTable(sql);
    const rows = await sql`
      SELECT id, nome, telefone, modalidade, como_chegou, faixa_etaria, genero, objetivo, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 500
    `;
    res.status(200).json({ leads: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
  }
};
