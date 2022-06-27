(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Clock$ReceiveTimeZone = function (a) {
	return {$: 'ReceiveTimeZone', a: a};
};
var $author$project$Clock$TimeOfDay = F3(
	function (hour, minute, second) {
		return {hour: hour, minute: minute, second: second};
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $justinmimbs$timezone_data$TimeZone$NoDataForZoneName = function (a) {
	return {$: 'NoDataForZoneName', a: a};
};
var $justinmimbs$timezone_data$TimeZone$NoZoneName = {$: 'NoZoneName'};
var $elm$core$Task$fail = _Scheduler_fail;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$getZoneName = _Time_getZoneName(_Utils_Tuple0);
var $justinmimbs$timezone_data$TimeZone$Specification$Save = function (a) {
	return {$: 'Save', a: a};
};
var $justinmimbs$timezone_data$TimeZone$Specification$Zone = F2(
	function (history, current) {
		return {current: current, history: history};
	});
var $justinmimbs$timezone_data$TimeZone$Specification$ZoneState = F2(
	function (standardOffset, zoneRules) {
		return {standardOffset: standardOffset, zoneRules: zoneRules};
	});
var $justinmimbs$timezone_data$TimeZone$maxYear = 2037;
var $justinmimbs$timezone_data$TimeZone$minYear = 1970;
var $justinmimbs$timezone_data$TimeZone$Specification$DateTime = F5(
	function (year, month, day, time, clock) {
		return {clock: clock, day: day, month: month, time: time, year: year};
	});
var $elm$time$Time$Jan = {$: 'Jan'};
var $justinmimbs$timezone_data$TimeZone$Specification$Universal = {$: 'Universal'};
var $justinmimbs$timezone_data$TimeZone$Specification$dropChangesBeforeEpoch = function (_v0) {
	dropChangesBeforeEpoch:
	while (true) {
		var initial = _v0.a;
		var changes = _v0.b;
		if (changes.b) {
			var change = changes.a;
			var rest = changes.b;
			if (change.start <= 0) {
				var $temp$_v0 = _Utils_Tuple2(change.offset, rest);
				_v0 = $temp$_v0;
				continue dropChangesBeforeEpoch;
			} else {
				return _Utils_Tuple2(initial, changes);
			}
		} else {
			return _Utils_Tuple2(initial, _List_Nil);
		}
	}
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $justinmimbs$timezone_data$RataDie$weekdayNumber = function (rd) {
	var _v0 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v0) {
		return 7;
	} else {
		var n = _v0;
		return n;
	}
};
var $justinmimbs$timezone_data$RataDie$weekdayToNumber = function (wd) {
	switch (wd.$) {
		case 'Mon':
			return 1;
		case 'Tue':
			return 2;
		case 'Wed':
			return 3;
		case 'Thu':
			return 4;
		case 'Fri':
			return 5;
		case 'Sat':
			return 6;
		default:
			return 7;
	}
};
var $justinmimbs$timezone_data$RataDie$floorWeekday = F2(
	function (weekday, rd) {
		var daysSincePreviousWeekday = A2(
			$elm$core$Basics$modBy,
			7,
			($justinmimbs$timezone_data$RataDie$weekdayNumber(rd) + 7) - $justinmimbs$timezone_data$RataDie$weekdayToNumber(weekday));
		return rd - daysSincePreviousWeekday;
	});
var $justinmimbs$timezone_data$RataDie$ceilingWeekday = F2(
	function (weekday, rd) {
		var floored = A2($justinmimbs$timezone_data$RataDie$floorWeekday, weekday, rd);
		return _Utils_eq(rd, floored) ? rd : (floored + 7);
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $justinmimbs$timezone_data$RataDie$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$timezone_data$RataDie$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$timezone_data$RataDie$isLeapYear(y) ? 1 : 0;
		switch (m.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 31;
			case 'Mar':
				return 59 + leapDays;
			case 'Apr':
				return 90 + leapDays;
			case 'May':
				return 120 + leapDays;
			case 'Jun':
				return 151 + leapDays;
			case 'Jul':
				return 181 + leapDays;
			case 'Aug':
				return 212 + leapDays;
			case 'Sep':
				return 243 + leapDays;
			case 'Oct':
				return 273 + leapDays;
			case 'Nov':
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$timezone_data$RataDie$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
	return (365 * y) + leapYears;
};
var $justinmimbs$timezone_data$RataDie$dayOfMonth = F3(
	function (y, m, d) {
		return ($justinmimbs$timezone_data$RataDie$daysBeforeYear(y) + A2($justinmimbs$timezone_data$RataDie$daysBeforeMonth, y, m)) + d;
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $justinmimbs$timezone_data$RataDie$daysInMonth = F2(
	function (y, m) {
		switch (m.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $justinmimbs$timezone_data$RataDie$isLeapYear(y) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$timezone_data$RataDie$lastOfMonth = F2(
	function (y, m) {
		return ($justinmimbs$timezone_data$RataDie$daysBeforeYear(y) + A2($justinmimbs$timezone_data$RataDie$daysBeforeMonth, y, m)) + A2($justinmimbs$timezone_data$RataDie$daysInMonth, y, m);
	});
var $justinmimbs$timezone_data$TimeZone$Specification$minutesFromRataDie = function (rd) {
	return (rd - 719163) * 1440;
};
var $elm$core$List$sortBy = _List_sortBy;
var $justinmimbs$timezone_data$TimeZone$Specification$utcAdjustment = F2(
	function (clock, _v0) {
		var standard = _v0.standard;
		var save = _v0.save;
		switch (clock.$) {
			case 'Universal':
				return 0;
			case 'Standard':
				return 0 - standard;
			default:
				return 0 - (standard + save);
		}
	});
var $justinmimbs$timezone_data$TimeZone$Specification$minutesFromDateTime = function (_v0) {
	var year = _v0.year;
	var month = _v0.month;
	var day = _v0.day;
	var time = _v0.time;
	return $justinmimbs$timezone_data$TimeZone$Specification$minutesFromRataDie(
		A3($justinmimbs$timezone_data$RataDie$dayOfMonth, year, month, day)) + time;
};
var $justinmimbs$timezone_data$TimeZone$Specification$utcMinutesFromDateTime = F2(
	function (offset, datetime) {
		return $justinmimbs$timezone_data$TimeZone$Specification$minutesFromDateTime(datetime) + A2($justinmimbs$timezone_data$TimeZone$Specification$utcAdjustment, datetime.clock, offset);
	});
var $justinmimbs$timezone_data$TimeZone$Specification$rulesToOffsetChanges = F5(
	function (previousOffset, start, until, standardOffset, rules) {
		var transitions = A2(
			$elm$core$List$concatMap,
			function (year) {
				return A2(
					$elm$core$List$sortBy,
					function ($) {
						return $.start;
					},
					A2(
						$elm$core$List$map,
						function (rule) {
							return {
								clock: rule.clock,
								save: rule.save,
								start: $justinmimbs$timezone_data$TimeZone$Specification$minutesFromRataDie(
									function () {
										var _v2 = rule.day;
										switch (_v2.$) {
											case 'Day':
												var day = _v2.a;
												return A3($justinmimbs$timezone_data$RataDie$dayOfMonth, year, rule.month, day);
											case 'Next':
												var weekday = _v2.a;
												var after = _v2.b;
												return A2(
													$justinmimbs$timezone_data$RataDie$ceilingWeekday,
													weekday,
													A3($justinmimbs$timezone_data$RataDie$dayOfMonth, year, rule.month, after));
											case 'Prev':
												var weekday = _v2.a;
												var before = _v2.b;
												return A2(
													$justinmimbs$timezone_data$RataDie$floorWeekday,
													weekday,
													A3($justinmimbs$timezone_data$RataDie$dayOfMonth, year, rule.month, before));
											default:
												var weekday = _v2.a;
												return A2(
													$justinmimbs$timezone_data$RataDie$floorWeekday,
													weekday,
													A2($justinmimbs$timezone_data$RataDie$lastOfMonth, year, rule.month));
										}
									}()) + rule.time
							};
						},
						A2(
							$elm$core$List$filter,
							function (rule) {
								return (_Utils_cmp(rule.from, year) < 1) && (_Utils_cmp(year, rule.to) < 1);
							},
							rules)));
			},
			A2($elm$core$List$range, start.year - 1, until.year));
		var initialOffset = {save: 0, standard: standardOffset};
		var initialChange = {
			offset: standardOffset,
			start: A2($justinmimbs$timezone_data$TimeZone$Specification$utcMinutesFromDateTime, previousOffset, start)
		};
		var _v0 = A3(
			$elm$core$List$foldl,
			F2(
				function (transition, _v1) {
					var currentOffset = _v1.a;
					var changes = _v1.b;
					var newOffset = {save: transition.save, standard: standardOffset};
					if (_Utils_cmp(
						transition.start + A2($justinmimbs$timezone_data$TimeZone$Specification$utcAdjustment, transition.clock, previousOffset),
						initialChange.start) < 1) {
						var updatedInitialChange = {offset: standardOffset + transition.save, start: initialChange.start};
						return _Utils_Tuple2(
							newOffset,
							_List_fromArray(
								[updatedInitialChange]));
					} else {
						if (_Utils_cmp(
							transition.start + A2($justinmimbs$timezone_data$TimeZone$Specification$utcAdjustment, transition.clock, currentOffset),
							A2($justinmimbs$timezone_data$TimeZone$Specification$utcMinutesFromDateTime, currentOffset, until)) < 0) {
							var change = {
								offset: standardOffset + transition.save,
								start: transition.start + A2($justinmimbs$timezone_data$TimeZone$Specification$utcAdjustment, transition.clock, currentOffset)
							};
							return _Utils_Tuple2(
								newOffset,
								A2($elm$core$List$cons, change, changes));
						} else {
							return _Utils_Tuple2(currentOffset, changes);
						}
					}
				}),
			_Utils_Tuple2(
				initialOffset,
				_List_fromArray(
					[initialChange])),
			transitions);
		var nextOffset = _v0.a;
		var descendingChanges = _v0.b;
		return _Utils_Tuple2(
			$elm$core$List$reverse(descendingChanges),
			nextOffset);
	});
var $justinmimbs$timezone_data$TimeZone$Specification$stateToOffsetChanges = F4(
	function (previousOffset, start, until, _v0) {
		var standardOffset = _v0.standardOffset;
		var zoneRules = _v0.zoneRules;
		if (zoneRules.$ === 'Save') {
			var save = zoneRules.a;
			return _Utils_Tuple2(
				_List_fromArray(
					[
						{
						offset: standardOffset + save,
						start: A2($justinmimbs$timezone_data$TimeZone$Specification$utcMinutesFromDateTime, previousOffset, start)
					}
					]),
				{save: save, standard: standardOffset});
		} else {
			var rules = zoneRules.a;
			return A5($justinmimbs$timezone_data$TimeZone$Specification$rulesToOffsetChanges, previousOffset, start, until, standardOffset, rules);
		}
	});
var $justinmimbs$timezone_data$TimeZone$Specification$stripDuplicatesByHelp = F4(
	function (f, a, rev, list) {
		stripDuplicatesByHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$List$reverse(rev);
			} else {
				var x = list.a;
				var xs = list.b;
				var b = f(x);
				var rev_ = (!_Utils_eq(a, b)) ? A2($elm$core$List$cons, x, rev) : rev;
				var $temp$f = f,
					$temp$a = b,
					$temp$rev = rev_,
					$temp$list = xs;
				f = $temp$f;
				a = $temp$a;
				rev = $temp$rev;
				list = $temp$list;
				continue stripDuplicatesByHelp;
			}
		}
	});
var $justinmimbs$timezone_data$TimeZone$Specification$zoneToRanges = F3(
	function (zoneStart, zoneUntil, zone) {
		var _v0 = A3(
			$elm$core$List$foldl,
			F2(
				function (_v1, _v2) {
					var state = _v1.a;
					var nextStart = _v1.b;
					var start = _v2.a;
					var ranges = _v2.b;
					return _Utils_Tuple2(
						nextStart,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple3(start, state, nextStart),
							ranges));
				}),
			_Utils_Tuple2(zoneStart, _List_Nil),
			zone.history);
		var currentStart = _v0.a;
		var historyRanges = _v0.b;
		return $elm$core$List$reverse(
			A2(
				$elm$core$List$cons,
				_Utils_Tuple3(currentStart, zone.current, zoneUntil),
				historyRanges));
	});
var $justinmimbs$timezone_data$TimeZone$Specification$toOffsets = F3(
	function (minYear, maxYear, zone) {
		var initialState = function () {
			var _v5 = zone.history;
			if (_v5.b) {
				var _v6 = _v5.a;
				var earliest = _v6.a;
				return earliest;
			} else {
				return zone.current;
			}
		}();
		var initialOffset = {
			save: function () {
				var _v4 = initialState.zoneRules;
				if (_v4.$ === 'Save') {
					var save = _v4.a;
					return save;
				} else {
					return 0;
				}
			}(),
			standard: initialState.standardOffset
		};
		var ascendingChanges = A4(
			$justinmimbs$timezone_data$TimeZone$Specification$stripDuplicatesByHelp,
			function ($) {
				return $.offset;
			},
			initialOffset.standard + initialOffset.save,
			_List_Nil,
			A3(
				$elm$core$List$foldl,
				F2(
					function (_v1, _v2) {
						var start = _v1.a;
						var state = _v1.b;
						var until = _v1.c;
						var prevOffset = _v2.a;
						var prevChanges = _v2.b;
						var _v3 = A4($justinmimbs$timezone_data$TimeZone$Specification$stateToOffsetChanges, prevOffset, start, until, state);
						var nextChanges = _v3.a;
						var nextOffset = _v3.b;
						return _Utils_Tuple2(
							nextOffset,
							_Utils_ap(prevChanges, nextChanges));
					}),
				_Utils_Tuple2(initialOffset, _List_Nil),
				A3(
					$justinmimbs$timezone_data$TimeZone$Specification$zoneToRanges,
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, minYear, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$Universal),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, maxYear + 1, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$Universal),
					zone)).b);
		var _v0 = $justinmimbs$timezone_data$TimeZone$Specification$dropChangesBeforeEpoch(
			_Utils_Tuple2(initialOffset.standard + initialOffset.save, ascendingChanges));
		var initial = _v0.a;
		var ascending = _v0.b;
		return _Utils_Tuple2(
			$elm$core$List$reverse(ascending),
			initial);
	});
var $justinmimbs$timezone_data$TimeZone$fromSpecification = function (zone) {
	var _v0 = A3($justinmimbs$timezone_data$TimeZone$Specification$toOffsets, $justinmimbs$timezone_data$TimeZone$minYear, $justinmimbs$timezone_data$TimeZone$maxYear, zone);
	var descending = _v0.a;
	var bottom = _v0.b;
	return A2($elm$time$Time$customZone, bottom, descending);
};
var $justinmimbs$timezone_data$TimeZone$africa__abidjan = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__accra = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__nairobi = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__addis_ababa = $justinmimbs$timezone_data$TimeZone$africa__nairobi;
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $justinmimbs$timezone_data$TimeZone$Specification$Rules = function (a) {
	return {$: 'Rules', a: a};
};
var $justinmimbs$timezone_data$TimeZone$Specification$WallClock = {$: 'WallClock'};
var $elm$time$Time$Apr = {$: 'Apr'};
var $justinmimbs$timezone_data$TimeZone$Specification$Day = function (a) {
	return {$: 'Day', a: a};
};
var $elm$time$Time$Mar = {$: 'Mar'};
var $justinmimbs$timezone_data$TimeZone$Specification$Rule = F7(
	function (from, to, month, day, time, clock, save) {
		return {clock: clock, day: day, from: from, month: month, save: save, time: time, to: to};
	});
var $elm$time$Time$Sep = {$: 'Sep'};
var $justinmimbs$timezone_data$TimeZone$Specification$Standard = {$: 'Standard'};
var $justinmimbs$timezone_data$TimeZone$rules_Algeria = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1971,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		1380,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1971,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		1380,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$africa__algiers = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Algeria)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1977, $elm$time$Time$Oct, 21, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Algeria)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Oct, 26, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Algeria)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$May, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__asmara = $justinmimbs$timezone_data$TimeZone$africa__nairobi;
var $justinmimbs$timezone_data$TimeZone$africa__bamako = $justinmimbs$timezone_data$TimeZone$africa__abidjan;
var $justinmimbs$timezone_data$TimeZone$africa__lagos = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__bangui = $justinmimbs$timezone_data$TimeZone$africa__lagos;
var $justinmimbs$timezone_data$TimeZone$africa__banjul = $justinmimbs$timezone_data$TimeZone$africa__abidjan;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $justinmimbs$timezone_data$TimeZone$africa__bissau = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1975, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__maputo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__blantyre = $justinmimbs$timezone_data$TimeZone$africa__maputo;
var $justinmimbs$timezone_data$TimeZone$africa__brazzaville = $justinmimbs$timezone_data$TimeZone$africa__lagos;
var $justinmimbs$timezone_data$TimeZone$africa__bujumbura = $justinmimbs$timezone_data$TimeZone$africa__maputo;
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Fri = {$: 'Fri'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $justinmimbs$timezone_data$TimeZone$Specification$Last = function (a) {
	return {$: 'Last', a: a};
};
var $justinmimbs$timezone_data$TimeZone$Specification$Next = F2(
	function (a, b) {
		return {$: 'Next', a: a, b: b};
	});
var $elm$time$Time$Thu = {$: 'Thu'};
var $justinmimbs$timezone_data$TimeZone$rules_Egypt = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1959,
		1981,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1966,
		1994,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1982,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(12),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1988,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1994,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1995,
		2010,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1995,
		2005,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Thu),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Thu, 1),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Thu),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(9),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Thu),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		2014,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		2014,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		2014,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		2014,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Thu),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$africa__cairo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Egypt))));
};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Sun = {$: 'Sun'};
var $justinmimbs$timezone_data$TimeZone$rules_Morocco = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1977,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2013,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2012,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2012,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2012,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		2013,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		2013,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		2018,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		2018,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		2014,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		2014,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2015,
		2015,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2015,
		2015,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2016,
		2016,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2016,
		2016,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2017,
		2017,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2017,
		2017,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2018,
		2018,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(13),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2018,
		2018,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(17),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2019,
		2019,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2019,
		2019,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(9),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2020,
		2020,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2020,
		2020,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2021,
		2021,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(11),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2021,
		2021,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2022,
		2022,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2022,
		2022,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2023,
		2023,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2023,
		2023,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(23),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2024,
		2024,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2024,
		2024,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2025,
		2025,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(23),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2025,
		2025,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2026,
		2026,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2026,
		2026,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2027,
		2027,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2027,
		2027,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2028,
		2028,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(23),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2028,
		2028,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2029,
		2029,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2029,
		2029,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(18),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2029,
		2029,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2030,
		2030,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2030,
		2030,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2031,
		2031,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2031,
		2031,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2032,
		2032,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(18),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2032,
		2032,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2033,
		2033,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(9),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2033,
		2033,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2033,
		2033,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2034,
		2034,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2034,
		2034,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(17),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2035,
		2035,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2035,
		2035,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2036,
		2036,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2036,
		2036,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(23),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2037,
		2037,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2037,
		2037,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$africa__casablanca = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Morocco)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1984, $elm$time$Time$Mar, 16, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1986, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Morocco)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2018, $elm$time$Time$Oct, 28, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Morocco))));
};
var $justinmimbs$timezone_data$TimeZone$rules_EU = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1980,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$rules_SpainAfrica = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1977,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$africa__ceuta = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_SpainAfrica)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1984, $elm$time$Time$Mar, 16, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1986, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$africa__conakry = $justinmimbs$timezone_data$TimeZone$africa__abidjan;
var $justinmimbs$timezone_data$TimeZone$africa__dakar = $justinmimbs$timezone_data$TimeZone$africa__abidjan;
var $justinmimbs$timezone_data$TimeZone$africa__dar_es_salaam = $justinmimbs$timezone_data$TimeZone$africa__nairobi;
var $justinmimbs$timezone_data$TimeZone$africa__djibouti = $justinmimbs$timezone_data$TimeZone$africa__nairobi;
var $justinmimbs$timezone_data$TimeZone$africa__douala = $justinmimbs$timezone_data$TimeZone$africa__lagos;
var $justinmimbs$timezone_data$TimeZone$africa__el_aaiun = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1976, $elm$time$Time$Apr, 14, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Morocco)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2018, $elm$time$Time$Oct, 28, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Morocco))));
};
var $justinmimbs$timezone_data$TimeZone$africa__freetown = $justinmimbs$timezone_data$TimeZone$africa__abidjan;
var $justinmimbs$timezone_data$TimeZone$africa__gaborone = $justinmimbs$timezone_data$TimeZone$africa__maputo;
var $justinmimbs$timezone_data$TimeZone$africa__harare = $justinmimbs$timezone_data$TimeZone$africa__maputo;
var $justinmimbs$timezone_data$TimeZone$africa__johannesburg = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Sudan = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1970,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1985,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1971,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1985,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$africa__juba = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Sudan)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Jan, 15, 720, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__kampala = $justinmimbs$timezone_data$TimeZone$africa__nairobi;
var $justinmimbs$timezone_data$TimeZone$africa__khartoum = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Sudan)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Jan, 15, 720, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2017, $elm$time$Time$Nov, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__kigali = $justinmimbs$timezone_data$TimeZone$africa__maputo;
var $justinmimbs$timezone_data$TimeZone$africa__kinshasa = $justinmimbs$timezone_data$TimeZone$africa__lagos;
var $justinmimbs$timezone_data$TimeZone$africa__libreville = $justinmimbs$timezone_data$TimeZone$africa__lagos;
var $justinmimbs$timezone_data$TimeZone$africa__lome = $justinmimbs$timezone_data$TimeZone$africa__abidjan;
var $justinmimbs$timezone_data$TimeZone$africa__luanda = $justinmimbs$timezone_data$TimeZone$africa__lagos;
var $justinmimbs$timezone_data$TimeZone$africa__lubumbashi = $justinmimbs$timezone_data$TimeZone$africa__maputo;
var $justinmimbs$timezone_data$TimeZone$africa__lusaka = $justinmimbs$timezone_data$TimeZone$africa__maputo;
var $justinmimbs$timezone_data$TimeZone$africa__malabo = $justinmimbs$timezone_data$TimeZone$africa__lagos;
var $justinmimbs$timezone_data$TimeZone$africa__maseru = $justinmimbs$timezone_data$TimeZone$africa__johannesburg;
var $justinmimbs$timezone_data$TimeZone$africa__mbabane = $justinmimbs$timezone_data$TimeZone$africa__johannesburg;
var $justinmimbs$timezone_data$TimeZone$africa__mogadishu = $justinmimbs$timezone_data$TimeZone$africa__nairobi;
var $justinmimbs$timezone_data$TimeZone$africa__monrovia = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-45,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1972, $elm$time$Time$Jan, 7, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__ndjamena = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Oct, 14, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Mar, 8, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$africa__niamey = $justinmimbs$timezone_data$TimeZone$africa__lagos;
var $justinmimbs$timezone_data$TimeZone$africa__nouakchott = $justinmimbs$timezone_data$TimeZone$africa__abidjan;
var $justinmimbs$timezone_data$TimeZone$africa__ouagadougou = $justinmimbs$timezone_data$TimeZone$africa__abidjan;
var $justinmimbs$timezone_data$TimeZone$africa__porto_novo = $justinmimbs$timezone_data$TimeZone$africa__lagos;
var $justinmimbs$timezone_data$TimeZone$africa__sao_tome = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2018, $elm$time$Time$Jan, 1, 60, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2019, $elm$time$Time$Jan, 1, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Libya = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1984,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1985,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1985,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1989,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1989,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1997,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1997,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		2013,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		2013,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$africa__tripoli = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Libya)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$May, 4, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Sep, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Libya)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Oct, 4, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2012, $elm$time$Time$Nov, 10, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Libya)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2013, $elm$time$Time$Oct, 25, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Tunisia = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1990,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2008,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2008,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$africa__tunis = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Tunisia))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Namibia = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1994,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		2017,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1995,
		2017,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		-60)
	]);
