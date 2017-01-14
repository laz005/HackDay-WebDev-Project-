$(document).ready(function(){
  //alert("Cat Videos!");
  getPosts();
  //Submit is a listener that listens for the form being submitted
  $("form").submit(function(event){
    // Will prevent default HTML form interaction
    event.preventDefault();
    //Gather Data
    var titleText = $("#title").val();
    var postText = $("#post").val()
    var data ={
      title: titleText,
      post: postText
    }
    // Fire off data

    $.post("/posts/",data,function(){
      console.log("posted!");
    })


});
});
function sendNewPost(data){
  $.post()
}
function getPosts(){
  $()
  //Make Get request to backend
  $.get('/posts',function(data){
    console.log(data);
    var rows = data["rows"];
    for(var i=0;i<rows.length;i++){
    console.log(rows[i]["doc"]["title"]);
    console.log(rows[i]["doc"]["post"]);
    // Fiind the important stuff inside data
    var title = rows[i]["doc"]["title"];
    var post = rows[i]["doc"]["post"];
    var card = '<div class="card"><h3 class="card--header">' +
                title + '</h3>' +
                '<p class="card--content">' + post + '</p>' +
                '</div>';
    // Insert the card html
    $('#content').append(card);
  }
  });
}
