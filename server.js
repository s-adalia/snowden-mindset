const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.static('public'));

app.get("/", (req, res) => {
	res.render("index");
})

app.get("/survey_books", (req, res) => {
	res.render("survey_books");
})

app.get("/survey_music", (req, res) => {
	res.render("survey_music");
})

app.get("/admin", (req, res) => {
	res.render("admin");
})

app.listen(PORT, () => {
	console.log("Server has started on: " + PORT);
    })

app.set("view engine", "ejs");