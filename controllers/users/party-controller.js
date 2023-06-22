// party-controller.js
import * as partyDao from './party-dao.js';
import * as userDao from "./user-dao.js";

const createParty = async (req, res) => {
  try {
    const newParty = req.body;
    const savedParty = await partyDao.createParty(newParty);
    console.log(savedParty)
    res.status(201).json(savedParty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPartyById = async (req, res) => {
  try {
    const partyId = req.params.id;
    const party = await partyDao.getPartyById(partyId);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }
    
    res.json(party);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateParty = async (req, res) => {
  try {
    const partyId = req.params.id;
    const updates = req.body;
    
    const updatedParty = await partyDao.updateParty(partyId, updates);
    
    if (!updatedParty) {
      return res.status(404).json({ error: 'Party not found' });
    }
    
    res.json(updatedParty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteParty = async (req, res) => {
    try {
      const partyId = req.params.id;
      const currentUser = req.session["currentUser"];
      
      const deletedParty = await partyDao.deleteParty(partyId);
      
      if (!deletedParty) {
        return res.status(404).json({ error: 'Party not found' });
      }
      
      // Delete tokens of users who are not the host and have the same token as the currentUser
      await userDao.deleteTokensByUserID(currentUser.token);
      
      res.json({ message: 'Party deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const getAllParties = async (req, res) => {
    try {
      const parties = await partyDao.getAllParties();
      res.json(parties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const joinParty = async (req, res) => {
    try {
      const partyId = req.params.id;
      const currentUser = req.session["currentUser"];
  
      if (!currentUser) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      const party = await partyDao.getPartyById(partyId);
  
      if (!party) {
        return res.status(404).json({ error: "Party not found" });
      }
  
      const hostUser = await userDao.getUserByUsername(party.hostName);
  
      if (!hostUser) {
        return res.status(404).json({ error: "Host user not found" });
      }
  
      currentUser.token = hostUser.token; // Update current user's token with host user's token
      await userDao.updateUser(currentUser._id, currentUser);
  
      res.json({ message: "Joined party successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

export default (app) => {
  app.post('/api/party/create', createParty);
  app.get('/api/party/:id', getPartyById);
  app.put('/api/party/:id', updateParty);
  app.delete('/api/party/:id', deleteParty);
  app.get('/api/party/all', getAllParties);
  app.get('/api/party/join/:id', joinParty);
};

