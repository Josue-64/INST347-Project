// Exercise catalog (fake data, nothing is saved)
var exercises = [
  { name: "Barbell Bench Press", machine: "Barbell", grip: "Flat bench", muscle: "Chest" },
  { name: "Incline Dumbbell Press", machine: "Dumbbell", grip: "Incline bench", muscle: "Chest" },
  { name: "Cable Fly", machine: "Cable", grip: "D handles", muscle: "Chest" },
  { name: "Pull Up", machine: "Bodyweight", grip: "Wide grip", muscle: "Back" },
  { name: "Lat Pulldown", machine: "Cable", grip: "Wide bar", muscle: "Back" },
  { name: "Seated Cable Row", machine: "Cable", grip: "Close grip", muscle: "Back" },
  { name: "Barbell Row", machine: "Barbell", grip: "Overhand", muscle: "Back" },
  { name: "Seated Shoulder Press", machine: "Machine", grip: "Neutral grip", muscle: "Shoulders" },
  { name: "Dumbbell Lateral Raise", machine: "Dumbbell", grip: "Overhand", muscle: "Shoulders" },
  { name: "Cable Lateral Raise", machine: "Cable", grip: "Single handle", muscle: "Shoulders" },
  { name: "Barbell Curl", machine: "Barbell", grip: "Underhand", muscle: "Biceps" },
  { name: "Hammer Curl", machine: "Dumbbell", grip: "Neutral grip", muscle: "Biceps" },
  { name: "Rope Pushdown", machine: "Cable", grip: "Rope", muscle: "Triceps" },
  { name: "Skull Crusher", machine: "Barbell", grip: "EZ bar", muscle: "Triceps" },
  { name: "Back Squat", machine: "Barbell", grip: "High bar", muscle: "Legs" },
  { name: "Leg Press", machine: "Machine", grip: "Shoulder width", muscle: "Legs" },
  { name: "Romanian Deadlift", machine: "Barbell", grip: "Overhand", muscle: "Legs" },
  { name: "Leg Curl", machine: "Machine", grip: "Seated", muscle: "Legs" },
  { name: "Cable Crunch", machine: "Cable", grip: "Rope", muscle: "Core" },
  { name: "Hanging Leg Raise", machine: "Bodyweight", grip: "Overhand", muscle: "Core" }
];

// Exercises the user added to their workout
var routine = [];


// Show a short message at the top
function showMessage(text) {
  var box = document.getElementById("message");
  box.textContent = text;
}


// Show the catalog (uses the search box and muscle filter)
function showCatalog() {
  var search = document.getElementById("searchBox").value.toLowerCase();
  var muscle = document.getElementById("muscleFilter").value;
  var list = document.getElementById("catalogList");

  list.textContent = "";

  var count = 0;

  for (var i = 0; i < exercises.length; i++) {
    var ex = exercises[i];

    // skip ones that dont match the search or muscle filter
    if (ex.name.toLowerCase().indexOf(search) === -1) {
      continue;
    }
    if (muscle !== "All" && ex.muscle !== muscle) {
      continue;
    }

    count++;
    list.appendChild(makeCatalogItem(ex, i));
  }

  if (count === 0) {
    list.textContent = "No exercises found.";
  }
}


// Build one row in the catalog
function makeCatalogItem(ex, index) {
  var row = document.createElement("div");
  row.className = "exerciseItem";

  var info = document.createElement("div");

  var name = document.createElement("div");
  name.className = "exerciseName";
  name.textContent = ex.name;

  var details = document.createElement("div");
  details.className = "exerciseDetails";
  details.textContent = ex.muscle + " · " + ex.machine + " · " + ex.grip;

  info.appendChild(name);
  info.appendChild(details);

  var btn = document.createElement("button");
  btn.className = "smallBtn";
  btn.textContent = "Add";
  btn.onclick = function () {
    addToRoutine(index);
  };

  row.appendChild(info);
  row.appendChild(btn);

  return row;
}


// Add an exercise to the workout
function addToRoutine(index) {
  var ex = exercises[index];

  if (routine.indexOf(ex) !== -1) {
    showMessage(ex.name + " is already in your workout.");
    return;
  }

  routine.push(ex);
  showMessage("Added " + ex.name + ".");
  showRoutine();
}


// Show the workout on the right side
function showRoutine() {
  var list = document.getElementById("routineList");

  list.textContent = "";

  if (routine.length === 0) {
    list.textContent = "No exercises yet. Add some from the catalog.";
    return;
  }

  for (var i = 0; i < routine.length; i++) {
    list.appendChild(makeRoutineItem(routine[i], i));
  }
}


// Build one row in the workout
function makeRoutineItem(ex, index) {
  var row = document.createElement("div");
  row.className = "exerciseItem";

  var info = document.createElement("div");

  var name = document.createElement("div");
  name.className = "exerciseName";
  name.textContent = (index + 1) + ". " + ex.name;

  var details = document.createElement("div");
  details.className = "exerciseDetails";
  details.textContent = ex.muscle + " · " + ex.machine + " · " + ex.grip;

  info.appendChild(name);
  info.appendChild(details);

  var btn = document.createElement("button");
  btn.className = "smallBtn removeBtn";
  btn.textContent = "Remove";
  btn.onclick = function () {
    removeFromRoutine(index);
  };

  row.appendChild(info);
  row.appendChild(btn);

  return row;
}


// Take an exercise out of the workout
function removeFromRoutine(index) {
  var removed = routine.splice(index, 1);
  showMessage("Removed " + removed[0].name + ".");
  showRoutine();
}


// Add a custom exercise to the catalog
function addCustom() {
  var name = document.getElementById("customName").value.trim();
  var machine = document.getElementById("customMachine").value.trim();
  var grip = document.getElementById("customGrip").value.trim();
  var muscle = document.getElementById("customMuscle").value;

  if (name === "" || machine === "" || grip === "") {
    showMessage("Please fill out the name, machine type, and grip.");
    return;
  }

  exercises.push({ name: name, machine: machine, grip: grip, muscle: muscle });

  // clear the form
  document.getElementById("customName").value = "";
  document.getElementById("customMachine").value = "";
  document.getElementById("customGrip").value = "";

  // reset the filters so the new exercise shows up
  document.getElementById("searchBox").value = "";
  document.getElementById("muscleFilter").value = "All";

  showMessage("Added custom exercise: " + name + ".");
  showCatalog();
}


// Save the workout (just a message, nothing is stored)
function saveWorkout() {
  var name = document.getElementById("workoutName").value.trim();

  if (name === "") {
    showMessage("Give your workout a name first.");
    return;
  }
  if (routine.length === 0) {
    showMessage("Add at least one exercise first.");
    return;
  }

  showMessage("Saved " + name + " with " + routine.length + " exercises!");
}


// Hook up the buttons and boxes
document.getElementById("searchBox").oninput = showCatalog;
document.getElementById("muscleFilter").onchange = showCatalog;
document.getElementById("customBtn").onclick = addCustom;
document.getElementById("saveBtn").onclick = saveWorkout;

// Show everything when the page loads
showCatalog();
showRoutine();
