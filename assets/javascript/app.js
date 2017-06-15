var animalSearch = ["ferret","badger","koala","elephant","grumpy-cat","hamster","cat","dog","bird","panda"];
// for loop to dynamically create the buttons on screen from existing array
for (var i = 0; i < animalSearch.length; i++ ) { 
            var arrValues = animalSearch[i];
            // console.log("Print: " + arrValues);
            var cap = arrValues.toUpperCase();
            // console.log("Print: " + cap);
            var dynamicBtn = $("<button>" + cap + "</button>");
            dynamicBtn.addClass('btnClass btn btn-default').attr("data-animal", arrValues);
            $("#jsDynamicBtn").append(dynamicBtn);
          }
//  On Click event associated with the add-to-do function
            $("#searchBtn").on("click", function(event) {
                event.preventDefault();

                // Get the to-do "value" from the textbox and store it a variable
                var searchedValue = $("#searchbox").val().trim();
                console.log(searchedValue);
                var newGifBtn = $("<button>" + searchedValue + "</button>");
                newGifBtn.addClass('btnClass btn btn-default').attr("data-animal", searchedValue);
                $("#jsDynamicBtn").append(newGifBtn);
                animalSearch.push(searchedValue);
                console.log("Expanded Array: " + animalSearch);
                });


$("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");
    console.log(animal);

    // Constructing a queryURL using the animal name
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(animalDiv);
            }
        });
});
