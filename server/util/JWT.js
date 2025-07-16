const jwt = require("jsonwebtoken")
const secret = "huang"
const JWT = {
    generate(value, expires){
        return jwt.sign(value, secret, { expiresIn: expires })
    },
    verify(token){
       try {
         return jwt.verify(token, secret)
       } catch (error) {
        return false
       }
    }
}
// const tk = JWT.generate({name:"huang"}, "5s")
// console.log(JWT.verify(tk));
// setTimeout(()=>{
//     console.log(JWT.verify(tk));
// }, 5500)
module.exports = JWT