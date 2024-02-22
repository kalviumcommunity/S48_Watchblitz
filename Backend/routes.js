const express = require('express');
const router = express.Router();

let userdata = [
    { id: 1, firstname: 'Bhuvan', lastname:'V', DOB:'20th Aug'},
    {  id: 2, firstname: 'Pawan', lastname:'O', DOB:'25th Nov'},
    {  id: 3, firstname: 'Yuvraj', lastname:'J', DOB:'5th Nov'}
];

router.get('/userdata', (req, res) => {
    res.json(userdata);
});

router.get('/userdata/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userdata.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

router.post('/userdata', (req, res) => {
    const newUser = {
        id: userdata.length + 1, 
        firstname : 'Sajit',
        lastname: 'M',
        DOB : '23rd Sep'
    };
    userdata.push(newUser);
    res.status(201).json(newUser);
});

router.put('/userdata/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = userdata.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { name, email } = req.body;
    userdata[userIndex].name = name;
    userdata[userIndex].email = email;
    res.json(userdata[userIndex]);
});

router.delete('/userdata/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    userdata = userdata.filter(user => user.id !== userId);
    res.json({ message: 'User deleted successfully' });
});

module.exports = router;