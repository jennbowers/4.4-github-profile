(function() {
  'use strict';

  // Use github api token for development purposes
  // Will not be present in production
  // declaring variables
  var userUrl = 'https://api.github.com/users/jennbowers';
  var reposUrl = 'https://api.github.com/users/jennbowers/repos?sort=updated';
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
      var locationFaSpan = document.createElement('span');
      locationFaSpan.setAttribute('class', 'fa fa-map-marker');
      profileNode.appendChild(locationFaSpan);
      var locationSpan = document.createElement('span');
      profileNode.appendChild(locationSpan);
      var locationNode = document.createElement('p');
      locationNode.setAttribute('class', 'location');
      locationNode.textContent = location;
      locationSpan.appendChild(locationNode);


      // email
      var email = data.email;
      var emailFaSpan = document.createElement('span');
      emailFaSpan.setAttribute('class', 'fa fa-envelope-o');
      profileNode.appendChild(emailFaSpan);
      var emailSpan = document.createElement('span');
      profileNode.appendChild(emailSpan);
      var emailNode = document.createElement('a');
      emailNode.setAttribute('class', 'email');
      emailNode.textContent = email;
      emailNode.href = email;
      emailSpan.appendChild(emailNode);

      // created_at
      var created = moment(data.created_at).format("MMM Do");
      var createdFaSpan = document.createElement('span');
      createdFaSpan.setAttribute('class', 'fa fa-clock-o');
      profileNode.appendChild(createdFaSpan);
      var createdSpan = document.createElement('span');
      profileNode.appendChild(createdSpan);
      var createdNode = document.createElement('p');
      createdNode.setAttribute('class', 'created');
      createdNode.textContent = 'Joined on ' + created;
      createdSpan.appendChild(createdNode);
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

    // holds name a tag
    var reposNameDiv = document.createElement('div');
    reposNameDiv.setAttribute('class', 'repos-name-div');
    reposNode.appendChild(reposNameDiv);

    // repos name
    var reposName = repos.name;
    var reposNameNode = document.createElement('a');
  // add href to repos_url
    reposNameNode.setAttribute('class', 'repos-name');
    reposNameNode.textContent = reposName;
    reposNameDiv.appendChild(reposNameNode);

    // declaring language variable early for use in language if statement
    var reposLanguage = repos.language;

    // adding colored circle corresponding to language (before so shows up before)
    var coloredCircle = document.createElement('div');
    coloredCircle.setAttribute('class', 'repos-circle');
    reposDiv.appendChild(coloredCircle);
    if (reposLanguage === 'JavaScript') {
      coloredCircle.style.backgroundColor = '#f1e05a';
    } else if (reposLanguage === 'CSS') {
      coloredCircle.style.backgroundColor = '#563d7c';
    } else if (reposLanguage === 'HTML') {
      coloredCircle.style.backgroundColor = '#e34626';
    } else {
      coloredCircle.style.width = '0px';
      coloredCircle.style.height = '0px';
    }

    // repos language
    var reposLanguageNode = document.createElement('span');
    reposLanguageNode.setAttribute('class', 'repos-language');
    reposLanguageNode.textContent = reposLanguage;
    reposDiv.appendChild(reposLanguageNode);

    // repos updated time
    var reposUpdated = moment(repos.updated_at).fromNow();
    var reposUpdatedNode = document.createElement('span');
    reposUpdatedNode.setAttribute('class', 'repos-updated');
    reposUpdatedNode.textContent = reposUpdated;
    reposDiv.appendChild(reposUpdatedNode);

    // use the `` to replace strings, you can also use breaks and format it exactly like your html
    // repoDiv.innterHTML = `
    // <div>
    //   ${repo.name}
    // </div>`
  }






}());
