/**
 * Auto switch Vimperator key navigation
 *
 * @author teramako teramako@gmail.com
 * @author halt feits <halt.feit at gmail.com>
 * @version 0.6pre
 */

(function(){

const ignorePagesList = window.eval(liberator.globalVariables.autoignorekey_pages) || [
    /^https?:\/\/mail\.google\.com\//,
    /^https?:\/\/www\.google\.com\/reader\//,
    /^https?:\/\/www\.google\.ca\/reader\//,
].map(function(i)
    i instanceof RegExp ? i :
    i instanceof Array  ? new RegExp(String(i[0]), String(i[1])) :
    new RegExp("^" + String(i).replace(/\s+/g, "")
                              .replace(/[\\^$.+?|(){}\[\]]/g, "\\$&")
                              .replace(/(?=\*)/g, ".")
                   + "$", "i"));

document.getElementById('appcontent').addEventListener('DOMContentLoaded',passAllKeysIfTarget,false);
getBrowser().mTabBox.addEventListener('TabSelect',passAllKeysIfTarget,false);

function passAllKeysIfTarget() {
    var uri = content.document.documentURI;
    liberator.modules.modes.passAllKeys = isMatch(uri);
}

function isMatch(uri) ignorePagesList.some(function(e) e.test(uri))

})();
// vim:sw=4 ts=4 et:
