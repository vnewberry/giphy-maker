var cartoons = ["Spongebob","The Simpsons","Futurama","King of the Hill","Peanuts","Family Guy","Batman","The Flintstones","Phineas and Ferb"]




function renderButtons(){
$("#button-div").empty();
for (i=0;i<cartoons.length;i++){
    var a = $(`<button type="button" class="btn btn-primary">${cartoons[i]}</button>`);
    a.attr("show-name",cartoons[i].replace(/\s+/g, ''));
    a.addClass("tv-show-button");
    $("#button-div").append(a);
}
}

$("#add-show").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var s = $("#new-show-form").val().trim();
    if (s == "") {
        alert("Enter a tv show");
        return false;
    };
    // The movie from the textbox is then added to our array
    cartoons.push(s);
    renderButtons();
  });

function displayGifs() {
    var show = $(this).attr("show-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      show + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        console.log(response);

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var showGif = $("<img>");
          showGif.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(showGif);

          $("#gif-div").prepend(gifDiv);
        }
      });
  };
  $(document).on("click", ".tv-show-button", displayGifs);
renderButtons()