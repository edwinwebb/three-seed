module.exports = {
  "templatesFolder" : "./templates/",
  "outputFolder" : "./app/",
  "scripts" : {
    "action" : {
      "files" : {
        "action.js" : "actions/{%=o.exports%}{%=o.ext%}"
      },
      "script" : [{
        "name": "exports",
        "message": "Exports",
        "required": true,
        "default": "Exports",
        "type": "input"
      }, {
        "name": "actions",
        "message": "Comma seperated list of actions",
        "required": false,
        "default": "DEFAULT",
        "type": "input",
        "filter" : function(i) {
          return i.toUpperCase().replace(" ","").split(",");
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
