const crypto = require('crypto');

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias, em segundos
const COOKIE_NAME = 'fenix_session';

function sign(value) {
  return crypto.createHmac('sha256', process.env.SESSION_SECRET).update(value).digest('hex');
}

function createSessionCookie() {
  const expiry = Date.now() + SESSION_MAX_AGE * 1000;
  const signature = sign(String(expiry));
  return `${COOKIE_NAME}=${expiry}.${signature}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE}`;
}

function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

function isValidSession(cookieHeader) {
  if (!cookieHeader) return false;
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return false;

  const [expiry, signature] = match[1].split('.');
  if (!expiry || !signature) return false;

  const expected = sign(expiry);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  return Date.now() <= Number(expiry);
}

module.exports = { createSessionCookie, clearSessionCookie, isValidSession };
