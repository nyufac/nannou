/**
 * Nannou2 - compiling template engine based on
 *           pattern matching.
 *
 * (c) 2012, Niel Faclly <nyuufac@gmail.com>
 */
function nannou(template, rtl) {
    function trim(x) {
        return x.replace(/^\s+|\s+$/g, '')
    }

    var sbeg = rtl.__sbeg || '<!--/',
        send = rtl.__send || '-->';

    return eval(template.replace(/;;;.*\n/g, '').split(sbeg).slice(1).map(function (p) {
        var out = p.split(send)
        return [trim(out.shift()), trim(out.join(send))]
    }).reduce(function (res, x) {
            return res + ' else if (_.' + x[0].replace(/\s+(\!)?/g, ' && $1_.') + ')' + ' { with (_) { return "' + x[1]
                .replace(/[\s\t\n\r]+/g, ' ')
                .replace(/\"/g, '\\"')
                .replace(/\<\?(\s*(\w+)\s*\#)?(.*?)(::(.*?))?\?\>/g,
                    '" + ____($3, "$5", "$2") + "') + '"}} '
        }, '(function (rtl) {' +
        'return function ____ (__, ___, _) {' +
        'function box(v) { var x; return _ ? ((x = ({}))[_] = v, x) : v };' +
        'if (!_ && typeof __ !== "object") return __;' +
        'var x, arr = __.map ? __ : [__];' +
        'return arr.map(box).map(function (_) {' +
        ' if (0) {} ') + '}).join(___ ? ___ : "")}})')(rtl)
}