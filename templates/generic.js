/**
 * @exports {%=o.exports%}
 */
import THREE from 'three';

export default class {%=o.exports%} {

  constructor(options) {

  }
  {% for(var i = 0; i < o.functions.length; i++) { %}
  {%= o.functions[i] %}() {

  }
  {% } %}
}
