const fs = require("fs").promises;
const path = require("path");

const clearImage = async (filePath) => {
  filePath = path.join(__dirname, "..", filePath);

  try {
    await fs.unlink(filePath);
    console.log(`Dosya başarıyla silindi: ${filePath}`);
  } catch (error) {
    console.error(`Dosya silinirken bir hata oluştu: ${error.message}`);
  }
};

module.exports = clearImage;
