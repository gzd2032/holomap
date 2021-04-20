function locationsController(db) {
  function index(req, res) {
    res.send('This is the locations Controller');
  }
  return { index };
}

module.exports = locationsController;
