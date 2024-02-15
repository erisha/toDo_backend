import { Router } from "express";
import User from "../models/users"
import bcrypt from 'bcrypt'

const router = new Router();


// GET returns all users

router.get("/", async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
  });
  
 
   //GET /:id  returns a user by id
   
  router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) return res.status(404).json({ msg: "Resource not found!" });
    else res.json(user);
  });
  

   // POST creates a new user and a profile for the user
  
  router.post("/", async (req, res) => {
    console.log(req.body);
   try {
    const user = await User.create(req.body);
    await Profile.create({user_id: user._id});
  
    res.status(203).json(user);
  
   } catch (error) {
    console.log(error);
   }
  });
  
  
    //PUT /:id update user

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
  
      //! Stops request from updating the user's password
      if (body.password) {
        delete body.password;
        console.log('Password removed from body');
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
      res.json(updatedUser);
  
    } catch (error) {
      console.log(error);
      res.json({msg: 'User Not found!'})
    }
  });
  
  // DELETE /:id
   
  router.delete('/:id', async (req, res) => {
      const {id} = req.params;
      try {
          const deletedUser = await User.findByIdAndDelete(id);
          res.json({msg: "User deleted", deletedUser});
      } catch (error) {
          console.log(error);
      }
  });
  
  /**
PUT /:id/update-password
   * @param: client needs to send body: 
   * {
   *  currentPassword: "my old password"
   *  newPassword: "my new password"
   * }
   * 
   * We can use NodeMailer here to send emails before updating the password
   */
  router.put('/:id/update-password', async (req, res) => {
    try {
      const {id} = req.params;
      const {currentPassword, newPassword} = req.body;
  
      // find the user to update
      const user = await User.findById(id);
      if (!user) return res.status(404).json({msg: "User not found!"})
  
      // verify the old password with the password hash in db 
      const passwordMatched = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatched) {
        return res.status(401).json({msg: "Authentication Error"})
      }
  
      console.log('password matched!');
  
      // hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
      
      // set the old password hash to the newPassword hash
      await User.findByIdAndUpdate(id, {password: hashedPassword});
  
      res.json({msg: 'User password updated', user});
      
    } catch (error) {
      console.log(error);
    }
  });
  
  
  /**
   * POST /login
   * @description authenticates an user with email and password
   */
  router.post('/login', async (req, res) => {
    const {email, password} = req.body;
  
    // find user with the provided email
    const user = await User.findOne({email});
  
    if (!user) {
      return res.status(401).json({msg: "Invalid Credentials"});
    }
  
    // verify provided password with password hash from db
    const passwordMatched = await bcrypt.compare(password, user.password);
  
    if (!passwordMatched) {
      return res.status(401).json({msg: "Invalid Credentials password"})
    }
  
    // TODO: generate a jwt token and send it to the client
    res.json({msg: "User is logged in!", user});
  
  });
  


export default router;