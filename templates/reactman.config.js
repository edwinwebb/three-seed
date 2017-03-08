function commaSplit(i) {
  i = i.replace(" ", "");
  return i.split(",");
}

module.exports = {
  "templatesFolder" : "./templates/",
  "outputFolder" : "./app/",
  "scripts" : {
    "Display Object Class" : {
      "files" : {
        "displayobject.js" : "objects/{%=o.exports%}.js"
      },
      "script" : [{
        "name": "exports",
        "message": "Exports",
        "required": true,
        "default": "Exports",
        "type": "input"
      }, {
        "name": "functions",
        "message": "Comma seperated list of functions",
        "required": false,
        "default": "",
        "type": "input",
        "filter" : function(i) {
          var ar = i.replace(" ","").split(",");
          return ar[0] === "" ? [] : ar;
        }
      }]
    },
    "store" : {
      "files" : {
        "store.js" : "stores/{%=o.exports%}{%=o.ext%}"
      },
      "script" : [{
        "name": "exports",
        "message": "Exports",
        "required": true,
        "default": "Exports",
        "type": "input"
      }]
    }
  }
}
