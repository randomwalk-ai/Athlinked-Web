const loginModel = require('./login.model');
const { comparePassword } = require('../utils/hash');

/**
 * Authenticate user with email and password
 * @param {string} email - User email
 * @param {string} password - Plain text password
 * @returns {Promise<object>} Service result with user data if successful
 */
async function loginService(email, password) {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await loginModel.findByEmail(normalizedEmail);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare provided password with hashed password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login successful',
      user: {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        full_name: userWithoutPassword.full_name,
        user_type: userWithoutPassword.user_type,
        primary_sport: userWithoutPassword.primary_sport || null,
      },
    };
  } catch (error) {
    console.error('Login service error:', error.message);
    throw error;
  }
}

module.exports = {
  loginService,
};

