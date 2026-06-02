const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const RIOT_KEY = process.env.RIOT_API_KEY;

app.get("/riot/*", async (req, res) => {
    try {
        const riotUrl =
            "https://" +
            req.params[0];

        const response = await fetch(riotUrl, {
            headers: {
                "X-Riot-Token": RIOT_KEY
            }
        });

        const data = await response.json();

        res.status(response.status).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

app.listen(process.env.PORT || 3000);
