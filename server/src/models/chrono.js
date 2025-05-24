import mongoose from "mongoose";

const ChronoSchema = new mongoose.Schema({
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
    default: Date.now,
    required: true 
  },
  chronostopped: {
    type: Date, 
    default: Date.now,
    //required: true
  }, 
  sessionsCompleted: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: null
  } 
});

export default mongoose.model('Chrono', ChronoSchema);
