"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getns = getns;
/**
 * Function that returns a function used to get prefixed actions.
 * @param {String} nameSpace - the name space that will be used as a prefix.
 * @returns {Function} - The prefix parser.
 */
function getns(nameSpace) {
  /**
   * Function that returns a prefixed resource action.
   * @param {String} resource - The resource.
   * @returns {String} - The prefixed resource
   */
  return function (resource) {
    return nameSpace + "/" + resource;
  };
}

var CREATE = exports.CREATE = 1;
var READ = exports.READ = 2;
var UPDATE = exports.UPDATE = 4;
var DELETE = exports.DELETE = 8;
var LIST = exports.LIST = 16;
var POST = exports.POST = 32;