var $justinmimbs$timezone_data$TimeZone$africa__windhoek = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Mar, 21, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Namibia))));
};
var $justinmimbs$timezone_data$TimeZone$rules_US = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1967,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1967,
		1973,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1986,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__adak = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Oct, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Nov, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-600,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__anchorage = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Oct, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Nov, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-540,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__port_of_spain = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__anguilla = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$america__antigua = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$rules_Brazil = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1985,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1987,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1987,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(11),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(17),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(9),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1993,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1995,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 11),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1995,
		$elm$time$Time$Feb,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		1996,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(11),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		1996,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1997,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1997,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1998,
		1998,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1998,
		1998,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(11),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		1999,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		1999,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2001,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2006,
		$elm$time$Time$Feb,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		2002,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2003,
		2003,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		2004,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2017,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2011,
		$elm$time$Time$Feb,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2012,
		$elm$time$Time$Feb,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		2014,
		$elm$time$Time$Feb,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2015,
		2015,
		$elm$time$Time$Feb,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2016,
		2019,
		$elm$time$Time$Feb,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2018,
		2018,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$america__araguaina = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Sep, 17, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1995, $elm$time$Time$Sep, 14, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2003, $elm$time$Time$Sep, 24, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2012, $elm$time$Time$Oct, 21, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2013, $elm$time$Time$Sep, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Arg = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1968,
		1969,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(23),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1993,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1992,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		1999,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2009,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$america__argentina__buenos_aires = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg))));
};
var $justinmimbs$timezone_data$TimeZone$america__argentina__catamarca = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Oct, 20, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jun, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jun, 20, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Oct, 18, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__argentina__cordoba = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Oct, 20, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg))));
};
var $justinmimbs$timezone_data$TimeZone$america__argentina__jujuy = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Mar, 4, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Oct, 28, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 17, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Oct, 6, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Oct, 18, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__argentina__la_rioja = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$May, 7, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jun, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jun, 20, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Oct, 18, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__argentina__mendoza = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Mar, 4, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Oct, 15, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Oct, 15, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Mar, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Oct, 18, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$May, 23, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Sep, 26, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Oct, 18, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__argentina__rio_gallegos = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jun, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jun, 20, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Oct, 18, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__argentina__salta = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Oct, 20, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Oct, 18, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__argentina__san_juan = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$May, 7, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$May, 31, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jul, 25, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Oct, 18, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_SanLuis = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2009,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2008,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$america__argentina__san_luis = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Mar, 14, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Oct, 15, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Jun, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$May, 31, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jul, 25, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Jan, 21, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_SanLuis)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2009, $elm$time$Time$Oct, 11, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__argentina__tucuman = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Oct, 20, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jun, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jun, 13, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg))));
};
var $justinmimbs$timezone_data$TimeZone$america__argentina__ushuaia = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Mar, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$May, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jun, 20, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Oct, 18, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__curacao = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__aruba = $justinmimbs$timezone_data$TimeZone$america__curacao;
var $justinmimbs$timezone_data$TimeZone$rules_Para = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1988,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1978,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1991,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1993,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1995,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1995,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		1996,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		2001,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1997,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1998,
		2001,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		2004,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		2003,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		2009,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2009,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2012,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__asuncion = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1972, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Para))));
};
var $justinmimbs$timezone_data$TimeZone$america__atikokan = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__bahia = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2003, $elm$time$Time$Sep, 24, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Oct, 16, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2012, $elm$time$Time$Oct, 21, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Mexico = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		2000,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		2000,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2001,
		$elm$time$Time$May,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2001,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__bahia_banderas = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1970, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Apr, 4, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Barb = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(12),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1978,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1980,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__barbados = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Barb))));
};
var $justinmimbs$timezone_data$TimeZone$america__belem = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Sep, 12, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Belize = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(9),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1982,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(18),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(12),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__belize = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Belize))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Canada = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1986,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__blanc_sablon = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1970, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__boa_vista = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Sep, 12, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Sep, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 15, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_CO = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1993,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__bogota = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_CO))));
};
var $justinmimbs$timezone_data$TimeZone$america__boise = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Feb, 3, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$rules_NT_YK = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1986,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$america__cambridge_bay = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Nov, 5, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2001, $elm$time$Time$Apr, 1, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__campo_grande = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil))));
};
var $justinmimbs$timezone_data$TimeZone$america__cancun = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Dec, 23, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Aug, 2, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2015, $elm$time$Time$Feb, 1, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__caracas = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2007, $elm$time$Time$Dec, 9, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-270,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$May, 1, 150, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__cayenne = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__panama = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__cayman = $justinmimbs$timezone_data$TimeZone$america__panama;
var $justinmimbs$timezone_data$TimeZone$america__chicago = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__chihuahua = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Apr, 5, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico))));
};
var $elm$time$Time$Sat = {$: 'Sat'};
var $justinmimbs$timezone_data$TimeZone$rules_CR = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1980,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1980,
		$elm$time$Time$Jun,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1992,
		$elm$time$Time$Jan,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sat, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__costa_rica = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_CR))));
};
var $justinmimbs$timezone_data$TimeZone$america__creston = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__cuiaba = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2003, $elm$time$Time$Sep, 24, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil))));
};
var $justinmimbs$timezone_data$TimeZone$america__danmarkshavn = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Apr, 6, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__dawson = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1973, $elm$time$Time$Oct, 28, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Vanc = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1946,
		1986,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1962,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__dawson_creek = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Vanc)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1972, $elm$time$Time$Aug, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__denver = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__detroit = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1973, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1975, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1975, $elm$time$Time$Apr, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__dominica = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$rules_Edm = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1986,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__edmonton = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Edm)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1987, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__eirunepe = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Sep, 12, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1993, $elm$time$Time$Sep, 28, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1994, $elm$time$Time$Sep, 22, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Jun, 24, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2013, $elm$time$Time$Nov, 10, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Salv = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1988,
		$elm$time$Time$May,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1988,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__el_salvador = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Salv))));
};
var $justinmimbs$timezone_data$TimeZone$america__fort_nelson = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Vanc)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1987, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2015, $elm$time$Time$Mar, 8, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__fortaleza = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Sep, 17, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Sep, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 22, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2001, $elm$time$Time$Sep, 13, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2002, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Halifax = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1962,
		1973,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1962,
		1973,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__glace_bay = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1972, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Halifax)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__godthab = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Apr, 6, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$rules_StJohns = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1951,
		1986,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1960,
		1986,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1987,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		1,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		1,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		1,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		120),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		1,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2011,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		1,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2010,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		1,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__goose_bay = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_StJohns)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Nov, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__grand_turk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2015, $elm$time$Time$Nov, 1, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2018, $elm$time$Time$Mar, 11, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__grenada = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$america__guadeloupe = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$rules_Guat = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(23),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__guatemala = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Guat))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Ecuador = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1993,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__guayaquil = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Ecuador))));
};
var $justinmimbs$timezone_data$TimeZone$america__guyana = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-225,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1975, $elm$time$Time$Jul, 31, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__halifax = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Halifax)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Cuba = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1969,
		1977,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1969,
		1971,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1974,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1977,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1990,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1980,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1985,
		$elm$time$Time$May,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 5),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1989,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 14),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1997,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1995,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		1996,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1997,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(12),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1998,
		1999,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1998,
		2003,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2003,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		2004,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2010,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2010,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(13),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2012,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$america__havana = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Cuba))));
};
var $justinmimbs$timezone_data$TimeZone$america__hermosillo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1970, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__indiana__indianapolis = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__indiana__knox = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Oct, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Apr, 2, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__indiana__marengo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Jan, 6, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Oct, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1976, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__indiana__petersburg = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1977, $elm$time$Time$Oct, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Apr, 2, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2007, $elm$time$Time$Nov, 4, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__indiana__tell_city = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Apr, 2, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__indiana__vevay = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1973, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__indiana__vincennes = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Apr, 2, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2007, $elm$time$Time$Nov, 4, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__indiana__winamac = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Apr, 2, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2007, $elm$time$Time$Mar, 11, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__inuvik = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Apr, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__iqaluit = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__jamaica = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1984, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__juneau = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Apr, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Oct, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Nov, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-540,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__kentucky__louisville = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Jan, 6, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Oct, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__kentucky__monticello = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__kralendijk = $justinmimbs$timezone_data$TimeZone$america__curacao;
var $justinmimbs$timezone_data$TimeZone$america__la_paz = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Peru = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1987,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1987,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1994,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1994,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__lima = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Peru))));
};
var $justinmimbs$timezone_data$TimeZone$america__los_angeles = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__lower_princes = $justinmimbs$timezone_data$TimeZone$america__curacao;
var $justinmimbs$timezone_data$TimeZone$america__maceio = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Sep, 17, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1995, $elm$time$Time$Oct, 13, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Sep, 4, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Sep, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 22, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2001, $elm$time$Time$Sep, 13, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2002, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $elm$time$Time$Mon = {$: 'Mon'};
var $justinmimbs$timezone_data$TimeZone$rules_Nic = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1980,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1980,
		$elm$time$Time$Jun,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Mon, 23),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__managua = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1973, $elm$time$Time$May, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1975, $elm$time$Time$Feb, 16, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Nic)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 1, 240, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Sep, 24, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1993, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Nic))));
};
var $justinmimbs$timezone_data$TimeZone$america__manaus = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Sep, 12, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1993, $elm$time$Time$Sep, 28, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1994, $elm$time$Time$Sep, 22, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__marigot = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$america__martinique = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Apr, 6, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Sep, 28, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__matamoros = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__mazatlan = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1970, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico))));
};
var $justinmimbs$timezone_data$TimeZone$america__menominee = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1973, $elm$time$Time$Apr, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__merida = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Dec, 23, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Dec, 2, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico))));
};
var $justinmimbs$timezone_data$TimeZone$america__metlakatla = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Oct, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2015, $elm$time$Time$Nov, 1, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2018, $elm$time$Time$Nov, 4, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2019, $elm$time$Time$Jan, 20, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-540,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__mexico_city = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2001, $elm$time$Time$Sep, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2002, $elm$time$Time$Feb, 20, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico))));
};
var $justinmimbs$timezone_data$TimeZone$america__miquelon = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$May, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1987, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Moncton = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1946,
		1972,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1957,
		1972,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		1,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		1,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__moncton = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Moncton)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1973, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1993, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Moncton)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2007, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__monterrey = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Uruguay = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1970,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1970,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1972,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(23),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1972,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(13),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		90),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		30),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1979,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(17),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1987,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(11),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1991,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1992,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(18),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1993,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		2004,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(9),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2015,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2014,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$america__montevideo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Uruguay)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1970, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Uruguay)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Uruguay)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Mar, 10, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Uruguay)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Dec, 22, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Uruguay))));
};
var $justinmimbs$timezone_data$TimeZone$america__montserrat = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$rules_Bahamas = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1964,
		1975,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1964,
		1975,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$america__nassau = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Bahamas)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1976, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__new_york = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__nipigon = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__nome = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Oct, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Nov, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-540,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__noronha = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Sep, 17, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Sep, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 15, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2001, $elm$time$Time$Sep, 13, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2002, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-120,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__north_dakota__beulah = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Nov, 7, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__north_dakota__center = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Oct, 25, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__north_dakota__new_salem = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2003, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__ojinaga = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Apr, 5, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__pangnirtung = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1995, $elm$time$Time$Apr, 2, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__paramaribo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-210,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1984, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__phoenix = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Haiti = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1987,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1987,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1997,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1997,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2015,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2015,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2017,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2017,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__port_au_prince = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Haiti))));
};
var $justinmimbs$timezone_data$TimeZone$america__porto_velho = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Sep, 12, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__puerto_rico = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Chile = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1969,
		1969,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1969,
		1969,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(23),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1970,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1971,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1972,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1986,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1987,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1987,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(12),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1990,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1989,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1996,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1997,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1997,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1998,
		1998,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1998,
		1998,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		1999,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		2010,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2007,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$May,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 2),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Aug,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2014,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 23),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2014,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 2),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2016,
		2018,
		$elm$time$Time$May,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2016,
		2018,
		$elm$time$Time$Aug,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2019,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 2),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2019,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 2),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$america__punta_arenas = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Chile)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Dec, 4, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__rainy_river = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__rankin_inlet = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2001, $elm$time$Time$Apr, 1, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__recife = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Sep, 17, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Sep, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 15, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2001, $elm$time$Time$Sep, 13, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2002, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__regina = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__resolute = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2001, $elm$time$Time$Apr, 1, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Oct, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2007, $elm$time$Time$Mar, 11, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__rio_branco = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Sep, 12, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Jun, 24, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2013, $elm$time$Time$Nov, 10, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__santarem = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Sep, 12, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Jun, 24, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__santiago = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Chile))));
};
var $justinmimbs$timezone_data$TimeZone$rules_DR = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1969,
		1973,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		30),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1970,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1971,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1974,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__santo_domingo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_DR)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Oct, 27, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Oct, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Dec, 3, 60, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$america__sao_paulo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Brazil))));
};
var $justinmimbs$timezone_data$TimeZone$rules_C_Eur = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1980,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__scoresbysund = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Apr, 6, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_C_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Mar, 29, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$america__sitka = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Oct, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Nov, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-540,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__st_barthelemy = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$america__st_johns = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-210,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_StJohns)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Nov, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-210,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__st_kitts = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$america__st_lucia = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$america__st_thomas = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$america__st_vincent = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$america__swift_current = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1972, $elm$time$Time$Apr, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Hond = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1988,
		$elm$time$Time$May,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1988,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$May,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Aug,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Mon, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__tegucigalpa = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Hond))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Thule = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1992,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1992,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__thule = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Thule))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Toronto = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1950,
		1973,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1957,
		1973,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$america__thunder_bay = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1970, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Toronto)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1973, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__tijuana = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1976, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2001, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2002, $elm$time$Time$Feb, 20, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mexico)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__toronto = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Toronto)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__tortola = $justinmimbs$timezone_data$TimeZone$america__port_of_spain;
