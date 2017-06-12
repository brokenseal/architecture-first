/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


!function () {
    'use strict';

    function VNode() {}
    function h(nodeName, attributes) {
        var lastSimple,
            child,
            simple,
            i,
            children = EMPTY_CHILDREN;
        for (i = arguments.length; i-- > 2;) stack.push(arguments[i]);
        if (attributes && null != attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) && void 0 !== child.pop) for (i = child.length; i--;) stack.push(child[i]);else {
            if (child === !0 || child === !1) child = null;
            if (simple = 'function' != typeof nodeName) if (null == child) child = '';else if ('number' == typeof child) child = String(child);else if ('string' != typeof child) simple = !1;
            if (simple && lastSimple) children[children.length - 1] += child;else if (children === EMPTY_CHILDREN) children = [child];else children.push(child);
            lastSimple = simple;
        }
        var p = new VNode();
        p.nodeName = nodeName;
        p.children = children;
        p.attributes = null == attributes ? void 0 : attributes;
        p.key = null == attributes ? void 0 : attributes.key;
        if (void 0 !== options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        for (var i in props) obj[i] = props[i];
        return obj;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function enqueueRender(component) {
        if (!component.__d && (component.__d = !0) && 1 == items.push(component)) (options.debounceRendering || setTimeout)(rerender);
    }
    function rerender() {
        var p,
            list = items;
        items = [];
        while (p = list.pop()) if (p.__d) renderComponent(p);
    }
    function isSameNodeType(node, vnode, hydrating) {
        if ('string' == typeof vnode || 'number' == typeof vnode) return void 0 !== node.splitText;
        if ('string' == typeof vnode.nodeName) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);else return hydrating || node._componentConstructor === vnode.nodeName;
    }
    function isNamedNode(node, nodeName) {
        return node.__n === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }
    function getNodeProps(vnode) {
        var props = extend({}, vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (void 0 !== defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function createNode(nodeName, isSvg) {
        var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
        node.__n = nodeName;
        return node;
    }
    function removeNode(node) {
        if (node.parentNode) node.parentNode.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('key' === name) ;else if ('ref' === name) {
            if (old) old(null);
            if (value) value(node);
        } else if ('class' === name && !isSvg) node.className = value || '';else if ('style' === name) {
            if (!value || 'string' == typeof value || 'string' == typeof old) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if ('string' != typeof old) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && IS_NON_DIMENSIONAL.test(i) === !1 ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var useCapture = name !== (name = name.replace(/Capture$/, ''));
            name = name.toLowerCase().substring(2);
            if (value) {
                if (!old) node.addEventListener(name, eventProxy, useCapture);
            } else node.removeEventListener(name, eventProxy, useCapture);
            (node.__l || (node.__l = {}))[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
            if (null == value || value === !1) {
                if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
            } else if ('function' != typeof value) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this.__l[e.type](options.event && options.event(e) || e);
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = null != parent && void 0 !== parent.ownerSVGElement;
            hydrating = null != dom && !('__preactattr_' in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll, componentRoot);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (! --diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll, componentRoot) {
        var out = dom,
            prevSvgMode = isSvgMode;
        if (null == vnode) vnode = '';
        if ('string' == typeof vnode) {
            if (dom && void 0 !== dom.splitText && dom.parentNode && (!dom._component || componentRoot)) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                out = document.createTextNode(vnode);
                if (dom) {
                    if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                    recollectNodeTree(dom, !0);
                }
            }
            out.__preactattr_ = !0;
            return out;
        }
        if ('function' == typeof vnode.nodeName) return buildComponentFromVNode(dom, vnode, context, mountAll);
        isSvgMode = 'svg' === vnode.nodeName ? !0 : 'foreignObject' === vnode.nodeName ? !1 : isSvgMode;
        if (!dom || !isNamedNode(dom, String(vnode.nodeName))) {
            out = createNode(String(vnode.nodeName), isSvgMode);
            if (dom) {
                while (dom.firstChild) out.appendChild(dom.firstChild);
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, !0);
            }
        }
        var fc = out.firstChild,
            props = out.__preactattr_ || (out.__preactattr_ = {}),
            vchildren = vnode.children;
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && null != fc && void 0 !== fc.splitText && null == fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || null != fc) innerDiffNode(out, vchildren, context, mountAll, hydrating || null != props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
        var j,
            c,
            vchild,
            child,
            originalChildren = dom.childNodes,
            children = [],
            keyed = {},
            keyedLen = 0,
            min = 0,
            len = originalChildren.length,
            childrenLen = 0,
            vlen = vchildren ? vchildren.length : 0;
        if (0 !== len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i],
                props = _child.__preactattr_,
                key = vlen && props ? _child._component ? _child._component.__k : props.key : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (props || (void 0 !== _child.splitText ? isHydrating ? _child.nodeValue.trim() : !0 : isHydrating)) children[childrenLen++] = _child;
        }
        if (0 !== vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && void 0 !== keyed[key]) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) if (void 0 !== children[j] && isSameNodeType(c = children[j], vchild, isHydrating)) {
                child = c;
                children[j] = void 0;
                if (j === childrenLen - 1) childrenLen--;
                if (j === min) min++;
                break;
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child);else if (child !== originalChildren[i]) if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);else dom.insertBefore(child, originalChildren[i] || null);
        }
        if (keyedLen) for (var i in keyed) if (void 0 !== keyed[i]) recollectNodeTree(keyed[i], !1);
        while (min <= childrenLen) if (void 0 !== (child = children[childrenLen--])) recollectNodeTree(child, !1);
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component);else {
            if (null != node.__preactattr_ && node.__preactattr_.ref) node.__preactattr_.ref(null);
            if (unmountOnly === !1 || null == node.__preactattr_) removeNode(node);
            removeChildren(node);
        }
    }
    function removeChildren(node) {
        node = node.lastChild;
        while (node) {
            var next = node.previousSibling;
            recollectNodeTree(node, !0);
            node = next;
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if ((!attrs || null == attrs[name]) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name;
        (components[name] || (components[name] = [])).push(component);
    }
    function createComponent(Ctor, props, context) {
        var inst,
            list = components[Ctor.name];
        if (Ctor.prototype && Ctor.prototype.render) {
            inst = new Ctor(props, context);
            Component.call(inst, props, context);
        } else {
            inst = new Component(props, context);
            inst.constructor = Ctor;
            inst.render = doRender;
        }
        if (list) for (var i = list.length; i--;) if (list[i].constructor === Ctor) {
            inst.__b = list[i].__b;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function doRender(props, state, context) {
        return this.constructor(props, context);
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component.__x) {
            component.__x = !0;
            if (component.__r = props.ref) delete props.ref;
            if (component.__k = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.__c) component.__c = component.context;
                component.context = context;
            }
            if (!component.__p) component.__p = component.props;
            component.props = props;
            component.__x = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll);else enqueueRender(component);
            if (component.__r) component.__r(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component.__x) {
            var rendered,
                inst,
                cbase,
                props = component.props,
                state = component.state,
                context = component.context,
                previousProps = component.__p || props,
                previousState = component.__s || state,
                previousContext = component.__c || context,
                isUpdate = component.base,
                nextBase = component.__b,
                initialBase = isUpdate || nextBase,
                initialChildComponent = component._component,
                skip = !1;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0;else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.__p = component.__s = component.__c = component.__b = null;
            component.__d = !1;
            if (!skip) {
                rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(extend({}, context), component.getChildContext());
                var toUnmount,
                    base,
                    childComponent = rendered && rendered.nodeName;
                if ('function' == typeof childComponent) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__k) setComponentProps(inst, childProps, 1, context, !1);else {
                        toUnmount = inst;
                        component._component = inst = createComponent(childComponent, childProps, context);
                        inst.__b = inst.__b || nextBase;
                        inst.__u = component;
                        setComponentProps(inst, childProps, 0, context, !1);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase, !1);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component,
                        t = component;
                    while (t = t.__u) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component);else if (!skip) {
                flushMounts();
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            if (null != component.__h) while (component.__h.length) component.__h.pop().call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component,
            originalComponent = c,
            oldDom = dom,
            isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
            isOwner = isDirectOwner,
            props = getNodeProps(vnode);
        while (c && !isOwner && (c = c.__u)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.__b) {
                c.__b = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom, !1);
            }
        }
        return dom;
    }
    function unmountComponent(component) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component.__x = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner);else if (base) {
            if (base.__preactattr_ && base.__preactattr_.ref) base.__preactattr_.ref(null);
            component.__b = base;
            removeNode(base);
            collectComponent(component);
            removeChildren(base);
        }
        if (component.__r) component.__r(null);
    }
    function Component(props, context) {
        this.__d = !0;
        this.context = context;
        this.props = props;
        this.state = this.state || {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent, !1);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var items = [];
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        setState: function (state, callback) {
            var s = this.state;
            if (!this.__s) this.__s = extend({}, s);
            extend(s, 'function' == typeof state ? state(s, this.props) : state);
            if (callback) (this.__h = this.__h || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function (callback) {
            if (callback) (this.__h = this.__h || []).push(callback);
            renderComponent(this, 2);
        },
        render: function () {}
    });
    var preact = {
        h: h,
        createElement: h,
        cloneElement: cloneElement,
        Component: Component,
        render: render,
        rerender: rerender,
        options: options
    };
    if (true) module.exports = preact;else self.preact = preact;
}();
//# sourceMappingURL=preact.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9wcmVhY3QvZGlzdC9wcmVhY3QuanMiXSwibmFtZXMiOlsiVk5vZGUiLCJoIiwibm9kZU5hbWUiLCJhdHRyaWJ1dGVzIiwibGFzdFNpbXBsZSIsImNoaWxkIiwic2ltcGxlIiwiaSIsImNoaWxkcmVuIiwiRU1QVFlfQ0hJTERSRU4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzdGFjayIsInB1c2giLCJwb3AiLCJTdHJpbmciLCJwIiwia2V5Iiwib3B0aW9ucyIsInZub2RlIiwiZXh0ZW5kIiwib2JqIiwicHJvcHMiLCJjbG9uZUVsZW1lbnQiLCJzbGljZSIsImNhbGwiLCJlbnF1ZXVlUmVuZGVyIiwiY29tcG9uZW50IiwiX19kIiwiaXRlbXMiLCJkZWJvdW5jZVJlbmRlcmluZyIsInNldFRpbWVvdXQiLCJyZXJlbmRlciIsImxpc3QiLCJyZW5kZXJDb21wb25lbnQiLCJpc1NhbWVOb2RlVHlwZSIsIm5vZGUiLCJoeWRyYXRpbmciLCJzcGxpdFRleHQiLCJfY29tcG9uZW50Q29uc3RydWN0b3IiLCJpc05hbWVkTm9kZSIsIl9fbiIsInRvTG93ZXJDYXNlIiwiZ2V0Tm9kZVByb3BzIiwiZGVmYXVsdFByb3BzIiwiY3JlYXRlTm9kZSIsImlzU3ZnIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50TlMiLCJjcmVhdGVFbGVtZW50IiwicmVtb3ZlTm9kZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInNldEFjY2Vzc29yIiwibmFtZSIsIm9sZCIsInZhbHVlIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJjc3NUZXh0IiwiSVNfTk9OX0RJTUVOU0lPTkFMIiwidGVzdCIsImlubmVySFRNTCIsIl9faHRtbCIsInVzZUNhcHR1cmUiLCJyZXBsYWNlIiwic3Vic3RyaW5nIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50UHJveHkiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX19sIiwic2V0UHJvcGVydHkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJucyIsInJlbW92ZUF0dHJpYnV0ZU5TIiwic2V0QXR0cmlidXRlTlMiLCJzZXRBdHRyaWJ1dGUiLCJlIiwidHlwZSIsImV2ZW50IiwiZmx1c2hNb3VudHMiLCJjIiwibW91bnRzIiwiYWZ0ZXJNb3VudCIsImNvbXBvbmVudERpZE1vdW50IiwiZGlmZiIsImRvbSIsImNvbnRleHQiLCJtb3VudEFsbCIsInBhcmVudCIsImNvbXBvbmVudFJvb3QiLCJkaWZmTGV2ZWwiLCJpc1N2Z01vZGUiLCJvd25lclNWR0VsZW1lbnQiLCJyZXQiLCJpZGlmZiIsImFwcGVuZENoaWxkIiwib3V0IiwicHJldlN2Z01vZGUiLCJfY29tcG9uZW50Iiwibm9kZVZhbHVlIiwiY3JlYXRlVGV4dE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJyZWNvbGxlY3ROb2RlVHJlZSIsIl9fcHJlYWN0YXR0cl8iLCJidWlsZENvbXBvbmVudEZyb21WTm9kZSIsImZpcnN0Q2hpbGQiLCJmYyIsInZjaGlsZHJlbiIsIm5leHRTaWJsaW5nIiwiaW5uZXJEaWZmTm9kZSIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiZGlmZkF0dHJpYnV0ZXMiLCJpc0h5ZHJhdGluZyIsImoiLCJ2Y2hpbGQiLCJvcmlnaW5hbENoaWxkcmVuIiwiY2hpbGROb2RlcyIsImtleWVkIiwia2V5ZWRMZW4iLCJtaW4iLCJsZW4iLCJjaGlsZHJlbkxlbiIsInZsZW4iLCJfY2hpbGQiLCJfX2siLCJ0cmltIiwiaW5zZXJ0QmVmb3JlIiwidW5tb3VudE9ubHkiLCJ1bm1vdW50Q29tcG9uZW50IiwicmVmIiwicmVtb3ZlQ2hpbGRyZW4iLCJsYXN0Q2hpbGQiLCJuZXh0IiwicHJldmlvdXNTaWJsaW5nIiwiYXR0cnMiLCJjb2xsZWN0Q29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJjb21wb25lbnRzIiwiY3JlYXRlQ29tcG9uZW50IiwiQ3RvciIsImluc3QiLCJwcm90b3R5cGUiLCJyZW5kZXIiLCJDb21wb25lbnQiLCJkb1JlbmRlciIsIl9fYiIsInNwbGljZSIsInN0YXRlIiwic2V0Q29tcG9uZW50UHJvcHMiLCJvcHRzIiwiX194IiwiX19yIiwiYmFzZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJfX2MiLCJfX3AiLCJzeW5jQ29tcG9uZW50VXBkYXRlcyIsImlzQ2hpbGQiLCJyZW5kZXJlZCIsImNiYXNlIiwicHJldmlvdXNQcm9wcyIsInByZXZpb3VzU3RhdGUiLCJfX3MiLCJwcmV2aW91c0NvbnRleHQiLCJpc1VwZGF0ZSIsIm5leHRCYXNlIiwiaW5pdGlhbEJhc2UiLCJpbml0aWFsQ2hpbGRDb21wb25lbnQiLCJza2lwIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImdldENoaWxkQ29udGV4dCIsInRvVW5tb3VudCIsImNoaWxkQ29tcG9uZW50IiwiY2hpbGRQcm9wcyIsIl9fdSIsImJhc2VQYXJlbnQiLCJjb21wb25lbnRSZWYiLCJ0IiwidW5zaGlmdCIsImNvbXBvbmVudERpZFVwZGF0ZSIsImFmdGVyVXBkYXRlIiwiX19oIiwib3JpZ2luYWxDb21wb25lbnQiLCJvbGREb20iLCJpc0RpcmVjdE93bmVyIiwiaXNPd25lciIsImJlZm9yZVVubW91bnQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImlubmVyIiwibWVyZ2UiLCJzZXRTdGF0ZSIsImNhbGxiYWNrIiwicyIsImZvcmNlVXBkYXRlIiwicHJlYWN0IiwibW9kdWxlIiwiZXhwb3J0cyIsInNlbGYiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQyxZQUFXO0FBQ1I7O0FBQ0EsYUFBU0EsS0FBVCxHQUFpQixDQUFFO0FBQ25CLGFBQVNDLENBQVQsQ0FBV0MsUUFBWCxFQUFxQkMsVUFBckIsRUFBaUM7QUFDN0IsWUFBSUMsVUFBSjtBQUFBLFlBQWdCQyxLQUFoQjtBQUFBLFlBQXVCQyxNQUF2QjtBQUFBLFlBQStCQyxDQUEvQjtBQUFBLFlBQWtDQyxXQUFXQyxjQUE3QztBQUNBLGFBQUtGLElBQUlHLFVBQVVDLE1BQW5CLEVBQTJCSixNQUFNLENBQWpDLEdBQXNDSyxNQUFNQyxJQUFOLENBQVdILFVBQVVILENBQVYsQ0FBWDtBQUN0QyxZQUFJSixjQUFjLFFBQVFBLFdBQVdLLFFBQXJDLEVBQStDO0FBQzNDLGdCQUFJLENBQUNJLE1BQU1ELE1BQVgsRUFBbUJDLE1BQU1DLElBQU4sQ0FBV1YsV0FBV0ssUUFBdEI7QUFDbkIsbUJBQU9MLFdBQVdLLFFBQWxCO0FBQ0g7QUFDRCxlQUFPSSxNQUFNRCxNQUFiLEVBQXFCLElBQUksQ0FBQ04sUUFBUU8sTUFBTUUsR0FBTixFQUFULEtBQXlCLEtBQUssQ0FBTCxLQUFXVCxNQUFNUyxHQUE5QyxFQUFtRCxLQUFLUCxJQUFJRixNQUFNTSxNQUFmLEVBQXVCSixHQUF2QixHQUE4QkssTUFBTUMsSUFBTixDQUFXUixNQUFNRSxDQUFOLENBQVgsRUFBakYsS0FBNEc7QUFDN0gsZ0JBQUlGLFVBQVUsQ0FBQyxDQUFYLElBQWdCQSxVQUFVLENBQUMsQ0FBL0IsRUFBa0NBLFFBQVEsSUFBUjtBQUNsQyxnQkFBSUMsU0FBUyxjQUFjLE9BQU9KLFFBQWxDLEVBQTRDLElBQUksUUFBUUcsS0FBWixFQUFtQkEsUUFBUSxFQUFSLENBQW5CLEtBQW9DLElBQUksWUFBWSxPQUFPQSxLQUF2QixFQUE4QkEsUUFBUVUsT0FBT1YsS0FBUCxDQUFSLENBQTlCLEtBQTBELElBQUksWUFBWSxPQUFPQSxLQUF2QixFQUE4QkMsU0FBUyxDQUFDLENBQVY7QUFDeEssZ0JBQUlBLFVBQVVGLFVBQWQsRUFBMEJJLFNBQVNBLFNBQVNHLE1BQVQsR0FBa0IsQ0FBM0IsS0FBaUNOLEtBQWpDLENBQTFCLEtBQXVFLElBQUlHLGFBQWFDLGNBQWpCLEVBQWlDRCxXQUFXLENBQUVILEtBQUYsQ0FBWCxDQUFqQyxLQUE0REcsU0FBU0ssSUFBVCxDQUFjUixLQUFkO0FBQ25JRCx5QkFBYUUsTUFBYjtBQUNIO0FBQ0QsWUFBSVUsSUFBSSxJQUFJaEIsS0FBSixFQUFSO0FBQ0FnQixVQUFFZCxRQUFGLEdBQWFBLFFBQWI7QUFDQWMsVUFBRVIsUUFBRixHQUFhQSxRQUFiO0FBQ0FRLFVBQUViLFVBQUYsR0FBZSxRQUFRQSxVQUFSLEdBQXFCLEtBQUssQ0FBMUIsR0FBOEJBLFVBQTdDO0FBQ0FhLFVBQUVDLEdBQUYsR0FBUSxRQUFRZCxVQUFSLEdBQXFCLEtBQUssQ0FBMUIsR0FBOEJBLFdBQVdjLEdBQWpEO0FBQ0EsWUFBSSxLQUFLLENBQUwsS0FBV0MsUUFBUUMsS0FBdkIsRUFBOEJELFFBQVFDLEtBQVIsQ0FBY0gsQ0FBZDtBQUM5QixlQUFPQSxDQUFQO0FBQ0g7QUFDRCxhQUFTSSxNQUFULENBQWdCQyxHQUFoQixFQUFxQkMsS0FBckIsRUFBNEI7QUFDeEIsYUFBSyxJQUFJZixDQUFULElBQWNlLEtBQWQsRUFBcUJELElBQUlkLENBQUosSUFBU2UsTUFBTWYsQ0FBTixDQUFUO0FBQ3JCLGVBQU9jLEdBQVA7QUFDSDtBQUNELGFBQVNFLFlBQVQsQ0FBc0JKLEtBQXRCLEVBQTZCRyxLQUE3QixFQUFvQztBQUNoQyxlQUFPckIsRUFBRWtCLE1BQU1qQixRQUFSLEVBQWtCa0IsT0FBT0EsT0FBTyxFQUFQLEVBQVdELE1BQU1oQixVQUFqQixDQUFQLEVBQXFDbUIsS0FBckMsQ0FBbEIsRUFBK0RaLFVBQVVDLE1BQVYsR0FBbUIsQ0FBbkIsR0FBdUIsR0FBR2EsS0FBSCxDQUFTQyxJQUFULENBQWNmLFNBQWQsRUFBeUIsQ0FBekIsQ0FBdkIsR0FBcURTLE1BQU1YLFFBQTFILENBQVA7QUFDSDtBQUNELGFBQVNrQixhQUFULENBQXVCQyxTQUF2QixFQUFrQztBQUM5QixZQUFJLENBQUNBLFVBQVVDLEdBQVgsS0FBbUJELFVBQVVDLEdBQVYsR0FBZ0IsQ0FBQyxDQUFwQyxLQUEwQyxLQUFLQyxNQUFNaEIsSUFBTixDQUFXYyxTQUFYLENBQW5ELEVBQTBFLENBQUNULFFBQVFZLGlCQUFSLElBQTZCQyxVQUE5QixFQUEwQ0MsUUFBMUM7QUFDN0U7QUFDRCxhQUFTQSxRQUFULEdBQW9CO0FBQ2hCLFlBQUloQixDQUFKO0FBQUEsWUFBT2lCLE9BQU9KLEtBQWQ7QUFDQUEsZ0JBQVEsRUFBUjtBQUNBLGVBQU9iLElBQUlpQixLQUFLbkIsR0FBTCxFQUFYLEVBQXVCLElBQUlFLEVBQUVZLEdBQU4sRUFBV00sZ0JBQWdCbEIsQ0FBaEI7QUFDckM7QUFDRCxhQUFTbUIsY0FBVCxDQUF3QkMsSUFBeEIsRUFBOEJqQixLQUE5QixFQUFxQ2tCLFNBQXJDLEVBQWdEO0FBQzVDLFlBQUksWUFBWSxPQUFPbEIsS0FBbkIsSUFBNEIsWUFBWSxPQUFPQSxLQUFuRCxFQUEwRCxPQUFPLEtBQUssQ0FBTCxLQUFXaUIsS0FBS0UsU0FBdkI7QUFDMUQsWUFBSSxZQUFZLE9BQU9uQixNQUFNakIsUUFBN0IsRUFBdUMsT0FBTyxDQUFDa0MsS0FBS0cscUJBQU4sSUFBK0JDLFlBQVlKLElBQVosRUFBa0JqQixNQUFNakIsUUFBeEIsQ0FBdEMsQ0FBdkMsS0FBcUgsT0FBT21DLGFBQWFELEtBQUtHLHFCQUFMLEtBQStCcEIsTUFBTWpCLFFBQXpEO0FBQ3hIO0FBQ0QsYUFBU3NDLFdBQVQsQ0FBcUJKLElBQXJCLEVBQTJCbEMsUUFBM0IsRUFBcUM7QUFDakMsZUFBT2tDLEtBQUtLLEdBQUwsS0FBYXZDLFFBQWIsSUFBeUJrQyxLQUFLbEMsUUFBTCxDQUFjd0MsV0FBZCxPQUFnQ3hDLFNBQVN3QyxXQUFULEVBQWhFO0FBQ0g7QUFDRCxhQUFTQyxZQUFULENBQXNCeEIsS0FBdEIsRUFBNkI7QUFDekIsWUFBSUcsUUFBUUYsT0FBTyxFQUFQLEVBQVdELE1BQU1oQixVQUFqQixDQUFaO0FBQ0FtQixjQUFNZCxRQUFOLEdBQWlCVyxNQUFNWCxRQUF2QjtBQUNBLFlBQUlvQyxlQUFlekIsTUFBTWpCLFFBQU4sQ0FBZTBDLFlBQWxDO0FBQ0EsWUFBSSxLQUFLLENBQUwsS0FBV0EsWUFBZixFQUE2QixLQUFLLElBQUlyQyxDQUFULElBQWNxQyxZQUFkLEVBQTRCLElBQUksS0FBSyxDQUFMLEtBQVd0QixNQUFNZixDQUFOLENBQWYsRUFBeUJlLE1BQU1mLENBQU4sSUFBV3FDLGFBQWFyQyxDQUFiLENBQVg7QUFDbEYsZUFBT2UsS0FBUDtBQUNIO0FBQ0QsYUFBU3VCLFVBQVQsQ0FBb0IzQyxRQUFwQixFQUE4QjRDLEtBQTlCLEVBQXFDO0FBQ2pDLFlBQUlWLE9BQU9VLFFBQVFDLFNBQVNDLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXVEOUMsUUFBdkQsQ0FBUixHQUEyRTZDLFNBQVNFLGFBQVQsQ0FBdUIvQyxRQUF2QixDQUF0RjtBQUNBa0MsYUFBS0ssR0FBTCxHQUFXdkMsUUFBWDtBQUNBLGVBQU9rQyxJQUFQO0FBQ0g7QUFDRCxhQUFTYyxVQUFULENBQW9CZCxJQUFwQixFQUEwQjtBQUN0QixZQUFJQSxLQUFLZSxVQUFULEVBQXFCZixLQUFLZSxVQUFMLENBQWdCQyxXQUFoQixDQUE0QmhCLElBQTVCO0FBQ3hCO0FBQ0QsYUFBU2lCLFdBQVQsQ0FBcUJqQixJQUFyQixFQUEyQmtCLElBQTNCLEVBQWlDQyxHQUFqQyxFQUFzQ0MsS0FBdEMsRUFBNkNWLEtBQTdDLEVBQW9EO0FBQ2hELFlBQUksZ0JBQWdCUSxJQUFwQixFQUEwQkEsT0FBTyxPQUFQO0FBQzFCLFlBQUksVUFBVUEsSUFBZCxFQUFvQixDQUFwQixLQUEyQixJQUFJLFVBQVVBLElBQWQsRUFBb0I7QUFDM0MsZ0JBQUlDLEdBQUosRUFBU0EsSUFBSSxJQUFKO0FBQ1QsZ0JBQUlDLEtBQUosRUFBV0EsTUFBTXBCLElBQU47QUFDZCxTQUgwQixNQUdwQixJQUFJLFlBQVlrQixJQUFaLElBQW9CLENBQUNSLEtBQXpCLEVBQWdDVixLQUFLcUIsU0FBTCxHQUFpQkQsU0FBUyxFQUExQixDQUFoQyxLQUFtRSxJQUFJLFlBQVlGLElBQWhCLEVBQXNCO0FBQzVGLGdCQUFJLENBQUNFLEtBQUQsSUFBVSxZQUFZLE9BQU9BLEtBQTdCLElBQXNDLFlBQVksT0FBT0QsR0FBN0QsRUFBa0VuQixLQUFLc0IsS0FBTCxDQUFXQyxPQUFYLEdBQXFCSCxTQUFTLEVBQTlCO0FBQ2xFLGdCQUFJQSxTQUFTLFlBQVksT0FBT0EsS0FBaEMsRUFBdUM7QUFDbkMsb0JBQUksWUFBWSxPQUFPRCxHQUF2QixFQUE0QixLQUFLLElBQUloRCxDQUFULElBQWNnRCxHQUFkLEVBQW1CLElBQUksRUFBRWhELEtBQUtpRCxLQUFQLENBQUosRUFBbUJwQixLQUFLc0IsS0FBTCxDQUFXbkQsQ0FBWCxJQUFnQixFQUFoQjtBQUNsRSxxQkFBSyxJQUFJQSxDQUFULElBQWNpRCxLQUFkLEVBQXFCcEIsS0FBS3NCLEtBQUwsQ0FBV25ELENBQVgsSUFBZ0IsWUFBWSxPQUFPaUQsTUFBTWpELENBQU4sQ0FBbkIsSUFBK0JxRCxtQkFBbUJDLElBQW5CLENBQXdCdEQsQ0FBeEIsTUFBK0IsQ0FBQyxDQUEvRCxHQUFtRWlELE1BQU1qRCxDQUFOLElBQVcsSUFBOUUsR0FBcUZpRCxNQUFNakQsQ0FBTixDQUFyRztBQUN4QjtBQUNKLFNBTnlFLE1BTW5FLElBQUksOEJBQThCK0MsSUFBbEMsRUFBd0M7QUFDM0MsZ0JBQUlFLEtBQUosRUFBV3BCLEtBQUswQixTQUFMLEdBQWlCTixNQUFNTyxNQUFOLElBQWdCLEVBQWpDO0FBQ2QsU0FGTSxNQUVBLElBQUksT0FBT1QsS0FBSyxDQUFMLENBQVAsSUFBa0IsT0FBT0EsS0FBSyxDQUFMLENBQTdCLEVBQXNDO0FBQ3pDLGdCQUFJVSxhQUFhVixVQUFVQSxPQUFPQSxLQUFLVyxPQUFMLENBQWEsVUFBYixFQUF5QixFQUF6QixDQUFqQixDQUFqQjtBQUNBWCxtQkFBT0EsS0FBS1osV0FBTCxHQUFtQndCLFNBQW5CLENBQTZCLENBQTdCLENBQVA7QUFDQSxnQkFBSVYsS0FBSixFQUFXO0FBQ1Asb0JBQUksQ0FBQ0QsR0FBTCxFQUFVbkIsS0FBSytCLGdCQUFMLENBQXNCYixJQUF0QixFQUE0QmMsVUFBNUIsRUFBd0NKLFVBQXhDO0FBQ2IsYUFGRCxNQUVPNUIsS0FBS2lDLG1CQUFMLENBQXlCZixJQUF6QixFQUErQmMsVUFBL0IsRUFBMkNKLFVBQTNDO0FBQ1AsYUFBQzVCLEtBQUtrQyxHQUFMLEtBQWFsQyxLQUFLa0MsR0FBTCxHQUFXLEVBQXhCLENBQUQsRUFBOEJoQixJQUE5QixJQUFzQ0UsS0FBdEM7QUFDSCxTQVBNLE1BT0EsSUFBSSxXQUFXRixJQUFYLElBQW1CLFdBQVdBLElBQTlCLElBQXNDLENBQUNSLEtBQXZDLElBQWdEUSxRQUFRbEIsSUFBNUQsRUFBa0U7QUFDckVtQyx3QkFBWW5DLElBQVosRUFBa0JrQixJQUFsQixFQUF3QixRQUFRRSxLQUFSLEdBQWdCLEVBQWhCLEdBQXFCQSxLQUE3QztBQUNBLGdCQUFJLFFBQVFBLEtBQVIsSUFBaUJBLFVBQVUsQ0FBQyxDQUFoQyxFQUFtQ3BCLEtBQUtvQyxlQUFMLENBQXFCbEIsSUFBckI7QUFDdEMsU0FITSxNQUdBO0FBQ0gsZ0JBQUltQixLQUFLM0IsU0FBU1EsVUFBVUEsT0FBT0EsS0FBS1csT0FBTCxDQUFhLFdBQWIsRUFBMEIsRUFBMUIsQ0FBakIsQ0FBbEI7QUFDQSxnQkFBSSxRQUFRVCxLQUFSLElBQWlCQSxVQUFVLENBQUMsQ0FBaEM7QUFBbUMsb0JBQUlpQixFQUFKLEVBQVFyQyxLQUFLc0MsaUJBQUwsQ0FBdUIsOEJBQXZCLEVBQXVEcEIsS0FBS1osV0FBTCxFQUF2RCxFQUFSLEtBQXlGTixLQUFLb0MsZUFBTCxDQUFxQmxCLElBQXJCO0FBQTVILG1CQUE2SixJQUFJLGNBQWMsT0FBT0UsS0FBekIsRUFBZ0MsSUFBSWlCLEVBQUosRUFBUXJDLEtBQUt1QyxjQUFMLENBQW9CLDhCQUFwQixFQUFvRHJCLEtBQUtaLFdBQUwsRUFBcEQsRUFBd0VjLEtBQXhFLEVBQVIsS0FBNkZwQixLQUFLd0MsWUFBTCxDQUFrQnRCLElBQWxCLEVBQXdCRSxLQUF4QjtBQUM3UjtBQUNKO0FBQ0QsYUFBU2UsV0FBVCxDQUFxQm5DLElBQXJCLEVBQTJCa0IsSUFBM0IsRUFBaUNFLEtBQWpDLEVBQXdDO0FBQ3BDLFlBQUk7QUFDQXBCLGlCQUFLa0IsSUFBTCxJQUFhRSxLQUFiO0FBQ0gsU0FGRCxDQUVFLE9BQU9xQixDQUFQLEVBQVUsQ0FBRTtBQUNqQjtBQUNELGFBQVNULFVBQVQsQ0FBb0JTLENBQXBCLEVBQXVCO0FBQ25CLGVBQU8sS0FBS1AsR0FBTCxDQUFTTyxFQUFFQyxJQUFYLEVBQWlCNUQsUUFBUTZELEtBQVIsSUFBaUI3RCxRQUFRNkQsS0FBUixDQUFjRixDQUFkLENBQWpCLElBQXFDQSxDQUF0RCxDQUFQO0FBQ0g7QUFDRCxhQUFTRyxXQUFULEdBQXVCO0FBQ25CLFlBQUlDLENBQUo7QUFDQSxlQUFPQSxJQUFJQyxPQUFPcEUsR0FBUCxFQUFYLEVBQXlCO0FBQ3JCLGdCQUFJSSxRQUFRaUUsVUFBWixFQUF3QmpFLFFBQVFpRSxVQUFSLENBQW1CRixDQUFuQjtBQUN4QixnQkFBSUEsRUFBRUcsaUJBQU4sRUFBeUJILEVBQUVHLGlCQUFGO0FBQzVCO0FBQ0o7QUFDRCxhQUFTQyxJQUFULENBQWNDLEdBQWQsRUFBbUJuRSxLQUFuQixFQUEwQm9FLE9BQTFCLEVBQW1DQyxRQUFuQyxFQUE2Q0MsTUFBN0MsRUFBcURDLGFBQXJELEVBQW9FO0FBQ2hFLFlBQUksQ0FBQ0MsV0FBTCxFQUFrQjtBQUNkQyx3QkFBWSxRQUFRSCxNQUFSLElBQWtCLEtBQUssQ0FBTCxLQUFXQSxPQUFPSSxlQUFoRDtBQUNBeEQsd0JBQVksUUFBUWlELEdBQVIsSUFBZSxFQUFFLG1CQUFtQkEsR0FBckIsQ0FBM0I7QUFDSDtBQUNELFlBQUlRLE1BQU1DLE1BQU1ULEdBQU4sRUFBV25FLEtBQVgsRUFBa0JvRSxPQUFsQixFQUEyQkMsUUFBM0IsRUFBcUNFLGFBQXJDLENBQVY7QUFDQSxZQUFJRCxVQUFVSyxJQUFJM0MsVUFBSixLQUFtQnNDLE1BQWpDLEVBQXlDQSxPQUFPTyxXQUFQLENBQW1CRixHQUFuQjtBQUN6QyxZQUFJLENBQUMsR0FBRUgsU0FBUCxFQUFrQjtBQUNkdEQsd0JBQVksQ0FBQyxDQUFiO0FBQ0EsZ0JBQUksQ0FBQ3FELGFBQUwsRUFBb0JWO0FBQ3ZCO0FBQ0QsZUFBT2MsR0FBUDtBQUNIO0FBQ0QsYUFBU0MsS0FBVCxDQUFlVCxHQUFmLEVBQW9CbkUsS0FBcEIsRUFBMkJvRSxPQUEzQixFQUFvQ0MsUUFBcEMsRUFBOENFLGFBQTlDLEVBQTZEO0FBQ3pELFlBQUlPLE1BQU1YLEdBQVY7QUFBQSxZQUFlWSxjQUFjTixTQUE3QjtBQUNBLFlBQUksUUFBUXpFLEtBQVosRUFBbUJBLFFBQVEsRUFBUjtBQUNuQixZQUFJLFlBQVksT0FBT0EsS0FBdkIsRUFBOEI7QUFDMUIsZ0JBQUltRSxPQUFPLEtBQUssQ0FBTCxLQUFXQSxJQUFJaEQsU0FBdEIsSUFBbUNnRCxJQUFJbkMsVUFBdkMsS0FBc0QsQ0FBQ21DLElBQUlhLFVBQUwsSUFBbUJULGFBQXpFLENBQUosRUFBNkY7QUFDekYsb0JBQUlKLElBQUljLFNBQUosSUFBaUJqRixLQUFyQixFQUE0Qm1FLElBQUljLFNBQUosR0FBZ0JqRixLQUFoQjtBQUMvQixhQUZELE1BRU87QUFDSDhFLHNCQUFNbEQsU0FBU3NELGNBQVQsQ0FBd0JsRixLQUF4QixDQUFOO0FBQ0Esb0JBQUltRSxHQUFKLEVBQVM7QUFDTCx3QkFBSUEsSUFBSW5DLFVBQVIsRUFBb0JtQyxJQUFJbkMsVUFBSixDQUFlbUQsWUFBZixDQUE0QkwsR0FBNUIsRUFBaUNYLEdBQWpDO0FBQ3BCaUIsc0NBQWtCakIsR0FBbEIsRUFBdUIsQ0FBQyxDQUF4QjtBQUNIO0FBQ0o7QUFDRFcsZ0JBQUlPLGFBQUosR0FBb0IsQ0FBQyxDQUFyQjtBQUNBLG1CQUFPUCxHQUFQO0FBQ0g7QUFDRCxZQUFJLGNBQWMsT0FBTzlFLE1BQU1qQixRQUEvQixFQUF5QyxPQUFPdUcsd0JBQXdCbkIsR0FBeEIsRUFBNkJuRSxLQUE3QixFQUFvQ29FLE9BQXBDLEVBQTZDQyxRQUE3QyxDQUFQO0FBQ3pDSSxvQkFBWSxVQUFVekUsTUFBTWpCLFFBQWhCLEdBQTJCLENBQUMsQ0FBNUIsR0FBZ0Msb0JBQW9CaUIsTUFBTWpCLFFBQTFCLEdBQXFDLENBQUMsQ0FBdEMsR0FBMEMwRixTQUF0RjtBQUNBLFlBQUksQ0FBQ04sR0FBRCxJQUFRLENBQUM5QyxZQUFZOEMsR0FBWixFQUFpQnZFLE9BQU9JLE1BQU1qQixRQUFiLENBQWpCLENBQWIsRUFBdUQ7QUFDbkQrRixrQkFBTXBELFdBQVc5QixPQUFPSSxNQUFNakIsUUFBYixDQUFYLEVBQW1DMEYsU0FBbkMsQ0FBTjtBQUNBLGdCQUFJTixHQUFKLEVBQVM7QUFDTCx1QkFBT0EsSUFBSW9CLFVBQVgsRUFBdUJULElBQUlELFdBQUosQ0FBZ0JWLElBQUlvQixVQUFwQjtBQUN2QixvQkFBSXBCLElBQUluQyxVQUFSLEVBQW9CbUMsSUFBSW5DLFVBQUosQ0FBZW1ELFlBQWYsQ0FBNEJMLEdBQTVCLEVBQWlDWCxHQUFqQztBQUNwQmlCLGtDQUFrQmpCLEdBQWxCLEVBQXVCLENBQUMsQ0FBeEI7QUFDSDtBQUNKO0FBQ0QsWUFBSXFCLEtBQUtWLElBQUlTLFVBQWI7QUFBQSxZQUF5QnBGLFFBQVEyRSxJQUFJTyxhQUFKLEtBQXNCUCxJQUFJTyxhQUFKLEdBQW9CLEVBQTFDLENBQWpDO0FBQUEsWUFBZ0ZJLFlBQVl6RixNQUFNWCxRQUFsRztBQUNBLFlBQUksQ0FBQzZCLFNBQUQsSUFBY3VFLFNBQWQsSUFBMkIsTUFBTUEsVUFBVWpHLE1BQTNDLElBQXFELFlBQVksT0FBT2lHLFVBQVUsQ0FBVixDQUF4RSxJQUF3RixRQUFRRCxFQUFoRyxJQUFzRyxLQUFLLENBQUwsS0FBV0EsR0FBR3JFLFNBQXBILElBQWlJLFFBQVFxRSxHQUFHRSxXQUFoSixFQUE2SjtBQUN6SixnQkFBSUYsR0FBR1AsU0FBSCxJQUFnQlEsVUFBVSxDQUFWLENBQXBCLEVBQWtDRCxHQUFHUCxTQUFILEdBQWVRLFVBQVUsQ0FBVixDQUFmO0FBQ3JDLFNBRkQsTUFFTyxJQUFJQSxhQUFhQSxVQUFVakcsTUFBdkIsSUFBaUMsUUFBUWdHLEVBQTdDLEVBQWlERyxjQUFjYixHQUFkLEVBQW1CVyxTQUFuQixFQUE4QnJCLE9BQTlCLEVBQXVDQyxRQUF2QyxFQUFpRG5ELGFBQWEsUUFBUWYsTUFBTXlGLHVCQUE1RTtBQUN4REMsdUJBQWVmLEdBQWYsRUFBb0I5RSxNQUFNaEIsVUFBMUIsRUFBc0NtQixLQUF0QztBQUNBc0Usb0JBQVlNLFdBQVo7QUFDQSxlQUFPRCxHQUFQO0FBQ0g7QUFDRCxhQUFTYSxhQUFULENBQXVCeEIsR0FBdkIsRUFBNEJzQixTQUE1QixFQUF1Q3JCLE9BQXZDLEVBQWdEQyxRQUFoRCxFQUEwRHlCLFdBQTFELEVBQXVFO0FBQ25FLFlBQUlDLENBQUo7QUFBQSxZQUFPakMsQ0FBUDtBQUFBLFlBQVVrQyxNQUFWO0FBQUEsWUFBa0I5RyxLQUFsQjtBQUFBLFlBQXlCK0csbUJBQW1COUIsSUFBSStCLFVBQWhEO0FBQUEsWUFBNEQ3RyxXQUFXLEVBQXZFO0FBQUEsWUFBMkU4RyxRQUFRLEVBQW5GO0FBQUEsWUFBdUZDLFdBQVcsQ0FBbEc7QUFBQSxZQUFxR0MsTUFBTSxDQUEzRztBQUFBLFlBQThHQyxNQUFNTCxpQkFBaUJ6RyxNQUFySTtBQUFBLFlBQTZJK0csY0FBYyxDQUEzSjtBQUFBLFlBQThKQyxPQUFPZixZQUFZQSxVQUFVakcsTUFBdEIsR0FBK0IsQ0FBcE07QUFDQSxZQUFJLE1BQU04RyxHQUFWLEVBQWUsS0FBSyxJQUFJbEgsSUFBSSxDQUFiLEVBQWdCQSxJQUFJa0gsR0FBcEIsRUFBeUJsSCxHQUF6QixFQUE4QjtBQUN6QyxnQkFBSXFILFNBQVNSLGlCQUFpQjdHLENBQWpCLENBQWI7QUFBQSxnQkFBa0NlLFFBQVFzRyxPQUFPcEIsYUFBakQ7QUFBQSxnQkFBZ0V2RixNQUFNMEcsUUFBUXJHLEtBQVIsR0FBZ0JzRyxPQUFPekIsVUFBUCxHQUFvQnlCLE9BQU96QixVQUFQLENBQWtCMEIsR0FBdEMsR0FBNEN2RyxNQUFNTCxHQUFsRSxHQUF3RSxJQUE5STtBQUNBLGdCQUFJLFFBQVFBLEdBQVosRUFBaUI7QUFDYnNHO0FBQ0FELHNCQUFNckcsR0FBTixJQUFhMkcsTUFBYjtBQUNILGFBSEQsTUFHTyxJQUFJdEcsVUFBVSxLQUFLLENBQUwsS0FBV3NHLE9BQU90RixTQUFsQixHQUE4QjJFLGNBQWNXLE9BQU94QixTQUFQLENBQWlCMEIsSUFBakIsRUFBZCxHQUF3QyxDQUFDLENBQXZFLEdBQTJFYixXQUFyRixDQUFKLEVBQXVHekcsU0FBU2tILGFBQVQsSUFBMEJFLE1BQTFCO0FBQ2pIO0FBQ0QsWUFBSSxNQUFNRCxJQUFWLEVBQWdCLEtBQUssSUFBSXBILElBQUksQ0FBYixFQUFnQkEsSUFBSW9ILElBQXBCLEVBQTBCcEgsR0FBMUIsRUFBK0I7QUFDM0M0RyxxQkFBU1AsVUFBVXJHLENBQVYsQ0FBVDtBQUNBRixvQkFBUSxJQUFSO0FBQ0EsZ0JBQUlZLE1BQU1rRyxPQUFPbEcsR0FBakI7QUFDQSxnQkFBSSxRQUFRQSxHQUFaLEVBQWlCO0FBQ2Isb0JBQUlzRyxZQUFZLEtBQUssQ0FBTCxLQUFXRCxNQUFNckcsR0FBTixDQUEzQixFQUF1QztBQUNuQ1osNEJBQVFpSCxNQUFNckcsR0FBTixDQUFSO0FBQ0FxRywwQkFBTXJHLEdBQU4sSUFBYSxLQUFLLENBQWxCO0FBQ0FzRztBQUNIO0FBQ0osYUFORCxNQU1PLElBQUksQ0FBQ2xILEtBQUQsSUFBVW1ILE1BQU1FLFdBQXBCLEVBQWlDLEtBQUtSLElBQUlNLEdBQVQsRUFBY04sSUFBSVEsV0FBbEIsRUFBK0JSLEdBQS9CLEVBQW9DLElBQUksS0FBSyxDQUFMLEtBQVcxRyxTQUFTMEcsQ0FBVCxDQUFYLElBQTBCL0UsZUFBZThDLElBQUl6RSxTQUFTMEcsQ0FBVCxDQUFuQixFQUFnQ0MsTUFBaEMsRUFBd0NGLFdBQXhDLENBQTlCLEVBQW9GO0FBQzVKNUcsd0JBQVE0RSxDQUFSO0FBQ0F6RSx5QkFBUzBHLENBQVQsSUFBYyxLQUFLLENBQW5CO0FBQ0Esb0JBQUlBLE1BQU1RLGNBQWMsQ0FBeEIsRUFBMkJBO0FBQzNCLG9CQUFJUixNQUFNTSxHQUFWLEVBQWVBO0FBQ2Y7QUFDSDtBQUNEbkgsb0JBQVEwRixNQUFNMUYsS0FBTixFQUFhOEcsTUFBYixFQUFxQjVCLE9BQXJCLEVBQThCQyxRQUE5QixDQUFSO0FBQ0EsZ0JBQUluRixTQUFTQSxVQUFVaUYsR0FBdkIsRUFBNEIsSUFBSS9FLEtBQUtrSCxHQUFULEVBQWNuQyxJQUFJVSxXQUFKLENBQWdCM0YsS0FBaEIsRUFBZCxLQUEyQyxJQUFJQSxVQUFVK0csaUJBQWlCN0csQ0FBakIsQ0FBZCxFQUFtQyxJQUFJRixVQUFVK0csaUJBQWlCN0csSUFBSSxDQUFyQixDQUFkLEVBQXVDMkMsV0FBV2tFLGlCQUFpQjdHLENBQWpCLENBQVgsRUFBdkMsS0FBNkUrRSxJQUFJeUMsWUFBSixDQUFpQjFILEtBQWpCLEVBQXdCK0csaUJBQWlCN0csQ0FBakIsS0FBdUIsSUFBL0M7QUFDMUw7QUFDRCxZQUFJZ0gsUUFBSixFQUFjLEtBQUssSUFBSWhILENBQVQsSUFBYytHLEtBQWQsRUFBcUIsSUFBSSxLQUFLLENBQUwsS0FBV0EsTUFBTS9HLENBQU4sQ0FBZixFQUF5QmdHLGtCQUFrQmUsTUFBTS9HLENBQU4sQ0FBbEIsRUFBNEIsQ0FBQyxDQUE3QjtBQUM1RCxlQUFPaUgsT0FBT0UsV0FBZCxFQUEyQixJQUFJLEtBQUssQ0FBTCxNQUFZckgsUUFBUUcsU0FBU2tILGFBQVQsQ0FBcEIsQ0FBSixFQUFrRG5CLGtCQUFrQmxHLEtBQWxCLEVBQXlCLENBQUMsQ0FBMUI7QUFDaEY7QUFDRCxhQUFTa0csaUJBQVQsQ0FBMkJuRSxJQUEzQixFQUFpQzRGLFdBQWpDLEVBQThDO0FBQzFDLFlBQUlyRyxZQUFZUyxLQUFLK0QsVUFBckI7QUFDQSxZQUFJeEUsU0FBSixFQUFlc0csaUJBQWlCdEcsU0FBakIsRUFBZixLQUFpRDtBQUM3QyxnQkFBSSxRQUFRUyxLQUFLb0UsYUFBYixJQUE4QnBFLEtBQUtvRSxhQUFMLENBQW1CMEIsR0FBckQsRUFBMEQ5RixLQUFLb0UsYUFBTCxDQUFtQjBCLEdBQW5CLENBQXVCLElBQXZCO0FBQzFELGdCQUFJRixnQkFBZ0IsQ0FBQyxDQUFqQixJQUFzQixRQUFRNUYsS0FBS29FLGFBQXZDLEVBQXNEdEQsV0FBV2QsSUFBWDtBQUN0RCtGLDJCQUFlL0YsSUFBZjtBQUNIO0FBQ0o7QUFDRCxhQUFTK0YsY0FBVCxDQUF3Qi9GLElBQXhCLEVBQThCO0FBQzFCQSxlQUFPQSxLQUFLZ0csU0FBWjtBQUNBLGVBQU9oRyxJQUFQLEVBQWE7QUFDVCxnQkFBSWlHLE9BQU9qRyxLQUFLa0csZUFBaEI7QUFDQS9CLDhCQUFrQm5FLElBQWxCLEVBQXdCLENBQUMsQ0FBekI7QUFDQUEsbUJBQU9pRyxJQUFQO0FBQ0g7QUFDSjtBQUNELGFBQVNyQixjQUFULENBQXdCMUIsR0FBeEIsRUFBNkJpRCxLQUE3QixFQUFvQ2hGLEdBQXBDLEVBQXlDO0FBQ3JDLFlBQUlELElBQUo7QUFDQSxhQUFLQSxJQUFMLElBQWFDLEdBQWIsRUFBa0IsSUFBSSxDQUFDLENBQUNnRixLQUFELElBQVUsUUFBUUEsTUFBTWpGLElBQU4sQ0FBbkIsS0FBbUMsUUFBUUMsSUFBSUQsSUFBSixDQUEvQyxFQUEwREQsWUFBWWlDLEdBQVosRUFBaUJoQyxJQUFqQixFQUF1QkMsSUFBSUQsSUFBSixDQUF2QixFQUFrQ0MsSUFBSUQsSUFBSixJQUFZLEtBQUssQ0FBbkQsRUFBc0RzQyxTQUF0RDtBQUM1RSxhQUFLdEMsSUFBTCxJQUFhaUYsS0FBYixFQUFvQixJQUFJLEVBQUUsZUFBZWpGLElBQWYsSUFBdUIsZ0JBQWdCQSxJQUF2QyxJQUErQ0EsUUFBUUMsR0FBUixJQUFlZ0YsTUFBTWpGLElBQU4sT0FBaUIsWUFBWUEsSUFBWixJQUFvQixjQUFjQSxJQUFsQyxHQUF5Q2dDLElBQUloQyxJQUFKLENBQXpDLEdBQXFEQyxJQUFJRCxJQUFKLENBQXRFLENBQWhFLENBQUosRUFBdUpELFlBQVlpQyxHQUFaLEVBQWlCaEMsSUFBakIsRUFBdUJDLElBQUlELElBQUosQ0FBdkIsRUFBa0NDLElBQUlELElBQUosSUFBWWlGLE1BQU1qRixJQUFOLENBQTlDLEVBQTJEc0MsU0FBM0Q7QUFDOUs7QUFDRCxhQUFTNEMsZ0JBQVQsQ0FBMEI3RyxTQUExQixFQUFxQztBQUNqQyxZQUFJMkIsT0FBTzNCLFVBQVU4RyxXQUFWLENBQXNCbkYsSUFBakM7QUFDQSxTQUFDb0YsV0FBV3BGLElBQVgsTUFBcUJvRixXQUFXcEYsSUFBWCxJQUFtQixFQUF4QyxDQUFELEVBQThDekMsSUFBOUMsQ0FBbURjLFNBQW5EO0FBQ0g7QUFDRCxhQUFTZ0gsZUFBVCxDQUF5QkMsSUFBekIsRUFBK0J0SCxLQUEvQixFQUFzQ2lFLE9BQXRDLEVBQStDO0FBQzNDLFlBQUlzRCxJQUFKO0FBQUEsWUFBVTVHLE9BQU95RyxXQUFXRSxLQUFLdEYsSUFBaEIsQ0FBakI7QUFDQSxZQUFJc0YsS0FBS0UsU0FBTCxJQUFrQkYsS0FBS0UsU0FBTCxDQUFlQyxNQUFyQyxFQUE2QztBQUN6Q0YsbUJBQU8sSUFBSUQsSUFBSixDQUFTdEgsS0FBVCxFQUFnQmlFLE9BQWhCLENBQVA7QUFDQXlELHNCQUFVdkgsSUFBVixDQUFlb0gsSUFBZixFQUFxQnZILEtBQXJCLEVBQTRCaUUsT0FBNUI7QUFDSCxTQUhELE1BR087QUFDSHNELG1CQUFPLElBQUlHLFNBQUosQ0FBYzFILEtBQWQsRUFBcUJpRSxPQUFyQixDQUFQO0FBQ0FzRCxpQkFBS0osV0FBTCxHQUFtQkcsSUFBbkI7QUFDQUMsaUJBQUtFLE1BQUwsR0FBY0UsUUFBZDtBQUNIO0FBQ0QsWUFBSWhILElBQUosRUFBVSxLQUFLLElBQUkxQixJQUFJMEIsS0FBS3RCLE1BQWxCLEVBQTBCSixHQUExQixHQUFpQyxJQUFJMEIsS0FBSzFCLENBQUwsRUFBUWtJLFdBQVIsS0FBd0JHLElBQTVCLEVBQWtDO0FBQ3pFQyxpQkFBS0ssR0FBTCxHQUFXakgsS0FBSzFCLENBQUwsRUFBUTJJLEdBQW5CO0FBQ0FqSCxpQkFBS2tILE1BQUwsQ0FBWTVJLENBQVosRUFBZSxDQUFmO0FBQ0E7QUFDSDtBQUNELGVBQU9zSSxJQUFQO0FBQ0g7QUFDRCxhQUFTSSxRQUFULENBQWtCM0gsS0FBbEIsRUFBeUI4SCxLQUF6QixFQUFnQzdELE9BQWhDLEVBQXlDO0FBQ3JDLGVBQU8sS0FBS2tELFdBQUwsQ0FBaUJuSCxLQUFqQixFQUF3QmlFLE9BQXhCLENBQVA7QUFDSDtBQUNELGFBQVM4RCxpQkFBVCxDQUEyQjFILFNBQTNCLEVBQXNDTCxLQUF0QyxFQUE2Q2dJLElBQTdDLEVBQW1EL0QsT0FBbkQsRUFBNERDLFFBQTVELEVBQXNFO0FBQ2xFLFlBQUksQ0FBQzdELFVBQVU0SCxHQUFmLEVBQW9CO0FBQ2hCNUgsc0JBQVU0SCxHQUFWLEdBQWdCLENBQUMsQ0FBakI7QUFDQSxnQkFBSTVILFVBQVU2SCxHQUFWLEdBQWdCbEksTUFBTTRHLEdBQTFCLEVBQStCLE9BQU81RyxNQUFNNEcsR0FBYjtBQUMvQixnQkFBSXZHLFVBQVVrRyxHQUFWLEdBQWdCdkcsTUFBTUwsR0FBMUIsRUFBK0IsT0FBT0ssTUFBTUwsR0FBYjtBQUMvQixnQkFBSSxDQUFDVSxVQUFVOEgsSUFBWCxJQUFtQmpFLFFBQXZCLEVBQWlDO0FBQzdCLG9CQUFJN0QsVUFBVStILGtCQUFkLEVBQWtDL0gsVUFBVStILGtCQUFWO0FBQ3JDLGFBRkQsTUFFTyxJQUFJL0gsVUFBVWdJLHlCQUFkLEVBQXlDaEksVUFBVWdJLHlCQUFWLENBQW9DckksS0FBcEMsRUFBMkNpRSxPQUEzQztBQUNoRCxnQkFBSUEsV0FBV0EsWUFBWTVELFVBQVU0RCxPQUFyQyxFQUE4QztBQUMxQyxvQkFBSSxDQUFDNUQsVUFBVWlJLEdBQWYsRUFBb0JqSSxVQUFVaUksR0FBVixHQUFnQmpJLFVBQVU0RCxPQUExQjtBQUNwQjVELDBCQUFVNEQsT0FBVixHQUFvQkEsT0FBcEI7QUFDSDtBQUNELGdCQUFJLENBQUM1RCxVQUFVa0ksR0FBZixFQUFvQmxJLFVBQVVrSSxHQUFWLEdBQWdCbEksVUFBVUwsS0FBMUI7QUFDcEJLLHNCQUFVTCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBSyxzQkFBVTRILEdBQVYsR0FBZ0IsQ0FBQyxDQUFqQjtBQUNBLGdCQUFJLE1BQU1ELElBQVYsRUFBZ0IsSUFBSSxNQUFNQSxJQUFOLElBQWNwSSxRQUFRNEksb0JBQVIsS0FBaUMsQ0FBQyxDQUFoRCxJQUFxRCxDQUFDbkksVUFBVThILElBQXBFLEVBQTBFdkgsZ0JBQWdCUCxTQUFoQixFQUEyQixDQUEzQixFQUE4QjZELFFBQTlCLEVBQTFFLEtBQXdIOUQsY0FBY0MsU0FBZDtBQUN4SSxnQkFBSUEsVUFBVTZILEdBQWQsRUFBbUI3SCxVQUFVNkgsR0FBVixDQUFjN0gsU0FBZDtBQUN0QjtBQUNKO0FBQ0QsYUFBU08sZUFBVCxDQUF5QlAsU0FBekIsRUFBb0MySCxJQUFwQyxFQUEwQzlELFFBQTFDLEVBQW9EdUUsT0FBcEQsRUFBNkQ7QUFDekQsWUFBSSxDQUFDcEksVUFBVTRILEdBQWYsRUFBb0I7QUFDaEIsZ0JBQUlTLFFBQUo7QUFBQSxnQkFBY25CLElBQWQ7QUFBQSxnQkFBb0JvQixLQUFwQjtBQUFBLGdCQUEyQjNJLFFBQVFLLFVBQVVMLEtBQTdDO0FBQUEsZ0JBQW9EOEgsUUFBUXpILFVBQVV5SCxLQUF0RTtBQUFBLGdCQUE2RTdELFVBQVU1RCxVQUFVNEQsT0FBakc7QUFBQSxnQkFBMEcyRSxnQkFBZ0J2SSxVQUFVa0ksR0FBVixJQUFpQnZJLEtBQTNJO0FBQUEsZ0JBQWtKNkksZ0JBQWdCeEksVUFBVXlJLEdBQVYsSUFBaUJoQixLQUFuTDtBQUFBLGdCQUEwTGlCLGtCQUFrQjFJLFVBQVVpSSxHQUFWLElBQWlCckUsT0FBN047QUFBQSxnQkFBc08rRSxXQUFXM0ksVUFBVThILElBQTNQO0FBQUEsZ0JBQWlRYyxXQUFXNUksVUFBVXVILEdBQXRSO0FBQUEsZ0JBQTJSc0IsY0FBY0YsWUFBWUMsUUFBclQ7QUFBQSxnQkFBK1RFLHdCQUF3QjlJLFVBQVV3RSxVQUFqVztBQUFBLGdCQUE2V3VFLE9BQU8sQ0FBQyxDQUFyWDtBQUNBLGdCQUFJSixRQUFKLEVBQWM7QUFDVjNJLDBCQUFVTCxLQUFWLEdBQWtCNEksYUFBbEI7QUFDQXZJLDBCQUFVeUgsS0FBVixHQUFrQmUsYUFBbEI7QUFDQXhJLDBCQUFVNEQsT0FBVixHQUFvQjhFLGVBQXBCO0FBQ0Esb0JBQUksTUFBTWYsSUFBTixJQUFjM0gsVUFBVWdKLHFCQUF4QixJQUFpRGhKLFVBQVVnSixxQkFBVixDQUFnQ3JKLEtBQWhDLEVBQXVDOEgsS0FBdkMsRUFBOEM3RCxPQUE5QyxNQUEyRCxDQUFDLENBQWpILEVBQW9IbUYsT0FBTyxDQUFDLENBQVIsQ0FBcEgsS0FBb0ksSUFBSS9JLFVBQVVpSixtQkFBZCxFQUFtQ2pKLFVBQVVpSixtQkFBVixDQUE4QnRKLEtBQTlCLEVBQXFDOEgsS0FBckMsRUFBNEM3RCxPQUE1QztBQUN2SzVELDBCQUFVTCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBSywwQkFBVXlILEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0F6SCwwQkFBVTRELE9BQVYsR0FBb0JBLE9BQXBCO0FBQ0g7QUFDRDVELHNCQUFVa0ksR0FBVixHQUFnQmxJLFVBQVV5SSxHQUFWLEdBQWdCekksVUFBVWlJLEdBQVYsR0FBZ0JqSSxVQUFVdUgsR0FBVixHQUFnQixJQUFoRTtBQUNBdkgsc0JBQVVDLEdBQVYsR0FBZ0IsQ0FBQyxDQUFqQjtBQUNBLGdCQUFJLENBQUM4SSxJQUFMLEVBQVc7QUFDUFYsMkJBQVdySSxVQUFVb0gsTUFBVixDQUFpQnpILEtBQWpCLEVBQXdCOEgsS0FBeEIsRUFBK0I3RCxPQUEvQixDQUFYO0FBQ0Esb0JBQUk1RCxVQUFVa0osZUFBZCxFQUErQnRGLFVBQVVuRSxPQUFPQSxPQUFPLEVBQVAsRUFBV21FLE9BQVgsQ0FBUCxFQUE0QjVELFVBQVVrSixlQUFWLEVBQTVCLENBQVY7QUFDL0Isb0JBQUlDLFNBQUo7QUFBQSxvQkFBZXJCLElBQWY7QUFBQSxvQkFBcUJzQixpQkFBaUJmLFlBQVlBLFNBQVM5SixRQUEzRDtBQUNBLG9CQUFJLGNBQWMsT0FBTzZLLGNBQXpCLEVBQXlDO0FBQ3JDLHdCQUFJQyxhQUFhckksYUFBYXFILFFBQWIsQ0FBakI7QUFDQW5CLDJCQUFPNEIscUJBQVA7QUFDQSx3QkFBSTVCLFFBQVFBLEtBQUtKLFdBQUwsS0FBcUJzQyxjQUE3QixJQUErQ0MsV0FBVy9KLEdBQVgsSUFBa0I0SCxLQUFLaEIsR0FBMUUsRUFBK0V3QixrQkFBa0JSLElBQWxCLEVBQXdCbUMsVUFBeEIsRUFBb0MsQ0FBcEMsRUFBdUN6RixPQUF2QyxFQUFnRCxDQUFDLENBQWpELEVBQS9FLEtBQXlJO0FBQ3JJdUYsb0NBQVlqQyxJQUFaO0FBQ0FsSCxrQ0FBVXdFLFVBQVYsR0FBdUIwQyxPQUFPRixnQkFBZ0JvQyxjQUFoQixFQUFnQ0MsVUFBaEMsRUFBNEN6RixPQUE1QyxDQUE5QjtBQUNBc0QsNkJBQUtLLEdBQUwsR0FBV0wsS0FBS0ssR0FBTCxJQUFZcUIsUUFBdkI7QUFDQTFCLDZCQUFLb0MsR0FBTCxHQUFXdEosU0FBWDtBQUNBMEgsMENBQWtCUixJQUFsQixFQUF3Qm1DLFVBQXhCLEVBQW9DLENBQXBDLEVBQXVDekYsT0FBdkMsRUFBZ0QsQ0FBQyxDQUFqRDtBQUNBckQsd0NBQWdCMkcsSUFBaEIsRUFBc0IsQ0FBdEIsRUFBeUJyRCxRQUF6QixFQUFtQyxDQUFDLENBQXBDO0FBQ0g7QUFDRGlFLDJCQUFPWixLQUFLWSxJQUFaO0FBQ0gsaUJBWkQsTUFZTztBQUNIUSw0QkFBUU8sV0FBUjtBQUNBTSxnQ0FBWUwscUJBQVo7QUFDQSx3QkFBSUssU0FBSixFQUFlYixRQUFRdEksVUFBVXdFLFVBQVYsR0FBdUIsSUFBL0I7QUFDZix3QkFBSXFFLGVBQWUsTUFBTWxCLElBQXpCLEVBQStCO0FBQzNCLDRCQUFJVyxLQUFKLEVBQVdBLE1BQU05RCxVQUFOLEdBQW1CLElBQW5CO0FBQ1hzRCwrQkFBT3BFLEtBQUs0RSxLQUFMLEVBQVlELFFBQVosRUFBc0J6RSxPQUF0QixFQUErQkMsWUFBWSxDQUFDOEUsUUFBNUMsRUFBc0RFLGVBQWVBLFlBQVlySCxVQUFqRixFQUE2RixDQUFDLENBQTlGLENBQVA7QUFDSDtBQUNKO0FBQ0Qsb0JBQUlxSCxlQUFlZixTQUFTZSxXQUF4QixJQUF1QzNCLFNBQVM0QixxQkFBcEQsRUFBMkU7QUFDdkUsd0JBQUlTLGFBQWFWLFlBQVlySCxVQUE3QjtBQUNBLHdCQUFJK0gsY0FBY3pCLFNBQVN5QixVQUEzQixFQUF1QztBQUNuQ0EsbUNBQVc1RSxZQUFYLENBQXdCbUQsSUFBeEIsRUFBOEJlLFdBQTlCO0FBQ0EsNEJBQUksQ0FBQ00sU0FBTCxFQUFnQjtBQUNaTix3Q0FBWXJFLFVBQVosR0FBeUIsSUFBekI7QUFDQUksOENBQWtCaUUsV0FBbEIsRUFBK0IsQ0FBQyxDQUFoQztBQUNIO0FBQ0o7QUFDSjtBQUNELG9CQUFJTSxTQUFKLEVBQWU3QyxpQkFBaUI2QyxTQUFqQjtBQUNmbkosMEJBQVU4SCxJQUFWLEdBQWlCQSxJQUFqQjtBQUNBLG9CQUFJQSxRQUFRLENBQUNNLE9BQWIsRUFBc0I7QUFDbEIsd0JBQUlvQixlQUFleEosU0FBbkI7QUFBQSx3QkFBOEJ5SixJQUFJekosU0FBbEM7QUFDQSwyQkFBT3lKLElBQUlBLEVBQUVILEdBQWIsRUFBa0IsQ0FBQ0UsZUFBZUMsQ0FBaEIsRUFBbUIzQixJQUFuQixHQUEwQkEsSUFBMUI7QUFDbEJBLHlCQUFLdEQsVUFBTCxHQUFrQmdGLFlBQWxCO0FBQ0ExQix5QkFBS2xILHFCQUFMLEdBQTZCNEksYUFBYTFDLFdBQTFDO0FBQ0g7QUFDSjtBQUNELGdCQUFJLENBQUM2QixRQUFELElBQWE5RSxRQUFqQixFQUEyQk4sT0FBT21HLE9BQVAsQ0FBZTFKLFNBQWYsRUFBM0IsS0FBMkQsSUFBSSxDQUFDK0ksSUFBTCxFQUFXO0FBQ2xFMUY7QUFDQSxvQkFBSXJELFVBQVUySixrQkFBZCxFQUFrQzNKLFVBQVUySixrQkFBVixDQUE2QnBCLGFBQTdCLEVBQTRDQyxhQUE1QyxFQUEyREUsZUFBM0Q7QUFDbEMsb0JBQUluSixRQUFRcUssV0FBWixFQUF5QnJLLFFBQVFxSyxXQUFSLENBQW9CNUosU0FBcEI7QUFDNUI7QUFDRCxnQkFBSSxRQUFRQSxVQUFVNkosR0FBdEIsRUFBMkIsT0FBTzdKLFVBQVU2SixHQUFWLENBQWM3SyxNQUFyQixFQUE2QmdCLFVBQVU2SixHQUFWLENBQWMxSyxHQUFkLEdBQW9CVyxJQUFwQixDQUF5QkUsU0FBekI7QUFDeEQsZ0JBQUksQ0FBQ2dFLFNBQUQsSUFBYyxDQUFDb0UsT0FBbkIsRUFBNEIvRTtBQUMvQjtBQUNKO0FBQ0QsYUFBU3lCLHVCQUFULENBQWlDbkIsR0FBakMsRUFBc0NuRSxLQUF0QyxFQUE2Q29FLE9BQTdDLEVBQXNEQyxRQUF0RCxFQUFnRTtBQUM1RCxZQUFJUCxJQUFJSyxPQUFPQSxJQUFJYSxVQUFuQjtBQUFBLFlBQStCc0Ysb0JBQW9CeEcsQ0FBbkQ7QUFBQSxZQUFzRHlHLFNBQVNwRyxHQUEvRDtBQUFBLFlBQW9FcUcsZ0JBQWdCMUcsS0FBS0ssSUFBSS9DLHFCQUFKLEtBQThCcEIsTUFBTWpCLFFBQTdIO0FBQUEsWUFBdUkwTCxVQUFVRCxhQUFqSjtBQUFBLFlBQWdLckssUUFBUXFCLGFBQWF4QixLQUFiLENBQXhLO0FBQ0EsZUFBTzhELEtBQUssQ0FBQzJHLE9BQU4sS0FBa0IzRyxJQUFJQSxFQUFFZ0csR0FBeEIsQ0FBUCxFQUFxQ1csVUFBVTNHLEVBQUV3RCxXQUFGLEtBQWtCdEgsTUFBTWpCLFFBQWxDO0FBQ3JDLFlBQUkrRSxLQUFLMkcsT0FBTCxLQUFpQixDQUFDcEcsUUFBRCxJQUFhUCxFQUFFa0IsVUFBaEMsQ0FBSixFQUFpRDtBQUM3Q2tELDhCQUFrQnBFLENBQWxCLEVBQXFCM0QsS0FBckIsRUFBNEIsQ0FBNUIsRUFBK0JpRSxPQUEvQixFQUF3Q0MsUUFBeEM7QUFDQUYsa0JBQU1MLEVBQUV3RSxJQUFSO0FBQ0gsU0FIRCxNQUdPO0FBQ0gsZ0JBQUlnQyxxQkFBcUIsQ0FBQ0UsYUFBMUIsRUFBeUM7QUFDckMxRCxpQ0FBaUJ3RCxpQkFBakI7QUFDQW5HLHNCQUFNb0csU0FBUyxJQUFmO0FBQ0g7QUFDRHpHLGdCQUFJMEQsZ0JBQWdCeEgsTUFBTWpCLFFBQXRCLEVBQWdDb0IsS0FBaEMsRUFBdUNpRSxPQUF2QyxDQUFKO0FBQ0EsZ0JBQUlELE9BQU8sQ0FBQ0wsRUFBRWlFLEdBQWQsRUFBbUI7QUFDZmpFLGtCQUFFaUUsR0FBRixHQUFRNUQsR0FBUjtBQUNBb0cseUJBQVMsSUFBVDtBQUNIO0FBQ0RyQyw4QkFBa0JwRSxDQUFsQixFQUFxQjNELEtBQXJCLEVBQTRCLENBQTVCLEVBQStCaUUsT0FBL0IsRUFBd0NDLFFBQXhDO0FBQ0FGLGtCQUFNTCxFQUFFd0UsSUFBUjtBQUNBLGdCQUFJaUMsVUFBVXBHLFFBQVFvRyxNQUF0QixFQUE4QjtBQUMxQkEsdUJBQU92RixVQUFQLEdBQW9CLElBQXBCO0FBQ0FJLGtDQUFrQm1GLE1BQWxCLEVBQTBCLENBQUMsQ0FBM0I7QUFDSDtBQUNKO0FBQ0QsZUFBT3BHLEdBQVA7QUFDSDtBQUNELGFBQVMyQyxnQkFBVCxDQUEwQnRHLFNBQTFCLEVBQXFDO0FBQ2pDLFlBQUlULFFBQVEySyxhQUFaLEVBQTJCM0ssUUFBUTJLLGFBQVIsQ0FBc0JsSyxTQUF0QjtBQUMzQixZQUFJOEgsT0FBTzlILFVBQVU4SCxJQUFyQjtBQUNBOUgsa0JBQVU0SCxHQUFWLEdBQWdCLENBQUMsQ0FBakI7QUFDQSxZQUFJNUgsVUFBVW1LLG9CQUFkLEVBQW9DbkssVUFBVW1LLG9CQUFWO0FBQ3BDbkssa0JBQVU4SCxJQUFWLEdBQWlCLElBQWpCO0FBQ0EsWUFBSXNDLFFBQVFwSyxVQUFVd0UsVUFBdEI7QUFDQSxZQUFJNEYsS0FBSixFQUFXOUQsaUJBQWlCOEQsS0FBakIsRUFBWCxLQUF5QyxJQUFJdEMsSUFBSixFQUFVO0FBQy9DLGdCQUFJQSxLQUFLakQsYUFBTCxJQUFzQmlELEtBQUtqRCxhQUFMLENBQW1CMEIsR0FBN0MsRUFBa0R1QixLQUFLakQsYUFBTCxDQUFtQjBCLEdBQW5CLENBQXVCLElBQXZCO0FBQ2xEdkcsc0JBQVV1SCxHQUFWLEdBQWdCTyxJQUFoQjtBQUNBdkcsdUJBQVd1RyxJQUFYO0FBQ0FqQiw2QkFBaUI3RyxTQUFqQjtBQUNBd0csMkJBQWVzQixJQUFmO0FBQ0g7QUFDRCxZQUFJOUgsVUFBVTZILEdBQWQsRUFBbUI3SCxVQUFVNkgsR0FBVixDQUFjLElBQWQ7QUFDdEI7QUFDRCxhQUFTUixTQUFULENBQW1CMUgsS0FBbkIsRUFBMEJpRSxPQUExQixFQUFtQztBQUMvQixhQUFLM0QsR0FBTCxHQUFXLENBQUMsQ0FBWjtBQUNBLGFBQUsyRCxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLakUsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBSzhILEtBQUwsR0FBYSxLQUFLQSxLQUFMLElBQWMsRUFBM0I7QUFDSDtBQUNELGFBQVNMLE1BQVQsQ0FBZ0I1SCxLQUFoQixFQUF1QnNFLE1BQXZCLEVBQStCdUcsS0FBL0IsRUFBc0M7QUFDbEMsZUFBTzNHLEtBQUsyRyxLQUFMLEVBQVk3SyxLQUFaLEVBQW1CLEVBQW5CLEVBQXVCLENBQUMsQ0FBeEIsRUFBMkJzRSxNQUEzQixFQUFtQyxDQUFDLENBQXBDLENBQVA7QUFDSDtBQUNELFFBQUl2RSxVQUFVLEVBQWQ7QUFDQSxRQUFJTixRQUFRLEVBQVo7QUFDQSxRQUFJSCxpQkFBaUIsRUFBckI7QUFDQSxRQUFJbUQscUJBQXFCLHdEQUF6QjtBQUNBLFFBQUkvQixRQUFRLEVBQVo7QUFDQSxRQUFJcUQsU0FBUyxFQUFiO0FBQ0EsUUFBSVMsWUFBWSxDQUFoQjtBQUNBLFFBQUlDLFlBQVksQ0FBQyxDQUFqQjtBQUNBLFFBQUl2RCxZQUFZLENBQUMsQ0FBakI7QUFDQSxRQUFJcUcsYUFBYSxFQUFqQjtBQUNBdEgsV0FBTzRILFVBQVVGLFNBQWpCLEVBQTRCO0FBQ3hCbUQsa0JBQVUsVUFBUzdDLEtBQVQsRUFBZ0I4QyxRQUFoQixFQUEwQjtBQUNoQyxnQkFBSUMsSUFBSSxLQUFLL0MsS0FBYjtBQUNBLGdCQUFJLENBQUMsS0FBS2dCLEdBQVYsRUFBZSxLQUFLQSxHQUFMLEdBQVdoSixPQUFPLEVBQVAsRUFBVytLLENBQVgsQ0FBWDtBQUNmL0ssbUJBQU8rSyxDQUFQLEVBQVUsY0FBYyxPQUFPL0MsS0FBckIsR0FBNkJBLE1BQU0rQyxDQUFOLEVBQVMsS0FBSzdLLEtBQWQsQ0FBN0IsR0FBb0Q4SCxLQUE5RDtBQUNBLGdCQUFJOEMsUUFBSixFQUFjLENBQUMsS0FBS1YsR0FBTCxHQUFXLEtBQUtBLEdBQUwsSUFBWSxFQUF4QixFQUE0QjNLLElBQTVCLENBQWlDcUwsUUFBakM7QUFDZHhLLDBCQUFjLElBQWQ7QUFDSCxTQVB1QjtBQVF4QjBLLHFCQUFhLFVBQVNGLFFBQVQsRUFBbUI7QUFDNUIsZ0JBQUlBLFFBQUosRUFBYyxDQUFDLEtBQUtWLEdBQUwsR0FBVyxLQUFLQSxHQUFMLElBQVksRUFBeEIsRUFBNEIzSyxJQUE1QixDQUFpQ3FMLFFBQWpDO0FBQ2RoSyw0QkFBZ0IsSUFBaEIsRUFBc0IsQ0FBdEI7QUFDSCxTQVh1QjtBQVl4QjZHLGdCQUFRLFlBQVcsQ0FBRTtBQVpHLEtBQTVCO0FBY0EsUUFBSXNELFNBQVM7QUFDVHBNLFdBQUdBLENBRE07QUFFVGdELHVCQUFlaEQsQ0FGTjtBQUdUc0Isc0JBQWNBLFlBSEw7QUFJVHlILG1CQUFXQSxTQUpGO0FBS1RELGdCQUFRQSxNQUxDO0FBTVQvRyxrQkFBVUEsUUFORDtBQU9UZCxpQkFBU0E7QUFQQSxLQUFiO0FBU0EsUUFBSSxlQUFlLE9BQU9vTCxNQUExQixFQUFrQ0EsT0FBT0MsT0FBUCxHQUFpQkYsTUFBakIsQ0FBbEMsS0FBZ0VHLEtBQUtILE1BQUwsR0FBY0EsTUFBZDtBQUNuRSxDQTlZQSxFQUFEO0FBK1lBIiwiZmlsZSI6InByZWFjdC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZHZkL0RldmVsb3BtZW50L0phdmFzY3JpcHQvYXJjaGl0ZWN0dXJlL2FyY2hpdGVjdHVyZS1maXJzdCIsInNvdXJjZXNDb250ZW50IjpbIiFmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZnVuY3Rpb24gVk5vZGUoKSB7fVxuICAgIGZ1bmN0aW9uIGgobm9kZU5hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGxhc3RTaW1wbGUsIGNoaWxkLCBzaW1wbGUsIGksIGNoaWxkcmVuID0gRU1QVFlfQ0hJTERSRU47XG4gICAgICAgIGZvciAoaSA9IGFyZ3VtZW50cy5sZW5ndGg7IGktLSA+IDI7ICkgc3RhY2sucHVzaChhcmd1bWVudHNbaV0pO1xuICAgICAgICBpZiAoYXR0cmlidXRlcyAmJiBudWxsICE9IGF0dHJpYnV0ZXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICghc3RhY2subGVuZ3RoKSBzdGFjay5wdXNoKGF0dHJpYnV0ZXMuY2hpbGRyZW4pO1xuICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXMuY2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkgaWYgKChjaGlsZCA9IHN0YWNrLnBvcCgpKSAmJiB2b2lkIDAgIT09IGNoaWxkLnBvcCkgZm9yIChpID0gY2hpbGQubGVuZ3RoOyBpLS07ICkgc3RhY2sucHVzaChjaGlsZFtpXSk7IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSAhMCB8fCBjaGlsZCA9PT0gITEpIGNoaWxkID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChzaW1wbGUgPSAnZnVuY3Rpb24nICE9IHR5cGVvZiBub2RlTmFtZSkgaWYgKG51bGwgPT0gY2hpbGQpIGNoaWxkID0gJyc7IGVsc2UgaWYgKCdudW1iZXInID09IHR5cGVvZiBjaGlsZCkgY2hpbGQgPSBTdHJpbmcoY2hpbGQpOyBlbHNlIGlmICgnc3RyaW5nJyAhPSB0eXBlb2YgY2hpbGQpIHNpbXBsZSA9ICExO1xuICAgICAgICAgICAgaWYgKHNpbXBsZSAmJiBsYXN0U2ltcGxlKSBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXSArPSBjaGlsZDsgZWxzZSBpZiAoY2hpbGRyZW4gPT09IEVNUFRZX0NISUxEUkVOKSBjaGlsZHJlbiA9IFsgY2hpbGQgXTsgZWxzZSBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIGxhc3RTaW1wbGUgPSBzaW1wbGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHAgPSBuZXcgVk5vZGUoKTtcbiAgICAgICAgcC5ub2RlTmFtZSA9IG5vZGVOYW1lO1xuICAgICAgICBwLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgIHAuYXR0cmlidXRlcyA9IG51bGwgPT0gYXR0cmlidXRlcyA/IHZvaWQgMCA6IGF0dHJpYnV0ZXM7XG4gICAgICAgIHAua2V5ID0gbnVsbCA9PSBhdHRyaWJ1dGVzID8gdm9pZCAwIDogYXR0cmlidXRlcy5rZXk7XG4gICAgICAgIGlmICh2b2lkIDAgIT09IG9wdGlvbnMudm5vZGUpIG9wdGlvbnMudm5vZGUocCk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBleHRlbmQob2JqLCBwcm9wcykge1xuICAgICAgICBmb3IgKHZhciBpIGluIHByb3BzKSBvYmpbaV0gPSBwcm9wc1tpXTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2xvbmVFbGVtZW50KHZub2RlLCBwcm9wcykge1xuICAgICAgICByZXR1cm4gaCh2bm9kZS5ub2RlTmFtZSwgZXh0ZW5kKGV4dGVuZCh7fSwgdm5vZGUuYXR0cmlidXRlcyksIHByb3BzKSwgYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiB2bm9kZS5jaGlsZHJlbik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVucXVldWVSZW5kZXIoY29tcG9uZW50KSB7XG4gICAgICAgIGlmICghY29tcG9uZW50Ll9fZCAmJiAoY29tcG9uZW50Ll9fZCA9ICEwKSAmJiAxID09IGl0ZW1zLnB1c2goY29tcG9uZW50KSkgKG9wdGlvbnMuZGVib3VuY2VSZW5kZXJpbmcgfHwgc2V0VGltZW91dCkocmVyZW5kZXIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXJlbmRlcigpIHtcbiAgICAgICAgdmFyIHAsIGxpc3QgPSBpdGVtcztcbiAgICAgICAgaXRlbXMgPSBbXTtcbiAgICAgICAgd2hpbGUgKHAgPSBsaXN0LnBvcCgpKSBpZiAocC5fX2QpIHJlbmRlckNvbXBvbmVudChwKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNTYW1lTm9kZVR5cGUobm9kZSwgdm5vZGUsIGh5ZHJhdGluZykge1xuICAgICAgICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHZub2RlIHx8ICdudW1iZXInID09IHR5cGVvZiB2bm9kZSkgcmV0dXJuIHZvaWQgMCAhPT0gbm9kZS5zcGxpdFRleHQ7XG4gICAgICAgIGlmICgnc3RyaW5nJyA9PSB0eXBlb2Ygdm5vZGUubm9kZU5hbWUpIHJldHVybiAhbm9kZS5fY29tcG9uZW50Q29uc3RydWN0b3IgJiYgaXNOYW1lZE5vZGUobm9kZSwgdm5vZGUubm9kZU5hbWUpOyBlbHNlIHJldHVybiBoeWRyYXRpbmcgfHwgbm9kZS5fY29tcG9uZW50Q29uc3RydWN0b3IgPT09IHZub2RlLm5vZGVOYW1lO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc05hbWVkTm9kZShub2RlLCBub2RlTmFtZSkge1xuICAgICAgICByZXR1cm4gbm9kZS5fX24gPT09IG5vZGVOYW1lIHx8IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0Tm9kZVByb3BzKHZub2RlKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IGV4dGVuZCh7fSwgdm5vZGUuYXR0cmlidXRlcyk7XG4gICAgICAgIHByb3BzLmNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIHZhciBkZWZhdWx0UHJvcHMgPSB2bm9kZS5ub2RlTmFtZS5kZWZhdWx0UHJvcHM7XG4gICAgICAgIGlmICh2b2lkIDAgIT09IGRlZmF1bHRQcm9wcykgZm9yICh2YXIgaSBpbiBkZWZhdWx0UHJvcHMpIGlmICh2b2lkIDAgPT09IHByb3BzW2ldKSBwcm9wc1tpXSA9IGRlZmF1bHRQcm9wc1tpXTtcbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVOb2RlKG5vZGVOYW1lLCBpc1N2Zykge1xuICAgICAgICB2YXIgbm9kZSA9IGlzU3ZnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5vZGVOYW1lKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpO1xuICAgICAgICBub2RlLl9fbiA9IG5vZGVOYW1lO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgICAgIGlmIChub2RlLnBhcmVudE5vZGUpIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0QWNjZXNzb3Iobm9kZSwgbmFtZSwgb2xkLCB2YWx1ZSwgaXNTdmcpIHtcbiAgICAgICAgaWYgKCdjbGFzc05hbWUnID09PSBuYW1lKSBuYW1lID0gJ2NsYXNzJztcbiAgICAgICAgaWYgKCdrZXknID09PSBuYW1lKSA7IGVsc2UgaWYgKCdyZWYnID09PSBuYW1lKSB7XG4gICAgICAgICAgICBpZiAob2xkKSBvbGQobnVsbCk7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHZhbHVlKG5vZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKCdjbGFzcycgPT09IG5hbWUgJiYgIWlzU3ZnKSBub2RlLmNsYXNzTmFtZSA9IHZhbHVlIHx8ICcnOyBlbHNlIGlmICgnc3R5bGUnID09PSBuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlIHx8ICdzdHJpbmcnID09IHR5cGVvZiB2YWx1ZSB8fCAnc3RyaW5nJyA9PSB0eXBlb2Ygb2xkKSBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZSB8fCAnJztcbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiAnb2JqZWN0JyA9PSB0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIG9sZCkgZm9yICh2YXIgaSBpbiBvbGQpIGlmICghKGkgaW4gdmFsdWUpKSBub2RlLnN0eWxlW2ldID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB2YWx1ZSkgbm9kZS5zdHlsZVtpXSA9ICdudW1iZXInID09IHR5cGVvZiB2YWx1ZVtpXSAmJiBJU19OT05fRElNRU5TSU9OQUwudGVzdChpKSA9PT0gITEgPyB2YWx1ZVtpXSArICdweCcgOiB2YWx1ZVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnID09PSBuYW1lKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIG5vZGUuaW5uZXJIVE1MID0gdmFsdWUuX19odG1sIHx8ICcnO1xuICAgICAgICB9IGVsc2UgaWYgKCdvJyA9PSBuYW1lWzBdICYmICduJyA9PSBuYW1lWzFdKSB7XG4gICAgICAgICAgICB2YXIgdXNlQ2FwdHVyZSA9IG5hbWUgIT09IChuYW1lID0gbmFtZS5yZXBsYWNlKC9DYXB0dXJlJC8sICcnKSk7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghb2xkKSBub2RlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnRQcm94eSwgdXNlQ2FwdHVyZSk7XG4gICAgICAgICAgICB9IGVsc2Ugbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGV2ZW50UHJveHksIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgKG5vZGUuX19sIHx8IChub2RlLl9fbCA9IHt9KSlbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICgnbGlzdCcgIT09IG5hbWUgJiYgJ3R5cGUnICE9PSBuYW1lICYmICFpc1N2ZyAmJiBuYW1lIGluIG5vZGUpIHtcbiAgICAgICAgICAgIHNldFByb3BlcnR5KG5vZGUsIG5hbWUsIG51bGwgPT0gdmFsdWUgPyAnJyA6IHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChudWxsID09IHZhbHVlIHx8IHZhbHVlID09PSAhMSkgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbnMgPSBpc1N2ZyAmJiBuYW1lICE9PSAobmFtZSA9IG5hbWUucmVwbGFjZSgvXnhsaW5rXFw6Py8sICcnKSk7XG4gICAgICAgICAgICBpZiAobnVsbCA9PSB2YWx1ZSB8fCB2YWx1ZSA9PT0gITEpIGlmIChucykgbm9kZS5yZW1vdmVBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIG5hbWUudG9Mb3dlckNhc2UoKSk7IGVsc2Ugbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7IGVsc2UgaWYgKCdmdW5jdGlvbicgIT0gdHlwZW9mIHZhbHVlKSBpZiAobnMpIG5vZGUuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCBuYW1lLnRvTG93ZXJDYXNlKCksIHZhbHVlKTsgZWxzZSBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0UHJvcGVydHkobm9kZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG5vZGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gICAgZnVuY3Rpb24gZXZlbnRQcm94eShlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fbFtlLnR5cGVdKG9wdGlvbnMuZXZlbnQgJiYgb3B0aW9ucy5ldmVudChlKSB8fCBlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmx1c2hNb3VudHMoKSB7XG4gICAgICAgIHZhciBjO1xuICAgICAgICB3aGlsZSAoYyA9IG1vdW50cy5wb3AoKSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYWZ0ZXJNb3VudCkgb3B0aW9ucy5hZnRlck1vdW50KGMpO1xuICAgICAgICAgICAgaWYgKGMuY29tcG9uZW50RGlkTW91bnQpIGMuY29tcG9uZW50RGlkTW91bnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBkaWZmKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsLCBwYXJlbnQsIGNvbXBvbmVudFJvb3QpIHtcbiAgICAgICAgaWYgKCFkaWZmTGV2ZWwrKykge1xuICAgICAgICAgICAgaXNTdmdNb2RlID0gbnVsbCAhPSBwYXJlbnQgJiYgdm9pZCAwICE9PSBwYXJlbnQub3duZXJTVkdFbGVtZW50O1xuICAgICAgICAgICAgaHlkcmF0aW5nID0gbnVsbCAhPSBkb20gJiYgISgnX19wcmVhY3RhdHRyXycgaW4gZG9tKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmV0ID0gaWRpZmYoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwsIGNvbXBvbmVudFJvb3QpO1xuICAgICAgICBpZiAocGFyZW50ICYmIHJldC5wYXJlbnROb2RlICE9PSBwYXJlbnQpIHBhcmVudC5hcHBlbmRDaGlsZChyZXQpO1xuICAgICAgICBpZiAoIS0tZGlmZkxldmVsKSB7XG4gICAgICAgICAgICBoeWRyYXRpbmcgPSAhMTtcbiAgICAgICAgICAgIGlmICghY29tcG9uZW50Um9vdCkgZmx1c2hNb3VudHMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpZGlmZihkb20sIHZub2RlLCBjb250ZXh0LCBtb3VudEFsbCwgY29tcG9uZW50Um9vdCkge1xuICAgICAgICB2YXIgb3V0ID0gZG9tLCBwcmV2U3ZnTW9kZSA9IGlzU3ZnTW9kZTtcbiAgICAgICAgaWYgKG51bGwgPT0gdm5vZGUpIHZub2RlID0gJyc7XG4gICAgICAgIGlmICgnc3RyaW5nJyA9PSB0eXBlb2Ygdm5vZGUpIHtcbiAgICAgICAgICAgIGlmIChkb20gJiYgdm9pZCAwICE9PSBkb20uc3BsaXRUZXh0ICYmIGRvbS5wYXJlbnROb2RlICYmICghZG9tLl9jb21wb25lbnQgfHwgY29tcG9uZW50Um9vdCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9tLm5vZGVWYWx1ZSAhPSB2bm9kZSkgZG9tLm5vZGVWYWx1ZSA9IHZub2RlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2bm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRvbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9tLnBhcmVudE5vZGUpIGRvbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChvdXQsIGRvbSk7XG4gICAgICAgICAgICAgICAgICAgIHJlY29sbGVjdE5vZGVUcmVlKGRvbSwgITApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dC5fX3ByZWFjdGF0dHJfID0gITA7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9XG4gICAgICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiB2bm9kZS5ub2RlTmFtZSkgcmV0dXJuIGJ1aWxkQ29tcG9uZW50RnJvbVZOb2RlKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsKTtcbiAgICAgICAgaXNTdmdNb2RlID0gJ3N2ZycgPT09IHZub2RlLm5vZGVOYW1lID8gITAgOiAnZm9yZWlnbk9iamVjdCcgPT09IHZub2RlLm5vZGVOYW1lID8gITEgOiBpc1N2Z01vZGU7XG4gICAgICAgIGlmICghZG9tIHx8ICFpc05hbWVkTm9kZShkb20sIFN0cmluZyh2bm9kZS5ub2RlTmFtZSkpKSB7XG4gICAgICAgICAgICBvdXQgPSBjcmVhdGVOb2RlKFN0cmluZyh2bm9kZS5ub2RlTmFtZSksIGlzU3ZnTW9kZSk7XG4gICAgICAgICAgICBpZiAoZG9tKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGRvbS5maXJzdENoaWxkKSBvdXQuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgIGlmIChkb20ucGFyZW50Tm9kZSkgZG9tLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG91dCwgZG9tKTtcbiAgICAgICAgICAgICAgICByZWNvbGxlY3ROb2RlVHJlZShkb20sICEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZmMgPSBvdXQuZmlyc3RDaGlsZCwgcHJvcHMgPSBvdXQuX19wcmVhY3RhdHRyXyB8fCAob3V0Ll9fcHJlYWN0YXR0cl8gPSB7fSksIHZjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAoIWh5ZHJhdGluZyAmJiB2Y2hpbGRyZW4gJiYgMSA9PT0gdmNoaWxkcmVuLmxlbmd0aCAmJiAnc3RyaW5nJyA9PSB0eXBlb2YgdmNoaWxkcmVuWzBdICYmIG51bGwgIT0gZmMgJiYgdm9pZCAwICE9PSBmYy5zcGxpdFRleHQgJiYgbnVsbCA9PSBmYy5uZXh0U2libGluZykge1xuICAgICAgICAgICAgaWYgKGZjLm5vZGVWYWx1ZSAhPSB2Y2hpbGRyZW5bMF0pIGZjLm5vZGVWYWx1ZSA9IHZjaGlsZHJlblswXTtcbiAgICAgICAgfSBlbHNlIGlmICh2Y2hpbGRyZW4gJiYgdmNoaWxkcmVuLmxlbmd0aCB8fCBudWxsICE9IGZjKSBpbm5lckRpZmZOb2RlKG91dCwgdmNoaWxkcmVuLCBjb250ZXh0LCBtb3VudEFsbCwgaHlkcmF0aW5nIHx8IG51bGwgIT0gcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpO1xuICAgICAgICBkaWZmQXR0cmlidXRlcyhvdXQsIHZub2RlLmF0dHJpYnV0ZXMsIHByb3BzKTtcbiAgICAgICAgaXNTdmdNb2RlID0gcHJldlN2Z01vZGU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlubmVyRGlmZk5vZGUoZG9tLCB2Y2hpbGRyZW4sIGNvbnRleHQsIG1vdW50QWxsLCBpc0h5ZHJhdGluZykge1xuICAgICAgICB2YXIgaiwgYywgdmNoaWxkLCBjaGlsZCwgb3JpZ2luYWxDaGlsZHJlbiA9IGRvbS5jaGlsZE5vZGVzLCBjaGlsZHJlbiA9IFtdLCBrZXllZCA9IHt9LCBrZXllZExlbiA9IDAsIG1pbiA9IDAsIGxlbiA9IG9yaWdpbmFsQ2hpbGRyZW4ubGVuZ3RoLCBjaGlsZHJlbkxlbiA9IDAsIHZsZW4gPSB2Y2hpbGRyZW4gPyB2Y2hpbGRyZW4ubGVuZ3RoIDogMDtcbiAgICAgICAgaWYgKDAgIT09IGxlbikgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIF9jaGlsZCA9IG9yaWdpbmFsQ2hpbGRyZW5baV0sIHByb3BzID0gX2NoaWxkLl9fcHJlYWN0YXR0cl8sIGtleSA9IHZsZW4gJiYgcHJvcHMgPyBfY2hpbGQuX2NvbXBvbmVudCA/IF9jaGlsZC5fY29tcG9uZW50Ll9fayA6IHByb3BzLmtleSA6IG51bGw7XG4gICAgICAgICAgICBpZiAobnVsbCAhPSBrZXkpIHtcbiAgICAgICAgICAgICAgICBrZXllZExlbisrO1xuICAgICAgICAgICAgICAgIGtleWVkW2tleV0gPSBfY2hpbGQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BzIHx8ICh2b2lkIDAgIT09IF9jaGlsZC5zcGxpdFRleHQgPyBpc0h5ZHJhdGluZyA/IF9jaGlsZC5ub2RlVmFsdWUudHJpbSgpIDogITAgOiBpc0h5ZHJhdGluZykpIGNoaWxkcmVuW2NoaWxkcmVuTGVuKytdID0gX2NoaWxkO1xuICAgICAgICB9XG4gICAgICAgIGlmICgwICE9PSB2bGVuKSBmb3IgKHZhciBpID0gMDsgaSA8IHZsZW47IGkrKykge1xuICAgICAgICAgICAgdmNoaWxkID0gdmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgY2hpbGQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIGtleSA9IHZjaGlsZC5rZXk7XG4gICAgICAgICAgICBpZiAobnVsbCAhPSBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ZWRMZW4gJiYgdm9pZCAwICE9PSBrZXllZFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0ga2V5ZWRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAga2V5ZWRba2V5XSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAga2V5ZWRMZW4tLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFjaGlsZCAmJiBtaW4gPCBjaGlsZHJlbkxlbikgZm9yIChqID0gbWluOyBqIDwgY2hpbGRyZW5MZW47IGorKykgaWYgKHZvaWQgMCAhPT0gY2hpbGRyZW5bal0gJiYgaXNTYW1lTm9kZVR5cGUoYyA9IGNoaWxkcmVuW2pdLCB2Y2hpbGQsIGlzSHlkcmF0aW5nKSkge1xuICAgICAgICAgICAgICAgIGNoaWxkID0gYztcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltqXSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PT0gY2hpbGRyZW5MZW4gLSAxKSBjaGlsZHJlbkxlbi0tO1xuICAgICAgICAgICAgICAgIGlmIChqID09PSBtaW4pIG1pbisrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hpbGQgPSBpZGlmZihjaGlsZCwgdmNoaWxkLCBjb250ZXh0LCBtb3VudEFsbCk7XG4gICAgICAgICAgICBpZiAoY2hpbGQgJiYgY2hpbGQgIT09IGRvbSkgaWYgKGkgPj0gbGVuKSBkb20uYXBwZW5kQ2hpbGQoY2hpbGQpOyBlbHNlIGlmIChjaGlsZCAhPT0gb3JpZ2luYWxDaGlsZHJlbltpXSkgaWYgKGNoaWxkID09PSBvcmlnaW5hbENoaWxkcmVuW2kgKyAxXSkgcmVtb3ZlTm9kZShvcmlnaW5hbENoaWxkcmVuW2ldKTsgZWxzZSBkb20uaW5zZXJ0QmVmb3JlKGNoaWxkLCBvcmlnaW5hbENoaWxkcmVuW2ldIHx8IG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXllZExlbikgZm9yICh2YXIgaSBpbiBrZXllZCkgaWYgKHZvaWQgMCAhPT0ga2V5ZWRbaV0pIHJlY29sbGVjdE5vZGVUcmVlKGtleWVkW2ldLCAhMSk7XG4gICAgICAgIHdoaWxlIChtaW4gPD0gY2hpbGRyZW5MZW4pIGlmICh2b2lkIDAgIT09IChjaGlsZCA9IGNoaWxkcmVuW2NoaWxkcmVuTGVuLS1dKSkgcmVjb2xsZWN0Tm9kZVRyZWUoY2hpbGQsICExKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVjb2xsZWN0Tm9kZVRyZWUobm9kZSwgdW5tb3VudE9ubHkpIHtcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5vZGUuX2NvbXBvbmVudDtcbiAgICAgICAgaWYgKGNvbXBvbmVudCkgdW5tb3VudENvbXBvbmVudChjb21wb25lbnQpOyBlbHNlIHtcbiAgICAgICAgICAgIGlmIChudWxsICE9IG5vZGUuX19wcmVhY3RhdHRyXyAmJiBub2RlLl9fcHJlYWN0YXR0cl8ucmVmKSBub2RlLl9fcHJlYWN0YXR0cl8ucmVmKG51bGwpO1xuICAgICAgICAgICAgaWYgKHVubW91bnRPbmx5ID09PSAhMSB8fCBudWxsID09IG5vZGUuX19wcmVhY3RhdHRyXykgcmVtb3ZlTm9kZShub2RlKTtcbiAgICAgICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuKG5vZGUpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUubGFzdENoaWxkO1xuICAgICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICAgICAgdmFyIG5leHQgPSBub2RlLnByZXZpb3VzU2libGluZztcbiAgICAgICAgICAgIHJlY29sbGVjdE5vZGVUcmVlKG5vZGUsICEwKTtcbiAgICAgICAgICAgIG5vZGUgPSBuZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKGRvbSwgYXR0cnMsIG9sZCkge1xuICAgICAgICB2YXIgbmFtZTtcbiAgICAgICAgZm9yIChuYW1lIGluIG9sZCkgaWYgKCghYXR0cnMgfHwgbnVsbCA9PSBhdHRyc1tuYW1lXSkgJiYgbnVsbCAhPSBvbGRbbmFtZV0pIHNldEFjY2Vzc29yKGRvbSwgbmFtZSwgb2xkW25hbWVdLCBvbGRbbmFtZV0gPSB2b2lkIDAsIGlzU3ZnTW9kZSk7XG4gICAgICAgIGZvciAobmFtZSBpbiBhdHRycykgaWYgKCEoJ2NoaWxkcmVuJyA9PT0gbmFtZSB8fCAnaW5uZXJIVE1MJyA9PT0gbmFtZSB8fCBuYW1lIGluIG9sZCAmJiBhdHRyc1tuYW1lXSA9PT0gKCd2YWx1ZScgPT09IG5hbWUgfHwgJ2NoZWNrZWQnID09PSBuYW1lID8gZG9tW25hbWVdIDogb2xkW25hbWVdKSkpIHNldEFjY2Vzc29yKGRvbSwgbmFtZSwgb2xkW25hbWVdLCBvbGRbbmFtZV0gPSBhdHRyc1tuYW1lXSwgaXNTdmdNb2RlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29sbGVjdENvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBjb21wb25lbnQuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgKGNvbXBvbmVudHNbbmFtZV0gfHwgKGNvbXBvbmVudHNbbmFtZV0gPSBbXSkpLnB1c2goY29tcG9uZW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KEN0b3IsIHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBpbnN0LCBsaXN0ID0gY29tcG9uZW50c1tDdG9yLm5hbWVdO1xuICAgICAgICBpZiAoQ3Rvci5wcm90b3R5cGUgJiYgQ3Rvci5wcm90b3R5cGUucmVuZGVyKSB7XG4gICAgICAgICAgICBpbnN0ID0gbmV3IEN0b3IocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgQ29tcG9uZW50LmNhbGwoaW5zdCwgcHJvcHMsIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5zdCA9IG5ldyBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgaW5zdC5jb25zdHJ1Y3RvciA9IEN0b3I7XG4gICAgICAgICAgICBpbnN0LnJlbmRlciA9IGRvUmVuZGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0KSBmb3IgKHZhciBpID0gbGlzdC5sZW5ndGg7IGktLTsgKSBpZiAobGlzdFtpXS5jb25zdHJ1Y3RvciA9PT0gQ3Rvcikge1xuICAgICAgICAgICAgaW5zdC5fX2IgPSBsaXN0W2ldLl9fYjtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRvUmVuZGVyKHByb3BzLCBzdGF0ZSwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldENvbXBvbmVudFByb3BzKGNvbXBvbmVudCwgcHJvcHMsIG9wdHMsIGNvbnRleHQsIG1vdW50QWxsKSB7XG4gICAgICAgIGlmICghY29tcG9uZW50Ll9feCkge1xuICAgICAgICAgICAgY29tcG9uZW50Ll9feCA9ICEwO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5fX3IgPSBwcm9wcy5yZWYpIGRlbGV0ZSBwcm9wcy5yZWY7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50Ll9fayA9IHByb3BzLmtleSkgZGVsZXRlIHByb3BzLmtleTtcbiAgICAgICAgICAgIGlmICghY29tcG9uZW50LmJhc2UgfHwgbW91bnRBbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCkgY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykgY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gY29tcG9uZW50LmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5fX2MpIGNvbXBvbmVudC5fX2MgPSBjb21wb25lbnQuY29udGV4dDtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5fX3ApIGNvbXBvbmVudC5fX3AgPSBjb21wb25lbnQucHJvcHM7XG4gICAgICAgICAgICBjb21wb25lbnQucHJvcHMgPSBwcm9wcztcbiAgICAgICAgICAgIGNvbXBvbmVudC5fX3ggPSAhMTtcbiAgICAgICAgICAgIGlmICgwICE9PSBvcHRzKSBpZiAoMSA9PT0gb3B0cyB8fCBvcHRpb25zLnN5bmNDb21wb25lbnRVcGRhdGVzICE9PSAhMSB8fCAhY29tcG9uZW50LmJhc2UpIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQsIDEsIG1vdW50QWxsKTsgZWxzZSBlbnF1ZXVlUmVuZGVyKGNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50Ll9fcikgY29tcG9uZW50Ll9fcihjb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQsIG9wdHMsIG1vdW50QWxsLCBpc0NoaWxkKSB7XG4gICAgICAgIGlmICghY29tcG9uZW50Ll9feCkge1xuICAgICAgICAgICAgdmFyIHJlbmRlcmVkLCBpbnN0LCBjYmFzZSwgcHJvcHMgPSBjb21wb25lbnQucHJvcHMsIHN0YXRlID0gY29tcG9uZW50LnN0YXRlLCBjb250ZXh0ID0gY29tcG9uZW50LmNvbnRleHQsIHByZXZpb3VzUHJvcHMgPSBjb21wb25lbnQuX19wIHx8IHByb3BzLCBwcmV2aW91c1N0YXRlID0gY29tcG9uZW50Ll9fcyB8fCBzdGF0ZSwgcHJldmlvdXNDb250ZXh0ID0gY29tcG9uZW50Ll9fYyB8fCBjb250ZXh0LCBpc1VwZGF0ZSA9IGNvbXBvbmVudC5iYXNlLCBuZXh0QmFzZSA9IGNvbXBvbmVudC5fX2IsIGluaXRpYWxCYXNlID0gaXNVcGRhdGUgfHwgbmV4dEJhc2UsIGluaXRpYWxDaGlsZENvbXBvbmVudCA9IGNvbXBvbmVudC5fY29tcG9uZW50LCBza2lwID0gITE7XG4gICAgICAgICAgICBpZiAoaXNVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQucHJvcHMgPSBwcmV2aW91c1Byb3BzO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zdGF0ZSA9IHByZXZpb3VzU3RhdGU7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmNvbnRleHQgPSBwcmV2aW91c0NvbnRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKDIgIT09IG9wdHMgJiYgY29tcG9uZW50LnNob3VsZENvbXBvbmVudFVwZGF0ZSAmJiBjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlKHByb3BzLCBzdGF0ZSwgY29udGV4dCkgPT09ICExKSBza2lwID0gITA7IGVsc2UgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsVXBkYXRlKSBjb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wcywgc3RhdGUsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcyA9IHByb3BzO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvbmVudC5fX3AgPSBjb21wb25lbnQuX19zID0gY29tcG9uZW50Ll9fYyA9IGNvbXBvbmVudC5fX2IgPSBudWxsO1xuICAgICAgICAgICAgY29tcG9uZW50Ll9fZCA9ICExO1xuICAgICAgICAgICAgaWYgKCFza2lwKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZWQgPSBjb21wb25lbnQucmVuZGVyKHByb3BzLCBzdGF0ZSwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5nZXRDaGlsZENvbnRleHQpIGNvbnRleHQgPSBleHRlbmQoZXh0ZW5kKHt9LCBjb250ZXh0KSwgY29tcG9uZW50LmdldENoaWxkQ29udGV4dCgpKTtcbiAgICAgICAgICAgICAgICB2YXIgdG9Vbm1vdW50LCBiYXNlLCBjaGlsZENvbXBvbmVudCA9IHJlbmRlcmVkICYmIHJlbmRlcmVkLm5vZGVOYW1lO1xuICAgICAgICAgICAgICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBjaGlsZENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRQcm9wcyA9IGdldE5vZGVQcm9wcyhyZW5kZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgIGluc3QgPSBpbml0aWFsQ2hpbGRDb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0ICYmIGluc3QuY29uc3RydWN0b3IgPT09IGNoaWxkQ29tcG9uZW50ICYmIGNoaWxkUHJvcHMua2V5ID09IGluc3QuX19rKSBzZXRDb21wb25lbnRQcm9wcyhpbnN0LCBjaGlsZFByb3BzLCAxLCBjb250ZXh0LCAhMSk7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9Vbm1vdW50ID0gaW5zdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5fY29tcG9uZW50ID0gaW5zdCA9IGNyZWF0ZUNvbXBvbmVudChjaGlsZENvbXBvbmVudCwgY2hpbGRQcm9wcywgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0Ll9fYiA9IGluc3QuX19iIHx8IG5leHRCYXNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdC5fX3UgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDb21wb25lbnRQcm9wcyhpbnN0LCBjaGlsZFByb3BzLCAwLCBjb250ZXh0LCAhMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJDb21wb25lbnQoaW5zdCwgMSwgbW91bnRBbGwsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBiYXNlID0gaW5zdC5iYXNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNiYXNlID0gaW5pdGlhbEJhc2U7XG4gICAgICAgICAgICAgICAgICAgIHRvVW5tb3VudCA9IGluaXRpYWxDaGlsZENvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvVW5tb3VudCkgY2Jhc2UgPSBjb21wb25lbnQuX2NvbXBvbmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsQmFzZSB8fCAxID09PSBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2Jhc2UpIGNiYXNlLl9jb21wb25lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IGRpZmYoY2Jhc2UsIHJlbmRlcmVkLCBjb250ZXh0LCBtb3VudEFsbCB8fCAhaXNVcGRhdGUsIGluaXRpYWxCYXNlICYmIGluaXRpYWxCYXNlLnBhcmVudE5vZGUsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbEJhc2UgJiYgYmFzZSAhPT0gaW5pdGlhbEJhc2UgJiYgaW5zdCAhPT0gaW5pdGlhbENoaWxkQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiYXNlUGFyZW50ID0gaW5pdGlhbEJhc2UucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VQYXJlbnQgJiYgYmFzZSAhPT0gYmFzZVBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVBhcmVudC5yZXBsYWNlQ2hpbGQoYmFzZSwgaW5pdGlhbEJhc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0b1VubW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsQmFzZS5fY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvbGxlY3ROb2RlVHJlZShpbml0aWFsQmFzZSwgITEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b1VubW91bnQpIHVubW91bnRDb21wb25lbnQodG9Vbm1vdW50KTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuYmFzZSA9IGJhc2U7XG4gICAgICAgICAgICAgICAgaWYgKGJhc2UgJiYgIWlzQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudCwgdCA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHQgPSB0Ll9fdSkgKGNvbXBvbmVudFJlZiA9IHQpLmJhc2UgPSBiYXNlO1xuICAgICAgICAgICAgICAgICAgICBiYXNlLl9jb21wb25lbnQgPSBjb21wb25lbnRSZWY7XG4gICAgICAgICAgICAgICAgICAgIGJhc2UuX2NvbXBvbmVudENvbnN0cnVjdG9yID0gY29tcG9uZW50UmVmLmNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNVcGRhdGUgfHwgbW91bnRBbGwpIG1vdW50cy51bnNoaWZ0KGNvbXBvbmVudCk7IGVsc2UgaWYgKCFza2lwKSB7XG4gICAgICAgICAgICAgICAgZmx1c2hNb3VudHMoKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudERpZFVwZGF0ZSkgY29tcG9uZW50LmNvbXBvbmVudERpZFVwZGF0ZShwcmV2aW91c1Byb3BzLCBwcmV2aW91c1N0YXRlLCBwcmV2aW91c0NvbnRleHQpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFmdGVyVXBkYXRlKSBvcHRpb25zLmFmdGVyVXBkYXRlKGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobnVsbCAhPSBjb21wb25lbnQuX19oKSB3aGlsZSAoY29tcG9uZW50Ll9faC5sZW5ndGgpIGNvbXBvbmVudC5fX2gucG9wKCkuY2FsbChjb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKCFkaWZmTGV2ZWwgJiYgIWlzQ2hpbGQpIGZsdXNoTW91bnRzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGRDb21wb25lbnRGcm9tVk5vZGUoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwpIHtcbiAgICAgICAgdmFyIGMgPSBkb20gJiYgZG9tLl9jb21wb25lbnQsIG9yaWdpbmFsQ29tcG9uZW50ID0gYywgb2xkRG9tID0gZG9tLCBpc0RpcmVjdE93bmVyID0gYyAmJiBkb20uX2NvbXBvbmVudENvbnN0cnVjdG9yID09PSB2bm9kZS5ub2RlTmFtZSwgaXNPd25lciA9IGlzRGlyZWN0T3duZXIsIHByb3BzID0gZ2V0Tm9kZVByb3BzKHZub2RlKTtcbiAgICAgICAgd2hpbGUgKGMgJiYgIWlzT3duZXIgJiYgKGMgPSBjLl9fdSkpIGlzT3duZXIgPSBjLmNvbnN0cnVjdG9yID09PSB2bm9kZS5ub2RlTmFtZTtcbiAgICAgICAgaWYgKGMgJiYgaXNPd25lciAmJiAoIW1vdW50QWxsIHx8IGMuX2NvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHNldENvbXBvbmVudFByb3BzKGMsIHByb3BzLCAzLCBjb250ZXh0LCBtb3VudEFsbCk7XG4gICAgICAgICAgICBkb20gPSBjLmJhc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxDb21wb25lbnQgJiYgIWlzRGlyZWN0T3duZXIpIHtcbiAgICAgICAgICAgICAgICB1bm1vdW50Q29tcG9uZW50KG9yaWdpbmFsQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICBkb20gPSBvbGREb20gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYyA9IGNyZWF0ZUNvbXBvbmVudCh2bm9kZS5ub2RlTmFtZSwgcHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgaWYgKGRvbSAmJiAhYy5fX2IpIHtcbiAgICAgICAgICAgICAgICBjLl9fYiA9IGRvbTtcbiAgICAgICAgICAgICAgICBvbGREb20gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0Q29tcG9uZW50UHJvcHMoYywgcHJvcHMsIDEsIGNvbnRleHQsIG1vdW50QWxsKTtcbiAgICAgICAgICAgIGRvbSA9IGMuYmFzZTtcbiAgICAgICAgICAgIGlmIChvbGREb20gJiYgZG9tICE9PSBvbGREb20pIHtcbiAgICAgICAgICAgICAgICBvbGREb20uX2NvbXBvbmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmVjb2xsZWN0Tm9kZVRyZWUob2xkRG9tLCAhMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRvbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdW5tb3VudENvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYmVmb3JlVW5tb3VudCkgb3B0aW9ucy5iZWZvcmVVbm1vdW50KGNvbXBvbmVudCk7XG4gICAgICAgIHZhciBiYXNlID0gY29tcG9uZW50LmJhc2U7XG4gICAgICAgIGNvbXBvbmVudC5fX3ggPSAhMDtcbiAgICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCkgY29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG4gICAgICAgIGNvbXBvbmVudC5iYXNlID0gbnVsbDtcbiAgICAgICAgdmFyIGlubmVyID0gY29tcG9uZW50Ll9jb21wb25lbnQ7XG4gICAgICAgIGlmIChpbm5lcikgdW5tb3VudENvbXBvbmVudChpbm5lcik7IGVsc2UgaWYgKGJhc2UpIHtcbiAgICAgICAgICAgIGlmIChiYXNlLl9fcHJlYWN0YXR0cl8gJiYgYmFzZS5fX3ByZWFjdGF0dHJfLnJlZikgYmFzZS5fX3ByZWFjdGF0dHJfLnJlZihudWxsKTtcbiAgICAgICAgICAgIGNvbXBvbmVudC5fX2IgPSBiYXNlO1xuICAgICAgICAgICAgcmVtb3ZlTm9kZShiYXNlKTtcbiAgICAgICAgICAgIGNvbGxlY3RDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHJlbW92ZUNoaWxkcmVuKGJhc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb25lbnQuX19yKSBjb21wb25lbnQuX19yKG51bGwpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fX2QgPSAhMDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZSB8fCB7fTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyKHZub2RlLCBwYXJlbnQsIG1lcmdlKSB7XG4gICAgICAgIHJldHVybiBkaWZmKG1lcmdlLCB2bm9kZSwge30sICExLCBwYXJlbnQsICExKTtcbiAgICB9XG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICB2YXIgc3RhY2sgPSBbXTtcbiAgICB2YXIgRU1QVFlfQ0hJTERSRU4gPSBbXTtcbiAgICB2YXIgSVNfTk9OX0RJTUVOU0lPTkFMID0gL2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkL2k7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdmFyIG1vdW50cyA9IFtdO1xuICAgIHZhciBkaWZmTGV2ZWwgPSAwO1xuICAgIHZhciBpc1N2Z01vZGUgPSAhMTtcbiAgICB2YXIgaHlkcmF0aW5nID0gITE7XG4gICAgdmFyIGNvbXBvbmVudHMgPSB7fTtcbiAgICBleHRlbmQoQ29tcG9uZW50LnByb3RvdHlwZSwge1xuICAgICAgICBzZXRTdGF0ZTogZnVuY3Rpb24oc3RhdGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgcyA9IHRoaXMuc3RhdGU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX19zKSB0aGlzLl9fcyA9IGV4dGVuZCh7fSwgcyk7XG4gICAgICAgICAgICBleHRlbmQocywgJ2Z1bmN0aW9uJyA9PSB0eXBlb2Ygc3RhdGUgPyBzdGF0ZShzLCB0aGlzLnByb3BzKSA6IHN0YXRlKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgKHRoaXMuX19oID0gdGhpcy5fX2ggfHwgW10pLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgZW5xdWV1ZVJlbmRlcih0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9yY2VVcGRhdGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spICh0aGlzLl9faCA9IHRoaXMuX19oIHx8IFtdKS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJlbmRlckNvbXBvbmVudCh0aGlzLCAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHt9XG4gICAgfSk7XG4gICAgdmFyIHByZWFjdCA9IHtcbiAgICAgICAgaDogaCxcbiAgICAgICAgY3JlYXRlRWxlbWVudDogaCxcbiAgICAgICAgY2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnQsXG4gICAgICAgIENvbXBvbmVudDogQ29tcG9uZW50LFxuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgcmVyZW5kZXI6IHJlcmVuZGVyLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfTtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIG1vZHVsZSkgbW9kdWxlLmV4cG9ydHMgPSBwcmVhY3Q7IGVsc2Ugc2VsZi5wcmVhY3QgPSBwcmVhY3Q7XG59KCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QuanMubWFwIl19

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bootstrap = undefined;

