(function() {
  'use strict';

  // Use github api token for development purposes
  // Will not be present in production
  var headers = {};
  if(GITHUB_TOKEN) {
    // Set the AJAX header to send the token
    headers['Authorization'] = 'token ' + GITHUB_TOKEN;
  }
  // setting the headers to the object headers
  fetch(url, {headers: headers}).then(function(){

  });




}());
