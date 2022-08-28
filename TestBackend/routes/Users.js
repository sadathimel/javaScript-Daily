const router = require('express').Router();

let User = require('../models/user.model');

//receive dada
router.route('/').get((req, res) => {
    User.find()
        .then(Users => res.json(Users))
        .catch(err=> res.status(400).json('Error: ' + err));
});

//add data
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    const newUser = new User({name, age})
    newUser.save()
        .then(()=>res.json('User added!'))
        .catch(err=>res.status(400).json('Error: ' + err));
});

//delete data
router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(()=>res.json('User deleted.'))
        .catch((err)=>{res.status(400).json('Error: ' + err)});
})

//update data
router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(User=>{
            User.name = req.body.name;
            User.age = req.body.age;

            User.save()
            .then(()=>res.json('User updated!'))
            .catch(err=>res.status(400).json('Error: ' + err));
        })
        .catch(err=>res.status(400).json('Error: ' + err));
})

module.exports = router;