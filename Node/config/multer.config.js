const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'imgs')
    },
    filename : (req,file,cb)=>{
        cb(null, Date.now() + "_" + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif","image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"));
    }
};

// Middleware لقبول صور متعددة
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // حجم الصورة 2 ميجابايت كحد أقصى
});
// قبول الصورة الأساسية وصور إضافية
const uploadFields = upload.fields([
    { name: "image", maxCount: 1 }, // صورة أساسية واحدة
    { name: "images", maxCount: 5 } // حتى 5 صور إضافية
]);
module.exports = upload;
