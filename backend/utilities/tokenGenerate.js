import jwt from 'jsonwebtoken'

const genToken= (id) => {
    return jwt.sign({id}, process.env.JWT_SCRT_KEY, {
        expiresIn:'30d'
    })
}

export default genToken