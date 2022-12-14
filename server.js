const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use("/users", require('./routes/userRoute'));
app.use("/events", require('./routes/eventRoute'));
app.use("/games", require('./routes/gameRoute'));
app.use("/game-users", require('./routes/gameUserRoute'));
app.use("/friends", require('./routes/friendRoute'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})