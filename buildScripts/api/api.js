import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config';
import { FAKEEMPLOYEEDATA } from './fakeEmployeeData';

let router = express.Router();

router.post('/auth', (req, res) => {
 // const { email, password } = req.body;
/*
    const token = jwt.sign({
                id: 'michael',
                username: 'xUser'
            }, config.jwtSecret);
  
    res.json({ token });
  */
    res.status(401).send({ errors: 'invalid credentialss'});

});


 
 router.get('/employees', (req, res) => {
  res.json(FAKEEMPLOYEEDATA);
  //   res.status(401).send({ errors: 'no employees credentialss'});
 
 });
 

  /*
  User.query({

    if (user) {
      if (bcrypt.compareSync(password, user.get('password_digest'))) {
        const token = jwt.sign({
          id: user.get('id'),
          username: user.get('username')
        }, config.jwtSecret);
        res.json({ token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } 
    else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  });
});
*/

export default router;