var $justinmimbs$timezone_data$TimeZone$america__vancouver = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Vanc)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1987, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__whitehorse = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Winn = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1966,
		1986,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1966,
		2005,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		2005,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$america__winnipeg = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Winn)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$america__yakutat = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Nov, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-540,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$america__yellowknife = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NT_YK)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-420,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada))));
};
var $justinmimbs$timezone_data$TimeZone$antarctica__casey = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2009, $elm$time$Time$Oct, 18, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Mar, 5, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Oct, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2012, $elm$time$Time$Feb, 21, 1020, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Oct, 22, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2018, $elm$time$Time$Mar, 11, 240, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$antarctica__davis = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2009, $elm$time$Time$Oct, 18, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Mar, 10, 1200, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Oct, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2012, $elm$time$Time$Feb, 21, 1200, $justinmimbs$timezone_data$TimeZone$Specification$Universal))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$antarctica__dumontdurville = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_AT = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1968,
		1985,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1969,
		1971,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1972,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1981,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1983,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1986,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1990,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1987,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 22),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1990,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1999,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		2005,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$antarctica__macquarie = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AT)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Apr, 4, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$antarctica__mawson = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2009, $elm$time$Time$Oct, 18, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_NZ = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1988,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1989,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		2006,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		2007,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$pacific__auckland = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NZ))));
};
var $justinmimbs$timezone_data$TimeZone$antarctica__mcmurdo = $justinmimbs$timezone_data$TimeZone$pacific__auckland;
var $justinmimbs$timezone_data$TimeZone$antarctica__palmer = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Arg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$May, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Chile)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Dec, 4, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$antarctica__rothera = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1976, $elm$time$Time$Dec, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$antarctica__syowa = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Troll = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		120),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$antarctica__troll = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2005, $elm$time$Time$Feb, 12, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Troll))));
};
var $justinmimbs$timezone_data$TimeZone$antarctica__vostok = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				360,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$europe__oslo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$arctic__longyearbyen = $justinmimbs$timezone_data$TimeZone$europe__oslo;
var $justinmimbs$timezone_data$TimeZone$asia__riyadh = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__aden = $justinmimbs$timezone_data$TimeZone$asia__riyadh;
var $justinmimbs$timezone_data$TimeZone$rules_RussiaAsia = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1984,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1983,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		2010,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		2010,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__almaty = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				360,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Jordan = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1975,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1977,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1985,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1985,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1988,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1990,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(17),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1993,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1998,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1994,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1995,
		1998,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		1999,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		2002,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2001,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Thu),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		2012,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Thu),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2003,
		2003,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		2004,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2011,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		2013,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Thu),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__amman = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Jordan))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Russia = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1984,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1983,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		2010,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		2010,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__anadyr = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						780,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						720,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						720,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Mar, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__aqtau = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1994, $elm$time$Time$Sep, 25, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__aqtobe = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__ashgabat = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__atyrau = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Mar, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Iraq = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1982,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1984,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1985,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1990,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1990,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		2007,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		2007,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__baghdad = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$May, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Iraq))));
};
var $justinmimbs$timezone_data$TimeZone$asia__qatar = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1972, $elm$time$Time$Jun, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__bahrain = $justinmimbs$timezone_data$TimeZone$asia__qatar;
var $justinmimbs$timezone_data$TimeZone$rules_Azer = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		2015,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		2015,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		300,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$rules_EUAsia = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__baku = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Sep, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EUAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Azer))));
};
var $justinmimbs$timezone_data$TimeZone$asia__bangkok = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__barnaul = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1995, $elm$time$Time$May, 28, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Lebanon = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1972,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1977,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1977,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1987,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1991,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1992,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1998,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__beirut = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Lebanon))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Kyrgyz = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1996,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 7),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1996,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		2005,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		150,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		2004,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		150,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__bishkek = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Aug, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Kyrgyz)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2005, $elm$time$Time$Aug, 12, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				360,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__brunei = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__chita = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				540,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Mongol = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1984,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1998,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1998,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2001,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sat),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2006,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sat),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		2006,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sat),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2015,
		2016,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sat),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2015,
		2016,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sat),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__choibalsan = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1978, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mongol)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Mar, 31, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mongol))));
};
var $justinmimbs$timezone_data$TimeZone$asia__colombo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						330,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$May, 25, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						390,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Oct, 26, 30, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2006, $elm$time$Time$Apr, 15, 30, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				330,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Syria = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1966,
		1976,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1967,
		1978,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1978,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1984,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(9),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1984,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(9),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1987,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1988,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1992,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1993,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1993,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1996,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		2005,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1998,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Mon),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		2006,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2011,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__damascus = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Syria))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Dhaka = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		1380,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__dhaka = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2009, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Dhaka))));
};
var $justinmimbs$timezone_data$TimeZone$asia__dili = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1976, $elm$time$Time$May, 3, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Sep, 17, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				540,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__dubai = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__dushanbe = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Sep, 9, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Cyprus = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(13),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(12),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(11),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1980,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1997,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1998,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__famagusta = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Cyprus)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Sep, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EUAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Sep, 8, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2017, $elm$time$Time$Oct, 29, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EUAsia))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Palestine = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		2005,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		2003,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		2004,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2007,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Thu, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2009,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(11),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		1,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2014,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Thu),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2012,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		2013,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		2015,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2015,
		2015,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2016,
		2018,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sat, 24),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2016,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sat),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2019,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Fri),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$Specification$Prev = F2(
	function (a, b) {
		return {$: 'Prev', a: a, b: b};
	});
var $justinmimbs$timezone_data$TimeZone$rules_Zion = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(13),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(13),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1984,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1984,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1985,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1985,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(18),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1987,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1987,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(13),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1988,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1990,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1993,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1993,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1994,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1994,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1995,
		1995,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1995,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		1996,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		1996,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1997,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1997,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1998,
		1998,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1998,
		1998,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		1999,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		1999,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(14),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2001,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(9),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2001,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		2002,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		2002,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2003,
		2003,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2003,
		2003,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		2004,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		2004,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2012,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Prev, $elm$time$Time$Fri, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(9),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(12),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2012,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(23),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Fri, 23),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__gaza = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Zion)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Jordan)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Palestine)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Aug, 29, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2008, $elm$time$Time$Sep, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Palestine)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Mar, 27, 1, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Palestine)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Aug, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2012, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Palestine))));
};
var $justinmimbs$timezone_data$TimeZone$asia__hebron = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Zion)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Jordan)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Palestine))));
};
var $justinmimbs$timezone_data$TimeZone$asia__ho_chi_minh = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1975, $elm$time$Time$Jun, 13, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_HK = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1965,
		1976,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1965,
		1976,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(13),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__hong_kong = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_HK))));
};
var $justinmimbs$timezone_data$TimeZone$asia__hovd = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1978, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mongol))));
};
var $justinmimbs$timezone_data$TimeZone$asia__irkutsk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Turkey = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1976,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 31),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1978,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1978,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1985,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1985,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1993,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1994,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1995,
		2006,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		2006,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__istanbul = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Turkey)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1978, $elm$time$Time$Jun, 29, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Turkey)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1984, $elm$time$Time$Nov, 1, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Turkey)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2007, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 28, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Mar, 30, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Mar, 31, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2015, $elm$time$Time$Oct, 25, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2015, $elm$time$Time$Nov, 8, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Sep, 7, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__istanbul = $justinmimbs$timezone_data$TimeZone$europe__istanbul;
var $justinmimbs$timezone_data$TimeZone$asia__jakarta = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__jayapura = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				540,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__jerusalem = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Zion))));
};
var $justinmimbs$timezone_data$TimeZone$asia__kabul = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				270,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__kamchatka = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						720,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						720,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Mar, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Pakistan = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		2002,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2002,
		2002,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2009,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(15),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__karachi = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Mar, 26, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Pakistan))));
};
var $justinmimbs$timezone_data$TimeZone$asia__kathmandu = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						330,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1986, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				345,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__khandyga = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Sep, 13, 0, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				540,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__kolkata = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				330,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__krasnoyarsk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__kuala_lumpur = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						450,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__kuching = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__kuwait = $justinmimbs$timezone_data$TimeZone$asia__riyadh;
var $justinmimbs$timezone_data$TimeZone$rules_Macau = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1965,
		1973,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1967,
		1976,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1976,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(13),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		210,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__macau = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Macau))));
};
var $justinmimbs$timezone_data$TimeZone$asia__magadan = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						720,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Apr, 24, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__makassar = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Phil = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__manila = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Phil))));
};
var $justinmimbs$timezone_data$TimeZone$asia__muscat = $justinmimbs$timezone_data$TimeZone$asia__dubai;
var $justinmimbs$timezone_data$TimeZone$asia__nicosia = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Cyprus)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Sep, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EUAsia))));
};
var $justinmimbs$timezone_data$TimeZone$asia__novokuznetsk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Mar, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__novosibirsk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1993, $elm$time$Time$May, 23, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Jul, 24, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__omsk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				360,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__oral = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Mar, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Mar, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__phnom_penh = $justinmimbs$timezone_data$TimeZone$asia__bangkok;
var $justinmimbs$timezone_data$TimeZone$asia__pontianak = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__pyongyang = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2015, $elm$time$Time$Aug, 15, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						510,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2018, $elm$time$Time$May, 4, 1410, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				540,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__qostanay = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				360,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__qyzylorda = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Sep, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Mar, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2018, $elm$time$Time$Dec, 21, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__sakhalin = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Mar, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__samarkand = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_ROK = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1988,
		$elm$time$Time$May,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1988,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__seoul = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				540,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_ROK))));
};
var $justinmimbs$timezone_data$TimeZone$rules_PRC = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1991,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 11),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1991,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 11),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__shanghai = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_PRC))));
};
var $justinmimbs$timezone_data$TimeZone$asia__singapore = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						450,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__srednekolymsk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						720,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Taiwan = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1975,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1975,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Jul,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__taipei = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Taiwan))));
};
var $justinmimbs$timezone_data$TimeZone$asia__tashkent = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_E_EurAsia = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__tbilisi = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_EurAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1994, $elm$time$Time$Sep, 25, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_EurAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Oct, 27, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Mar, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_EurAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2004, $elm$time$Time$Jun, 27, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2005, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Iran = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1980,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(18),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1995,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		1996,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		1996,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1999,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1999,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2003,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2003,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		2004,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2004,
		2004,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2005,
		2005,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2011,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2011,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2012,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2012,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		2015,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2013,
		2015,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2016,
		2016,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2016,
		2016,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2017,
		2019,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2017,
		2019,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2020,
		2020,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2020,
		2020,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2021,
		2023,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2021,
		2023,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2024,
		2024,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2024,
		2024,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2025,
		2027,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2025,
		2027,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2028,
		2029,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2028,
		2029,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2030,
		2031,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2030,
		2031,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2032,
		2033,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2032,
		2033,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2034,
		2035,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2034,
		2035,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2036,
		2037,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2036,
		2037,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		1440,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__tehran = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						210,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1977, $elm$time$Time$Nov, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Iran)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				210,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Iran))));
};
var $justinmimbs$timezone_data$TimeZone$asia__thimphu = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						330,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1987, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				360,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__tokyo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				540,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__tomsk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2002, $elm$time$Time$May, 1, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$May, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__ulaanbaatar = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						420,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1978, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mongol))));
};
var $justinmimbs$timezone_data$TimeZone$asia__urumqi = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				360,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__ust_nera = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Apr, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						720,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Sep, 13, 0, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__vientiane = $justinmimbs$timezone_data$TimeZone$asia__bangkok;
var $justinmimbs$timezone_data$TimeZone$asia__vladivostok = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__yakutsk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						480,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						540,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				540,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__yangon = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				390,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$asia__yekaterinburg = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						360,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Armenia = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$asia__yerevan = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1995, $elm$time$Time$Sep, 24, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_RussiaAsia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Armenia))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Port = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1979,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1982,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1982,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$rules_W_Eur = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1980,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$atlantic__azores = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Port)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Sep, 25, 60, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_W_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Sep, 27, 60, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1993, $elm$time$Time$Mar, 28, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$atlantic__bermuda = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Apr, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Canada)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1976, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_US))));
};
var $justinmimbs$timezone_data$TimeZone$atlantic__canary = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Apr, 6, 0, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Sep, 28, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$atlantic__cape_verde = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1975, $elm$time$Time$Nov, 25, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-60,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$atlantic__faroe = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$atlantic__madeira = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Port)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Sep, 25, 60, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$atlantic__reykjavik = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$atlantic__south_georgia = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-120,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$atlantic__st_helena = $justinmimbs$timezone_data$TimeZone$africa__abidjan;
var $justinmimbs$timezone_data$TimeZone$rules_Falk = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1985,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1984,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		2000,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 9),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		2000,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2010,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2010,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$atlantic__stanley = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Falk)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$May, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Falk)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1985, $elm$time$Time$Sep, 15, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Falk)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Sep, 5, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_AS = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1985,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		2007,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1972,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1985,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1990,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1993,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1994,
		1994,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(20),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1995,
		2005,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$australia__adelaide = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						570,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				570,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AS))));
};
var $justinmimbs$timezone_data$TimeZone$rules_AQ = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1971,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1972,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1991,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1992,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$australia__brisbane = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AQ))));
};
var $justinmimbs$timezone_data$TimeZone$rules_AN = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1985,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1972,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1981,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1982,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1985,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1989,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1999,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1995,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		2005,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2007,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$australia__broken_hill = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						570,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						570,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AN)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				570,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AS))));
};
var $justinmimbs$timezone_data$TimeZone$australia__currie = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jul, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AT))));
};
var $justinmimbs$timezone_data$TimeZone$australia__darwin = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				570,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_AW = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1984,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1991,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(17),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2009,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2008,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$australia__eucla = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				525,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AW))));
};
var $justinmimbs$timezone_data$TimeZone$australia__hobart = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AT))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Holiday = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1993,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1993,
		1994,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$australia__lindeman = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AQ)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jul, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Holiday))));
};
var $justinmimbs$timezone_data$TimeZone$rules_LH = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1984,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1985,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1985,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		30),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1989,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1986,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		30),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1987,
		1999,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		30),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1995,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		2005,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		30),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2007,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		30),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		30)
	]);
