function locationsController(db) {
  function index(req, res) {
    db
      .get('*')
      .from('locations')
      .then(data => console.log(data));

    res.send('This is the locations Controller');
  }
  return { index };
}

module.exports = locationsController;
