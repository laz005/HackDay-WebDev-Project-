(function(){
  // Analyser and canvas variables
  var AudioContext;
  var audio;
  var audioContext;
  var source;
  var analyser;
  var canvas = document.getElementById("TheCanvas");
  var canvasContext = canvas.getContext("2d");
  var dataArray;
  var analyserMethod = "getByteTimeDomainData";
  // var slider = document.getElementById("slider");
  var streamUrl;
  var isIdle = true;
  // Dimensions of canvas
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;

  function initAudio(streamUrl){
    //Web Audio API Context
    AudioContext = window.AudioContext || window.webkitAudioContext;
    audio = new Audio();
    audio.crossOrigin = "anonymous";
    audioContext = new AudioContext();
    source = audioContext.createMediaElementSource(audio);
    source.connect(audioContext.destination);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
  };
  function get(url, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if (request.readyState === 4 && request.status === 200){
        callback(request.responseText);
      }
    }
    request.open("GET", url, true);
    request.send(null);
  }
  function drawAnimation(){
    // Stop drawing idle animation
    //isIdle = false;
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    dataArray = new Uint8Array(bufferLength);
    function draw(){
      requestAnimationFrame(draw);
      analyser[analyserMethod]dataArray;
      //TODO: IMPLEMENT DRAWING Methods and call them in draw function.

    }
    draw();
  }
//=============================================================================
// CODE FOR Drawing objects
  var points = [], numPoints = 100, i, canvas, context, width, height, gravity = 0.1, emitter;
  emitter = {x:width /2 , y:height};
  function initPoint(p) {
        p.x = emitter.x;
        p.y = emitter.y;
        p.vx = Math.random() * 5 - 2;
        p.vy = Math.random() * -6 - 3;
        p.radius = Math.random() * 15 + 1;
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

    function drawCircle() {
        var i, point, len = points.length;
        context.clearRect(0, 0, width, height);
        for(i = 0; i < len; i += 1) {
            point = points[i];
            context.beginPath();
            context.arc(point.x, point.y, point.radius, 0, Math.PI * 2, false);
            context.fillStyle = "#9cf000";
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
        draw();
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