var $justinmimbs$timezone_data$TimeZone$australia__lord_howe = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Mar, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						630,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_LH)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1985, $elm$time$Time$Jul, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				630,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_LH))));
};
var $justinmimbs$timezone_data$TimeZone$rules_AV = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1985,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1972,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1985,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1990,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1986,
		1987,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1988,
		1999,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1994,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1995,
		2005,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2007,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2006,
		2006,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		2007,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$australia__melbourne = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AV))));
};
var $justinmimbs$timezone_data$TimeZone$australia__perth = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				480,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AW))));
};
var $justinmimbs$timezone_data$TimeZone$australia__sydney = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AN))));
};
var $justinmimbs$timezone_data$TimeZone$europe__amsterdam = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1977, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__andorra = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1985, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__astrakhan = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Mar, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Mar, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Greece = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(12),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(11),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1978,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		540,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__athens = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Greece)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__belgrade = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Nov, 27, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__berlin = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__prague = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__bratislava = $justinmimbs$timezone_data$TimeZone$europe__prague;
var $justinmimbs$timezone_data$TimeZone$europe__brussels = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1977, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$rules_E_Eur = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1980,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1995,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$rules_Romania = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		1380,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1993,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1991,
		1993,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__bucharest = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Romania)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Mar, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_C_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Romania)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1994, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Hungary = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__budapest = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Hungary)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Sep, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__zurich = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__busingen = $justinmimbs$timezone_data$TimeZone$europe__zurich;
var $justinmimbs$timezone_data$TimeZone$rules_Moldova = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__chisinau = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$May, 6, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Moldova))));
};
var $justinmimbs$timezone_data$TimeZone$europe__copenhagen = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Eire = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1971,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1980,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1980,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 23),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1989,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 23),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1995,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 22),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		-60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		-60)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__dublin = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Eire))));
};
var $justinmimbs$timezone_data$TimeZone$europe__gibraltar = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$rules_GB_Eire = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1980,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 16),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1980,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 23),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1995,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1989,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 23),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		1995,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 22),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$Universal,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__london = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1971, $elm$time$Time$Oct, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_GB_Eire)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__guernsey = $justinmimbs$timezone_data$TimeZone$europe__london;
var $justinmimbs$timezone_data$TimeZone$rules_Finland = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1982,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1982,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__helsinki = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Finland)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__isle_of_man = $justinmimbs$timezone_data$TimeZone$europe__london;
var $justinmimbs$timezone_data$TimeZone$europe__jersey = $justinmimbs$timezone_data$TimeZone$europe__london;
var $justinmimbs$timezone_data$TimeZone$europe__kaliningrad = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Mar, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$europe__kiev = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Jul, 1, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Sep, 29, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1995, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__kirov = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Mar, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Mar, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$europe__lisbon = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1976, $elm$time$Time$Sep, 26, 60, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Port)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1983, $elm$time$Time$Sep, 25, 60, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						0,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_W_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Sep, 27, 60, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Mar, 31, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				0,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__ljubljana = $justinmimbs$timezone_data$TimeZone$europe__belgrade;
var $justinmimbs$timezone_data$TimeZone$europe__luxembourg = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1977, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Spain = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1975,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sat, 12),
		1380,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1975,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		1380,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		1380,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__madrid = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Spain)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Italy = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1967,
		1969,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1969,
		1969,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1970,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1970,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1972,
		$elm$time$Time$May,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1971,
		1971,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1972,
		1972,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1974,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1977,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1979,
		$elm$time$Time$May,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 22),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$rules_Malta = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1979,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1980,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__malta = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Italy)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1973, $elm$time$Time$Mar, 31, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Malta)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__mariehamn = $justinmimbs$timezone_data$TimeZone$europe__helsinki;
var $justinmimbs$timezone_data$TimeZone$europe__minsk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_France = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__monaco = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_France)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1977, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__moscow = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$europe__nicosia = $justinmimbs$timezone_data$TimeZone$asia__nicosia;
var $justinmimbs$timezone_data$TimeZone$europe__paris = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_France)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1977, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__podgorica = $justinmimbs$timezone_data$TimeZone$europe__belgrade;
var $justinmimbs$timezone_data$TimeZone$rules_Latvia = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1996,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1996,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__riga = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Mar, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Sep, 24, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Latvia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Jan, 21, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Feb, 29, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2001, $elm$time$Time$Jan, 2, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__rome = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Italy)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__samara = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Mar, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Sep, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Oct, 20, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2010, $elm$time$Time$Mar, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$europe__san_marino = $justinmimbs$timezone_data$TimeZone$europe__rome;
var $justinmimbs$timezone_data$TimeZone$europe__sarajevo = $justinmimbs$timezone_data$TimeZone$europe__belgrade;
var $justinmimbs$timezone_data$TimeZone$europe__saratov = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Mar, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Dec, 4, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$europe__simferopol = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Jul, 1, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1994, $elm$time$Time$May, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Mar, 31, 0, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Oct, 27, 180, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Mar, 30, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Mar, 30, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				180,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$europe__skopje = $justinmimbs$timezone_data$TimeZone$europe__belgrade;
var $justinmimbs$timezone_data$TimeZone$rules_Bulg = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		1380,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1982,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sat, 1),
		1380,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		60,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1981,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__sofia = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Mar, 31, 1380, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Bulg)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Sep, 26, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_C_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1997, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__stockholm = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1980, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__tallinn = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Mar, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Sep, 24, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_C_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Sep, 22, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 31, 240, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2002, $elm$time$Time$Feb, 21, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Albania = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(8),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(5),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1979,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(30),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(4),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1981,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1981,
		1981,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1982,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1982,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(3),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(18),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1984,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__tirane = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Albania)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1984, $elm$time$Time$Jul, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__ulyanovsk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Mar, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 19, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2016, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$europe__uzhgorod = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1990, $elm$time$Time$Jul, 1, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 180, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1995, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__vaduz = $justinmimbs$timezone_data$TimeZone$europe__zurich;
var $justinmimbs$timezone_data$TimeZone$europe__vatican = $justinmimbs$timezone_data$TimeZone$europe__rome;
var $justinmimbs$timezone_data$TimeZone$rules_Austria = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(6),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1980,
		1980,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$europe__vienna = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Austria)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1981, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__vilnius = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1989, $elm$time$Time$Mar, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Sep, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_C_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Mar, 29, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Oct, 31, 60, $justinmimbs$timezone_data$TimeZone$Specification$Universal)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2003, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__volgograd = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1992, $elm$time$Time$Mar, 29, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Mar, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						240,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Oct, 26, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2018, $elm$time$Time$Oct, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$europe__warsaw = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1977, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						60,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_W_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1988, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				60,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $justinmimbs$timezone_data$TimeZone$europe__zagreb = $justinmimbs$timezone_data$TimeZone$europe__belgrade;
var $justinmimbs$timezone_data$TimeZone$europe__zaporozhye = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						180,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Russia)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1991, $elm$time$Time$Mar, 31, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						120,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_E_Eur)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1995, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				120,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_EU))));
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $justinmimbs$timezone_data$TimeZone$indian__antananarivo = $justinmimbs$timezone_data$TimeZone$africa__nairobi;
var $justinmimbs$timezone_data$TimeZone$indian__chagos = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1996, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				360,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$indian__christmas = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				420,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$indian__cocos = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				390,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$indian__comoro = $justinmimbs$timezone_data$TimeZone$africa__nairobi;
var $justinmimbs$timezone_data$TimeZone$indian__kerguelen = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$indian__mahe = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$indian__maldives = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				300,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Mauritius = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1982,
		1982,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(10),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(21),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		2008,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$indian__mauritius = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Mauritius))));
};
var $justinmimbs$timezone_data$TimeZone$indian__mayotte = $justinmimbs$timezone_data$TimeZone$africa__nairobi;
var $justinmimbs$timezone_data$TimeZone$indian__reunion = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				240,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_WS = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sat, 1),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sat),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		240,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$pacific__apia = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-660,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_WS)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Dec, 29, 1440, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				780,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_WS))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__bougainville = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2014, $elm$time$Time$Dec, 28, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Chatham = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		165,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1975,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		165,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1975,
		1988,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		165,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1989,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		165,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1989,
		1989,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		165,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		2006,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		165,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1990,
		2007,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		165,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2007,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		165,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2008,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Apr,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		165,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$pacific__chatham = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				765,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Chatham))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__chuuk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__easter = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-420,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Chile)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1982, $elm$time$Time$Mar, 14, 180, $justinmimbs$timezone_data$TimeZone$Specification$Universal))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Chile))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Vanuatu = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1983,
		1983,
		$elm$time$Time$Sep,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(25),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1991,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 23),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1984,
		1984,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(23),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1985,
		1991,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 23),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1993,
		$elm$time$Time$Jan,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 23),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1992,
		1992,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 23),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$pacific__efate = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Vanuatu))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__enderbury = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-720,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-660,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1994, $elm$time$Time$Dec, 31, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				780,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__fakaofo = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-660,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2011, $elm$time$Time$Dec, 30, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				780,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Fiji = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1998,
		1999,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		2000,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2009,
		2009,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(29),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2010,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2010,
		2013,
		$elm$time$Time$Oct,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 21),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2011,
		2011,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2012,
		2013,
		$elm$time$Time$Jan,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 18),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		2014,
		$elm$time$Time$Jan,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 18),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2014,
		2018,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2015,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Jan,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 12),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2019,
		$justinmimbs$timezone_data$TimeZone$maxYear,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 8),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60)
	]);
var $justinmimbs$timezone_data$TimeZone$pacific__fiji = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Fiji))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__funafuti = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__galapagos = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-300,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1986, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-360,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Ecuador))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__gambier = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-540,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__guadalcanal = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Guam = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1969,
		1969,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		1,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1969,
		1969,
		$elm$time$Time$Jun,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1969,
		1969,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(31),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1971,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1970,
		1971,
		$elm$time$Time$Sep,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1973,
		1973,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(16),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1974,
		1974,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$May,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(26),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1976,
		1976,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(22),
		121,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Apr,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(24),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1977,
		$elm$time$Time$Aug,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(28),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$pacific__guam = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						600,
						$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Guam)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2000, $elm$time$Time$Dec, 23, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__honolulu = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-600,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__kiritimati = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-640,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-600,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1994, $elm$time$Time$Dec, 31, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				840,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__kosrae = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						720,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__kwajalein = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-720,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1993, $elm$time$Time$Aug, 20, 1440, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__majuro = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__marquesas = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-570,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__pago_pago = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-660,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__midway = $justinmimbs$timezone_data$TimeZone$pacific__pago_pago;
var $justinmimbs$timezone_data$TimeZone$pacific__nauru = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						690,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1979, $elm$time$Time$Feb, 10, 120, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__niue = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-690,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1978, $elm$time$Time$Oct, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-660,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__norfolk = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						690,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1974, $elm$time$Time$Oct, 27, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						690,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(60)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1975, $elm$time$Time$Mar, 2, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						690,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2015, $elm$time$Time$Oct, 4, 120, $justinmimbs$timezone_data$TimeZone$Specification$Standard)),
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						660,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 2019, $elm$time$Time$Jul, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_AN))));
};
var $justinmimbs$timezone_data$TimeZone$rules_NC = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1977,
		1978,
		$elm$time$Time$Dec,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1979,
		$elm$time$Time$Feb,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(27),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1996,
		1996,
		$elm$time$Time$Dec,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1997,
		1997,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(2),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$pacific__noumea = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_NC))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__palau = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				540,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__pitcairn = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-510,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1998, $elm$time$Time$Apr, 27, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-480,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__pohnpei = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				660,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__port_moresby = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				600,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Cook = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1978,
		1978,
		$elm$time$Time$Nov,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(12),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		30),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1991,
		$elm$time$Time$Mar,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1979,
		1990,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		0,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		30)
	]);
var $justinmimbs$timezone_data$TimeZone$pacific__rarotonga = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						-630,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1978, $elm$time$Time$Nov, 12, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-600,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Cook))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__saipan = $justinmimbs$timezone_data$TimeZone$pacific__guam;
var $justinmimbs$timezone_data$TimeZone$pacific__tahiti = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				-600,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__tarawa = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$rules_Tonga = _List_fromArray(
	[
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		1999,
		1999,
		$elm$time$Time$Oct,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(7),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2000,
		$elm$time$Time$Mar,
		$justinmimbs$timezone_data$TimeZone$Specification$Day(19),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$Standard,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2000,
		2001,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2001,
		2002,
		$elm$time$Time$Jan,
		$justinmimbs$timezone_data$TimeZone$Specification$Last($elm$time$Time$Sun),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2016,
		2016,
		$elm$time$Time$Nov,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 1),
		120,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		60),
		A7(
		$justinmimbs$timezone_data$TimeZone$Specification$Rule,
		2017,
		2017,
		$elm$time$Time$Jan,
		A2($justinmimbs$timezone_data$TimeZone$Specification$Next, $elm$time$Time$Sun, 15),
		180,
		$justinmimbs$timezone_data$TimeZone$Specification$WallClock,
		0)
	]);
