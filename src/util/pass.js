const crypto = require('crypto');

const CONFIG = {
    algorithm : "sha512",
    salt : "c706107ed2197810d37fb79d6a80c8fb",
    type : "hex",
    random: 16,
};

const setPassword = (password) => {
    return crypto.pbkdf2Sync(password, CONFIG.salt, 1000, 64, CONFIG.algorithm).toString(CONFIG.type); 
};

const validPassword = (password, hashDb) => { 
    var hash = crypto.pbkdf2Sync(password, CONFIG.salt, 1000, 64, CONFIG.algorithm).toString(CONFIG.type); 
    return hashDb === hash; 
}

module.exports = {
    setPassword,
    validPassword
}