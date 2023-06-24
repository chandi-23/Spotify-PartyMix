import mongoose from 'mongoose';
import partySchema from './party-schema.js';

const PartyModel = mongoose.model('PartyModel', partySchema);

export default PartyModel;

