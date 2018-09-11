"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionsNameSpace = getActionsNameSpace;
/**
 * Function that returns a function used to get prefixed actions.
 * @param {String} nameSpace - the name space that will be used as a prefix.
 * @returns {Function} - The prefix parser.
 */
function getActionsNameSpace(nameSpace) {
  /**
   * Function that returns a prefixed resource action.
   * @param {String} resource - The resource.
   * @returns {String} - The prefixed resource
   */
  return function (resource) {
    return nameSpace + "/" + resource;
  };
}