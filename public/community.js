
// DEMO ONLY: all posts, likes and followers on these pages are fake. Nothing is saved, refreshing the page resets everything.

// Fake posts (nothing is saved)
var posts = [
  {
    author: "John Workout",
    color: "#dd840f",
    time: "2 hours ago",
    title: "Heavy Push Day",
    exercises: ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Lateral Raise", "Rope Pushdown"],
    note: "Hit a bench PR today, felt great!",
    likes: 14,
    liked: false
  },
  {
    author: "Johnathan",
    color: "#6644a8",
    time: "Yesterday",
    title: "Upper / Lower Split (Lower)",
    exercises: ["Back Squat", "Romanian Deadlift", "Leg Press", "Leg Curl"],
    note: "My go-to leg day when the squat rack is taken.",
    likes: 9,
    liked: false
  },
  {
    author: "Samantha",
    color: "#db6724",
    time: "Yesterday",
    title: "Back and Biceps",
    exercises: ["Pull Up", "Lat Pulldown", "Seated Cable Row", "Hammer Curl"],
    note: "",
    likes: 6,
    liked: false
  },
  {
    author: "Leo",
    color: "#e6b800",
    time: "3 days ago",
    title: "Quick Core Finisher",
    exercises: ["Cable Crunch", "Hanging Leg Raise"],
    note: "10 minutes at the end of any workout.",
    likes: 21,
    liked: false
  }
];

// The person using the app
var me = "User";


// Show a short message at the top
function showMessage(text) {
  document.getElementById("message").textContent = text;
}


// Show the posts (uses the search box)
function showFeed() {
  var search = document.getElementById("communitySearch").value.toLowerCase();
  var feed = document.getElementById("feed");

  feed.innerHTML = "";

  var count = 0;

  for (var i = 0; i < posts.length; i++) {
    var p = posts[i];

    // skip posts that dont match the search
    var text = (p.title + " " + p.author).toLowerCase();
    if (text.indexOf(search) === -1) {
      continue;
    }

    count++;

    // make the list of exercises
    var items = "";
    for (var j = 0; j < p.exercises.length; j++) {
      items += "<li>" + p.exercises[j] + "</li>";
    }

    // only show the note if there is one
    var note = "";
    if (p.note !== "") {
      note = "<p class='postNote'>" + p.note + "</p>";
    }

    // heart changes when liked
    var heart = "♡";
    var likedClass = "";
    if (p.liked) {
      heart = "♥";
      likedClass = " liked";
    }

    var card = document.createElement("div");
    card.className = "post";

    card.innerHTML = `
      <div class="postTop">
        <div class="avatar" style="background-color: ${p.color};">${p.author[0]}</div>
        <div>
          <a href="fake_profile.html" class="postAuthor">${p.author}</a>
          <div class="postTime">${p.time}</div>
        </div>
      </div>
      <h3 class="postTitle">${p.title}</h3>
      <ul class="postExercises">${items}</ul>
      ${note}
      <button class="smallBtn likeBtn${likedClass}" onclick="toggleLike(${i})">${heart} ${p.likes}</button>
    `;

    feed.appendChild(card);
  }

  if (count === 0) {
    feed.textContent = "No posts found.";
  }
}


// Like or unlike a post
function toggleLike(index) {
  var p = posts[index];

  if (p.liked) {
    p.liked = false;
    p.likes = p.likes - 1;
  } else {
    p.liked = true;
    p.likes = p.likes + 1;
  }

  showFeed();
}


// Add a new post to the top of the feed
function addPost() {
  var title = document.getElementById("postTitle").value.trim();
  var exercisesText = document.getElementById("postExercises").value.trim();
  var note = document.getElementById("postNote").value.trim();

  if (title === "" || exercisesText === "") {
    showMessage("Please add a workout name and at least one exercise.");
    return;
  }

  // turn "a, b, c" into a list
  var pieces = exercisesText.split(",");
  var exercises = [];
  for (var i = 0; i < pieces.length; i++) {
    var piece = pieces[i].trim();
    if (piece !== "") {
      exercises.push(piece);
    }
  }

  posts.unshift({
    author: me,
    color: "#6644a8",
    time: "Just now",
    title: title,
    exercises: exercises,
    note: note,
    likes: 0,
    liked: false
  });

  // clear the form
  document.getElementById("postTitle").value = "";
  document.getElementById("postExercises").value = "";
  document.getElementById("postNote").value = "";

  // clear the search so the new post shows up
  document.getElementById("communitySearch").value = "";

  showMessage("Your workout was shared!");
  showFeed();
}

// Follow button for the fake profile page
// DEMO ONLY: this is only for the fake_profile.html demo page. The follower count is fake and nothing is saved.
var following = false;
var followers = 128;

function startProfilePage() {
  var followBtn = document.getElementById("followBtn");

  // this page has no follow button, so skip
  if (!followBtn) {
    return;
  }

  followBtn.onclick = function () {
    if (following) {
      following = false;
      followers = followers - 1;
      this.textContent = "Follow";
    } else {
      following = true;
      followers = followers + 1;
      this.textContent = "Following";
    }

    document.getElementById("followerCount").textContent = followers;
  };
}


// Hook up the community page buttons and boxes
function startCommunityPage() {
  var postBtn = document.getElementById("postBtn");

  // this page has no community feed, so skip
  if (!postBtn) {
    return;
  }

  postBtn.onclick = addPost;
  document.getElementById("communitySearch").oninput = showFeed;

  // Show the posts when the page loads
  showFeed();
}


// Both pages use this file, each one only runs its own part
startCommunityPage();
startProfilePage();