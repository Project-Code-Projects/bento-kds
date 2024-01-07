import { model, Schema } from 'mongoose';
import { IRules } from '../../interfaces/rules.interface';

const ruleSchema = new Schema<IRules>({
  restaurantId: {
    type: String,
    required: true
  },
  efficiency: {
    type: Boolean,
    required: true,
    default: false
  },
  baseRules: {
    type: [{
      ruleType: {
        type: String,
        enum: ['Vip-InHouse', 'Delivery',' InHouse'],
        required: true
      },
      priority: {
        type: Number,
        required: true
      }
    }]
  },
  overrideRules: {
    type: [
      {
        title: {
          type: String,
          required: true
        },
        ruleType: {
          type: String,
          enum: ['DeliveryTime', 'InHouseWaitingTime', 'CourseGap'],
          required: true
        },
        maxTime: {
          type: Number,
          required: true
        }
      }
    ]
  }
});


const Rules = model('rules', ruleSchema);

export default Rules;