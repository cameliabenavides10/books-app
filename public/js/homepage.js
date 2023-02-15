$(document).ready(function() {
    // Define the welcome message
    var data = {
      welcomeMsg: "Welcome to BetterReads!"
    };
  
    // Compile the Handlebars template
    var source = $("#welcome-template").html();
    var template = Handlebars.compile(source);
  
    // Render the template with the data and insert into the HTML
    var html = template(data);
    $("#welcome").html(html);
  });