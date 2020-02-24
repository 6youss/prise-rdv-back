import bcrypt from "bcryptjs";
import mongoose, { Schema, Document } from "mongoose";

export interface IUserType {
  value: "doctor" | "patient";
  targetId: Schema.Types.ObjectId;
}

export interface IUser extends Document {
  username: string;
  password: string;
  refreshToken: string;
  userType: IUserType;
  comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

const UserTypeSchema = new Schema(
  {
    value: {
      type: String,
      // Warning: only use valid Model names because it will be used in reference.model.refPath
      enum: ["doctor", "patient"]
    },
    targetId: {
      type: Schema.Types.ObjectId,
      refPath: "userType.value"
    }
  },
  {
    _id: false
  }
);

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: String,
  userType: UserTypeSchema
});

const comparePassword: comparePasswordFunction = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

/**
 * Password hash middleware.
 */
UserSchema.pre("save", function save(next) {
  const user = this as IUser;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = comparePassword;

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
