import * as userDao from "./user-dao.js";

const registerUser = async (req, res) => {
  try {
    const savedUser = await userDao.createUser(req.body);
    const userJsonString = JSON.stringify(user);
    res.cookie('user', userJsonString, { maxAge: 3600000, httpOnly: true });
  
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await userDao.getUserByCredentials(emailId, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const userJsonString = JSON.stringify(user);
    res.cookie('user', userJsonString, { maxAge: 3600000, httpOnly: true });
    
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCurrentUser = (req, res) => {
  const userCookie = req.cookies.user;
  const currentUser = JSON.parse(userCookie);
  if (currentUser) {
    res.json(currentUser);
  } else {
    res.sendStatus(403);
  }
};

const getAllHosts = async (req, res) => {
    try {
      const hosts = await userDao.getUsersByUserType();
      res.json(hosts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve hosts' });
    }
  };

const updateCurrentUser = async (req, res) => {
  try {
    const userCookie = req.cookies.user;
    const currentUser = JSON.parse(userCookie);

    if (!currentUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updatedUser = await userDao.updateUser(currentUser._id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const userJsonString = JSON.stringify(updatedUser);
    res.cookie('user', userJsonString, { maxAge: 3600000, httpOnly: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('user');
  res.json({ message: "Logout successful" });
};

const getUserType = async (req, res) => {
  try {
    const username  = req.params.username;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await userDao.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ userType: user.usertype });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default (app) => {
  app.post("/api/users/register", registerUser);
  app.post("/api/users/login", loginUser);
  app.get("/api/users/profile", getCurrentUser);
  app.get("/api/users/getAllHostDetails", getAllHosts);
  app.put("/api/users/profile", updateCurrentUser);
  app.post("/api/users/logout", logoutUser);
  app.get("/api/users/userType/:username", getUserType);
};
