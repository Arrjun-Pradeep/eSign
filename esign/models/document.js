var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2')

const schema = new mongoose.Schema({
    email: String,
    from: String,
    to: String,
    id: String,
    subject: String,
    recieverName: String,
    message: String,
    link: String,
    filePath: {
        dir: String,
        name: String
    },
    signedFilePath: {
        dir: String,
        name: String
    },
    transactionHash: String,
    metadata: {
        sender: String,
        reciever: String,
        id: String,
        signature: String,
        document: String
    },
    timestamp: {
        type: String,
        default: new Date().getTime()
    }
}, { collection: 'documents' })

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('documents', schema)