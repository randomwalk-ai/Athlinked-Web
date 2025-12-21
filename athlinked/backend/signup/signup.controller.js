const signupService = require('./signup.service');
const { validateSignup } = require('./signup.validation');

/**
 * Controller to handle signup start request (generates and sends OTP)
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
async function startSignup(req, res) {
  try {
    const validation = validateSignup(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      });
    }

    const result = await signupService.startSignupService(req.body);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Start signup error:', error);

    if (error.message === 'Email already registered') {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message.includes('SMTP') || error.message.includes('email')) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
}

/**
 * Controller to handle OTP verification and user creation
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required',
      });
    }

    const emailValidation = validateSignup({ email });
    if (!emailValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        errors: emailValidation.errors,
      });
    }

    const result = await signupService.verifyOtpService(email.toLowerCase().trim(), otp.trim());

    return res.status(200).json(result);
  } catch (error) {
    console.error('Verify OTP error:', error);

    if (error.errorType === 'EXPIRED') {
      return res.status(410).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.errorType === 'NOT_FOUND' ||
      error.errorType === 'INVALID' ||
      error.message.includes('OTP not found') ||
      error.message.includes('expired') ||
      error.message.includes('Invalid OTP')
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === 'Email already registered') {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
}

module.exports = {
  startSignup,
  verifyOtp,
};

