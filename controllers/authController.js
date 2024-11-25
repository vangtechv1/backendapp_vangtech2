const User = require('../models/user');

exports.signup = async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email dan password harus diisi' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User ini sudah terdaftar' });
        }

        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: 'User ini berhasil terdaftar' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Signup gagal silahkan coba lagi ' });
    }
};


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.status(201).json({ message: 'Signin successful', userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User ini tidak terdaftar' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password baru berhasil terdaftar' });
    } catch (error) {
        res.status(500).json({ error: 'Kesalahan mengupdate password' });
    }
};