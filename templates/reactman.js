module.exports = {
  "templatesFolder" : "./templates/",
  "outputFolder" : "./app/",
  "scripts" : {
    "displayobject" : {
      "files" : {
        "displayobject.js" : "displayobjects/{%=o.exportsLowerCase%}/{%=o.exports%}{%=o.ext%}"
      },
      "script" : [{
        "name": "exports",
        "message": "Exports",
        "required": true,
        "default": "Exports",
        "type": "input"
      }, {
        "name": "extendpixi",
        "message": "Extend Pixi.js?",
        "default": true,
        "required": true,
        "type": "confirm"
      }, {
        "name": "extends",
        "message": "Extends",
        "default": "Extends",
        "required": true,
        "type": "input"
      }, {
        "name": "description",
        "message": "Description",
        "default": "A display object",
        "required": true,
        "type": "input"
      }]
    },
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
    }
  }
}
