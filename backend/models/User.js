

const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
      "Please enter a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    validate: {
      validator: function (value) {
        // يجب أن تحتوي على حرف كبير وصغير ورقم وحرف خاص
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      },
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    }
  },

  phonenumber:{
    type:String,
    required: [true, "phonenumber is required"],
     match: [/^01[0-2,5]{1}[0-9]{8}$/, "Please enter a valid Egyptian phone number"]

  },

  city:{
    type:String,
     required: [true, "Password is required"],
    
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student"
  },
  preferences: {
    language: {
      type: String,
      default: "en"
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    notifications: {
      type: Boolean,
      default: true
    }
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true          //option ودى طريقة كتابتها مش زى الخصائص التانيه كده هيضفلى تاريخ التسجيل وتاريخ التعديل فى المنجوز 
});


//hash

userSchema.pre("save", async function (next) {
  // فقط لو الباسورد اتغير أو جديد، نعمل هاش
  if (!this.isModified("password")) {
    return next(); // متعملش حاجة وروّح
  }

  try {
    const salt = await bcrypt.genSalt(10); // ممكن تستخدم genSaltSync بردو
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


const usermodule = mongoose.model("User", userSchema);

module.exports = usermodule;
