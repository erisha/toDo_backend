import {Router} from 'express';
import Profile from '../models/profiles.js';


const router = new Router();


router.get('/', async(req, res) => {
    const profiles = await Profile.find({}).populate({path: "user_id"});
    res.json(profiles);
});


router.get('/:id', async (req,res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({msg: 'Resource Not Found!'});
        else res.status(200).json(profile);
    } catch (error) {
        console.log(error);
    }

});



export default router;