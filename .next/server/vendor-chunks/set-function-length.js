"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/set-function-length";
exports.ids = ["vendor-chunks/set-function-length"];
exports.modules = {

/***/ "(action-browser)/./node_modules/set-function-length/index.js":
/*!***************************************************!*\
  !*** ./node_modules/set-function-length/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar GetIntrinsic = __webpack_require__(/*! get-intrinsic */ \"(action-browser)/./node_modules/get-intrinsic/index.js\");\nvar define = __webpack_require__(/*! define-data-property */ \"(action-browser)/./node_modules/define-data-property/index.js\");\nvar hasDescriptors = __webpack_require__(/*! has-property-descriptors */ \"(action-browser)/./node_modules/has-property-descriptors/index.js\")();\nvar gOPD = __webpack_require__(/*! gopd */ \"(action-browser)/./node_modules/gopd/index.js\");\n\nvar $TypeError = __webpack_require__(/*! es-errors/type */ \"(action-browser)/./node_modules/es-errors/type.js\");\nvar $floor = GetIntrinsic('%Math.floor%');\n\n/** @type {import('.')} */\nmodule.exports = function setFunctionLength(fn, length) {\n\tif (typeof fn !== 'function') {\n\t\tthrow new $TypeError('`fn` is not a function');\n\t}\n\tif (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {\n\t\tthrow new $TypeError('`length` must be a positive 32-bit integer');\n\t}\n\n\tvar loose = arguments.length > 2 && !!arguments[2];\n\n\tvar functionLengthIsConfigurable = true;\n\tvar functionLengthIsWritable = true;\n\tif ('length' in fn && gOPD) {\n\t\tvar desc = gOPD(fn, 'length');\n\t\tif (desc && !desc.configurable) {\n\t\t\tfunctionLengthIsConfigurable = false;\n\t\t}\n\t\tif (desc && !desc.writable) {\n\t\t\tfunctionLengthIsWritable = false;\n\t\t}\n\t}\n\n\tif (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {\n\t\tif (hasDescriptors) {\n\t\t\tdefine(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);\n\t\t} else {\n\t\t\tdefine(/** @type {Parameters<define>[0]} */ (fn), 'length', length);\n\t\t}\n\t}\n\treturn fn;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9zZXQtZnVuY3Rpb24tbGVuZ3RoL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLDZFQUFlO0FBQzFDLGFBQWEsbUJBQU8sQ0FBQywyRkFBc0I7QUFDM0MscUJBQXFCLG1CQUFPLENBQUMsbUdBQTBCO0FBQ3ZELFdBQVcsbUJBQU8sQ0FBQywyREFBTTs7QUFFekIsaUJBQWlCLG1CQUFPLENBQUMseUVBQWdCO0FBQ3pDOztBQUVBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDLElBQUk7QUFDSixxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGFuemlzdHJldHRvLXN0b3JlZnJvbnQvLi9ub2RlX21vZHVsZXMvc2V0LWZ1bmN0aW9uLWxlbmd0aC9pbmRleC5qcz8wZjA4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtZGF0YS1wcm9wZXJ0eScpO1xudmFyIGhhc0Rlc2NyaXB0b3JzID0gcmVxdWlyZSgnaGFzLXByb3BlcnR5LWRlc2NyaXB0b3JzJykoKTtcbnZhciBnT1BEID0gcmVxdWlyZSgnZ29wZCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy90eXBlJyk7XG52YXIgJGZsb29yID0gR2V0SW50cmluc2ljKCclTWF0aC5mbG9vciUnKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0RnVuY3Rpb25MZW5ndGgoZm4sIGxlbmd0aCkge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2BmbmAgaXMgbm90IGEgZnVuY3Rpb24nKTtcblx0fVxuXHRpZiAodHlwZW9mIGxlbmd0aCAhPT0gJ251bWJlcicgfHwgbGVuZ3RoIDwgMCB8fCBsZW5ndGggPiAweEZGRkZGRkZGIHx8ICRmbG9vcihsZW5ndGgpICE9PSBsZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYGxlbmd0aGAgbXVzdCBiZSBhIHBvc2l0aXZlIDMyLWJpdCBpbnRlZ2VyJyk7XG5cdH1cblxuXHR2YXIgbG9vc2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiAhIWFyZ3VtZW50c1syXTtcblxuXHR2YXIgZnVuY3Rpb25MZW5ndGhJc0NvbmZpZ3VyYWJsZSA9IHRydWU7XG5cdHZhciBmdW5jdGlvbkxlbmd0aElzV3JpdGFibGUgPSB0cnVlO1xuXHRpZiAoJ2xlbmd0aCcgaW4gZm4gJiYgZ09QRCkge1xuXHRcdHZhciBkZXNjID0gZ09QRChmbiwgJ2xlbmd0aCcpO1xuXHRcdGlmIChkZXNjICYmICFkZXNjLmNvbmZpZ3VyYWJsZSkge1xuXHRcdFx0ZnVuY3Rpb25MZW5ndGhJc0NvbmZpZ3VyYWJsZSA9IGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoZGVzYyAmJiAhZGVzYy53cml0YWJsZSkge1xuXHRcdFx0ZnVuY3Rpb25MZW5ndGhJc1dyaXRhYmxlID0gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGZ1bmN0aW9uTGVuZ3RoSXNDb25maWd1cmFibGUgfHwgZnVuY3Rpb25MZW5ndGhJc1dyaXRhYmxlIHx8ICFsb29zZSkge1xuXHRcdGlmIChoYXNEZXNjcmlwdG9ycykge1xuXHRcdFx0ZGVmaW5lKC8qKiBAdHlwZSB7UGFyYW1ldGVyczxkZWZpbmU+WzBdfSAqLyAoZm4pLCAnbGVuZ3RoJywgbGVuZ3RoLCB0cnVlLCB0cnVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVmaW5lKC8qKiBAdHlwZSB7UGFyYW1ldGVyczxkZWZpbmU+WzBdfSAqLyAoZm4pLCAnbGVuZ3RoJywgbGVuZ3RoKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZuO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/set-function-length/index.js\n");

/***/ })

};
;