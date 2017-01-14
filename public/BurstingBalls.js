(function(){
  console.log("Bursting Balls Started");
  //Analyser and canvas variables
  var AudioContext;

//=============================================================================
// CODE FOR Drawing objects
var points = [], numPoints = 100, colorCount = 0, i, canvas, context, width, height, gravity = 0.05, emitter;
  var pointsColor = []
  canvas = $("#canvas")[0];
  width = canvas.width;
  height = canvas.height;
  context = canvas.getContext("2d");



  function initPoint(p) {
      emitter = {x:Math.random()* width , y:Math.random() * height};
      p.x = emitter.x;
      p.y = emitter.y;
      p.vx = Math.random() * 5 - 2;
      p.vy = Math.random() * -6 - 3;
      p.radius = Math.random() * 15 + 1;
      pointsColor[colorCount] = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      colorCount += 1;
  }

  function update() {
      var i, point, len = points.length;
      for(i = 0; i < len; i += 1) {
          point = points[i];
          point.vy += gravity;
          point.x += point.vx;
          point.y += point.vy;
          if(point.x > width ||
             point.x < 0 ||
             point.y > height ||
             point.y < 0) {
              initPoint(point);
          }
      }
  }
  //context.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  function drawCircle() {
      var i, point, len = points.length;
      context.clearRect(0, 0, width, height);
      //context.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      for(i = 0; i < len; i += 1) {
          point = points[i];
          context.beginPath();
          context.arc(point.x, point.y, point.radius, 0, Math.PI * 2, false);
          context.fillStyle = pointsColor[i]
          context.fill();

      }
  }

  function addPoint() {
      var point;
      if(points.length < numPoints) {
          point = {};
          initPoint(point);
          points.push(point);
      }
  }
  setInterval(function() {
    addPoint();
    update();

    drawCircle();
  }, 1000/24);
})();


// Below is a display found Track Function
//==================================================================================

// var clientParameter = "client_id=3b2585ef4a5eff04935abe84aad5f3f3"
//
// // Basing everything on the track's permalink URL. That is what the user knows.
// // Makes it possible to use the text box for pasting any track URL.
// // The Outsider is a friend of mine.
// // The majority of his tracks are on Mixcloud:
// // https://www.mixcloud.com/outsider_music/
// var trackPermalinkUrl = "https://soundcloud.com/the-outsider/the-outsider-death-by-melody";
//
// function findTrack() {
//   get("https://api.soundcloud.com/resolve.json?url=" +  trackPermalinkUrl + "&" + clientParameter,
//       function (response) {
//     var trackInfo = JSON.parse(response);
//     slider.max = trackInfo.duration / 1000;
//     document.getElementById("totalTime").innerHTML = millisecondsToHuman(trackInfo.duration);
//     document.getElementById("artistUrl").href = trackInfo.user.permalink_url;
//     document.getElementById("artistAvatar").src = trackInfo.user.avatar_url;
//     document.getElementById("artistName").innerHTML = trackInfo.user.username;
//     document.getElementById("trackUrl").href = trackInfo.permalink_url;
//     if(trackInfo.artwork_url) {
//       document.getElementById("trackArt").src = trackInfo.artwork_url;
//     } else {
//       document.getElementById("trackArt").src = "";
//     }
//     document.getElementById("trackName").innerHTML = trackInfo.title;
//     streamUrl = trackInfo.stream_url + "?" + clientParameter;
//   }
//      );
// };
