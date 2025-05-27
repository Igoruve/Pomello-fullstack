import mongoose from "mongoose";

const chronoSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  focusDuration: { 
    type: Number, 
    required: true 
  }, 
  breakDuration: { 
    type: Number, 
    required: true 
  }, 
  chronostarted: { 
    type: Date, 
    required: true 
  },
  chronostopped: {
    type: Date
  }, 
  sessionsCompleted: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  } 
});

export default mongoose.model('Chrono', chronoSchema);
