## Table of Contents

### 🔌 Basic GET, SET

<details>
<summary>View contents</summary>

* [`Active sheet`](#active-sheet)
* [`Get by sheet name`](#get-sheet-by-sheet-name)

* [`list of all sheets`](#list-of-all-sheets)
* [`Get sheet name`](#get-sheet-name)
* [`get values`](#get-values)
* [`set values`](#set-values)
* [`set values, background, fontSize and fontColor`](#set-values-background-fontSize-and-fontColor)
</details>

### UI Components
<details>
<summary>View Contents</summary>

* [`Menu Item`](#menu-item)
* [`Import Sheet`](#import-sheet)
</details>

### Web App
<details>
<summary>View Contents</summary>

* [`Link backend(.gs) code with .html file`](#link-backend-to-frontend)
* [`API to link frontend to backend`](#api-to-link-frontend-to-backend)
* [`Inline dialog modal to open webapp on new page`](#inline-dialog-modal-to-open-webapp-on-new-page)

</details>

### active-sheet
```js
SpreadsheetApp.getActiveSpreadsheet();
```
### get-sheet-by-sheet-name
```js
SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
```

### list-of-all-sheets
```js
    var masterSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = masterSheet.getSheets();
```
### get-sheet-name
```js
file.getName(); // where 'file' is of type sheet from [var sheets = masterSheet.getSheets()];
```

### get-values
```js
var values = targetSheet.getRange('AD78:AD128').getValues();
```
### set-values
```js
targetSheet.getRange('AD78:AD128').setValues(values);
```
### set-values-background-fontSize-and-fontColor
```js
    var values = source_range.getValues();
    var bGcolors = source_range.getBackgrounds();
    var colors = source_range.getFontColors();
    var fontSizes = source_range.getFontSizes();

    target_range.setValues(values);
    target_range.setBackgrounds(bGcolors);
    target_range.setFontColors(colors);
    target_range.setFontSizes(fontSizes);
```
<br>[⬆ Back to top](#table-of-contents)

### menu-item
* Use it on onOpen() Trigger
```js
function onOpen() {
    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .createMenu('Generate')
        .addItem('Generate Graph', 'showDialog')
        .addSeparator()
        .addSubMenu(SpreadsheetApp.getUi().createMenu('ADMIN Mode')
            .addItem('ON', 'adminModeONfunc')
            .addItem('OFF', 'adminModeOFFfunc'))
        .addToUi();
}
```
### import-sheet
```js
function showPicker() {
  var html = HtmlService.createHtmlOutputFromFile('picker.html') // 'picker.html' is the important sheet that sends all the data to the backend
    .setWidth(600)
    .setHeight(425)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Select a file');
}
```
<details>
<summary>Code for picker.html</summary>

 [picker.html](/picker.html)

Line no. 72 inside picker.html
```js
    function pickerCallback(data) {
      var action = data[google.picker.Response.ACTION];
      if (action == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        var id = doc[google.picker.Document.ID];
        var url = doc[google.picker.Document.URL];
        var title = doc[google.picker.Document.NAME];
        google.script.run.fetchedSheet(title,id);
        document.getElementById('result').innerHTML =
            '<b>You chose:</b><br>Name: <a href="' + url + '">' + title +
            '</a><br>ID: ' + id;
      } else if (action == google.picker.Action.CANCEL) {
        document.getElementById('result').innerHTML = 'Picker canceled.';
      }
```
where "fetchedSheet(title,id)" is the backend code
and @backend
```js
    function fetchedSheet(fileName, id) {
        var selectedSheet = SpreadsheetApp.openById(id);
        ....
    }
```
</details>

# Remember: 
### As shown in the picker.html, it uses google API's
### google api's and google apps script are both different.
- [ ] Note: you can try to fetch the data from spreadsheet on to frontend and compute at front end.Using google API's

### link-backend-to-frontend
You have to use `doGet()`
```js
    function doGet() {
        return HtmlService.createHtmlOutputFromFile('index')
            .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    }
```
### get-current-webapp-URL
```js
    function getCurrentWebAppURL(){
    return ScriptApp.getService().getUrl();
    }
```
### api-to-link-frontend-to-backend
```js
    google.script.run.withSuccessHandler(onLoadSheetsDataForChart).loadSheetsDataForChart();
```
`onLoadSheetsDataForChart(data)` is the code written at frontend

### inline-dialog-modal-to-open-webapp-on-new-page
```js
    function showDialog() {
    var graphlink = "<a href="+ getCurrentWebAppURL() +" target='_blank' style='color: #57606f; font: italic bold 20px/30px Georgia, serif;text-decoration:none;'>CLICK to open graphs in a new tab</a>";
    var htmlApp = HtmlService
        .createHtmlOutput(graphlink)
        .setTitle('Preparing Graphs')
        .setWidth(400)
        .setHeight(60);

    SpreadsheetApp.getActiveSpreadsheet().show(htmlApp);
    }
```
`getCurrentWebAppURL()` throws url to webapage, so that it be opened at another page.