var $justinmimbs$timezone_data$TimeZone$pacific__tongatapu = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_fromArray(
				[
					_Utils_Tuple2(
					A2(
						$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
						780,
						$justinmimbs$timezone_data$TimeZone$Specification$Save(0)),
					A5($justinmimbs$timezone_data$TimeZone$Specification$DateTime, 1999, $elm$time$Time$Jan, 1, 0, $justinmimbs$timezone_data$TimeZone$Specification$WallClock))
				]),
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				780,
				$justinmimbs$timezone_data$TimeZone$Specification$Rules($justinmimbs$timezone_data$TimeZone$rules_Tonga))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__wake = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$pacific__wallis = function (_v0) {
	return $justinmimbs$timezone_data$TimeZone$fromSpecification(
		A2(
			$justinmimbs$timezone_data$TimeZone$Specification$Zone,
			_List_Nil,
			A2(
				$justinmimbs$timezone_data$TimeZone$Specification$ZoneState,
				720,
				$justinmimbs$timezone_data$TimeZone$Specification$Save(0))));
};
var $justinmimbs$timezone_data$TimeZone$zones = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('Africa/Abidjan', $justinmimbs$timezone_data$TimeZone$africa__abidjan),
			_Utils_Tuple2('Africa/Accra', $justinmimbs$timezone_data$TimeZone$africa__accra),
			_Utils_Tuple2('Africa/Addis_Ababa', $justinmimbs$timezone_data$TimeZone$africa__addis_ababa),
			_Utils_Tuple2('Africa/Algiers', $justinmimbs$timezone_data$TimeZone$africa__algiers),
			_Utils_Tuple2('Africa/Asmara', $justinmimbs$timezone_data$TimeZone$africa__asmara),
			_Utils_Tuple2('Africa/Bamako', $justinmimbs$timezone_data$TimeZone$africa__bamako),
			_Utils_Tuple2('Africa/Bangui', $justinmimbs$timezone_data$TimeZone$africa__bangui),
			_Utils_Tuple2('Africa/Banjul', $justinmimbs$timezone_data$TimeZone$africa__banjul),
			_Utils_Tuple2('Africa/Bissau', $justinmimbs$timezone_data$TimeZone$africa__bissau),
			_Utils_Tuple2('Africa/Blantyre', $justinmimbs$timezone_data$TimeZone$africa__blantyre),
			_Utils_Tuple2('Africa/Brazzaville', $justinmimbs$timezone_data$TimeZone$africa__brazzaville),
			_Utils_Tuple2('Africa/Bujumbura', $justinmimbs$timezone_data$TimeZone$africa__bujumbura),
			_Utils_Tuple2('Africa/Cairo', $justinmimbs$timezone_data$TimeZone$africa__cairo),
			_Utils_Tuple2('Africa/Casablanca', $justinmimbs$timezone_data$TimeZone$africa__casablanca),
			_Utils_Tuple2('Africa/Ceuta', $justinmimbs$timezone_data$TimeZone$africa__ceuta),
			_Utils_Tuple2('Africa/Conakry', $justinmimbs$timezone_data$TimeZone$africa__conakry),
			_Utils_Tuple2('Africa/Dakar', $justinmimbs$timezone_data$TimeZone$africa__dakar),
			_Utils_Tuple2('Africa/Dar_es_Salaam', $justinmimbs$timezone_data$TimeZone$africa__dar_es_salaam),
			_Utils_Tuple2('Africa/Djibouti', $justinmimbs$timezone_data$TimeZone$africa__djibouti),
			_Utils_Tuple2('Africa/Douala', $justinmimbs$timezone_data$TimeZone$africa__douala),
			_Utils_Tuple2('Africa/El_Aaiun', $justinmimbs$timezone_data$TimeZone$africa__el_aaiun),
			_Utils_Tuple2('Africa/Freetown', $justinmimbs$timezone_data$TimeZone$africa__freetown),
			_Utils_Tuple2('Africa/Gaborone', $justinmimbs$timezone_data$TimeZone$africa__gaborone),
			_Utils_Tuple2('Africa/Harare', $justinmimbs$timezone_data$TimeZone$africa__harare),
			_Utils_Tuple2('Africa/Johannesburg', $justinmimbs$timezone_data$TimeZone$africa__johannesburg),
			_Utils_Tuple2('Africa/Juba', $justinmimbs$timezone_data$TimeZone$africa__juba),
			_Utils_Tuple2('Africa/Kampala', $justinmimbs$timezone_data$TimeZone$africa__kampala),
			_Utils_Tuple2('Africa/Khartoum', $justinmimbs$timezone_data$TimeZone$africa__khartoum),
			_Utils_Tuple2('Africa/Kigali', $justinmimbs$timezone_data$TimeZone$africa__kigali),
			_Utils_Tuple2('Africa/Kinshasa', $justinmimbs$timezone_data$TimeZone$africa__kinshasa),
			_Utils_Tuple2('Africa/Lagos', $justinmimbs$timezone_data$TimeZone$africa__lagos),
			_Utils_Tuple2('Africa/Libreville', $justinmimbs$timezone_data$TimeZone$africa__libreville),
			_Utils_Tuple2('Africa/Lome', $justinmimbs$timezone_data$TimeZone$africa__lome),
			_Utils_Tuple2('Africa/Luanda', $justinmimbs$timezone_data$TimeZone$africa__luanda),
			_Utils_Tuple2('Africa/Lubumbashi', $justinmimbs$timezone_data$TimeZone$africa__lubumbashi),
			_Utils_Tuple2('Africa/Lusaka', $justinmimbs$timezone_data$TimeZone$africa__lusaka),
			_Utils_Tuple2('Africa/Malabo', $justinmimbs$timezone_data$TimeZone$africa__malabo),
			_Utils_Tuple2('Africa/Maputo', $justinmimbs$timezone_data$TimeZone$africa__maputo),
			_Utils_Tuple2('Africa/Maseru', $justinmimbs$timezone_data$TimeZone$africa__maseru),
			_Utils_Tuple2('Africa/Mbabane', $justinmimbs$timezone_data$TimeZone$africa__mbabane),
			_Utils_Tuple2('Africa/Mogadishu', $justinmimbs$timezone_data$TimeZone$africa__mogadishu),
			_Utils_Tuple2('Africa/Monrovia', $justinmimbs$timezone_data$TimeZone$africa__monrovia),
			_Utils_Tuple2('Africa/Nairobi', $justinmimbs$timezone_data$TimeZone$africa__nairobi),
			_Utils_Tuple2('Africa/Ndjamena', $justinmimbs$timezone_data$TimeZone$africa__ndjamena),
			_Utils_Tuple2('Africa/Niamey', $justinmimbs$timezone_data$TimeZone$africa__niamey),
			_Utils_Tuple2('Africa/Nouakchott', $justinmimbs$timezone_data$TimeZone$africa__nouakchott),
			_Utils_Tuple2('Africa/Ouagadougou', $justinmimbs$timezone_data$TimeZone$africa__ouagadougou),
			_Utils_Tuple2('Africa/Porto-Novo', $justinmimbs$timezone_data$TimeZone$africa__porto_novo),
			_Utils_Tuple2('Africa/Sao_Tome', $justinmimbs$timezone_data$TimeZone$africa__sao_tome),
			_Utils_Tuple2('Africa/Tripoli', $justinmimbs$timezone_data$TimeZone$africa__tripoli),
			_Utils_Tuple2('Africa/Tunis', $justinmimbs$timezone_data$TimeZone$africa__tunis),
			_Utils_Tuple2('Africa/Windhoek', $justinmimbs$timezone_data$TimeZone$africa__windhoek),
			_Utils_Tuple2('America/Adak', $justinmimbs$timezone_data$TimeZone$america__adak),
			_Utils_Tuple2('America/Anchorage', $justinmimbs$timezone_data$TimeZone$america__anchorage),
			_Utils_Tuple2('America/Anguilla', $justinmimbs$timezone_data$TimeZone$america__anguilla),
			_Utils_Tuple2('America/Antigua', $justinmimbs$timezone_data$TimeZone$america__antigua),
			_Utils_Tuple2('America/Araguaina', $justinmimbs$timezone_data$TimeZone$america__araguaina),
			_Utils_Tuple2('America/Argentina/Buenos_Aires', $justinmimbs$timezone_data$TimeZone$america__argentina__buenos_aires),
			_Utils_Tuple2('America/Argentina/Catamarca', $justinmimbs$timezone_data$TimeZone$america__argentina__catamarca),
			_Utils_Tuple2('America/Argentina/Cordoba', $justinmimbs$timezone_data$TimeZone$america__argentina__cordoba),
			_Utils_Tuple2('America/Argentina/Jujuy', $justinmimbs$timezone_data$TimeZone$america__argentina__jujuy),
			_Utils_Tuple2('America/Argentina/La_Rioja', $justinmimbs$timezone_data$TimeZone$america__argentina__la_rioja),
			_Utils_Tuple2('America/Argentina/Mendoza', $justinmimbs$timezone_data$TimeZone$america__argentina__mendoza),
			_Utils_Tuple2('America/Argentina/Rio_Gallegos', $justinmimbs$timezone_data$TimeZone$america__argentina__rio_gallegos),
			_Utils_Tuple2('America/Argentina/Salta', $justinmimbs$timezone_data$TimeZone$america__argentina__salta),
			_Utils_Tuple2('America/Argentina/San_Juan', $justinmimbs$timezone_data$TimeZone$america__argentina__san_juan),
			_Utils_Tuple2('America/Argentina/San_Luis', $justinmimbs$timezone_data$TimeZone$america__argentina__san_luis),
			_Utils_Tuple2('America/Argentina/Tucuman', $justinmimbs$timezone_data$TimeZone$america__argentina__tucuman),
			_Utils_Tuple2('America/Argentina/Ushuaia', $justinmimbs$timezone_data$TimeZone$america__argentina__ushuaia),
			_Utils_Tuple2('America/Aruba', $justinmimbs$timezone_data$TimeZone$america__aruba),
			_Utils_Tuple2('America/Asuncion', $justinmimbs$timezone_data$TimeZone$america__asuncion),
			_Utils_Tuple2('America/Atikokan', $justinmimbs$timezone_data$TimeZone$america__atikokan),
			_Utils_Tuple2('America/Bahia', $justinmimbs$timezone_data$TimeZone$america__bahia),
			_Utils_Tuple2('America/Bahia_Banderas', $justinmimbs$timezone_data$TimeZone$america__bahia_banderas),
			_Utils_Tuple2('America/Barbados', $justinmimbs$timezone_data$TimeZone$america__barbados),
			_Utils_Tuple2('America/Belem', $justinmimbs$timezone_data$TimeZone$america__belem),
			_Utils_Tuple2('America/Belize', $justinmimbs$timezone_data$TimeZone$america__belize),
			_Utils_Tuple2('America/Blanc-Sablon', $justinmimbs$timezone_data$TimeZone$america__blanc_sablon),
			_Utils_Tuple2('America/Boa_Vista', $justinmimbs$timezone_data$TimeZone$america__boa_vista),
			_Utils_Tuple2('America/Bogota', $justinmimbs$timezone_data$TimeZone$america__bogota),
			_Utils_Tuple2('America/Boise', $justinmimbs$timezone_data$TimeZone$america__boise),
			_Utils_Tuple2('America/Cambridge_Bay', $justinmimbs$timezone_data$TimeZone$america__cambridge_bay),
			_Utils_Tuple2('America/Campo_Grande', $justinmimbs$timezone_data$TimeZone$america__campo_grande),
			_Utils_Tuple2('America/Cancun', $justinmimbs$timezone_data$TimeZone$america__cancun),
			_Utils_Tuple2('America/Caracas', $justinmimbs$timezone_data$TimeZone$america__caracas),
			_Utils_Tuple2('America/Cayenne', $justinmimbs$timezone_data$TimeZone$america__cayenne),
			_Utils_Tuple2('America/Cayman', $justinmimbs$timezone_data$TimeZone$america__cayman),
			_Utils_Tuple2('America/Chicago', $justinmimbs$timezone_data$TimeZone$america__chicago),
			_Utils_Tuple2('America/Chihuahua', $justinmimbs$timezone_data$TimeZone$america__chihuahua),
			_Utils_Tuple2('America/Costa_Rica', $justinmimbs$timezone_data$TimeZone$america__costa_rica),
			_Utils_Tuple2('America/Creston', $justinmimbs$timezone_data$TimeZone$america__creston),
			_Utils_Tuple2('America/Cuiaba', $justinmimbs$timezone_data$TimeZone$america__cuiaba),
			_Utils_Tuple2('America/Curacao', $justinmimbs$timezone_data$TimeZone$america__curacao),
			_Utils_Tuple2('America/Danmarkshavn', $justinmimbs$timezone_data$TimeZone$america__danmarkshavn),
			_Utils_Tuple2('America/Dawson', $justinmimbs$timezone_data$TimeZone$america__dawson),
			_Utils_Tuple2('America/Dawson_Creek', $justinmimbs$timezone_data$TimeZone$america__dawson_creek),
			_Utils_Tuple2('America/Denver', $justinmimbs$timezone_data$TimeZone$america__denver),
			_Utils_Tuple2('America/Detroit', $justinmimbs$timezone_data$TimeZone$america__detroit),
			_Utils_Tuple2('America/Dominica', $justinmimbs$timezone_data$TimeZone$america__dominica),
			_Utils_Tuple2('America/Edmonton', $justinmimbs$timezone_data$TimeZone$america__edmonton),
			_Utils_Tuple2('America/Eirunepe', $justinmimbs$timezone_data$TimeZone$america__eirunepe),
			_Utils_Tuple2('America/El_Salvador', $justinmimbs$timezone_data$TimeZone$america__el_salvador),
			_Utils_Tuple2('America/Fort_Nelson', $justinmimbs$timezone_data$TimeZone$america__fort_nelson),
			_Utils_Tuple2('America/Fortaleza', $justinmimbs$timezone_data$TimeZone$america__fortaleza),
			_Utils_Tuple2('America/Glace_Bay', $justinmimbs$timezone_data$TimeZone$america__glace_bay),
			_Utils_Tuple2('America/Godthab', $justinmimbs$timezone_data$TimeZone$america__godthab),
			_Utils_Tuple2('America/Goose_Bay', $justinmimbs$timezone_data$TimeZone$america__goose_bay),
			_Utils_Tuple2('America/Grand_Turk', $justinmimbs$timezone_data$TimeZone$america__grand_turk),
			_Utils_Tuple2('America/Grenada', $justinmimbs$timezone_data$TimeZone$america__grenada),
			_Utils_Tuple2('America/Guadeloupe', $justinmimbs$timezone_data$TimeZone$america__guadeloupe),
			_Utils_Tuple2('America/Guatemala', $justinmimbs$timezone_data$TimeZone$america__guatemala),
			_Utils_Tuple2('America/Guayaquil', $justinmimbs$timezone_data$TimeZone$america__guayaquil),
			_Utils_Tuple2('America/Guyana', $justinmimbs$timezone_data$TimeZone$america__guyana),
			_Utils_Tuple2('America/Halifax', $justinmimbs$timezone_data$TimeZone$america__halifax),
			_Utils_Tuple2('America/Havana', $justinmimbs$timezone_data$TimeZone$america__havana),
			_Utils_Tuple2('America/Hermosillo', $justinmimbs$timezone_data$TimeZone$america__hermosillo),
			_Utils_Tuple2('America/Indiana/Indianapolis', $justinmimbs$timezone_data$TimeZone$america__indiana__indianapolis),
			_Utils_Tuple2('America/Indiana/Knox', $justinmimbs$timezone_data$TimeZone$america__indiana__knox),
			_Utils_Tuple2('America/Indiana/Marengo', $justinmimbs$timezone_data$TimeZone$america__indiana__marengo),
			_Utils_Tuple2('America/Indiana/Petersburg', $justinmimbs$timezone_data$TimeZone$america__indiana__petersburg),
			_Utils_Tuple2('America/Indiana/Tell_City', $justinmimbs$timezone_data$TimeZone$america__indiana__tell_city),
			_Utils_Tuple2('America/Indiana/Vevay', $justinmimbs$timezone_data$TimeZone$america__indiana__vevay),
			_Utils_Tuple2('America/Indiana/Vincennes', $justinmimbs$timezone_data$TimeZone$america__indiana__vincennes),
			_Utils_Tuple2('America/Indiana/Winamac', $justinmimbs$timezone_data$TimeZone$america__indiana__winamac),
			_Utils_Tuple2('America/Inuvik', $justinmimbs$timezone_data$TimeZone$america__inuvik),
			_Utils_Tuple2('America/Iqaluit', $justinmimbs$timezone_data$TimeZone$america__iqaluit),
			_Utils_Tuple2('America/Jamaica', $justinmimbs$timezone_data$TimeZone$america__jamaica),
			_Utils_Tuple2('America/Juneau', $justinmimbs$timezone_data$TimeZone$america__juneau),
			_Utils_Tuple2('America/Kentucky/Louisville', $justinmimbs$timezone_data$TimeZone$america__kentucky__louisville),
			_Utils_Tuple2('America/Kentucky/Monticello', $justinmimbs$timezone_data$TimeZone$america__kentucky__monticello),
			_Utils_Tuple2('America/Kralendijk', $justinmimbs$timezone_data$TimeZone$america__kralendijk),
			_Utils_Tuple2('America/La_Paz', $justinmimbs$timezone_data$TimeZone$america__la_paz),
			_Utils_Tuple2('America/Lima', $justinmimbs$timezone_data$TimeZone$america__lima),
			_Utils_Tuple2('America/Los_Angeles', $justinmimbs$timezone_data$TimeZone$america__los_angeles),
			_Utils_Tuple2('America/Lower_Princes', $justinmimbs$timezone_data$TimeZone$america__lower_princes),
			_Utils_Tuple2('America/Maceio', $justinmimbs$timezone_data$TimeZone$america__maceio),
			_Utils_Tuple2('America/Managua', $justinmimbs$timezone_data$TimeZone$america__managua),
			_Utils_Tuple2('America/Manaus', $justinmimbs$timezone_data$TimeZone$america__manaus),
			_Utils_Tuple2('America/Marigot', $justinmimbs$timezone_data$TimeZone$america__marigot),
			_Utils_Tuple2('America/Martinique', $justinmimbs$timezone_data$TimeZone$america__martinique),
			_Utils_Tuple2('America/Matamoros', $justinmimbs$timezone_data$TimeZone$america__matamoros),
			_Utils_Tuple2('America/Mazatlan', $justinmimbs$timezone_data$TimeZone$america__mazatlan),
			_Utils_Tuple2('America/Menominee', $justinmimbs$timezone_data$TimeZone$america__menominee),
			_Utils_Tuple2('America/Merida', $justinmimbs$timezone_data$TimeZone$america__merida),
			_Utils_Tuple2('America/Metlakatla', $justinmimbs$timezone_data$TimeZone$america__metlakatla),
			_Utils_Tuple2('America/Mexico_City', $justinmimbs$timezone_data$TimeZone$america__mexico_city),
			_Utils_Tuple2('America/Miquelon', $justinmimbs$timezone_data$TimeZone$america__miquelon),
			_Utils_Tuple2('America/Moncton', $justinmimbs$timezone_data$TimeZone$america__moncton),
			_Utils_Tuple2('America/Monterrey', $justinmimbs$timezone_data$TimeZone$america__monterrey),
			_Utils_Tuple2('America/Montevideo', $justinmimbs$timezone_data$TimeZone$america__montevideo),
			_Utils_Tuple2('America/Montserrat', $justinmimbs$timezone_data$TimeZone$america__montserrat),
			_Utils_Tuple2('America/Nassau', $justinmimbs$timezone_data$TimeZone$america__nassau),
			_Utils_Tuple2('America/New_York', $justinmimbs$timezone_data$TimeZone$america__new_york),
			_Utils_Tuple2('America/Nipigon', $justinmimbs$timezone_data$TimeZone$america__nipigon),
			_Utils_Tuple2('America/Nome', $justinmimbs$timezone_data$TimeZone$america__nome),
			_Utils_Tuple2('America/Noronha', $justinmimbs$timezone_data$TimeZone$america__noronha),
			_Utils_Tuple2('America/North_Dakota/Beulah', $justinmimbs$timezone_data$TimeZone$america__north_dakota__beulah),
			_Utils_Tuple2('America/North_Dakota/Center', $justinmimbs$timezone_data$TimeZone$america__north_dakota__center),
			_Utils_Tuple2('America/North_Dakota/New_Salem', $justinmimbs$timezone_data$TimeZone$america__north_dakota__new_salem),
			_Utils_Tuple2('America/Ojinaga', $justinmimbs$timezone_data$TimeZone$america__ojinaga),
			_Utils_Tuple2('America/Panama', $justinmimbs$timezone_data$TimeZone$america__panama),
			_Utils_Tuple2('America/Pangnirtung', $justinmimbs$timezone_data$TimeZone$america__pangnirtung),
			_Utils_Tuple2('America/Paramaribo', $justinmimbs$timezone_data$TimeZone$america__paramaribo),
			_Utils_Tuple2('America/Phoenix', $justinmimbs$timezone_data$TimeZone$america__phoenix),
			_Utils_Tuple2('America/Port-au-Prince', $justinmimbs$timezone_data$TimeZone$america__port_au_prince),
			_Utils_Tuple2('America/Port_of_Spain', $justinmimbs$timezone_data$TimeZone$america__port_of_spain),
			_Utils_Tuple2('America/Porto_Velho', $justinmimbs$timezone_data$TimeZone$america__porto_velho),
			_Utils_Tuple2('America/Puerto_Rico', $justinmimbs$timezone_data$TimeZone$america__puerto_rico),
			_Utils_Tuple2('America/Punta_Arenas', $justinmimbs$timezone_data$TimeZone$america__punta_arenas),
			_Utils_Tuple2('America/Rainy_River', $justinmimbs$timezone_data$TimeZone$america__rainy_river),
			_Utils_Tuple2('America/Rankin_Inlet', $justinmimbs$timezone_data$TimeZone$america__rankin_inlet),
			_Utils_Tuple2('America/Recife', $justinmimbs$timezone_data$TimeZone$america__recife),
			_Utils_Tuple2('America/Regina', $justinmimbs$timezone_data$TimeZone$america__regina),
			_Utils_Tuple2('America/Resolute', $justinmimbs$timezone_data$TimeZone$america__resolute),
			_Utils_Tuple2('America/Rio_Branco', $justinmimbs$timezone_data$TimeZone$america__rio_branco),
			_Utils_Tuple2('America/Santarem', $justinmimbs$timezone_data$TimeZone$america__santarem),
			_Utils_Tuple2('America/Santiago', $justinmimbs$timezone_data$TimeZone$america__santiago),
			_Utils_Tuple2('America/Santo_Domingo', $justinmimbs$timezone_data$TimeZone$america__santo_domingo),
			_Utils_Tuple2('America/Sao_Paulo', $justinmimbs$timezone_data$TimeZone$america__sao_paulo),
			_Utils_Tuple2('America/Scoresbysund', $justinmimbs$timezone_data$TimeZone$america__scoresbysund),
			_Utils_Tuple2('America/Sitka', $justinmimbs$timezone_data$TimeZone$america__sitka),
			_Utils_Tuple2('America/St_Barthelemy', $justinmimbs$timezone_data$TimeZone$america__st_barthelemy),
			_Utils_Tuple2('America/St_Johns', $justinmimbs$timezone_data$TimeZone$america__st_johns),
			_Utils_Tuple2('America/St_Kitts', $justinmimbs$timezone_data$TimeZone$america__st_kitts),
			_Utils_Tuple2('America/St_Lucia', $justinmimbs$timezone_data$TimeZone$america__st_lucia),
			_Utils_Tuple2('America/St_Thomas', $justinmimbs$timezone_data$TimeZone$america__st_thomas),
			_Utils_Tuple2('America/St_Vincent', $justinmimbs$timezone_data$TimeZone$america__st_vincent),
			_Utils_Tuple2('America/Swift_Current', $justinmimbs$timezone_data$TimeZone$america__swift_current),
			_Utils_Tuple2('America/Tegucigalpa', $justinmimbs$timezone_data$TimeZone$america__tegucigalpa),
			_Utils_Tuple2('America/Thule', $justinmimbs$timezone_data$TimeZone$america__thule),
			_Utils_Tuple2('America/Thunder_Bay', $justinmimbs$timezone_data$TimeZone$america__thunder_bay),
			_Utils_Tuple2('America/Tijuana', $justinmimbs$timezone_data$TimeZone$america__tijuana),
			_Utils_Tuple2('America/Toronto', $justinmimbs$timezone_data$TimeZone$america__toronto),
			_Utils_Tuple2('America/Tortola', $justinmimbs$timezone_data$TimeZone$america__tortola),
			_Utils_Tuple2('America/Vancouver', $justinmimbs$timezone_data$TimeZone$america__vancouver),
			_Utils_Tuple2('America/Whitehorse', $justinmimbs$timezone_data$TimeZone$america__whitehorse),
			_Utils_Tuple2('America/Winnipeg', $justinmimbs$timezone_data$TimeZone$america__winnipeg),
			_Utils_Tuple2('America/Yakutat', $justinmimbs$timezone_data$TimeZone$america__yakutat),
			_Utils_Tuple2('America/Yellowknife', $justinmimbs$timezone_data$TimeZone$america__yellowknife),
			_Utils_Tuple2('Antarctica/Casey', $justinmimbs$timezone_data$TimeZone$antarctica__casey),
			_Utils_Tuple2('Antarctica/Davis', $justinmimbs$timezone_data$TimeZone$antarctica__davis),
			_Utils_Tuple2('Antarctica/DumontDUrville', $justinmimbs$timezone_data$TimeZone$antarctica__dumontdurville),
			_Utils_Tuple2('Antarctica/Macquarie', $justinmimbs$timezone_data$TimeZone$antarctica__macquarie),
			_Utils_Tuple2('Antarctica/Mawson', $justinmimbs$timezone_data$TimeZone$antarctica__mawson),
			_Utils_Tuple2('Antarctica/McMurdo', $justinmimbs$timezone_data$TimeZone$antarctica__mcmurdo),
			_Utils_Tuple2('Antarctica/Palmer', $justinmimbs$timezone_data$TimeZone$antarctica__palmer),
			_Utils_Tuple2('Antarctica/Rothera', $justinmimbs$timezone_data$TimeZone$antarctica__rothera),
			_Utils_Tuple2('Antarctica/Syowa', $justinmimbs$timezone_data$TimeZone$antarctica__syowa),
			_Utils_Tuple2('Antarctica/Troll', $justinmimbs$timezone_data$TimeZone$antarctica__troll),
			_Utils_Tuple2('Antarctica/Vostok', $justinmimbs$timezone_data$TimeZone$antarctica__vostok),
			_Utils_Tuple2('Arctic/Longyearbyen', $justinmimbs$timezone_data$TimeZone$arctic__longyearbyen),
			_Utils_Tuple2('Asia/Aden', $justinmimbs$timezone_data$TimeZone$asia__aden),
			_Utils_Tuple2('Asia/Almaty', $justinmimbs$timezone_data$TimeZone$asia__almaty),
			_Utils_Tuple2('Asia/Amman', $justinmimbs$timezone_data$TimeZone$asia__amman),
			_Utils_Tuple2('Asia/Anadyr', $justinmimbs$timezone_data$TimeZone$asia__anadyr),
			_Utils_Tuple2('Asia/Aqtau', $justinmimbs$timezone_data$TimeZone$asia__aqtau),
			_Utils_Tuple2('Asia/Aqtobe', $justinmimbs$timezone_data$TimeZone$asia__aqtobe),
			_Utils_Tuple2('Asia/Ashgabat', $justinmimbs$timezone_data$TimeZone$asia__ashgabat),
			_Utils_Tuple2('Asia/Atyrau', $justinmimbs$timezone_data$TimeZone$asia__atyrau),
			_Utils_Tuple2('Asia/Baghdad', $justinmimbs$timezone_data$TimeZone$asia__baghdad),
			_Utils_Tuple2('Asia/Bahrain', $justinmimbs$timezone_data$TimeZone$asia__bahrain),
			_Utils_Tuple2('Asia/Baku', $justinmimbs$timezone_data$TimeZone$asia__baku),
			_Utils_Tuple2('Asia/Bangkok', $justinmimbs$timezone_data$TimeZone$asia__bangkok),
			_Utils_Tuple2('Asia/Barnaul', $justinmimbs$timezone_data$TimeZone$asia__barnaul),
			_Utils_Tuple2('Asia/Beirut', $justinmimbs$timezone_data$TimeZone$asia__beirut),
			_Utils_Tuple2('Asia/Bishkek', $justinmimbs$timezone_data$TimeZone$asia__bishkek),
			_Utils_Tuple2('Asia/Brunei', $justinmimbs$timezone_data$TimeZone$asia__brunei),
			_Utils_Tuple2('Asia/Chita', $justinmimbs$timezone_data$TimeZone$asia__chita),
			_Utils_Tuple2('Asia/Choibalsan', $justinmimbs$timezone_data$TimeZone$asia__choibalsan),
			_Utils_Tuple2('Asia/Colombo', $justinmimbs$timezone_data$TimeZone$asia__colombo),
			_Utils_Tuple2('Asia/Damascus', $justinmimbs$timezone_data$TimeZone$asia__damascus),
			_Utils_Tuple2('Asia/Dhaka', $justinmimbs$timezone_data$TimeZone$asia__dhaka),
			_Utils_Tuple2('Asia/Dili', $justinmimbs$timezone_data$TimeZone$asia__dili),
			_Utils_Tuple2('Asia/Dubai', $justinmimbs$timezone_data$TimeZone$asia__dubai),
			_Utils_Tuple2('Asia/Dushanbe', $justinmimbs$timezone_data$TimeZone$asia__dushanbe),
			_Utils_Tuple2('Asia/Famagusta', $justinmimbs$timezone_data$TimeZone$asia__famagusta),
			_Utils_Tuple2('Asia/Gaza', $justinmimbs$timezone_data$TimeZone$asia__gaza),
			_Utils_Tuple2('Asia/Hebron', $justinmimbs$timezone_data$TimeZone$asia__hebron),
			_Utils_Tuple2('Asia/Ho_Chi_Minh', $justinmimbs$timezone_data$TimeZone$asia__ho_chi_minh),
			_Utils_Tuple2('Asia/Hong_Kong', $justinmimbs$timezone_data$TimeZone$asia__hong_kong),
			_Utils_Tuple2('Asia/Hovd', $justinmimbs$timezone_data$TimeZone$asia__hovd),
			_Utils_Tuple2('Asia/Irkutsk', $justinmimbs$timezone_data$TimeZone$asia__irkutsk),
			_Utils_Tuple2('Asia/Istanbul', $justinmimbs$timezone_data$TimeZone$asia__istanbul),
			_Utils_Tuple2('Asia/Jakarta', $justinmimbs$timezone_data$TimeZone$asia__jakarta),
			_Utils_Tuple2('Asia/Jayapura', $justinmimbs$timezone_data$TimeZone$asia__jayapura),
			_Utils_Tuple2('Asia/Jerusalem', $justinmimbs$timezone_data$TimeZone$asia__jerusalem),
			_Utils_Tuple2('Asia/Kabul', $justinmimbs$timezone_data$TimeZone$asia__kabul),
			_Utils_Tuple2('Asia/Kamchatka', $justinmimbs$timezone_data$TimeZone$asia__kamchatka),
			_Utils_Tuple2('Asia/Karachi', $justinmimbs$timezone_data$TimeZone$asia__karachi),
			_Utils_Tuple2('Asia/Kathmandu', $justinmimbs$timezone_data$TimeZone$asia__kathmandu),
			_Utils_Tuple2('Asia/Khandyga', $justinmimbs$timezone_data$TimeZone$asia__khandyga),
			_Utils_Tuple2('Asia/Kolkata', $justinmimbs$timezone_data$TimeZone$asia__kolkata),
			_Utils_Tuple2('Asia/Krasnoyarsk', $justinmimbs$timezone_data$TimeZone$asia__krasnoyarsk),
			_Utils_Tuple2('Asia/Kuala_Lumpur', $justinmimbs$timezone_data$TimeZone$asia__kuala_lumpur),
			_Utils_Tuple2('Asia/Kuching', $justinmimbs$timezone_data$TimeZone$asia__kuching),
			_Utils_Tuple2('Asia/Kuwait', $justinmimbs$timezone_data$TimeZone$asia__kuwait),
			_Utils_Tuple2('Asia/Macau', $justinmimbs$timezone_data$TimeZone$asia__macau),
			_Utils_Tuple2('Asia/Magadan', $justinmimbs$timezone_data$TimeZone$asia__magadan),
			_Utils_Tuple2('Asia/Makassar', $justinmimbs$timezone_data$TimeZone$asia__makassar),
			_Utils_Tuple2('Asia/Manila', $justinmimbs$timezone_data$TimeZone$asia__manila),
			_Utils_Tuple2('Asia/Muscat', $justinmimbs$timezone_data$TimeZone$asia__muscat),
			_Utils_Tuple2('Asia/Nicosia', $justinmimbs$timezone_data$TimeZone$asia__nicosia),
			_Utils_Tuple2('Asia/Novokuznetsk', $justinmimbs$timezone_data$TimeZone$asia__novokuznetsk),
			_Utils_Tuple2('Asia/Novosibirsk', $justinmimbs$timezone_data$TimeZone$asia__novosibirsk),
			_Utils_Tuple2('Asia/Omsk', $justinmimbs$timezone_data$TimeZone$asia__omsk),
			_Utils_Tuple2('Asia/Oral', $justinmimbs$timezone_data$TimeZone$asia__oral),
			_Utils_Tuple2('Asia/Phnom_Penh', $justinmimbs$timezone_data$TimeZone$asia__phnom_penh),
			_Utils_Tuple2('Asia/Pontianak', $justinmimbs$timezone_data$TimeZone$asia__pontianak),
			_Utils_Tuple2('Asia/Pyongyang', $justinmimbs$timezone_data$TimeZone$asia__pyongyang),
			_Utils_Tuple2('Asia/Qatar', $justinmimbs$timezone_data$TimeZone$asia__qatar),
			_Utils_Tuple2('Asia/Qostanay', $justinmimbs$timezone_data$TimeZone$asia__qostanay),
			_Utils_Tuple2('Asia/Qyzylorda', $justinmimbs$timezone_data$TimeZone$asia__qyzylorda),
			_Utils_Tuple2('Asia/Riyadh', $justinmimbs$timezone_data$TimeZone$asia__riyadh),
			_Utils_Tuple2('Asia/Sakhalin', $justinmimbs$timezone_data$TimeZone$asia__sakhalin),
			_Utils_Tuple2('Asia/Samarkand', $justinmimbs$timezone_data$TimeZone$asia__samarkand),
			_Utils_Tuple2('Asia/Seoul', $justinmimbs$timezone_data$TimeZone$asia__seoul),
			_Utils_Tuple2('Asia/Shanghai', $justinmimbs$timezone_data$TimeZone$asia__shanghai),
			_Utils_Tuple2('Asia/Singapore', $justinmimbs$timezone_data$TimeZone$asia__singapore),
			_Utils_Tuple2('Asia/Srednekolymsk', $justinmimbs$timezone_data$TimeZone$asia__srednekolymsk),
			_Utils_Tuple2('Asia/Taipei', $justinmimbs$timezone_data$TimeZone$asia__taipei),
			_Utils_Tuple2('Asia/Tashkent', $justinmimbs$timezone_data$TimeZone$asia__tashkent),
			_Utils_Tuple2('Asia/Tbilisi', $justinmimbs$timezone_data$TimeZone$asia__tbilisi),
			_Utils_Tuple2('Asia/Tehran', $justinmimbs$timezone_data$TimeZone$asia__tehran),
			_Utils_Tuple2('Asia/Thimphu', $justinmimbs$timezone_data$TimeZone$asia__thimphu),
			_Utils_Tuple2('Asia/Tokyo', $justinmimbs$timezone_data$TimeZone$asia__tokyo),
			_Utils_Tuple2('Asia/Tomsk', $justinmimbs$timezone_data$TimeZone$asia__tomsk),
			_Utils_Tuple2('Asia/Ulaanbaatar', $justinmimbs$timezone_data$TimeZone$asia__ulaanbaatar),
			_Utils_Tuple2('Asia/Urumqi', $justinmimbs$timezone_data$TimeZone$asia__urumqi),
			_Utils_Tuple2('Asia/Ust-Nera', $justinmimbs$timezone_data$TimeZone$asia__ust_nera),
			_Utils_Tuple2('Asia/Vientiane', $justinmimbs$timezone_data$TimeZone$asia__vientiane),
			_Utils_Tuple2('Asia/Vladivostok', $justinmimbs$timezone_data$TimeZone$asia__vladivostok),
			_Utils_Tuple2('Asia/Yakutsk', $justinmimbs$timezone_data$TimeZone$asia__yakutsk),
			_Utils_Tuple2('Asia/Yangon', $justinmimbs$timezone_data$TimeZone$asia__yangon),
			_Utils_Tuple2('Asia/Yekaterinburg', $justinmimbs$timezone_data$TimeZone$asia__yekaterinburg),
			_Utils_Tuple2('Asia/Yerevan', $justinmimbs$timezone_data$TimeZone$asia__yerevan),
			_Utils_Tuple2('Atlantic/Azores', $justinmimbs$timezone_data$TimeZone$atlantic__azores),
			_Utils_Tuple2('Atlantic/Bermuda', $justinmimbs$timezone_data$TimeZone$atlantic__bermuda),
			_Utils_Tuple2('Atlantic/Canary', $justinmimbs$timezone_data$TimeZone$atlantic__canary),
			_Utils_Tuple2('Atlantic/Cape_Verde', $justinmimbs$timezone_data$TimeZone$atlantic__cape_verde),
			_Utils_Tuple2('Atlantic/Faroe', $justinmimbs$timezone_data$TimeZone$atlantic__faroe),
			_Utils_Tuple2('Atlantic/Madeira', $justinmimbs$timezone_data$TimeZone$atlantic__madeira),
			_Utils_Tuple2('Atlantic/Reykjavik', $justinmimbs$timezone_data$TimeZone$atlantic__reykjavik),
			_Utils_Tuple2('Atlantic/South_Georgia', $justinmimbs$timezone_data$TimeZone$atlantic__south_georgia),
			_Utils_Tuple2('Atlantic/St_Helena', $justinmimbs$timezone_data$TimeZone$atlantic__st_helena),
			_Utils_Tuple2('Atlantic/Stanley', $justinmimbs$timezone_data$TimeZone$atlantic__stanley),
			_Utils_Tuple2('Australia/Adelaide', $justinmimbs$timezone_data$TimeZone$australia__adelaide),
			_Utils_Tuple2('Australia/Brisbane', $justinmimbs$timezone_data$TimeZone$australia__brisbane),
			_Utils_Tuple2('Australia/Broken_Hill', $justinmimbs$timezone_data$TimeZone$australia__broken_hill),
			_Utils_Tuple2('Australia/Currie', $justinmimbs$timezone_data$TimeZone$australia__currie),
			_Utils_Tuple2('Australia/Darwin', $justinmimbs$timezone_data$TimeZone$australia__darwin),
			_Utils_Tuple2('Australia/Eucla', $justinmimbs$timezone_data$TimeZone$australia__eucla),
			_Utils_Tuple2('Australia/Hobart', $justinmimbs$timezone_data$TimeZone$australia__hobart),
			_Utils_Tuple2('Australia/Lindeman', $justinmimbs$timezone_data$TimeZone$australia__lindeman),
			_Utils_Tuple2('Australia/Lord_Howe', $justinmimbs$timezone_data$TimeZone$australia__lord_howe),
			_Utils_Tuple2('Australia/Melbourne', $justinmimbs$timezone_data$TimeZone$australia__melbourne),
			_Utils_Tuple2('Australia/Perth', $justinmimbs$timezone_data$TimeZone$australia__perth),
			_Utils_Tuple2('Australia/Sydney', $justinmimbs$timezone_data$TimeZone$australia__sydney),
			_Utils_Tuple2('Europe/Amsterdam', $justinmimbs$timezone_data$TimeZone$europe__amsterdam),
			_Utils_Tuple2('Europe/Andorra', $justinmimbs$timezone_data$TimeZone$europe__andorra),
			_Utils_Tuple2('Europe/Astrakhan', $justinmimbs$timezone_data$TimeZone$europe__astrakhan),
			_Utils_Tuple2('Europe/Athens', $justinmimbs$timezone_data$TimeZone$europe__athens),
			_Utils_Tuple2('Europe/Belgrade', $justinmimbs$timezone_data$TimeZone$europe__belgrade),
			_Utils_Tuple2('Europe/Berlin', $justinmimbs$timezone_data$TimeZone$europe__berlin),
			_Utils_Tuple2('Europe/Bratislava', $justinmimbs$timezone_data$TimeZone$europe__bratislava),
			_Utils_Tuple2('Europe/Brussels', $justinmimbs$timezone_data$TimeZone$europe__brussels),
			_Utils_Tuple2('Europe/Bucharest', $justinmimbs$timezone_data$TimeZone$europe__bucharest),
			_Utils_Tuple2('Europe/Budapest', $justinmimbs$timezone_data$TimeZone$europe__budapest),
			_Utils_Tuple2('Europe/Busingen', $justinmimbs$timezone_data$TimeZone$europe__busingen),
			_Utils_Tuple2('Europe/Chisinau', $justinmimbs$timezone_data$TimeZone$europe__chisinau),
			_Utils_Tuple2('Europe/Copenhagen', $justinmimbs$timezone_data$TimeZone$europe__copenhagen),
			_Utils_Tuple2('Europe/Dublin', $justinmimbs$timezone_data$TimeZone$europe__dublin),
			_Utils_Tuple2('Europe/Gibraltar', $justinmimbs$timezone_data$TimeZone$europe__gibraltar),
			_Utils_Tuple2('Europe/Guernsey', $justinmimbs$timezone_data$TimeZone$europe__guernsey),
			_Utils_Tuple2('Europe/Helsinki', $justinmimbs$timezone_data$TimeZone$europe__helsinki),
			_Utils_Tuple2('Europe/Isle_of_Man', $justinmimbs$timezone_data$TimeZone$europe__isle_of_man),
			_Utils_Tuple2('Europe/Istanbul', $justinmimbs$timezone_data$TimeZone$europe__istanbul),
			_Utils_Tuple2('Europe/Jersey', $justinmimbs$timezone_data$TimeZone$europe__jersey),
			_Utils_Tuple2('Europe/Kaliningrad', $justinmimbs$timezone_data$TimeZone$europe__kaliningrad),
			_Utils_Tuple2('Europe/Kiev', $justinmimbs$timezone_data$TimeZone$europe__kiev),
			_Utils_Tuple2('Europe/Kirov', $justinmimbs$timezone_data$TimeZone$europe__kirov),
			_Utils_Tuple2('Europe/Lisbon', $justinmimbs$timezone_data$TimeZone$europe__lisbon),
			_Utils_Tuple2('Europe/Ljubljana', $justinmimbs$timezone_data$TimeZone$europe__ljubljana),
			_Utils_Tuple2('Europe/London', $justinmimbs$timezone_data$TimeZone$europe__london),
			_Utils_Tuple2('Europe/Luxembourg', $justinmimbs$timezone_data$TimeZone$europe__luxembourg),
			_Utils_Tuple2('Europe/Madrid', $justinmimbs$timezone_data$TimeZone$europe__madrid),
			_Utils_Tuple2('Europe/Malta', $justinmimbs$timezone_data$TimeZone$europe__malta),
			_Utils_Tuple2('Europe/Mariehamn', $justinmimbs$timezone_data$TimeZone$europe__mariehamn),
			_Utils_Tuple2('Europe/Minsk', $justinmimbs$timezone_data$TimeZone$europe__minsk),
			_Utils_Tuple2('Europe/Monaco', $justinmimbs$timezone_data$TimeZone$europe__monaco),
			_Utils_Tuple2('Europe/Moscow', $justinmimbs$timezone_data$TimeZone$europe__moscow),
			_Utils_Tuple2('Europe/Nicosia', $justinmimbs$timezone_data$TimeZone$europe__nicosia),
			_Utils_Tuple2('Europe/Oslo', $justinmimbs$timezone_data$TimeZone$europe__oslo),
			_Utils_Tuple2('Europe/Paris', $justinmimbs$timezone_data$TimeZone$europe__paris),
			_Utils_Tuple2('Europe/Podgorica', $justinmimbs$timezone_data$TimeZone$europe__podgorica),
			_Utils_Tuple2('Europe/Prague', $justinmimbs$timezone_data$TimeZone$europe__prague),
			_Utils_Tuple2('Europe/Riga', $justinmimbs$timezone_data$TimeZone$europe__riga),
			_Utils_Tuple2('Europe/Rome', $justinmimbs$timezone_data$TimeZone$europe__rome),
			_Utils_Tuple2('Europe/Samara', $justinmimbs$timezone_data$TimeZone$europe__samara),
			_Utils_Tuple2('Europe/San_Marino', $justinmimbs$timezone_data$TimeZone$europe__san_marino),
			_Utils_Tuple2('Europe/Sarajevo', $justinmimbs$timezone_data$TimeZone$europe__sarajevo),
			_Utils_Tuple2('Europe/Saratov', $justinmimbs$timezone_data$TimeZone$europe__saratov),
			_Utils_Tuple2('Europe/Simferopol', $justinmimbs$timezone_data$TimeZone$europe__simferopol),
			_Utils_Tuple2('Europe/Skopje', $justinmimbs$timezone_data$TimeZone$europe__skopje),
			_Utils_Tuple2('Europe/Sofia', $justinmimbs$timezone_data$TimeZone$europe__sofia),
			_Utils_Tuple2('Europe/Stockholm', $justinmimbs$timezone_data$TimeZone$europe__stockholm),
			_Utils_Tuple2('Europe/Tallinn', $justinmimbs$timezone_data$TimeZone$europe__tallinn),
			_Utils_Tuple2('Europe/Tirane', $justinmimbs$timezone_data$TimeZone$europe__tirane),
			_Utils_Tuple2('Europe/Ulyanovsk', $justinmimbs$timezone_data$TimeZone$europe__ulyanovsk),
			_Utils_Tuple2('Europe/Uzhgorod', $justinmimbs$timezone_data$TimeZone$europe__uzhgorod),
			_Utils_Tuple2('Europe/Vaduz', $justinmimbs$timezone_data$TimeZone$europe__vaduz),
			_Utils_Tuple2('Europe/Vatican', $justinmimbs$timezone_data$TimeZone$europe__vatican),
			_Utils_Tuple2('Europe/Vienna', $justinmimbs$timezone_data$TimeZone$europe__vienna),
			_Utils_Tuple2('Europe/Vilnius', $justinmimbs$timezone_data$TimeZone$europe__vilnius),
			_Utils_Tuple2('Europe/Volgograd', $justinmimbs$timezone_data$TimeZone$europe__volgograd),
			_Utils_Tuple2('Europe/Warsaw', $justinmimbs$timezone_data$TimeZone$europe__warsaw),
			_Utils_Tuple2('Europe/Zagreb', $justinmimbs$timezone_data$TimeZone$europe__zagreb),
			_Utils_Tuple2('Europe/Zaporozhye', $justinmimbs$timezone_data$TimeZone$europe__zaporozhye),
			_Utils_Tuple2('Europe/Zurich', $justinmimbs$timezone_data$TimeZone$europe__zurich),
			_Utils_Tuple2('Indian/Antananarivo', $justinmimbs$timezone_data$TimeZone$indian__antananarivo),
			_Utils_Tuple2('Indian/Chagos', $justinmimbs$timezone_data$TimeZone$indian__chagos),
			_Utils_Tuple2('Indian/Christmas', $justinmimbs$timezone_data$TimeZone$indian__christmas),
			_Utils_Tuple2('Indian/Cocos', $justinmimbs$timezone_data$TimeZone$indian__cocos),
			_Utils_Tuple2('Indian/Comoro', $justinmimbs$timezone_data$TimeZone$indian__comoro),
			_Utils_Tuple2('Indian/Kerguelen', $justinmimbs$timezone_data$TimeZone$indian__kerguelen),
			_Utils_Tuple2('Indian/Mahe', $justinmimbs$timezone_data$TimeZone$indian__mahe),
			_Utils_Tuple2('Indian/Maldives', $justinmimbs$timezone_data$TimeZone$indian__maldives),
			_Utils_Tuple2('Indian/Mauritius', $justinmimbs$timezone_data$TimeZone$indian__mauritius),
			_Utils_Tuple2('Indian/Mayotte', $justinmimbs$timezone_data$TimeZone$indian__mayotte),
			_Utils_Tuple2('Indian/Reunion', $justinmimbs$timezone_data$TimeZone$indian__reunion),
			_Utils_Tuple2('Pacific/Apia', $justinmimbs$timezone_data$TimeZone$pacific__apia),
			_Utils_Tuple2('Pacific/Auckland', $justinmimbs$timezone_data$TimeZone$pacific__auckland),
			_Utils_Tuple2('Pacific/Bougainville', $justinmimbs$timezone_data$TimeZone$pacific__bougainville),
			_Utils_Tuple2('Pacific/Chatham', $justinmimbs$timezone_data$TimeZone$pacific__chatham),
			_Utils_Tuple2('Pacific/Chuuk', $justinmimbs$timezone_data$TimeZone$pacific__chuuk),
			_Utils_Tuple2('Pacific/Easter', $justinmimbs$timezone_data$TimeZone$pacific__easter),
			_Utils_Tuple2('Pacific/Efate', $justinmimbs$timezone_data$TimeZone$pacific__efate),
			_Utils_Tuple2('Pacific/Enderbury', $justinmimbs$timezone_data$TimeZone$pacific__enderbury),
			_Utils_Tuple2('Pacific/Fakaofo', $justinmimbs$timezone_data$TimeZone$pacific__fakaofo),
			_Utils_Tuple2('Pacific/Fiji', $justinmimbs$timezone_data$TimeZone$pacific__fiji),
			_Utils_Tuple2('Pacific/Funafuti', $justinmimbs$timezone_data$TimeZone$pacific__funafuti),
			_Utils_Tuple2('Pacific/Galapagos', $justinmimbs$timezone_data$TimeZone$pacific__galapagos),
			_Utils_Tuple2('Pacific/Gambier', $justinmimbs$timezone_data$TimeZone$pacific__gambier),
			_Utils_Tuple2('Pacific/Guadalcanal', $justinmimbs$timezone_data$TimeZone$pacific__guadalcanal),
			_Utils_Tuple2('Pacific/Guam', $justinmimbs$timezone_data$TimeZone$pacific__guam),
			_Utils_Tuple2('Pacific/Honolulu', $justinmimbs$timezone_data$TimeZone$pacific__honolulu),
			_Utils_Tuple2('Pacific/Kiritimati', $justinmimbs$timezone_data$TimeZone$pacific__kiritimati),
			_Utils_Tuple2('Pacific/Kosrae', $justinmimbs$timezone_data$TimeZone$pacific__kosrae),
			_Utils_Tuple2('Pacific/Kwajalein', $justinmimbs$timezone_data$TimeZone$pacific__kwajalein),
			_Utils_Tuple2('Pacific/Majuro', $justinmimbs$timezone_data$TimeZone$pacific__majuro),
			_Utils_Tuple2('Pacific/Marquesas', $justinmimbs$timezone_data$TimeZone$pacific__marquesas),
			_Utils_Tuple2('Pacific/Midway', $justinmimbs$timezone_data$TimeZone$pacific__midway),
			_Utils_Tuple2('Pacific/Nauru', $justinmimbs$timezone_data$TimeZone$pacific__nauru),
			_Utils_Tuple2('Pacific/Niue', $justinmimbs$timezone_data$TimeZone$pacific__niue),
			_Utils_Tuple2('Pacific/Norfolk', $justinmimbs$timezone_data$TimeZone$pacific__norfolk),
			_Utils_Tuple2('Pacific/Noumea', $justinmimbs$timezone_data$TimeZone$pacific__noumea),
			_Utils_Tuple2('Pacific/Pago_Pago', $justinmimbs$timezone_data$TimeZone$pacific__pago_pago),
			_Utils_Tuple2('Pacific/Palau', $justinmimbs$timezone_data$TimeZone$pacific__palau),
			_Utils_Tuple2('Pacific/Pitcairn', $justinmimbs$timezone_data$TimeZone$pacific__pitcairn),
			_Utils_Tuple2('Pacific/Pohnpei', $justinmimbs$timezone_data$TimeZone$pacific__pohnpei),
			_Utils_Tuple2('Pacific/Port_Moresby', $justinmimbs$timezone_data$TimeZone$pacific__port_moresby),
			_Utils_Tuple2('Pacific/Rarotonga', $justinmimbs$timezone_data$TimeZone$pacific__rarotonga),
			_Utils_Tuple2('Pacific/Saipan', $justinmimbs$timezone_data$TimeZone$pacific__saipan),
			_Utils_Tuple2('Pacific/Tahiti', $justinmimbs$timezone_data$TimeZone$pacific__tahiti),
			_Utils_Tuple2('Pacific/Tarawa', $justinmimbs$timezone_data$TimeZone$pacific__tarawa),
			_Utils_Tuple2('Pacific/Tongatapu', $justinmimbs$timezone_data$TimeZone$pacific__tongatapu),
			_Utils_Tuple2('Pacific/Wake', $justinmimbs$timezone_data$TimeZone$pacific__wake),
			_Utils_Tuple2('Pacific/Wallis', $justinmimbs$timezone_data$TimeZone$pacific__wallis)
		]));
