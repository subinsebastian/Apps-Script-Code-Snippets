function doGet() {
    return HtmlService.createHtmlOutputFromFile('index')
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
function getCurrentWebAppURL(){
  return ScriptApp.getService().getUrl();
}
function loadSheetsDataForChart() {
    var masterSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = masterSheet.getSheets();
    var sheetsNames = [];
    var sheetsDataForChart = [];
          var a = sheets.length;  
  if (sheets.length > 0) {
        sheets.forEach(function(file){

            // Row : 200 , Column: 1, Expected Value: "graphtag"
            if (file.getRange(200, 1, 1, 1).getValues()[0][0].toString().trim() === "graphtag") { //
              var d = file.getName();
            sheetsNames.push(file.getName())
            var targetSheet  = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(file.getName());
            var dataForChart = {
                dataFor: targetSheet.getName(),
                xAxisForDesign: targetSheet.getRange('AD30:AD80').getValues().map(function(x){ return x[0]}),
                yAxisForDesign: targetSheet.getRange('AG30:AG80').getValues().map(function(x){ return x[0]}),
                xAxisForData: targetSheet.getRange('AL30:AL80').getValues().map(function(x){ return x[0]}),
                yAxisForData: targetSheet.getRange('AO30:AO80').getValues().map(function(x){ return x[0]}),
                xAxisForSpecLimits: targetSheet.getRange('AA26:AA27').getValues().map(function(x){ return x[0]}),
                yAxisForSpecLimits: targetSheet.getRange('AB26:AB27').getValues().map(function(x){ return x[0]}),
                xAxisForSeries5: targetSheet.getRange('AA28:AA29').getValues().map(function(x){ return x[0]}),
                yAxisForSeries5: targetSheet.getRange('AB28:AB29').getValues().map(function(x){ return x[0]})

            }
            sheetsDataForChart.push(dataForChart);
           }        
        });
    }
  return [sheetsNames, sheetsDataForChart];
}

function onOpen() {
    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .createMenu('Generate')
        .addItem('Generate Graph', 'showDialog')
        .addToUi();
}

function showDialog() {
  var graphlink = "<a href="+ getCurrentWebAppURL() +" target='_blank' style='color: #57606f; font: italic bold 20px/30px Georgia, serif;text-decoration:none;'>CLICK to open graphs in a new tab</a>";
  var htmlApp = HtmlService
    .createHtmlOutput(graphlink)
    .setTitle('Preparing Graphs')
    .setWidth(400)
    .setHeight(60);

  SpreadsheetApp.getActiveSpreadsheet().show(htmlApp);
}