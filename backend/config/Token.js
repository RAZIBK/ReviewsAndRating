var jwt = require('jsonwebtoken');
const generateAccessToken=(id)=>{
    console.log(id);
    return jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: '10d' })
};


module.exports={generateAccessToken};
