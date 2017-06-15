(function() {
  'use strict';

  // Use github api token for development purposes
  // Will not be present in production
  // declaring variables
  var userUrl = 'https://api.github.com/users/jennbowers';
  var reposUrl = 'https://api.github.com/users/jennbowers/repos';
  var headers = {};
  var profileNode = document.getElementById('profile');
  var reposNode = document.getElementById('repos');


  if(GITHUB_TOKEN) {
    // Set the AJAX header to send the token
    headers['Authorization'] = 'token ' + GITHUB_TOKEN;
  }
  // setting the headers to the object headers
  // user url fetch
  console.log(userUrl);
  fetch(userUrl, {headers: headers}).then(function(response){
    // console.log(userUrl);
    response.json().then(function(data){
      console.log(data);
      // avatar_url
      var avatar = '<img src="' + data.avatar_url + '">';
      var avatarNode = document.createElement('div');
      avatarNode.setAttribute('class', 'avatar');
      avatarNode.innerHTML = avatar;
      profileNode.appendChild(avatarNode);

      // name
      var name = data.name;
      var nameNode = document.createElement('h2');
      nameNode.setAttribute('class', 'name');
      nameNode.textContent = name;
      profileNode.appendChild(nameNode);

      // login/username
      var login = data.login;
      var loginNode = document.createElement('h3');
      loginNode.setAttribute('class', 'username login');
      loginNode.textContent = login;
      profileNode.appendChild(loginNode);

      // bio
      var bio = data.bio;
      var bioNode = document.createElement('p');
      bioNode.setAttribute('class', 'bio');
      bioNode.textContent = bio;
      profileNode.appendChild(bioNode);

      // location
      var location = data.location;
      var locationNode = document.createElement('p');
      locationNode.setAttribute('class', 'location');
      locationNode.textContent = location;
      profileNode.appendChild(locationNode);


      // email
      var email = data.email;
      var emailNode = document.createElement('a');
      emailNode.setAttribute('class', 'email');
      emailNode.textContent = email;
      profileNode.appendChild(emailNode);

      // created_at
      var created = moment(data.created_at).format("MMM Do");
      var createdNode = document.createElement('p');
      createdNode.setAttribute('class', 'created');
      createdNode.textContent = 'Joined on ' + created;
      profileNode.appendChild(createdNode);
    })
  });

  // repos url
  fetch(reposUrl, {headers: headers}).then(function(response2){
    // console.log(reposUrl);
    response2.json().then(function(data2){
      // console.log(data2);
      for(var i = 0; i < data2.length; i++){
        let reposData = data2[i];
        displayRepo(reposData);
      }
    })
  });

  function displayRepo(repos){
    var reposDiv = document.createElement('div');
    reposDiv.setAttribute('class', 'repos-div');
    reposNode.appendChild(reposDiv);

    // repos name
    var reposName = repos.name;
    var reposNameNode = document.createElement('a');
    reposNameNode.setAttribute('class', 'repos-name');
    reposNameNode.textContent = reposName;
    reposDiv.appendChild(reposNameNode);

    // 
    // use the `` to replace strings, you can also use breaks and format it exactly like your html
    // repoDiv.innterHTML = `
    // <div>
    //   ${repo.name}
    // </div>`
  }






}());
