const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    name: { 
        type: String 
    },
    path: {
         type: String 
    },
    size: { 
        type: Number 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("File" , FileSchema);
