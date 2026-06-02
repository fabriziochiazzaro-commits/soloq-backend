const cache = new Map();

app.get("/riot/*", async (req, res) => {
  try {
    const riotUrl = "https://" + req.params[0];

    const cached = cache.get(riotUrl);

    if (cached && Date.now() - cached.time < 60000) {
      return res.status(cached.status).json(cached.data);
    }

    const response = await fetch(riotUrl, {
      headers: {
        "X-Riot-Token": RIOT_KEY
      }
    });

    const data = await response.json();

    cache.set(riotUrl, {
      data,
      status: response.status,
      time: Date.now()
    });

    res.status(response.status).json(data);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
});