var $justinmimbs$timezone_data$TimeZone$getZone = A2(
	$elm$core$Task$andThen,
	function (nameOrOffset) {
		if (nameOrOffset.$ === 'Name') {
			var zoneName = nameOrOffset.a;
			var _v1 = A2($elm$core$Dict$get, zoneName, $justinmimbs$timezone_data$TimeZone$zones);
			if (_v1.$ === 'Just') {
				var zone = _v1.a;
				return $elm$core$Task$succeed(
					_Utils_Tuple2(
						zoneName,
						zone(_Utils_Tuple0)));
			} else {
				return $elm$core$Task$fail(
					$justinmimbs$timezone_data$TimeZone$NoDataForZoneName(zoneName));
			}
		} else {
			return $elm$core$Task$fail($justinmimbs$timezone_data$TimeZone$NoZoneName);
		}
	},
	$elm$time$Time$getZoneName);
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Clock$init = function (_v0) {
	return _Utils_Tuple2(
		{
			busyHours: _List_Nil,
			clockWidth: '300px',
			colourInput: '',
			endHourInput: '',
			endMinuteInput: '',
			error: '',
			showBusyDialog: false,
			startHourInput: '',
			startMinuteInput: '',
			time: A3($author$project$Clock$TimeOfDay, 0, 0, 0),
			timeZone: $elm$time$Time$utc
		},
		A2($elm$core$Task$attempt, $author$project$Clock$ReceiveTimeZone, $justinmimbs$timezone_data$TimeZone$getZone));
};
var $author$project$Clock$Tick = function (a) {
	return {$: 'Tick', a: a};
};
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $author$project$Clock$second = 1000;
var $author$project$Clock$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, $author$project$Clock$second, $author$project$Clock$Tick);
};
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $author$project$Clock$dateFromPosix = F2(
	function (zone, time) {
		return A3(
			$author$project$Clock$TimeOfDay,
			A2($elm$time$Time$toHour, zone, time),
			A2($elm$time$Time$toMinute, zone, time),
			A2($elm$time$Time$toSecond, zone, time));
	});
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (maybe.$ === 'Just') {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		if (ra.$ === 'Err') {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 'Err') {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				if (rc.$ === 'Err') {
					var x = rc.a;
					return $elm$core$Result$Err(x);
				} else {
					var c = rc.a;
					if (rd.$ === 'Err') {
						var x = rd.a;
						return $elm$core$Result$Err(x);
					} else {
						var d = rd.a;
						if (re.$ === 'Err') {
							var x = re.a;
							return $elm$core$Result$Err(x);
						} else {
							var e = re.a;
							return $elm$core$Result$Ok(
								A5(func, a, b, c, d, e));
						}
					}
				}
			}
		}
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$String$trim = _String_trim;
var $author$project$Clock$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Tick':
				var newTime = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							time: A2($author$project$Clock$dateFromPosix, model.timeZone, newTime)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ReceiveTimeZone':
				if (msg.a.$ === 'Ok') {
					var _v1 = msg.a.a;
					var zone = _v1.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{timeZone: zone}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'ShowBusyDialog':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{showBusyDialog: true}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateStartHour':
				var hour = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{startHourInput: hour}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateStartMinute':
				var minute = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{startMinuteInput: minute}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateEndHour':
				var hour = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{endHourInput: hour}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateEndMinute':
				var minute = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{endMinuteInput: minute}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateColour':
				var colour = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{colourInput: colour}),
					$elm$core$Platform$Cmd$none);
			case 'AddBusyClicked':
				var stringToInt = F2(
					function (string, max) {
						return A2(
							$elm$core$Result$andThen,
							function (h) {
								return ((h >= 0) && (_Utils_cmp(h, max) < 0)) ? $elm$core$Result$Ok(h) : $elm$core$Result$Err(
									'Must be between 0 and ' + ($elm$core$String$fromInt(max) + (': ' + string)));
							},
							A2(
								$elm$core$Result$fromMaybe,
								'Error parsing string: ' + string,
								$elm$core$String$toInt(
									$elm$core$String$trim(string))));
					});
				var startMinute = A2(stringToInt, model.startMinuteInput, 60);
				var startHour = A2(stringToInt, model.startHourInput, 24);
				var endMinute = A2(stringToInt, model.endMinuteInput, 60);
				var endHour = A2(stringToInt, model.endHourInput, 24);
				var colour = ($elm$core$String$length(model.colourInput) > 2) ? $elm$core$Result$Ok(model.colourInput) : $elm$core$Result$Err('No colour selected.');
				var busy = A6(
					$elm$core$Result$map5,
					F5(
						function (sh, sm, eh, em, c) {
							return {
								colour: c,
								endTime: {hour: eh, minute: em, second: 0},
								startTime: {hour: sh, minute: sm, second: 0}
							};
						}),
					startHour,
					startMinute,
					endHour,
					endMinute,
					colour);
				return _Utils_Tuple2(
					function () {
						if (busy.$ === 'Ok') {
							var b = busy.a;
							return _Utils_update(
								model,
								{
									busyHours: A2($elm$core$List$cons, b, model.busyHours),
									colourInput: '',
									endHourInput: '',
									endMinuteInput: '',
									error: '',
									startHourInput: '',
									startMinuteInput: ''
								});
						} else {
							var error = busy.a;
							return _Utils_update(
								model,
								{error: error});
						}
					}(),
					$elm$core$Platform$Cmd$none);
			case 'DoneButtonClicked':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{showBusyDialog: false}),
					$elm$core$Platform$Cmd$none);
			default:
				var busy = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							busyHours: A2(
								$elm$core$List$filter,
								function (b) {
									return !_Utils_eq(b, busy);
								},
								model.busyHours)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Clock$ShowBusyDialog = {$: 'ShowBusyDialog'};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Clock$arcToInner = F4(
	function (large, r, x, y) {
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					'A',
					$elm$core$String$fromInt(r),
					$elm$core$String$fromInt(r),
					large ? '0 1 0' : '0 0 0',
					$elm$core$String$fromFloat(x),
					$elm$core$String$fromFloat(y)
				]));
	});
