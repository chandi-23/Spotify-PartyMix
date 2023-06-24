import PartyModel from '../models/party-model.js';

export const createParty = (party) => PartyModel.create(party);
export const getPartyById = (partyId) => PartyModel.findById(partyId);
export const updateParty = (partyId, updates) => PartyModel.findByIdAndUpdate(partyId, updates, { new: true });
export const deleteParty = (partyId) => PartyModel.findByIdAndDelete(partyId);
export const getAllParties = () => PartyModel.find({});