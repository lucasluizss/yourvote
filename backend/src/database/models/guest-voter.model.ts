import mongoose, { Schema } from 'mongoose';

import IGuestVoterEntity from '../../domain/guest-voter/guest-voter.entity';

const VoteSchema: Schema = new mongoose.Schema({
  id: String,
  email: {
    type: String,
    required: true,
  },
  accessCode: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
<<<<<<< HEAD
    default: 1,
=======
    default: 0,
>>>>>>> f6f28b7975177ea911dfc790ab245405d130d8d6
  },
  userId: {
    type: String,
    required: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  expireAt: {
    type: Date,
    required: true,
  },
=======
>>>>>>> f6f28b7975177ea911dfc790ab245405d130d8d6
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: false,
		default: null,
  },
});

VoteSchema.path('email').validate((email: string) => {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'The e-mail field cannot be empty.');

export default mongoose.model<IGuestVoterEntity>(
  'GuestVoter',
  VoteSchema,
  'GuestVoters',
);
