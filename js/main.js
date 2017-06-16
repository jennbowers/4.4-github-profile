(function() {
  'use strict';

  // Use github api token for development purposes
  // Will not be present in production
  // declaring variables
  var userUrl = 'https://api.github.com/users/jennbowers';
  var reposUrl = 'https://api.github.com/users/jennbowers/repos?sort=updated';
  var orgUrl = 'https://api.github.com/user/orgs';
  var headers = {};
  var sidebarNode = document.getElementById('sidebar');
  var profileNode = document.querySelector('.profile');
  var reposNode = document.getElementById('repos');
  var orgNode = document.querySelector('.organizations');

  try {
      headers['Authorization'] = 'token ' + GITHUB_TOKEN;
    } catch (e) {
      //ignore error
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
      loginNode.setAttribute('class', 'login');
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
      var locationGroup = document.createElement('div');
      locationGroup.setAttribute('class', 'location-group');
      profileNode.appendChild(locationGroup);
      var locationFaSpan = document.createElement('span');
      locationFaSpan.setAttribute('class', 'fa fa-map-marker');
      locationGroup.appendChild(locationFaSpan);
      var locationNode = document.createElement('span');
      locationNode.setAttribute('class', 'location');
      locationNode.textContent = location;
      locationGroup.appendChild(locationNode);

      // email
      var email = data.email;
      var emailGroup = document.createElement('div');
      emailGroup.setAttribute('class', 'email-group');
      profileNode.appendChild(emailGroup);
      var emailFaSpan = document.createElement('span');
      emailFaSpan.setAttribute('class', 'fa fa-envelope-o');
      emailGroup.appendChild(emailFaSpan);
      var emailNode = document.createElement('a');
      emailNode.setAttribute('class', 'email');
      emailNode.textContent = email;
      emailNode.href = email;
      emailGroup.appendChild(emailNode);
    });
  });

  // organizations fetch
  fetch(orgUrl, {headers: headers}).then(function(repsonse3){
    repsonse3.json().then(function(data3){
      if (data3.length === 0){
        return;
      }
        // creating organizations header
        var orgHeader = document.createElement('h4');
        orgHeader.textContent = 'Organizations';
        orgNode.appendChild(orgHeader);
        // adding organization images
        data3.forEach(function(){
          console.log(data3);
          var orgImgNode = document.createElement('span');
          orgImgNode.setAttribute('class', 'org-image');
          var orgImg = '<img src="' + data3[0].avatar_url + '">';
          orgImgNode.innerHTML = orgImg;
          orgNode.appendChild(orgImgNode);
        });
    });
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
    });
  });

  function displayRepo(repos){
    var reposDiv = document.createElement('div');
    reposDiv.setAttribute('class', 'repos-div');
    reposNode.appendChild(reposDiv);

    // holds name a tag
    var reposNameDiv = document.createElement('div');
    reposNameDiv.setAttribute('class', 'repos-name-div');
    reposDiv.appendChild(reposNameDiv);

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
    reposUpdatedNode.textContent = 'Updated ' + reposUpdated;
    reposDiv.appendChild(reposUpdatedNode);


    // use the `` to replace strings, you can also use breaks and format it exactly like your html
    // repoDiv.innterHTML = `
    // <div>
    //   ${repo.name}
    // </div>`
  }






}());
