function indexController() {
  function index(req, res) {
    res.send('This is the index Controller');
  }
  return { index };
}

module.exports = indexController;
