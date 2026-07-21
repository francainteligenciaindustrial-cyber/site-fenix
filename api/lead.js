const { getSql, ensureTable } = require('../lib/db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { nome, telefone, modalidade, comoChegou, faixaEtaria, genero, objetivo } = req.body || {};

  if (!nome || !telefone || !modalidade) {
    res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    return;
  }

  try {
    const sql = getSql();
    await ensureTable(sql);
    await sql`
      INSERT INTO leads (nome, telefone, modalidade, como_chegou, faixa_etaria, genero, objetivo)
      VALUES (${nome}, ${telefone}, ${modalidade}, ${comoChegou || null}, ${faixaEtaria || null}, ${genero || null}, ${objetivo || null})
    `;
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
  }
};
