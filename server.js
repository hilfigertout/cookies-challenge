const express = require( 'express' );
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;


app.use(cookieParser());

app.get('/hello', (req, res) => {
  if (req.cookies.login) {
    res.status(200).send(`Hello ${req.cookies.login}!`);
  } else {
    res.status(401).send("Who are you? You're not my mom! Get out!")
  }
});

  app.get(['/', '/login'], (req, res) => {
    let response = 'Please visit /login/[name] to log in as any user.';
    if (req.cookies.login) {
      response += `\nYou are currently logged in as ${req.cookies.login}`;
    } else {
      response += '\nYou are not currently logged in as anyone.'
    }
    res.status(200).send(response);
  });

  app.get('/login/:name', (req, res) => {
    res.cookie('login', req.params.name)
    res.status(200).send(`Logged in as ${req.params.name}!`);
  });


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
