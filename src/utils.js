/**
 * Function that returns a function used to get prefixed actions.
 * @param {String} nameSpace - the name space that will be used as a prefix.
 * @returns {Function} - The prefix parser.
 */
export function getns(nameSpace) {
    /**
     * Function that returns a prefixed resource action.
     * @param {String} resource - The resource.
     * @returns {String} - The prefixed resource
     */
    return resource => `${nameSpace}/${resource}`;
}

export const CREATE = 1;
export const READ = 2;
export const UPDATE = 4;
export const DELETE = 8;
export const LIST = 16;
export const POST = 32;
