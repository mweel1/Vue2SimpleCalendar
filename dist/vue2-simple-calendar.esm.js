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
//
var script = {
  name: "vue2-simple-calendar",
  props: {
    isSelectable: {
      type: Function,
      default: () => false
    },
    selected: {
      type: Function,
      default: () => false
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
      default: () => new Date()
    }
  },

  data() {
    return {
      calendar: null,
      days: null,
      _startDate: null,
      selectedDay: null,
      selectable: true
    };
  },

  watch: {
    startDate(newDate) {
      console.log("start date watch");
      this._startDate = new Date(newDate);
      this.bind();
    }

  },

  created() {
    this.bind();
  },

  methods: {
    isToday(d) {
      let todayDay = new Date().getDate();
      return d == todayDay;
    },

    getDayClasses(d) {
      let c;
      if (this.isSelected(d)) c = "selected ";else if (this.isSelectable(d)) c = "selectable ";else c = "nonSelectable ";

      if (this.isToday(d)) {
        c = c + "today";
      }

      return c;
    },

    daySelected(day, css) {
      // leave if this isnt selectable, didnt use isSelectable because that might not be performant
      if (css.indexOf("nonSelectable") > -1) {
        return;
      }

      this.selectedDay = day;
      var dt = new Date(this._startDate.getFullYear(), this._startDate.getMonth(), day);
      this.$emit("daySelected", dt);
    },

    isSelected(day) {
      return this.selectedDay == day;
    },

    moveMonth(a) {
      this._startDate = new Date(this._startDate.getFullYear(), this._startDate.getMonth() + a, 1);

      this._startDate.setMonth(this._startDate.getMonth() + a);

      this.$emit("monthChanged", this._startDate);
      this.bind();
    },

    bind() {
      this.days = ["S", "M", "T", "W", "T", "F", "S"];
      this.calendar = [];
      if (!this._startDate) if (!this._startDate) this._startDate = new Date();else this._startDate = this.startDate;
      this.selectedDay = this._startDate.getDate(); //get first day of month

      var firstDay = new Date(this._startDate.getFullYear(), this._startDate.getMonth(), 1);
      let start = firstDay.getDay(); // how many days in the month

      let daysInMonth = new Date(this._startDate.getFullYear(), this._startDate.getMonth() + 1, 0).getDate();

      for (let i = 0; i < start; i++) {
        this.calendar.push("");
      }

      for (let i = 1; i <= daysInMonth; i++) {
        this.calendar.push(i);
      }
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.calendar ? _c('div', {
    staticClass: "vue2-simple"
  }, [_c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    staticClass: "monthHeader"
  }, [_c('div', {
    staticClass: "monthWrapper"
  }, [_c('div', {
    staticClass: "monthHeaderLeft"
  }, [_c('button', {
    class: _vm.buttonClass,
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.moveMonth(-1);
      }
    }
  }, [_vm._v("\n            <\n          ")])]), _vm._v(" "), _vm._startDate ? _c('div', {
    staticClass: "monthHeaderMonth"
  }, [_vm._v("\n          " + _vm._s(_vm._startDate.toLocaleString("default", {
    month: "long"
  })) + "\n          " + _vm._s(_vm._startDate.getFullYear()) + "\n        ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "monthHeaderYear"
  }, [_c('button', {
    class: _vm.buttonClass,
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.moveMonth(1);
      }
    }
  }, [_vm._v("\n            >\n          ")])])])]), _vm._v(" "), _vm._l(_vm.days, function (d) {
    return _c('div', {
      staticClass: "day"
    }, [_vm._v(_vm._s(d))]);
  }), _vm._v(" "), _vm._l(_vm.calendar, function (c) {
    return _c('div', {
      staticClass: "item"
    }, [_c('div', {
      class: _vm.getDayClasses(c),
      on: {
        "click": function ($event) {
          _vm.daySelected(c, _vm.getDayClasses(c));
        }
      }
    }, [_vm._v("\n        " + _vm._s(c) + "\n      ")])]);
  })], 2)]) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-558e8f5a_0", {
    source: ".day[data-v-558e8f5a]{font-weight:700}.item[data-v-558e8f5a]{text-align:center;font-size:15px;width:100%}.monthHeaderMonth[data-v-558e8f5a]{font-size:1.5em;font-weight:700;padding:10px}.item>.selectable[data-v-558e8f5a]{padding:10px;border-radius:50%;color:2a96cc;border:2px solid #2a96cc;color:#2a96cc;cursor:pointer}.item>.selected[data-v-558e8f5a]{padding:10px;border-radius:50%;background-color:#2a96cc;color:#fff;border:1px solid #2a96cc}.item>.nonSelectable[data-v-558e8f5a]{color:gray}.today[data-v-558e8f5a]{font-weight:bolder;text-decoration:underline}.monthHeaderMonth[data-v-558e8f5a]{text-align:center}.monthHeaderYear[data-v-558e8f5a]{text-align:right}.monthHeader[data-v-558e8f5a]{grid-column-start:1;grid-column-end:span 7;min-width:100%;border-bottom:solid 1px #efefef;padding-bottom:10px}.monthWrapper[data-v-558e8f5a]{display:grid;grid-template-columns:50px auto 50px}.wrapper[data-v-558e8f5a]{display:grid;justify-items:center;grid-template-columns:repeat(7,40px);grid-template-rows:repeat(10,45px);gap:5px;align-items:center;justify-content:center;align-content:stretch}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-558e8f5a";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var __vue_component__$1 = __vue_component__;

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Vue2SimpleCalendar: __vue_component__$1
});

// Import vue components

const install = function installVue2SimpleCalendar(Vue) {
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export { __vue_component__$1 as Vue2SimpleCalendar, install as default };