var _preact = __webpack_require__(0);

var _preact2 = _interopRequireDefault(_preact);

var _elements = __webpack_require__(7);

var _app = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bootstrap = exports.bootstrap = root => {
    const app = (0, _app.getApp)();
    const squares = new Array(9).fill(null);

    const boardGame = _preact2.default.render(_preact2.default.h(
        'div',
        null,
        _preact2.default.h(_elements.Game, { squares: squares, bus: app.buses.presentation })
    ), root);

    return [boardGame, app];
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9wcmVzZW50YXRpb24vYm9vdHN0cmFwLmpzIl0sIm5hbWVzIjpbImJvb3RzdHJhcCIsInJvb3QiLCJhcHAiLCJzcXVhcmVzIiwiQXJyYXkiLCJmaWxsIiwiYm9hcmRHYW1lIiwicmVuZGVyIiwiYnVzZXMiLCJwcmVzZW50YXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBR08sTUFBTUEsZ0NBQWFDLElBQUQsSUFBUztBQUM5QixVQUFNQyxNQUFNLGtCQUFaO0FBQ0EsVUFBTUMsVUFBVSxJQUFJQyxLQUFKLENBQVUsQ0FBVixFQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQWhCOztBQUVBLFVBQU1DLFlBQVksaUJBQU9DLE1BQVAsQ0FDZDtBQUFBO0FBQUE7QUFDSSw2Q0FBTSxTQUFTSixPQUFmLEVBQXdCLEtBQUtELElBQUlNLEtBQUosQ0FBVUMsWUFBdkM7QUFESixLQURjLEVBSWZSLElBSmUsQ0FBbEI7O0FBTUEsV0FBTyxDQUFDSyxTQUFELEVBQVlKLEdBQVosQ0FBUDtBQUNILENBWE0iLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9kdmQvRGV2ZWxvcG1lbnQvSmF2YXNjcmlwdC9hcmNoaXRlY3R1cmUvYXJjaGl0ZWN0dXJlLWZpcnN0Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByZWFjdCBmcm9tICdwcmVhY3QnXG5pbXBvcnQge0dhbWV9IGZyb20gJy4vZWxlbWVudHMnXG5pbXBvcnQge2dldEFwcH0gZnJvbSAnLi4vb3JjaGVzdHJhdGlvbi9hcHAnXG5cblxuZXhwb3J0IGNvbnN0IGJvb3RzdHJhcCA9IChyb290KT0+IHtcbiAgICBjb25zdCBhcHAgPSBnZXRBcHAoKTtcbiAgICBjb25zdCBzcXVhcmVzID0gbmV3IEFycmF5KDkpLmZpbGwobnVsbCk7XG5cbiAgICBjb25zdCBib2FyZEdhbWUgPSBwcmVhY3QucmVuZGVyKChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxHYW1lIHNxdWFyZXM9e3NxdWFyZXN9IGJ1cz17YXBwLmJ1c2VzLnByZXNlbnRhdGlvbn0vPlxuICAgICAgICA8L2Rpdj5cbiAgICApLCByb290KTtcblxuICAgIHJldHVybiBbYm9hcmRHYW1lLCBhcHBdO1xufTtcbiJdfQ==

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwidXNlU291cmNlTWFwIiwibGlzdCIsInRvU3RyaW5nIiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwiam9pbiIsImkiLCJtb2R1bGVzIiwibWVkaWFRdWVyeSIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJsZW5ndGgiLCJpZCIsInB1c2giLCJjc3NNYXBwaW5nIiwiYnRvYSIsInNvdXJjZU1hcHBpbmciLCJ0b0NvbW1lbnQiLCJzb3VyY2VVUkxzIiwic291cmNlcyIsInNvdXJjZSIsInNvdXJjZVJvb3QiLCJjb25jYXQiLCJzb3VyY2VNYXAiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBSUE7QUFDQUEsT0FBT0MsT0FBUCxHQUFpQixVQUFTQyxZQUFULEVBQXVCO0FBQ3ZDLEtBQUlDLE9BQU8sRUFBWDs7QUFFQTtBQUNBQSxNQUFLQyxRQUFMLEdBQWdCLFNBQVNBLFFBQVQsR0FBb0I7QUFDbkMsU0FBTyxLQUFLQyxHQUFMLENBQVMsVUFBVUMsSUFBVixFQUFnQjtBQUMvQixPQUFJQyxVQUFVQyx1QkFBdUJGLElBQXZCLEVBQTZCSixZQUE3QixDQUFkO0FBQ0EsT0FBR0ksS0FBSyxDQUFMLENBQUgsRUFBWTtBQUNYLFdBQU8sWUFBWUEsS0FBSyxDQUFMLENBQVosR0FBc0IsR0FBdEIsR0FBNEJDLE9BQTVCLEdBQXNDLEdBQTdDO0FBQ0EsSUFGRCxNQUVPO0FBQ04sV0FBT0EsT0FBUDtBQUNBO0FBQ0QsR0FQTSxFQU9KRSxJQVBJLENBT0MsRUFQRCxDQUFQO0FBUUEsRUFURDs7QUFXQTtBQUNBTixNQUFLTyxDQUFMLEdBQVMsVUFBU0MsT0FBVCxFQUFrQkMsVUFBbEIsRUFBOEI7QUFDdEMsTUFBRyxPQUFPRCxPQUFQLEtBQW1CLFFBQXRCLEVBQ0NBLFVBQVUsQ0FBQyxDQUFDLElBQUQsRUFBT0EsT0FBUCxFQUFnQixFQUFoQixDQUFELENBQVY7QUFDRCxNQUFJRSx5QkFBeUIsRUFBN0I7QUFDQSxPQUFJLElBQUlILElBQUksQ0FBWixFQUFlQSxJQUFJLEtBQUtJLE1BQXhCLEVBQWdDSixHQUFoQyxFQUFxQztBQUNwQyxPQUFJSyxLQUFLLEtBQUtMLENBQUwsRUFBUSxDQUFSLENBQVQ7QUFDQSxPQUFHLE9BQU9LLEVBQVAsS0FBYyxRQUFqQixFQUNDRix1QkFBdUJFLEVBQXZCLElBQTZCLElBQTdCO0FBQ0Q7QUFDRCxPQUFJTCxJQUFJLENBQVIsRUFBV0EsSUFBSUMsUUFBUUcsTUFBdkIsRUFBK0JKLEdBQS9CLEVBQW9DO0FBQ25DLE9BQUlKLE9BQU9LLFFBQVFELENBQVIsQ0FBWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBRyxPQUFPSixLQUFLLENBQUwsQ0FBUCxLQUFtQixRQUFuQixJQUErQixDQUFDTyx1QkFBdUJQLEtBQUssQ0FBTCxDQUF2QixDQUFuQyxFQUFvRTtBQUNuRSxRQUFHTSxjQUFjLENBQUNOLEtBQUssQ0FBTCxDQUFsQixFQUEyQjtBQUMxQkEsVUFBSyxDQUFMLElBQVVNLFVBQVY7QUFDQSxLQUZELE1BRU8sSUFBR0EsVUFBSCxFQUFlO0FBQ3JCTixVQUFLLENBQUwsSUFBVSxNQUFNQSxLQUFLLENBQUwsQ0FBTixHQUFnQixTQUFoQixHQUE0Qk0sVUFBNUIsR0FBeUMsR0FBbkQ7QUFDQTtBQUNEVCxTQUFLYSxJQUFMLENBQVVWLElBQVY7QUFDQTtBQUNEO0FBQ0QsRUF4QkQ7QUF5QkEsUUFBT0gsSUFBUDtBQUNBLENBMUNEOztBQTRDQSxTQUFTSyxzQkFBVCxDQUFnQ0YsSUFBaEMsRUFBc0NKLFlBQXRDLEVBQW9EO0FBQ25ELEtBQUlLLFVBQVVELEtBQUssQ0FBTCxLQUFXLEVBQXpCO0FBQ0EsS0FBSVcsYUFBYVgsS0FBSyxDQUFMLENBQWpCO0FBQ0EsS0FBSSxDQUFDVyxVQUFMLEVBQWlCO0FBQ2hCLFNBQU9WLE9BQVA7QUFDQTs7QUFFRCxLQUFJTCxnQkFBZ0IsT0FBT2dCLElBQVAsS0FBZ0IsVUFBcEMsRUFBZ0Q7QUFDL0MsTUFBSUMsZ0JBQWdCQyxVQUFVSCxVQUFWLENBQXBCO0FBQ0EsTUFBSUksYUFBYUosV0FBV0ssT0FBWCxDQUFtQmpCLEdBQW5CLENBQXVCLFVBQVVrQixNQUFWLEVBQWtCO0FBQ3pELFVBQU8sbUJBQW1CTixXQUFXTyxVQUE5QixHQUEyQ0QsTUFBM0MsR0FBb0QsS0FBM0Q7QUFDQSxHQUZnQixDQUFqQjs7QUFJQSxTQUFPLENBQUNoQixPQUFELEVBQVVrQixNQUFWLENBQWlCSixVQUFqQixFQUE2QkksTUFBN0IsQ0FBb0MsQ0FBQ04sYUFBRCxDQUFwQyxFQUFxRFYsSUFBckQsQ0FBMEQsSUFBMUQsQ0FBUDtBQUNBOztBQUVELFFBQU8sQ0FBQ0YsT0FBRCxFQUFVRSxJQUFWLENBQWUsSUFBZixDQUFQO0FBQ0E7O0FBRUQ7QUFDQSxTQUFTVyxTQUFULENBQW1CTSxTQUFuQixFQUE4QjtBQUM3QjtBQUNBLEtBQUlDLFNBQVNULEtBQUtVLFNBQVNDLG1CQUFtQkMsS0FBS0MsU0FBTCxDQUFlTCxTQUFmLENBQW5CLENBQVQsQ0FBTCxDQUFiO0FBQ0EsS0FBSU0sT0FBTyxpRUFBaUVMLE1BQTVFOztBQUVBLFFBQU8sU0FBU0ssSUFBVCxHQUFnQixLQUF2QjtBQUNBIiwiZmlsZSI6ImNzcy1iYXNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9kdmQvRGV2ZWxvcG1lbnQvSmF2YXNjcmlwdC9hcmNoaXRlY3R1cmUvYXJjaGl0ZWN0dXJlLWZpcnN0Iiwic291cmNlc0NvbnRlbnQiOlsiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIl19

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImNzcyIsImxvY2F0aW9uIiwid2luZG93IiwiRXJyb3IiLCJiYXNlVXJsIiwicHJvdG9jb2wiLCJob3N0IiwiY3VycmVudERpciIsInBhdGhuYW1lIiwicmVwbGFjZSIsImZpeGVkQ3NzIiwiZnVsbE1hdGNoIiwib3JpZ1VybCIsInVucXVvdGVkT3JpZ1VybCIsInRyaW0iLCJvIiwiJDEiLCJ0ZXN0IiwibmV3VXJsIiwiaW5kZXhPZiIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFhQUEsT0FBT0MsT0FBUCxHQUFpQixVQUFVQyxHQUFWLEVBQWU7QUFDOUI7QUFDQSxLQUFJQyxXQUFXLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNBLE9BQU9ELFFBQXZEOztBQUVBLEtBQUksQ0FBQ0EsUUFBTCxFQUFlO0FBQ2IsUUFBTSxJQUFJRSxLQUFKLENBQVUsa0NBQVYsQ0FBTjtBQUNEOztBQUVGO0FBQ0EsS0FBSSxDQUFDSCxHQUFELElBQVEsT0FBT0EsR0FBUCxLQUFlLFFBQTNCLEVBQXFDO0FBQ25DLFNBQU9BLEdBQVA7QUFDQTs7QUFFRCxLQUFJSSxVQUFVSCxTQUFTSSxRQUFULEdBQW9CLElBQXBCLEdBQTJCSixTQUFTSyxJQUFsRDtBQUNBLEtBQUlDLGFBQWFILFVBQVVILFNBQVNPLFFBQVQsQ0FBa0JDLE9BQWxCLENBQTBCLFdBQTFCLEVBQXVDLEdBQXZDLENBQTNCOztBQUVEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLEtBQUlDLFdBQVdWLElBQUlTLE9BQUosQ0FBWSxxREFBWixFQUFtRSxVQUFTRSxTQUFULEVBQW9CQyxPQUFwQixFQUE2QjtBQUM5RztBQUNBLE1BQUlDLGtCQUFrQkQsUUFDcEJFLElBRG9CLEdBRXBCTCxPQUZvQixDQUVaLFVBRlksRUFFQSxVQUFTTSxDQUFULEVBQVlDLEVBQVosRUFBZTtBQUFFLFVBQU9BLEVBQVA7QUFBWSxHQUY3QixFQUdwQlAsT0FIb0IsQ0FHWixVQUhZLEVBR0EsVUFBU00sQ0FBVCxFQUFZQyxFQUFaLEVBQWU7QUFBRSxVQUFPQSxFQUFQO0FBQVksR0FIN0IsQ0FBdEI7O0FBS0E7QUFDQSxNQUFJLCtDQUErQ0MsSUFBL0MsQ0FBb0RKLGVBQXBELENBQUosRUFBMEU7QUFDeEUsVUFBT0YsU0FBUDtBQUNEOztBQUVEO0FBQ0EsTUFBSU8sTUFBSjs7QUFFQSxNQUFJTCxnQkFBZ0JNLE9BQWhCLENBQXdCLElBQXhCLE1BQWtDLENBQXRDLEVBQXlDO0FBQ3RDO0FBQ0ZELFlBQVNMLGVBQVQ7QUFDQSxHQUhELE1BR08sSUFBSUEsZ0JBQWdCTSxPQUFoQixDQUF3QixHQUF4QixNQUFpQyxDQUFyQyxFQUF3QztBQUM5QztBQUNBRCxZQUFTZCxVQUFVUyxlQUFuQixDQUY4QyxDQUVWO0FBQ3BDLEdBSE0sTUFHQTtBQUNOO0FBQ0FLLFlBQVNYLGFBQWFNLGdCQUFnQkosT0FBaEIsQ0FBd0IsT0FBeEIsRUFBaUMsRUFBakMsQ0FBdEIsQ0FGTSxDQUVzRDtBQUM1RDs7QUFFRDtBQUNBLFNBQU8sU0FBU1csS0FBS0MsU0FBTCxDQUFlSCxNQUFmLENBQVQsR0FBa0MsR0FBekM7QUFDQSxFQTVCYyxDQUFmOztBQThCQTtBQUNBLFFBQU9SLFFBQVA7QUFDQSxDQTFFRCIsImZpbGUiOiJ1cmxzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9kdmQvRGV2ZWxvcG1lbnQvSmF2YXNjcmlwdC9hcmNoaXRlY3R1cmUvYXJjaGl0ZWN0dXJlLWZpcnN0Iiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iXX0=

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAppBuses = exports.getApp = undefined;

var _bus = __webpack_require__(6);

var _state = __webpack_require__(35);

const getApp = exports.getApp = () => {
    const defaultState = {
        squares: new Array(9).fill(null)
    };
    const app = {
        buses: getAppBuses()
    };
    const stateManager = (0, _state.getStateManager)(defaultState);
    setupWiring(app, stateManager);

    return app;
};

const getAppBuses = exports.getAppBuses = () => {
    return {
        presentation: (0, _bus.getBus)(['STATE_UPDATED', 'CELL_CLICKED']),
        networking: (0, _bus.getBus)(),
        data: (0, _bus.getBus)(['MOVE', 'STATE_UPDATED'])
    };
};

const setupWiring = (app, stateManager) => {
    app.buses.presentation.addListener('CELL_CLICKED', (_, index) => {
        app.buses.data.sendMessage('MOVE', index);
    });

    // FIXME: does it make sense to have all of these layers? Could they be adding unnecessary complexity?
    // I'm not sure...
    app.buses.data.addListener('STATE_UPDATED', (_, newState) => {
        app.buses.presentation.sendMessage('STATE_UPDATED', newState);
    });
    stateManager.onStateUpdate(() => {
        app.buses.data.sendMessage('STATE_UPDATED', stateManager.getCurrentState());
    });
    app.buses.data.addListener('MOVE', (_, payload) => {
        stateManager.dispatch('MOVE', payload);
    });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9vcmNoZXN0cmF0aW9uL2FwcC5qcyJdLCJuYW1lcyI6WyJnZXRBcHAiLCJkZWZhdWx0U3RhdGUiLCJzcXVhcmVzIiwiQXJyYXkiLCJmaWxsIiwiYXBwIiwiYnVzZXMiLCJnZXRBcHBCdXNlcyIsInN0YXRlTWFuYWdlciIsInNldHVwV2lyaW5nIiwicHJlc2VudGF0aW9uIiwibmV0d29ya2luZyIsImRhdGEiLCJhZGRMaXN0ZW5lciIsIl8iLCJpbmRleCIsInNlbmRNZXNzYWdlIiwibmV3U3RhdGUiLCJvblN0YXRlVXBkYXRlIiwiZ2V0Q3VycmVudFN0YXRlIiwicGF5bG9hZCIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBR08sTUFBTUEsMEJBQVMsTUFBSztBQUN2QixVQUFNQyxlQUFlO0FBQ2pCQyxpQkFBUyxJQUFJQyxLQUFKLENBQVUsQ0FBVixFQUFhQyxJQUFiLENBQWtCLElBQWxCO0FBRFEsS0FBckI7QUFHQSxVQUFNQyxNQUFNO0FBQ1JDLGVBQU9DO0FBREMsS0FBWjtBQUdBLFVBQU1DLGVBQWUsNEJBQWdCUCxZQUFoQixDQUFyQjtBQUNBUSxnQkFBWUosR0FBWixFQUFpQkcsWUFBakI7O0FBRUEsV0FBT0gsR0FBUDtBQUNILENBWE07O0FBYUEsTUFBTUUsb0NBQWMsTUFBSztBQUM1QixXQUFPO0FBQ0hHLHNCQUFjLGlCQUFPLENBQUMsZUFBRCxFQUFrQixjQUFsQixDQUFQLENBRFg7QUFFSEMsb0JBQVksa0JBRlQ7QUFHSEMsY0FBTSxpQkFBTyxDQUFDLE1BQUQsRUFBUyxlQUFULENBQVA7QUFISCxLQUFQO0FBS0gsQ0FOTTs7QUFRUCxNQUFNSCxjQUFjLENBQUNKLEdBQUQsRUFBTUcsWUFBTixLQUFxQjtBQUNyQ0gsUUFBSUMsS0FBSixDQUFVSSxZQUFWLENBQXVCRyxXQUF2QixDQUFtQyxjQUFuQyxFQUFtRCxDQUFDQyxDQUFELEVBQUlDLEtBQUosS0FBYTtBQUM1RFYsWUFBSUMsS0FBSixDQUFVTSxJQUFWLENBQWVJLFdBQWYsQ0FBMkIsTUFBM0IsRUFBbUNELEtBQW5DO0FBQ0gsS0FGRDs7QUFJQTtBQUNBO0FBQ0FWLFFBQUlDLEtBQUosQ0FBVU0sSUFBVixDQUFlQyxXQUFmLENBQTJCLGVBQTNCLEVBQTRDLENBQUNDLENBQUQsRUFBSUcsUUFBSixLQUFlO0FBQ3ZEWixZQUFJQyxLQUFKLENBQVVJLFlBQVYsQ0FBdUJNLFdBQXZCLENBQW1DLGVBQW5DLEVBQW9EQyxRQUFwRDtBQUNILEtBRkQ7QUFHQVQsaUJBQWFVLGFBQWIsQ0FBMkIsTUFBSTtBQUMzQmIsWUFBSUMsS0FBSixDQUFVTSxJQUFWLENBQWVJLFdBQWYsQ0FBMkIsZUFBM0IsRUFBNENSLGFBQWFXLGVBQWIsRUFBNUM7QUFDSCxLQUZEO0FBR0FkLFFBQUlDLEtBQUosQ0FBVU0sSUFBVixDQUFlQyxXQUFmLENBQTJCLE1BQTNCLEVBQW1DLENBQUNDLENBQUQsRUFBSU0sT0FBSixLQUFjO0FBQzdDWixxQkFBYWEsUUFBYixDQUFzQixNQUF0QixFQUE4QkQsT0FBOUI7QUFDSCxLQUZEO0FBR0gsQ0FoQkQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9kdmQvRGV2ZWxvcG1lbnQvSmF2YXNjcmlwdC9hcmNoaXRlY3R1cmUvYXJjaGl0ZWN0dXJlLWZpcnN0Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRCdXN9IGZyb20gJy4vYnVzJ1xuaW1wb3J0IHtnZXRTdGF0ZU1hbmFnZXJ9IGZyb20gXCIuLi9kYXRhL3N0YXRlXCI7XG5cblxuZXhwb3J0IGNvbnN0IGdldEFwcCA9ICgpPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICAgICAgc3F1YXJlczogbmV3IEFycmF5KDkpLmZpbGwobnVsbClcbiAgICB9O1xuICAgIGNvbnN0IGFwcCA9IHtcbiAgICAgICAgYnVzZXM6IGdldEFwcEJ1c2VzKClcbiAgICB9O1xuICAgIGNvbnN0IHN0YXRlTWFuYWdlciA9IGdldFN0YXRlTWFuYWdlcihkZWZhdWx0U3RhdGUpO1xuICAgIHNldHVwV2lyaW5nKGFwcCwgc3RhdGVNYW5hZ2VyKTtcblxuICAgIHJldHVybiBhcHA7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QXBwQnVzZXMgPSAoKT0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcmVzZW50YXRpb246IGdldEJ1cyhbJ1NUQVRFX1VQREFURUQnLCAnQ0VMTF9DTElDS0VEJ10pLFxuICAgICAgICBuZXR3b3JraW5nOiBnZXRCdXMoKSxcbiAgICAgICAgZGF0YTogZ2V0QnVzKFsnTU9WRScsICdTVEFURV9VUERBVEVEJ10pXG4gICAgfVxufTtcblxuY29uc3Qgc2V0dXBXaXJpbmcgPSAoYXBwLCBzdGF0ZU1hbmFnZXIpPT57XG4gICAgYXBwLmJ1c2VzLnByZXNlbnRhdGlvbi5hZGRMaXN0ZW5lcignQ0VMTF9DTElDS0VEJywgKF8sIGluZGV4KT0+IHtcbiAgICAgICAgYXBwLmJ1c2VzLmRhdGEuc2VuZE1lc3NhZ2UoJ01PVkUnLCBpbmRleCk7XG4gICAgfSk7XG5cbiAgICAvLyBGSVhNRTogZG9lcyBpdCBtYWtlIHNlbnNlIHRvIGhhdmUgYWxsIG9mIHRoZXNlIGxheWVycz8gQ291bGQgdGhleSBiZSBhZGRpbmcgdW5uZWNlc3NhcnkgY29tcGxleGl0eT9cbiAgICAvLyBJJ20gbm90IHN1cmUuLi5cbiAgICBhcHAuYnVzZXMuZGF0YS5hZGRMaXN0ZW5lcignU1RBVEVfVVBEQVRFRCcsIChfLCBuZXdTdGF0ZSk9PntcbiAgICAgICAgYXBwLmJ1c2VzLnByZXNlbnRhdGlvbi5zZW5kTWVzc2FnZSgnU1RBVEVfVVBEQVRFRCcsIG5ld1N0YXRlKTtcbiAgICB9KTtcbiAgICBzdGF0ZU1hbmFnZXIub25TdGF0ZVVwZGF0ZSgoKT0+e1xuICAgICAgICBhcHAuYnVzZXMuZGF0YS5zZW5kTWVzc2FnZSgnU1RBVEVfVVBEQVRFRCcsIHN0YXRlTWFuYWdlci5nZXRDdXJyZW50U3RhdGUoKSk7XG4gICAgfSk7XG4gICAgYXBwLmJ1c2VzLmRhdGEuYWRkTGlzdGVuZXIoJ01PVkUnLCAoXywgcGF5bG9hZCk9PntcbiAgICAgICAgc3RhdGVNYW5hZ2VyLmRpc3BhdGNoKCdNT1ZFJywgcGF5bG9hZCk7XG4gICAgfSk7XG59O1xuIl19

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
const getBus = exports.getBus = (acceptedMessages = null) => {
    let listeners = [];
    const internalAcceptedMessages = acceptedMessages === null ? null : [...acceptedMessages];

    return {
        sendMessage: function (message, payload) {
            if (internalAcceptedMessages !== null && internalAcceptedMessages.indexOf(message) === -1) {
                throw new Error(`Message "${message}" not part of the accepted messages for this bus.`);
            }

            listeners.forEach(listener => {
                if (listener.messageAcceptedByThisListener !== null && listener.messageAcceptedByThisListener !== message) {
                    return;
                }

                listener(message, payload);
            });
        },
        once: function (message, listener) {
            const subscription = this.addListener(message, function () {
                subscription.unsubscribe();
                return listener.apply(null, arguments);
            });
            return subscription;
        },
        addListener: function (listenerOrMessage, listener = null) {
            let messageAcceptedByThisListener = null;

            if (listener === null) {
                listener = listenerOrMessage;
            } else {
                messageAcceptedByThisListener = listenerOrMessage;
            }

            if (listeners.indexOf(listener) !== -1) {
                throw new Error("Listener already added, adding it twice is not allowed.");
            }

            // FIXME: not the best method but effective, let's leave it like this, for now
            listener.messageAcceptedByThisListener = messageAcceptedByThisListener;
            listeners.push(listener);

            return {
                unsubscribe: () => {
                    const listenerIndex = listeners.indexOf(listener);

                    if (listenerIndex === -1) {
                        return;
                    }

                    listeners = listeners.slice(0, listenerIndex).concat(listeners.slice(listenerIndex + 1));
                }
            };
        },
        getListeners: function () {
            return [...listeners];
        },
        getAcceptedMessages: function () {
            if (internalAcceptedMessages === null) {
                return [];
            }

            return [...internalAcceptedMessages];
        }
    };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9vcmNoZXN0cmF0aW9uL2J1cy5qcyJdLCJuYW1lcyI6WyJnZXRCdXMiLCJhY2NlcHRlZE1lc3NhZ2VzIiwibGlzdGVuZXJzIiwiaW50ZXJuYWxBY2NlcHRlZE1lc3NhZ2VzIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwicGF5bG9hZCIsImluZGV4T2YiLCJFcnJvciIsImZvckVhY2giLCJsaXN0ZW5lciIsIm1lc3NhZ2VBY2NlcHRlZEJ5VGhpc0xpc3RlbmVyIiwib25jZSIsInN1YnNjcmlwdGlvbiIsImFkZExpc3RlbmVyIiwidW5zdWJzY3JpYmUiLCJhcHBseSIsImFyZ3VtZW50cyIsImxpc3RlbmVyT3JNZXNzYWdlIiwicHVzaCIsImxpc3RlbmVySW5kZXgiLCJzbGljZSIsImNvbmNhdCIsImdldExpc3RlbmVycyIsImdldEFjY2VwdGVkTWVzc2FnZXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sTUFBTUEsMEJBQVMsQ0FBQ0MsbUJBQW1CLElBQXBCLEtBQTZCO0FBQy9DLFFBQUlDLFlBQVksRUFBaEI7QUFDQSxVQUFNQywyQkFBMkJGLHFCQUFxQixJQUFyQixHQUE0QixJQUE1QixHQUFtQyxDQUFDLEdBQUdBLGdCQUFKLENBQXBFOztBQUVBLFdBQU87QUFDSEcscUJBQWEsVUFBVUMsT0FBVixFQUFtQkMsT0FBbkIsRUFBNEI7QUFDckMsZ0JBQUlILDZCQUE2QixJQUE3QixJQUFxQ0EseUJBQXlCSSxPQUF6QixDQUFpQ0YsT0FBakMsTUFBOEMsQ0FBQyxDQUF4RixFQUEyRjtBQUN2RixzQkFBTSxJQUFJRyxLQUFKLENBQVcsWUFBV0gsT0FBUSxtREFBOUIsQ0FBTjtBQUNIOztBQUVESCxzQkFBVU8sT0FBVixDQUFtQkMsUUFBRCxJQUFhO0FBQzNCLG9CQUFJQSxTQUFTQyw2QkFBVCxLQUEyQyxJQUEzQyxJQUNHRCxTQUFTQyw2QkFBVCxLQUEyQ04sT0FEbEQsRUFDMkQ7QUFDdkQ7QUFDSDs7QUFFREsseUJBQVNMLE9BQVQsRUFBa0JDLE9BQWxCO0FBQ0gsYUFQRDtBQVFILFNBZEU7QUFlSE0sY0FBTSxVQUFVUCxPQUFWLEVBQW1CSyxRQUFuQixFQUE2QjtBQUMvQixrQkFBTUcsZUFBZSxLQUFLQyxXQUFMLENBQWlCVCxPQUFqQixFQUEwQixZQUFZO0FBQ3ZEUSw2QkFBYUUsV0FBYjtBQUNBLHVCQUFPTCxTQUFTTSxLQUFULENBQWUsSUFBZixFQUFxQkMsU0FBckIsQ0FBUDtBQUNILGFBSG9CLENBQXJCO0FBSUEsbUJBQU9KLFlBQVA7QUFDSCxTQXJCRTtBQXNCSEMscUJBQWEsVUFBVUksaUJBQVYsRUFBNkJSLFdBQVcsSUFBeEMsRUFBOEM7QUFDdkQsZ0JBQUlDLGdDQUFnQyxJQUFwQzs7QUFFQSxnQkFBSUQsYUFBYSxJQUFqQixFQUF1QjtBQUNuQkEsMkJBQVdRLGlCQUFYO0FBQ0gsYUFGRCxNQUVPO0FBQ0hQLGdEQUFnQ08saUJBQWhDO0FBQ0g7O0FBRUQsZ0JBQUloQixVQUFVSyxPQUFWLENBQWtCRyxRQUFsQixNQUFnQyxDQUFDLENBQXJDLEVBQXdDO0FBQ3BDLHNCQUFNLElBQUlGLEtBQUosQ0FBVSx5REFBVixDQUFOO0FBQ0g7O0FBRUQ7QUFDQUUscUJBQVNDLDZCQUFULEdBQXlDQSw2QkFBekM7QUFDQVQsc0JBQVVpQixJQUFWLENBQWVULFFBQWY7O0FBRUEsbUJBQU87QUFDSEssNkJBQWEsTUFBSztBQUNkLDBCQUFNSyxnQkFBZ0JsQixVQUFVSyxPQUFWLENBQWtCRyxRQUFsQixDQUF0Qjs7QUFFQSx3QkFBSVUsa0JBQWtCLENBQUMsQ0FBdkIsRUFBMEI7QUFDdEI7QUFDSDs7QUFFRGxCLGdDQUFZQSxVQUFVbUIsS0FBVixDQUFnQixDQUFoQixFQUFtQkQsYUFBbkIsRUFBa0NFLE1BQWxDLENBQXlDcEIsVUFBVW1CLEtBQVYsQ0FBZ0JELGdCQUFnQixDQUFoQyxDQUF6QyxDQUFaO0FBQ0g7QUFURSxhQUFQO0FBV0gsU0FsREU7QUFtREhHLHNCQUFjLFlBQVk7QUFDdEIsbUJBQU8sQ0FBQyxHQUFHckIsU0FBSixDQUFQO0FBQ0gsU0FyREU7QUFzREhzQiw2QkFBcUIsWUFBWTtBQUM3QixnQkFBSXJCLDZCQUE2QixJQUFqQyxFQUF1QztBQUNuQyx1QkFBTyxFQUFQO0FBQ0g7O0FBRUQsbUJBQU8sQ0FBQyxHQUFHQSx3QkFBSixDQUFQO0FBQ0g7QUE1REUsS0FBUDtBQThESCxDQWxFTSIsImZpbGUiOiJidXMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2R2ZC9EZXZlbG9wbWVudC9KYXZhc2NyaXB0L2FyY2hpdGVjdHVyZS9hcmNoaXRlY3R1cmUtZmlyc3QiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0QnVzID0gKGFjY2VwdGVkTWVzc2FnZXMgPSBudWxsKSA9PiB7XG4gICAgbGV0IGxpc3RlbmVycyA9IFtdO1xuICAgIGNvbnN0IGludGVybmFsQWNjZXB0ZWRNZXNzYWdlcyA9IGFjY2VwdGVkTWVzc2FnZXMgPT09IG51bGwgPyBudWxsIDogWy4uLmFjY2VwdGVkTWVzc2FnZXNdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VuZE1lc3NhZ2U6IGZ1bmN0aW9uIChtZXNzYWdlLCBwYXlsb2FkKSB7XG4gICAgICAgICAgICBpZiAoaW50ZXJuYWxBY2NlcHRlZE1lc3NhZ2VzICE9PSBudWxsICYmIGludGVybmFsQWNjZXB0ZWRNZXNzYWdlcy5pbmRleE9mKG1lc3NhZ2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWVzc2FnZSBcIiR7bWVzc2FnZX1cIiBub3QgcGFydCBvZiB0aGUgYWNjZXB0ZWQgbWVzc2FnZXMgZm9yIHRoaXMgYnVzLmApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5tZXNzYWdlQWNjZXB0ZWRCeVRoaXNMaXN0ZW5lciAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAmJiBsaXN0ZW5lci5tZXNzYWdlQWNjZXB0ZWRCeVRoaXNMaXN0ZW5lciAhPT0gbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIobWVzc2FnZSwgcGF5bG9hZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25jZTogZnVuY3Rpb24gKG1lc3NhZ2UsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB0aGlzLmFkZExpc3RlbmVyKG1lc3NhZ2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkTGlzdGVuZXI6IGZ1bmN0aW9uIChsaXN0ZW5lck9yTWVzc2FnZSwgbGlzdGVuZXIgPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZUFjY2VwdGVkQnlUaGlzTGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyT3JNZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlQWNjZXB0ZWRCeVRoaXNMaXN0ZW5lciA9IGxpc3RlbmVyT3JNZXNzYWdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxpc3RlbmVyIGFscmVhZHkgYWRkZWQsIGFkZGluZyBpdCB0d2ljZSBpcyBub3QgYWxsb3dlZC5cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEZJWE1FOiBub3QgdGhlIGJlc3QgbWV0aG9kIGJ1dCBlZmZlY3RpdmUsIGxldCdzIGxlYXZlIGl0IGxpa2UgdGhpcywgZm9yIG5vd1xuICAgICAgICAgICAgbGlzdGVuZXIubWVzc2FnZUFjY2VwdGVkQnlUaGlzTGlzdGVuZXIgPSBtZXNzYWdlQWNjZXB0ZWRCeVRoaXNMaXN0ZW5lcjtcbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZTogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVySW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVySW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoMCwgbGlzdGVuZXJJbmRleCkuY29uY2F0KGxpc3RlbmVycy5zbGljZShsaXN0ZW5lckluZGV4ICsgMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLmxpc3RlbmVyc107XG4gICAgICAgIH0sXG4gICAgICAgIGdldEFjY2VwdGVkTWVzc2FnZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpbnRlcm5hbEFjY2VwdGVkTWVzc2FnZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBbLi4uaW50ZXJuYWxBY2NlcHRlZE1lc3NhZ2VzXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXX0=

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _preact = __webpack_require__(0);

var _preact2 = _interopRequireDefault(_preact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Cell = ({ value, onClick }) => {
    const text = value || '';
    return _preact2.default.h(
        'div',
        { 'class': 'cell', onClick: onClick },
        text
    );
};

class Game extends _preact2.default.Component {
    constructor() {
        super(...arguments);

        this.state = { squares: this.props.squares };
        this.subscription = null;
    }

    componentDidMount() {
        this.subscription = this.props.bus.addListener('STATE_UPDATED', (_, state) => {
            this.setState({ squares: state.squares });
        });
    }

    componentWillUnmount() {
        if (this.subscription !== null) {
            this.subscription.unsubscribe();
        }
    }

    onCellClick(cellIndex) {
        this.props.bus.sendMessage('CELL_CLICKED', cellIndex);
    }

    render(_, { squares }) {
        return _preact2.default.h(
            'div',
            { id: 'container' },
            _preact2.default.h(
                'div',
                { id: 'board-game' },
                _preact2.default.h(
                    'div',
                    { 'class': 'row' },
                    _preact2.default.h(Cell, { value: squares[0], onClick: this.onCellClick.bind(this, 0) }),
                    _preact2.default.h(Cell, { value: squares[1], onClick: this.onCellClick.bind(this, 1) }),
                    _preact2.default.h(Cell, { value: squares[2], onClick: this.onCellClick.bind(this, 2) })
                ),
                _preact2.default.h(
                    'div',
                    { 'class': 'row' },
                    _preact2.default.h(Cell, { value: squares[3], onClick: this.onCellClick.bind(this, 3) }),
                    _preact2.default.h(Cell, { value: squares[4], onClick: this.onCellClick.bind(this, 4) }),
                    _preact2.default.h(Cell, { value: squares[5], onClick: this.onCellClick.bind(this, 5) })
                ),
                _preact2.default.h(
                    'div',
                    { 'class': 'row' },
                    _preact2.default.h(Cell, { value: squares[6], onClick: this.onCellClick.bind(this, 6) }),
                    _preact2.default.h(Cell, { value: squares[7], onClick: this.onCellClick.bind(this, 7) }),
                    _preact2.default.h(Cell, { value: squares[8], onClick: this.onCellClick.bind(this, 8) })
                )
            ),
            _preact2.default.h('div', { id: 'history-management' })
        );
    }
}
exports.Game = Game;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9wcmVzZW50YXRpb24vZWxlbWVudHMuanMiXSwibmFtZXMiOlsiQ2VsbCIsInZhbHVlIiwib25DbGljayIsInRleHQiLCJHYW1lIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJzdGF0ZSIsInNxdWFyZXMiLCJwcm9wcyIsInN1YnNjcmlwdGlvbiIsImNvbXBvbmVudERpZE1vdW50IiwiYnVzIiwiYWRkTGlzdGVuZXIiLCJfIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInVuc3Vic2NyaWJlIiwib25DZWxsQ2xpY2siLCJjZWxsSW5kZXgiLCJzZW5kTWVzc2FnZSIsInJlbmRlciIsImJpbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O0FBR0EsTUFBTUEsT0FBTyxDQUFDLEVBQUNDLEtBQUQsRUFBUUMsT0FBUixFQUFELEtBQXNCO0FBQy9CLFVBQU1DLE9BQU9GLFNBQVMsRUFBdEI7QUFDQSxXQUFPO0FBQUE7QUFBQSxVQUFLLFNBQU0sTUFBWCxFQUFrQixTQUFTQyxPQUEzQjtBQUFzQ0M7QUFBdEMsS0FBUDtBQUNILENBSEQ7O0FBS08sTUFBTUMsSUFBTixTQUFtQixpQkFBT0MsU0FBMUIsQ0FBb0M7QUFDdkNDLGtCQUFjO0FBQ1YsY0FBTSxHQUFHQyxTQUFUOztBQUVBLGFBQUtDLEtBQUwsR0FBYSxFQUFDQyxTQUFTLEtBQUtDLEtBQUwsQ0FBV0QsT0FBckIsRUFBYjtBQUNBLGFBQUtFLFlBQUwsR0FBb0IsSUFBcEI7QUFDSDs7QUFFREMsd0JBQW9CO0FBQ2hCLGFBQUtELFlBQUwsR0FBb0IsS0FBS0QsS0FBTCxDQUFXRyxHQUFYLENBQWVDLFdBQWYsQ0FBMkIsZUFBM0IsRUFBNEMsQ0FBQ0MsQ0FBRCxFQUFJUCxLQUFKLEtBQWE7QUFDekUsaUJBQUtRLFFBQUwsQ0FBYyxFQUFDUCxTQUFTRCxNQUFNQyxPQUFoQixFQUFkO0FBQ0gsU0FGbUIsQ0FBcEI7QUFHSDs7QUFFRFEsMkJBQXVCO0FBQ25CLFlBQUksS0FBS04sWUFBTCxLQUFzQixJQUExQixFQUFnQztBQUM1QixpQkFBS0EsWUFBTCxDQUFrQk8sV0FBbEI7QUFDSDtBQUNKOztBQUVEQyxnQkFBWUMsU0FBWixFQUF1QjtBQUNuQixhQUFLVixLQUFMLENBQVdHLEdBQVgsQ0FBZVEsV0FBZixDQUEyQixjQUEzQixFQUEyQ0QsU0FBM0M7QUFDSDs7QUFFREUsV0FBT1AsQ0FBUCxFQUFVLEVBQUNOLE9BQUQsRUFBVixFQUFxQjtBQUNqQixlQUFPO0FBQUE7QUFBQSxjQUFLLElBQUcsV0FBUjtBQUNIO0FBQUE7QUFBQSxrQkFBSyxJQUFHLFlBQVI7QUFDSTtBQUFBO0FBQUEsc0JBQUssU0FBTSxLQUFYO0FBQ0ksdUNBQUMsSUFBRCxJQUFNLE9BQU9BLFFBQVEsQ0FBUixDQUFiLEVBQXlCLFNBQVMsS0FBS1UsV0FBTCxDQUFpQkksSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBbEMsR0FESjtBQUVJLHVDQUFDLElBQUQsSUFBTSxPQUFPZCxRQUFRLENBQVIsQ0FBYixFQUF5QixTQUFTLEtBQUtVLFdBQUwsQ0FBaUJJLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQWxDLEdBRko7QUFHSSx1Q0FBQyxJQUFELElBQU0sT0FBT2QsUUFBUSxDQUFSLENBQWIsRUFBeUIsU0FBUyxLQUFLVSxXQUFMLENBQWlCSSxJQUFqQixDQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUFsQztBQUhKLGlCQURKO0FBTUk7QUFBQTtBQUFBLHNCQUFLLFNBQU0sS0FBWDtBQUNJLHVDQUFDLElBQUQsSUFBTSxPQUFPZCxRQUFRLENBQVIsQ0FBYixFQUF5QixTQUFTLEtBQUtVLFdBQUwsQ0FBaUJJLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQWxDLEdBREo7QUFFSSx1Q0FBQyxJQUFELElBQU0sT0FBT2QsUUFBUSxDQUFSLENBQWIsRUFBeUIsU0FBUyxLQUFLVSxXQUFMLENBQWlCSSxJQUFqQixDQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUFsQyxHQUZKO0FBR0ksdUNBQUMsSUFBRCxJQUFNLE9BQU9kLFFBQVEsQ0FBUixDQUFiLEVBQXlCLFNBQVMsS0FBS1UsV0FBTCxDQUFpQkksSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBbEM7QUFISixpQkFOSjtBQVdJO0FBQUE7QUFBQSxzQkFBSyxTQUFNLEtBQVg7QUFDSSx1Q0FBQyxJQUFELElBQU0sT0FBT2QsUUFBUSxDQUFSLENBQWIsRUFBeUIsU0FBUyxLQUFLVSxXQUFMLENBQWlCSSxJQUFqQixDQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUFsQyxHQURKO0FBRUksdUNBQUMsSUFBRCxJQUFNLE9BQU9kLFFBQVEsQ0FBUixDQUFiLEVBQXlCLFNBQVMsS0FBS1UsV0FBTCxDQUFpQkksSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBbEMsR0FGSjtBQUdJLHVDQUFDLElBQUQsSUFBTSxPQUFPZCxRQUFRLENBQVIsQ0FBYixFQUF5QixTQUFTLEtBQUtVLFdBQUwsQ0FBaUJJLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQWxDO0FBSEo7QUFYSixhQURHO0FBa0JILHdDQUFLLElBQUcsb0JBQVI7QUFsQkcsU0FBUDtBQW9CSDtBQTdDc0M7UUFBOUJuQixJLEdBQUFBLEkiLCJmaWxlIjoiZWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2R2ZC9EZXZlbG9wbWVudC9KYXZhc2NyaXB0L2FyY2hpdGVjdHVyZS9hcmNoaXRlY3R1cmUtZmlyc3QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJlYWN0IGZyb20gJ3ByZWFjdCdcblxuXG5jb25zdCBDZWxsID0gKHt2YWx1ZSwgb25DbGlja30pID0+IHtcbiAgICBjb25zdCB0ZXh0ID0gdmFsdWUgfHwgJyc7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3M9XCJjZWxsXCIgb25DbGljaz17b25DbGlja30+eyB0ZXh0IH08L2Rpdj5cbn07XG5cbmV4cG9ydCBjbGFzcyBHYW1lIGV4dGVuZHMgcHJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtzcXVhcmVzOiB0aGlzLnByb3BzLnNxdWFyZXN9O1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5wcm9wcy5idXMuYWRkTGlzdGVuZXIoJ1NUQVRFX1VQREFURUQnLCAoXywgc3RhdGUpPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3F1YXJlczogc3RhdGUuc3F1YXJlc30pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DZWxsQ2xpY2soY2VsbEluZGV4KSB7XG4gICAgICAgIHRoaXMucHJvcHMuYnVzLnNlbmRNZXNzYWdlKCdDRUxMX0NMSUNLRUQnLCBjZWxsSW5kZXgpO1xuICAgIH1cblxuICAgIHJlbmRlcihfLCB7c3F1YXJlc30pIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgaWQ9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJib2FyZC1nYW1lXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8Q2VsbCB2YWx1ZT17c3F1YXJlc1swXX0gb25DbGljaz17dGhpcy5vbkNlbGxDbGljay5iaW5kKHRoaXMsIDApfS8+XG4gICAgICAgICAgICAgICAgICAgIDxDZWxsIHZhbHVlPXtzcXVhcmVzWzFdfSBvbkNsaWNrPXt0aGlzLm9uQ2VsbENsaWNrLmJpbmQodGhpcywgMSl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPENlbGwgdmFsdWU9e3NxdWFyZXNbMl19IG9uQ2xpY2s9e3RoaXMub25DZWxsQ2xpY2suYmluZCh0aGlzLCAyKX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPENlbGwgdmFsdWU9e3NxdWFyZXNbM119IG9uQ2xpY2s9e3RoaXMub25DZWxsQ2xpY2suYmluZCh0aGlzLCAzKX0vPlxuICAgICAgICAgICAgICAgICAgICA8Q2VsbCB2YWx1ZT17c3F1YXJlc1s0XX0gb25DbGljaz17dGhpcy5vbkNlbGxDbGljay5iaW5kKHRoaXMsIDQpfS8+XG4gICAgICAgICAgICAgICAgICAgIDxDZWxsIHZhbHVlPXtzcXVhcmVzWzVdfSBvbkNsaWNrPXt0aGlzLm9uQ2VsbENsaWNrLmJpbmQodGhpcywgNSl9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxDZWxsIHZhbHVlPXtzcXVhcmVzWzZdfSBvbkNsaWNrPXt0aGlzLm9uQ2VsbENsaWNrLmJpbmQodGhpcywgNil9Lz5cbiAgICAgICAgICAgICAgICAgICAgPENlbGwgdmFsdWU9e3NxdWFyZXNbN119IG9uQ2xpY2s9e3RoaXMub25DZWxsQ2xpY2suYmluZCh0aGlzLCA3KX0vPlxuICAgICAgICAgICAgICAgICAgICA8Q2VsbCB2YWx1ZT17c3F1YXJlc1s4XX0gb25DbGljaz17dGhpcy5vbkNlbGxDbGljay5iaW5kKHRoaXMsIDgpfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJoaXN0b3J5LW1hbmFnZW1lbnRcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn1cbiJdfQ==

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bootstrap = __webpack_require__(1);

__webpack_require__(2);

(0, _bootstrap.bootstrap)(document.body);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9wcmVzZW50YXRpb24vd2VicGFnZV9lbnRyeV9wb2ludC5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImJvZHkiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBR0EsMEJBQVVBLFNBQVNDLElBQW5CIiwiZmlsZSI6IndlYnBhZ2VfZW50cnlfcG9pbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2R2ZC9EZXZlbG9wbWVudC9KYXZhc2NyaXB0L2FyY2hpdGVjdHVyZS9hcmNoaXRlY3R1cmUtZmlyc3QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnLi9ib290c3RyYXAnXG5pbXBvcnQgJy4uLy4uL3N0YXRpYy9pbmRleC5jc3MnXG5cblxuYm9vdHN0cmFwKGRvY3VtZW50LmJvZHkpO1xuIl19

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".cell {\n    width: 40px;\n    height: 40px;\n    line-height: 40px;\n    font-size: 30px;\n    display: inline-block;\n    border: 1px solid transparent;\n}\n\n.cell:nth-child(1), .cell:nth-child(2) {\n    border-right-color: black;\n}\n\n.row:nth-child(1) .cell, .row:nth-child(2) .cell {\n    border-bottom-color: black;\n}\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(4);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token (33:16)\n\n\u001b[0m \u001b[90m 31 | \u001b[39m        \u001b[36mcase\u001b[39m \u001b[32m'MOVE'\u001b[39m\u001b[33m:\u001b[39m\n \u001b[90m 32 | \u001b[39m            \u001b[36mreturn\u001b[39m {\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 33 | \u001b[39m                \u001b[33m...\u001b[39mstate\u001b[33m,\u001b[39m\n \u001b[90m    | \u001b[39m                \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 34 | \u001b[39m                squares\u001b[33m:\u001b[39m state\u001b[33m.\u001b[39msquares\u001b[33m.\u001b[39mmap((value\u001b[33m,\u001b[39m index)\u001b[33m=>\u001b[39m{\n \u001b[90m 35 | \u001b[39m                    \u001b[36mif\u001b[39m(index \u001b[33m===\u001b[39m action\u001b[33m.\u001b[39mpayload){\n \u001b[90m 36 | \u001b[39m                        \u001b[36mreturn\u001b[39m \u001b[32m'X'\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map