const jwt = require('jsonwebtoken');

const generateSign = (id, email) => {
    return jwt.sign(
        //Este es el payload, aqui se inserta la información que 
        //queremos que contenga nuestro token.
        {id, email}, 
        //en este punto como segundo parametro se configura si se utiliza clave privada o publica
        process.env.JWT_KEY, 
        {expiresIn: '1h'})
}


const verifySign = (token) => {
    return jwt.verify(token, process.env.JWT_KEY)
}

module.exports = {generateSign, verifySign};