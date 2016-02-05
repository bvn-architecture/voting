function test(){
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var raw = ss.getSheets()[0];
  var payload = raw.getRange("c8").getValues()[0][0];
    
  var resultsPage = ss.getSheets()[1];
  var headerLine = resultsPage.getRange("A1:BP1").getValues()[0];

  Logger.log(unpackVotes(headerLine, payload)  )
  
}

function unpackVotes(headerRow, voteJSON) {
  headerRow = headerRow[0];
  var parsedJSON = JSON.parse(voteJSON);
  var numbers = [];
  for (var i = 0; i < headerRow.length; i++) {
    numbers.push(parsedJSON[ headerRow[i] ]);
  }
  return [numbers];
}