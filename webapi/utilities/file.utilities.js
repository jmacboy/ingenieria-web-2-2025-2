exports.deleteFile = (filePath) => {
    const fs = require('fs');
    // eslint-disable-next-line no-undef
    fs.unlinkSync(filePath);
}