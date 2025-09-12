import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    mobile: number;
    isVerified: boolean;
    createdAt?: Date;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 180, partialFilterExpression: { isVerified: false } }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;