var $author$project$Clock$arcToOuter = F4(
	function (large, r, x, y) {
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					'A',
					$elm$core$String$fromInt(r),
					$elm$core$String$fromInt(r),
					large ? '0 1 1' : '0 0 1',
					$elm$core$String$fromFloat(x),
					$elm$core$String$fromFloat(y)
				]));
	});
var $elm$core$Basics$cos = _Basics_cos;
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$opacity = _VirtualDom_attribute('opacity');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $author$project$Clock$pathLineTo = F2(
	function (x, y) {
		return 'L ' + ($elm$core$String$fromFloat(x) + (' ' + $elm$core$String$fromFloat(y)));
	});
var $author$project$Clock$pathMoveTo = F2(
	function (x, y) {
		return 'M ' + ($elm$core$String$fromFloat(x) + (' ' + $elm$core$String$fromFloat(y)));
	});
var $elm$core$Basics$sin = _Basics_sin;
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $author$project$Clock$segment = F3(
	function (startTime, endTime, colour) {
		var outerEnd = 48;
		var minuteDiff = $elm$core$Basics$abs(((endTime.hour * 5) + ((endTime.minute / 12) | 0)) - ((startTime.hour * 5) + ((startTime.minute / 12) | 0)));
		var innerStart = 42;
		var hour12 = function (time) {
			return A2($elm$core$Basics$modBy, 12, time.hour);
		};
		var hourMin = function (time) {
			return (hour12(time) * 5.0) + (time.minute / 12.0);
		};
		var time2Angle = function (time) {
			return ($elm$core$Basics$degrees(
				hourMin(time) - 15.0) * 360) / 60.0;
		};
		var startAngle = time2Angle(startTime);
		var endAngle = time2Angle(endTime);
		var parts = A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$author$project$Clock$pathMoveTo,
					$elm$core$Basics$cos(startAngle) * innerStart,
					$elm$core$Basics$sin(startAngle) * innerStart),
					A2(
					$author$project$Clock$pathLineTo,
					$elm$core$Basics$cos(startAngle) * outerEnd,
					$elm$core$Basics$sin(startAngle) * outerEnd),
					A4(
					$author$project$Clock$arcToOuter,
					minuteDiff >= 30,
					outerEnd,
					$elm$core$Basics$cos(endAngle) * outerEnd,
					$elm$core$Basics$sin(endAngle) * outerEnd),
					A2(
					$author$project$Clock$pathLineTo,
					$elm$core$Basics$cos(endAngle) * innerStart,
					$elm$core$Basics$sin(endAngle) * innerStart),
					A4(
					$author$project$Clock$arcToInner,
					minuteDiff >= 30,
					innerStart,
					$elm$core$Basics$cos(startAngle) * innerStart,
					$elm$core$Basics$sin(startAngle) * innerStart)
				]));
		return A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d(parts),
					$elm$svg$Svg$Attributes$fill(colour),
					$elm$svg$Svg$Attributes$stroke(colour),
					$elm$svg$Svg$Attributes$opacity('0.5')
				]),
			_List_Nil);
	});
