var args = process.argv;
var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'Symbiotik';
var GITHUB_TOKEN = '8257c2bdc375b04bb11759ae564324cd4016cae1 ';

function getRepoContributors(repoOwner, repoName, cb) {
  if(!repoOwner || !repoName) {
    console.log('Please enter the necessary information to proceed: Username : Name of Repo')
  } else {

    var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

    var requestOptions = {
      headers: {
        'user-agent': 'ti'
      },
      url: requestURL
    };
    request.get(requestOptions, function(err, body, response){
      if (err) {
        console.log('There was an error', err);
      }
      console.log('Status Code: ', response && response.statusCode);
      cb(body);
      console.log('Download Complete');
    });
  }
}

var loop = function(result){

  JSON.parse(result).forEach(function(element){
    var url = element.avatar_url;
    var filePath = element.login + '.jpg';
    console.log('Downloading avatar from: ' + element.login);
    downloadIMG(url, filePath);
  });

};

getRepoContributors(process.argv[2], process.argv[3], loop);