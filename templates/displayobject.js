/**
 * @exports {%=o.exports%}
 */
import { Group } from 'three';

export default class {%=o.exports%} extends Group {

  constructor(...args) {
    super(...args);
  }
  {% for(var i = 0; i < o.functions.length; i++) { %}
  {%= o.functions[i] %}() {

  }
  {% } %}
}
