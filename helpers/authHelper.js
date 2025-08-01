import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        console.log(error.message);
    }
}

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}