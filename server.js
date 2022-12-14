require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/users", require('./routes/userRoute'));
app.use("/events", require('./routes/eventRoute'));
app.use("/games", require('./routes/gameRoute'));
app.use("/game-users", require('./routes/gameUserRoute'));
app.use("/friends", require('./routes/friendRoute'));
app.use("/event-invites", require('./routes/eventInviteRoute'));

app.listen(port, () => {
    console.log(`Listening on port ${process.env.API_PORT}`)
})