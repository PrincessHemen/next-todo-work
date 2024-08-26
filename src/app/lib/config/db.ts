import mongoose from 'mongoose';

export const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dbuser:todoapp@cluster0.rzemxh0.mongodb.net/');
        console.log('MongoDB connected');
    } catch (error) {
        if (error instanceof Error) {
            console.error('MongoDB connection error:', error.message);
            console.error('Full error details:', error);
        } else {
            console.error('Unexpected error:', error);
        }
    }
};
