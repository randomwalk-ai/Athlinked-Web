const pool = require('../config/db');

/**
 * Find user by email
 * @param {string} email - User email
 * @returns {Promise<object|null>} User data with password or null
 */
async function findByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
}

module.exports = {
  findByEmail,
};

