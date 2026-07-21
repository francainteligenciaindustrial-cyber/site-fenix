const { neon } = require('@neondatabase/serverless');

let sqlClient;

function getSql() {
  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL);
  }
  return sqlClient;
}

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      telefone TEXT NOT NULL,
      modalidade TEXT NOT NULL,
      como_chegou TEXT,
      faixa_etaria TEXT,
      genero TEXT,
      objetivo TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

module.exports = { getSql, ensureTable };
