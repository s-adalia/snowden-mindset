const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '476306934446-6f3755lqe4m9jimq5vqctu1b8hefhhkp.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);


const PORT = process.env.PORT || 5001;

app.use(express.static('public'));

app.get("/",  (req, res) => {
	res.render("index");
})

app.get("/login", (req, res) => {
	res.render("login");
})

app.post('/login', (req,res)=>{
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success')
      })
      .catch(console.error);

})

app.get('/profile', checkAuthenticated, (req, res)=>{
    let user = req.user;
    res.render('profile', {user});
})

function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login')
      })

}


app.get("/login_index", (req, res) => {
	res.render("login_index");
})

app.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')

})

app.get('/protectedRoute', checkAuthenticated, (req,res)=>{
    res.send('This route is protected')
})

app.get("/survey_books", checkAuthenticated, (req, res) => {
	res.render("survey_books");
})

app.get("/survey_music", checkAuthenticated, (req, res) => {
	res.render("survey_music");
})

app.get("/admin", checkAuthenticated, (req, res) => {
	res.render("admin");
})

app.get("/edit_books", checkAuthenticated, (req, res) => {
	res.render("edit_books");
})

app.listen(PORT, () => {
	console.log("Server has started on: " + PORT);
    })

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));