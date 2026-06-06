const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    return await bcrypt.hash(password, await bcrypt.genSalt(13))
}

const compareHash = async (plain, hashed) => {
    try {
        const isMatch = await bcrypt.compare(plain, hashed)
        return isMatch; 
    } catch (error) {
        console.error(error);
        return false
    }
}

module.exports = { hashPassword, compareHash }