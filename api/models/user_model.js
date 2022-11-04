const mongoose = require('mongoose');


const emailValidation = (email) => {
    var regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regExp.test(email);
}

module.exports = mongoose.model(('User'), mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        validate: [emailValidation, "Veuillez saisir un email valide s'il vous plait par exemple exemple@domaine.com"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Veillez saisir un email valide s'il vous plait"]
    },
    phone: {
        code: String,
        number: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}))