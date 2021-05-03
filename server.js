const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {

	res.send("Yo man. I like burgers, wbu? We need to be careful");
	})

app.listen(PORT, () => {
	console.log("Server has started on: " + PORT);
    })
