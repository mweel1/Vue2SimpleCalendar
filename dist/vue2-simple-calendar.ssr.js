'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "vue2-simple-calendar",
  props: {
    isSelectable: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    selected: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    selectableClass: {
      type: String,
      default: "selectable"
    },
    nonSelectableClass: {
      type: String,
      default: "nonSelectable"
    },
    buttonClass: {
      type: String,
      default: "nonSelectable"
    },
    startDate: {
      type: Date,
      default: new Date()
    }
  },
  data: function data() {
    return {
      calendar: null,
      days: null,
      __startDate: new Date(),
      selectedDay: null,
      selectable: true
    };
  },
  watch: {
    startDate: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        this.__startDate = new Date(newVal);
        this.bind();
      }
    }
  },
  created: function created() {},
  methods: {
    isToday: function isToday(d) {
      var todayDay = new Date().getDate();
      return d == todayDay;
    },
    getDayClasses: function getDayClasses(d) {
      var c;
      var dt = new Date(this.__startDate.getFullYear(), this.__startDate.getMonth(), d);
      if (this.isSelected(d)) c = "selected ";else if (this.isSelectable(dt)) c = "selectable ";else c = "nonSelectable ";

      if (this.isToday(d)) {
        c = c + "today";
      }

      return c;
    },
    daySelected: function daySelected(day, css) {
      // leave if this isnt selectable, didnt use isSelectable because that might not be performant
      if (css.indexOf("nonSelectable") > -1) {
        return;
      }

      this.selectedDay = day;
      var dt = new Date(this.__startDate.getFullYear(), this.__startDate.getMonth(), day);
      this.$emit("daySelected", dt);
    },
    isSelected: function isSelected(day) {
      return this.selectedDay == day;
    },
    moveMonth: function moveMonth(a) {
      this.__startDate = new Date(this.__startDate.getFullYear(), this.__startDate.getMonth() + a, 1);

      this.__startDate.setMonth(this.__startDate.getMonth() + a);

      this.$emit("monthChanged", this.__startDate);
      this.bind();
    },
    bind: function bind() {
      this.days = ["S", "M", "T", "W", "T", "F", "S"];
      this.calendar = [];
      this.selectedDay = this.__startDate.getDate(); //get first day of month

      var firstDay = new Date(this.__startDate.getFullYear(), this.__startDate.getMonth(), 1);
      var start = firstDay.getDay(); // how many days in the month

      var daysInMonth = new Date(this.__startDate.getFullYear(), this.__startDate.getMonth() + 1, 0).getDate();

      for (var i = 0; i < start; i++) {
        this.calendar.push("");
      }

      for (var _i = 1; _i <= daysInMonth; _i++) {
        this.calendar.push(_i);
      }
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.calendar ? _c('div', {
    staticClass: "vue2-simple"
  }, [_vm._ssrNode("<div class=\"wrapper\" data-v-71487843><div class=\"monthHeader\" data-v-71487843><div class=\"monthWrapper\" data-v-71487843><div class=\"monthHeaderLeft\" data-v-71487843><button" + _vm._ssrClass(null, _vm.buttonClass) + " data-v-71487843>\n            &lt;\n          </button></div> " + (_vm.__startDate ? "<div class=\"monthHeaderMonth\" data-v-71487843>" + _vm._ssrEscape("\n          " + _vm._s(_vm.__startDate.toLocaleString("default", {
    month: "long"
  })) + "\n          " + _vm._s(_vm.__startDate.getFullYear()) + "\n        ") + "</div>" : "<!---->") + " <div class=\"monthHeaderYear\" data-v-71487843><button" + _vm._ssrClass(null, _vm.buttonClass) + " data-v-71487843>\n            &gt;\n          </button></div></div></div> " + _vm._ssrList(_vm.days, function (d) {
    return "<div class=\"day\" data-v-71487843>" + _vm._ssrEscape(_vm._s(d)) + "</div>";
  }) + " " + _vm._ssrList(_vm.calendar, function (c) {
    return "<div class=\"item\" data-v-71487843><div" + _vm._ssrClass(null, _vm.getDayClasses(c)) + " data-v-71487843>" + _vm._ssrEscape("\n        " + _vm._s(c) + "\n      ") + "</div></div>";
  }) + "</div>")]) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-71487843_0", {
    source: "*[data-v-71487843]{font-size:8px}.day[data-v-71487843]{font-weight:700}.item[data-v-71487843]{text-align:center}.monthHeaderMonth[data-v-71487843]{font-size:1.5em;font-weight:700;padding:10px}.item>.selectable[data-v-71487843]{padding:10px;border-radius:50%;color:2a96cc;border:2px solid #2a96cc;color:#2a96cc;cursor:pointer}.item>.selected[data-v-71487843]{padding:10px;border-radius:50%;background-color:#2a96cc;color:#fff;border:1px solid #2a96cc}.item>.nonSelectable[data-v-71487843]{color:gray}.today[data-v-71487843]{font-weight:bolder;text-decoration:underline}.monthHeaderMonth[data-v-71487843]{text-align:center}.monthHeaderYear[data-v-71487843]{text-align:right}.monthHeader[data-v-71487843]{grid-column-start:1;grid-column-end:span 7;min-width:100%;border-bottom:solid 1px #efefef;padding-bottom:10px}.monthWrapper[data-v-71487843]{display:grid;grid-template-columns:50px auto 50px}.wrapper[data-v-71487843]{display:grid;justify-items:center;grid-template-columns:repeat(7,40px);grid-template-rows:repeat(6,40px);gap:5px;align-items:center}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-71487843";
/* module identifier */

var __vue_module_identifier__ = "data-v-71487843";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);

var __vue_component__$1 = __vue_component__;/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,Vue2SimpleCalendar:__vue_component__$1});var install = function installVue2SimpleCalendar(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default':install,Vue2SimpleCalendar:__vue_component__$1});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;