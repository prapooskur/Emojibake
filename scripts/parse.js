const fs = require('fs');
const https = require('https');
const { json } = require('stream/consumers');

fs.readFile('emojiOutput.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const jsonData = JSON.parse(data);
  const baseURL="https://www.gstatic.com/android/keyboard/emojikitchen/"

  urls = [];
  combinedpaths=[];
  /*
  for (i in jsonData){
    console.log(i)
    console.log(i.length);
    for (j in i) {
        left=jsonData[i][j]['leftEmoji'];
        right=jsonData[i][j]['rightEmoji'];
        date=jsonData[i][j]['date'];
        dlURL=baseURL+`${date}/u${left}/u${left}_u${right}.png`;
//        console.log(dlURL);
        combinedpath=`./images/u${left}_u${right}.png`;
        urls.push(dlURL);
        combinedpaths.push(combinedpath);
    }
  }
  */
 Object.keys(jsonData).forEach(function(key) {
    const currentArray = jsonData[key];

    for (let i = 0; i < currentArray.length; i++) {
      //console.log(currentArray[i]);
      left=currentArray[i]['leftEmoji'];
      right=currentArray[i]['rightEmoji'];
      date=currentArray[i]['date'];
      dlURL=baseURL+`${date}/u${left}/u${left}_u${right}.png`;
      combinedpath=`./images/u${left}_u${right}.png`;
      urls.push(dlURL);
      combinedpaths.push(combinedpath);
    }
  });
//  console.log(urls);
  console.log(urls.length);
  for (let i = 0; i < urls.length; i++) {
    setTimeout(function() {
      const file = fs.createWriteStream(combinedpaths[i]);
      const request = https.get(urls[i], function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close();
          console.log(`Image ${i+1} downloaded!`);
        });
      });

      request.on('error', function(error) {
        console.error(error);
      });
  
      file.on('error', function(error) {
        console.error(error);
      });
    }, i * 50);

  }


});