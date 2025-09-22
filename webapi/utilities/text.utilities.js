exports.generateFileName = (extension) => {
    const crypto = require("crypto");
    return crypto.randomUUID() + "." + extension;
}