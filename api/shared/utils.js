function randomString(length) {
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&(){}[]:?./|"
    const finalString = "";

    for (let i = 0; i < (length > caracteres.length ? caracteres.length : length); i++) {
        finalString += caracteres[Math.random() * caracteres.length]
    }
    return finalString;
}

exports.module = {
    randomString
}