import mongoose from 'mongoose';

const expenceSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
        default: 'expense'
    },

    amount:{
        type: Number,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true,
        index: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Expence = mongoose.model('expenses', expenceSchema)

export default Expence;