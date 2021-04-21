function utcController(db) {
  function index(req, res) {
    res.send('This is the UTC Controller');
  }
  return { index };
}

module.exports = utcController;
