const router = require("express").Router();
const uuid = require("../Utils/uuid");
const fs = require("fs");

router.get("/", (req, res) => {
  // This here gets all the notes from the DB
  console.info(`GOT YOUR ${req.method} REQUEST`);
  const datafromJSON = fs.readFileSync("./db/db.json", "utf8");
  res.json(JSON.parse(datafromJSON));
});

router.post("/", (req, res) => {
  // add we have the functions that adds the notes to the DB
  console.info(`GOT YOUR ${req.method} REQUEST`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    const currentNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    currentNotes.push(newNote);
console.log(currentNotes)
    fs.writeFile("db/db.json", JSON.stringify(currentNotes), (err) => {
      err
        ? console.error(err)
        : console.log(`Note for ${newNote.title} has been updated`);
    });
  }
  res.json(currentNotes)
});
//Deleting notes from database
router.delete("/:id", (req, res) => {
  let data = fs.readFileSync('./db/db.json', 'utf8');
  const datafromJSON = JSON.parse(data)

  const newNotes = datafromJSON.filter((note) => {
    return note.id !== req.params.id;
});
fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
  if (err) {
   console.error(err);
   return;
  }
  
 });
 res.json(newNotes);
});


module.exports = router;