var $author$project$Clock$busySegments = function (busies) {
	return A2(
		$elm$core$List$map,
		function (b) {
			return A3($author$project$Clock$segment, b.startTime, b.endTime, b.colour);
		},
		busies);
};
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $author$project$Clock$letterE = A2(
	$elm$svg$Svg$polygon,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$points('0,0 0,9 1,9 1,8.5 0.5,8.5 0.5,5 0.75,5 0.75,4 0.5,4 0.5,1 1,1 1,0'),
			$elm$svg$Svg$Attributes$transform('translate(-3,15)')
		]),
	_List_Nil);
var $author$project$Clock$letterL = A2(
	$elm$svg$Svg$polygon,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$points('0,0 0,1 0.5,1 0.5,9 1,9 1,8.5 0.5,8.5 0.5,0'),
			$elm$svg$Svg$Attributes$transform('translate(0,15)')
		]),
	_List_Nil);
var $author$project$Clock$letterM = _List_fromArray(
	[
		A2(
		$elm$svg$Svg$polygon,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points('0,4 0,9 0.25,9 0.25,4 '),
				$elm$svg$Svg$Attributes$transform('translate(3,15)')
			]),
		_List_Nil),
		A2(
		$elm$svg$Svg$polygon,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points('0.25,5 4,5 4,5.5 0.25,5.5 '),
				$elm$svg$Svg$Attributes$transform('translate(3,15)')
			]),
		_List_Nil),
		A2(
		$elm$svg$Svg$polygon,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points('4,5.5 4,9 3.75,9 3.75,5.5'),
				$elm$svg$Svg$Attributes$transform('translate(3,15)')
			]),
		_List_Nil),
		A2(
		$elm$svg$Svg$polygon,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points('2,5.5 2,9 1.75,9 1.75,5.5'),
				$elm$svg$Svg$Attributes$transform('translate(3,15)')
			]),
		_List_Nil)
	]);
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $author$project$Clock$minuteToAngle = function (minute) {
	return ((minute - 15.0) * 360) / 60.0;
};
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $author$project$Clock$tick = function (minute) {
	var tickStart = (!A2($elm$core$Basics$modBy, 5, minute)) ? '35' : '42';
	var angle = $elm$core$String$fromFloat(
		$author$project$Clock$minuteToAngle(minute));
	return A2(
		$elm$svg$Svg$line,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x1(tickStart),
				$elm$svg$Svg$Attributes$y1('0'),
				$elm$svg$Svg$Attributes$x2('49'),
				$elm$svg$Svg$Attributes$y2('0'),
				$elm$svg$Svg$Attributes$transform('rotate(' + (angle + ')'))
			]),
		_List_Nil);
};
var $author$project$Clock$tickMarks = A2(
	$elm$core$List$map,
	$author$project$Clock$tick,
	A2($elm$core$List$range, 1, 60));
var $author$project$Clock$clockFace = _Utils_ap(
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$cx('0'),
					$elm$svg$Svg$Attributes$cy('0'),
					$elm$svg$Svg$Attributes$r('49'),
					$elm$svg$Svg$Attributes$fill('white')
				]),
			_List_Nil),
			$author$project$Clock$letterE,
			$author$project$Clock$letterL
		]),
	_Utils_ap($author$project$Clock$letterM, $author$project$Clock$tickMarks));
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $author$project$Clock$hourMinute = function (theTimeNow) {
	return (A2($elm$core$Basics$modBy, 12, theTimeNow.hour) * 5) + ((theTimeNow.minute / 12) | 0);
};
var $author$project$Clock$xLine = F2(
	function (start, end) {
		return A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1(start),
					$elm$svg$Svg$Attributes$y1('0'),
					$elm$svg$Svg$Attributes$x2(end),
					$elm$svg$Svg$Attributes$y2('0')
				]),
			_List_Nil);
	});
var $author$project$Clock$hourHand = function (theDateNow) {
	var angle = $author$project$Clock$minuteToAngle(
		$author$project$Clock$hourMinute(theDateNow));
	return _List_fromArray(
		[
			A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$transform(
					'rotate(' + ($elm$core$String$fromFloat(angle) + ')'))
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$polygon,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$points('0,0 4,4 20,0 4, -4'),
							$elm$svg$Svg$Attributes$transform('translate(10,0)')
						]),
					_List_Nil),
					A2($author$project$Clock$xLine, '0', '10')
				]))
		]);
};
var $author$project$Clock$minutesHand = function (theTimeNow) {
	var angle = $author$project$Clock$minuteToAngle(theTimeNow.minute);
	return _List_fromArray(
		[
			A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$transform(
					'rotate(' + ($elm$core$String$fromFloat(angle) + ')'))
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$polygon,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$points('0,0 2,2 29,0 2, -2'),
							$elm$svg$Svg$Attributes$transform('translate(5,0)')
						]),
					_List_Nil),
					A2($author$project$Clock$xLine, '0', '5')
				]))
		]);
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$svg$Svg$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $author$project$Clock$secondsHand = function (theTimeNow) {
	var angle = $author$project$Clock$minuteToAngle(theTimeNow.second);
	return _List_fromArray(
		[
			A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$transform(
					'rotate(' + ($elm$core$String$fromFloat(angle) + ')'))
				]),
			_List_fromArray(
				[
					A2($author$project$Clock$xLine, '-5', '40'),
					A2(
					$elm$svg$Svg$circle,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$cx('0'),
							$elm$svg$Svg$Attributes$cy('0'),
							$elm$svg$Svg$Attributes$r('5'),
							$elm$svg$Svg$Attributes$fillOpacity('0'),
							$elm$svg$Svg$Attributes$transform('translate(30,0)')
						]),
					_List_Nil)
				]))
		]);
};
var $author$project$Clock$clockFn = F2(
	function (busyHours, theDateNow) {
		return _List_fromArray(
			[
				A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill('black'),
						$elm$svg$Svg$Attributes$stroke('black'),
						$elm$svg$Svg$Attributes$transform('translate(50,50)'),
						$elm$svg$Svg$Events$onClick($author$project$Clock$ShowBusyDialog)
					]),
				_Utils_ap(
					$author$project$Clock$clockFace,
					_Utils_ap(
						$author$project$Clock$busySegments(busyHours),
						_Utils_ap(
							$author$project$Clock$hourHand(theDateNow),
							_Utils_ap(
								$author$project$Clock$minutesHand(theDateNow),
								$author$project$Clock$secondsHand(theDateNow))))))
			]);
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Clock$AddBusyClicked = {$: 'AddBusyClicked'};
var $author$project$Clock$DoneButtonClicked = {$: 'DoneButtonClicked'};
var $author$project$Clock$UpdateEndHour = function (a) {
	return {$: 'UpdateEndHour', a: a};
};
var $author$project$Clock$UpdateEndMinute = function (a) {
	return {$: 'UpdateEndMinute', a: a};
};
var $author$project$Clock$UpdateStartHour = function (a) {
	return {$: 'UpdateStartHour', a: a};
};
var $author$project$Clock$UpdateStartMinute = function (a) {
	return {$: 'UpdateStartMinute', a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $author$project$Clock$UpdateColour = function (a) {
	return {$: 'UpdateColour', a: a};
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Clock$colorSelector = function (_v0) {
	var color2Option = function (colour) {
		return A2(
			$elm$html$Html$option,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value(colour)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(colour)
				]));
	};
	var options = A2(
		$elm$core$List$map,
		color2Option,
		_List_fromArray(
			['pick a color', 'red', 'green', 'yellow', 'blue', 'grey']));
	return A2(
		$elm$html$Html$select,
		_List_fromArray(
			[
				$elm$html$Html$Events$onInput($author$project$Clock$UpdateColour)
			]),
		options);
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$Clock$viewBusyControls = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput($author$project$Clock$UpdateStartHour),
								$elm$html$Html$Attributes$value(model.startHourInput)
							]),
						_List_Nil),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput($author$project$Clock$UpdateStartMinute),
								$elm$html$Html$Attributes$value(model.startMinuteInput)
							]),
						_List_Nil),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput($author$project$Clock$UpdateEndHour),
								$elm$html$Html$Attributes$value(model.endHourInput)
							]),
						_List_Nil),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput($author$project$Clock$UpdateEndMinute),
								$elm$html$Html$Attributes$value(model.endMinuteInput)
							]),
						_List_Nil),
						$author$project$Clock$colorSelector(model),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('submit'),
								$elm$html$Html$Events$onClick($author$project$Clock$AddBusyClicked)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Add')
							]))
					])),
				$elm$html$Html$text(model.error),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('submit'),
						$elm$html$Html$Events$onClick($author$project$Clock$DoneButtonClicked),
						$elm$svg$Svg$Attributes$width('100%')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Done')
					]))
			]));
};
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$Clock$RemoveBusy = function (a) {
	return {$: 'RemoveBusy', a: a};
};
var $author$project$Clock$busyToString = function (timeOfDay) {
	return A2(
		$elm$core$String$join,
		':',
		_List_fromArray(
			[
				$elm$core$String$fromInt(timeOfDay.hour),
				$elm$core$String$fromInt(timeOfDay.minute)
			]));
};
var $elm$html$Html$td = _VirtualDom_node('td');
var $author$project$Clock$viewBusy = function (busy) {
	return A2(
		$elm$html$Html$tr,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$td,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						$author$project$Clock$busyToString(busy.startTime))
					])),
				A2(
				$elm$html$Html$td,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						$author$project$Clock$busyToString(busy.endTime))
					])),
				A2(
				$elm$html$Html$td,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(busy.colour)
					])),
				A2(
				$elm$html$Html$td,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Clock$RemoveBusy(busy))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('X')
							]))
					]))
			]));
};
var $author$project$Clock$viewBusyHours = function (busies) {
	return A2(
		$elm$html$Html$table,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$thead,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Start')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('End')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Colour')
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Remove')
									]))
							]))
					])),
				A2(
				$elm$html$Html$tbody,
				_List_Nil,
				A2($elm$core$List$map, $author$project$Clock$viewBusy, busies))
			]));
};
var $author$project$Clock$viewBusyDialog = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text('Busy hours'),
				$author$project$Clock$viewBusyHours(model.busyHours),
				$author$project$Clock$viewBusyControls(model)
			]));
};
var $author$project$Clock$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'padding', '10px'),
						A2($elm$html$Html$Attributes$style, 'width', '100%')
					]),
				model.showBusyDialog ? _List_fromArray(
					[
						$author$project$Clock$viewBusyDialog(model)
					]) : _List_fromArray(
					[
						A2(
						$elm$svg$Svg$svg,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$viewBox('0 0 100 100'),
								$elm$svg$Svg$Attributes$width('100%')
							]),
						A2($author$project$Clock$clockFn, model.busyHours, model.time))
					]))
			]));
};
var $author$project$Clock$main = $elm$browser$Browser$element(
	{init: $author$project$Clock$init, subscriptions: $author$project$Clock$subscriptions, update: $author$project$Clock$update, view: $author$project$Clock$view});
_Platform_export({'Clock':{'init':$author$project$Clock$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));