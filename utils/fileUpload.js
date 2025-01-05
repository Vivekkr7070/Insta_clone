// // const multer = require('multer');
// // const path = require('path');

// // // Configure storage for file uploads
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, 'uploads/messages');  // Save files in an 'uploads/messages' folder
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + path.extname(file.originalname));
// //     }
// // });

// // const upload = multer({ storage });

// // module.exports = upload;


// const multer = require('multer');

// // Configure Multer for file uploads
// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         console.log(file);
//         console.log(req.file)
//         cb(null, 'uploads/'); // Directory where images will be stored
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         console.log(req.file)
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + file.originalname); // Unique file name
//     }
// });

// // File filter to accept only image files
// const fileFilter = (req, file, cb) => {
//     console.log(file);
//     console.log(req.file)

//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true); // Accept the file
//     } else {
//         cb(new Error('Invalid file type. Only images are allowed.'), false); // Reject the file
//     }
// };

// // Multer upload middleware
// const upload = multer({ storage, fileFilter });

// module.exports = upload;


//for upload image with specific path in database..

// const multer = require('multer');

// const Upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, "./public/uploads")
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.fieldname + "-" + Date.now() + ".jpg")
//         }
//     })
// }).single('image')

// module.exports = Upload;


const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only images are allowed'), false);
    }
    cb(null, true);
};

const Upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
}).single('image');

module.exports = Upload;