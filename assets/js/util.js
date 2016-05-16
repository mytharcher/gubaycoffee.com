/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-01-14 by mytharcher
 * 
 * update:
 */
/**
 * @ignore
 * 修复数组没有every函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
 */
if (!Array.prototype.every) {
	/**
	 * @class Array
	 */
	
	/**
	 * 测试数组中是否全部元素都能通过提供的测试函数
	 * @method every
	 * @param {Function} fun 要执行的测试函数
	 * @param {Object} thisp 可选，指定函数执行的作用域
	 * @return {Boolean} 如果全部元素都通过检测的，则返回true；如果有一个没有通过，就返回false。
	 */
	Array.prototype.every = function(fun /*, thisp */) {
		"use strict";
		
		if (typeof this == 'undefined' || this === null)
			throw new TypeError();
		
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();
		
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t && !fun.call(thisp, t[i], i, t))
				return false;
		}
		
		return true;
	};
}

/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-01-15 by mytharcher
 * 
 * update:
 */
/**
 * @ignore
 * 修复数组没有filter函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
 */
if (!Array.prototype.filter) {
	/**
	 * @class Array
	 */
	
	/**
	 * 根据条件过滤数组
	 * @method filter
	 * @param {Function} fun 要执行的操作函数
	 * @param {Object} thisp 可选，指定函数执行的作用域
	 * @return {Array} 返回通过过滤条件的元素组成的副本数组
	 */
	Array.prototype.filter = function(fun /*, thisp */){
		"use strict";
		if (typeof this == 'undefined' || this === null) 
			throw new TypeError();
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function") 
			throw new TypeError();
		var res = [];
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i]; // in case fun mutates this
				if (fun.call(thisp, val, i, t)) 
					res.push(val);
			}
		}
		return res;
	};
}

/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-15 by mytharcher
 * 
 * update:
 * @2010-12-27 by mytharcher
 */
/**
 * @ignore
 * 修复数组没有forEach函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
 */
if (!Array.prototype.forEach) {
	/**
	 * @class Array
	 */
	
	/**
	 * 对数组每一项执行操作
	 * @method forEach
	 * @param {Function} fun 要执行的操作函数
	 * @param {Object} thisp 可选，指定函数执行的作用域
	 */
	Array.prototype.forEach = function(fun /*, thisp */){
		"use strict";
		
		if (typeof this == 'undefined' || this === null) 
			throw new TypeError();
		
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function") 
			throw new TypeError();
		
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t) 
				fun.call(thisp, t[i], i, t);
		}
	};
}

/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-02-27 by mytharcher
 * 
 * update:
 * @2010-12-27 by mytharcher
 * 		[m] Simplify the code.
 */
/**
 * @ignore
 * 修复数组没有indexOf函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
 */
if (!Array.prototype.indexOf) {
	/**
	 * @class Array
	 */
	
	/**
	 * 在数组中查找一个元素第一次出现的索引位置。
	 * @method indexOf
	 * @param {Any} searchElement
	 * @param {Number}  fromIndex
	 * @return {Number}
	 */
	Array.prototype.indexOf = function(searchElement /*, fromIndex */){
		"use strict";
		
		if (typeof this == 'undefined' || this === null) 
			throw new TypeError();
		
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) 
			return -1;
		
		var n = 0;
		if (arguments.length > 0) {
			n = Number(arguments[1]);
			if (n !== n) 
				n = 0;
			else 
				if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) 
					n = (n > 0 || -1) * Math.floor(Math.abs(n));
		}
		
		if (n >= len) 
			return -1;
		
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) 
				return k;
		}
		return -1;
	};
}

/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-01-14 by mytharcher
 * 
 * update:
 */
/**
 * @ignore
 * 修复数组没有map函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
 */
if (!Array.prototype.map){
	/**
	 * @class Array
	 */
	
	/**
	 * 对数组每一项执行操作，并返回每一个操作的返回值组成的数组
	 * @method map
	 * @param {Function} fun 要执行的操作函数
	 * @param {Object} thisp 可选，指定函数执行的作用域
	 * @return {Array}
	 */
	Array.prototype.map = function(fun /*, thisp */){
		"use strict";
		
		if (typeof this == 'undefined' || this === null) 
			throw new TypeError();
		
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function") 
			throw new TypeError();
		
		var res = new Array(len);
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t) 
				res[i] = fun.call(thisp, t[i], i, t);
		}
		
		return res;
	};
}

/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-01-14 by mytharcher
 * 
 * update:
 */
/**
 * @ignore
 * 修复数组没有some函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
 */
if (!Array.prototype.some) {
	/**
	 * @class Array
	 */
	
	/**
	 * 测试数组中是否至少有一个元素能通过提供的测试函数
	 * @method some
	 * @param {Function} fun 要执行的测试函数
	 * @param {Object} thisp 可选，指定函数执行的作用域
	 * @return {Boolean} 如果有通过检测的元素，则返回true；如果一个都没有，则返回false。
	 */
	Array.prototype.some = function(fun /*, thisp */) {
		"use strict";
		
		if (typeof this == 'undefined' || this === null)
			throw new TypeError();
		
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();
		
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t && fun.call(thisp, t[i], i, t))
				return true;
		}
		
		return false;
	};
}

/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-12-27 by mytharcher
 * 
 * update:
 */
/**
 * @class Function
 */
/**
 * 返回一个作用域被修改为参数指向对象的当前函数
 * @method bind
 * 
 * @param {Object} obj
 * 
 * @return {Function}
 */
if (!Function.prototype.bind) {
	Function.prototype.bind = function(obj) {
		var slice = [].slice,
			args = slice.call(arguments, 1), 
			sjs = this, 
			nop = new Function(), 
			bound = function () {
				return sjs.apply( this instanceof nop ? this : ( obj || {} ), 
					args.concat( slice.call(arguments) ) );	
			};
	
		nop.prototype = sjs.prototype;
	
		bound.prototype = new nop();
		
		return bound;
	};
}

//if (!Function.prototype.bind) {
//	Function.prototype.bind = function(obj){
//		var me = this,
//			slice = [].slice,
//			args = slice.call(arguments, 1);
//		return function () {
//			return me.apply(obj, args.concat(slice.call(arguments)));
//		}
//	}
//}

/*
 * js Javascript Library
 * 
 * craete:
 * @2010-11-07 by mytharcher
 * 
 * update:
 * @2010-11-16 by mytharcher
 * @2010-12-26 by mytharcher
 */
/**
 * @ignore
 * 修复Object没有keys函数
 */
if (!Object.keys) {
	/**
	 * @class Object
	 */
	
	/**
	 * 返回对象上所有可枚举的属性名组成的数组
	 * @method Object.keys
	 * @static
	 * @param {Object} o
	 * @return {Array}
	 */
	Object.keys = function (o) {
		var result = [];
		for(var name in o) {
			if (o.hasOwnProperty(name))
				result.push(name);
		}
		return result;
	};
}

/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-02-02 by mytharcher
 * 
 * update:
 * @2010-11-21 by mytharcher
 * @2010-02-13 by mytharcher
 * 
 */
/*!
 * jslib JavaScript Library
 * 
 * Copyright (c) since 2010. All rights reserved.
 * 
 * Author: mytharcher <mytharcher@gmail.com>
 */
/*
 * create:
 * @2010-2-27 by mytharcher
 * 
 * update:
 * @2010-11-17 by mytharcher
 * @2010-11-26 by mytharcher
 * @2010-12-19 by mytharcher:
 * 		[m] Change all mechanism of Shortcut.
 * @2010-12-21 by mytharcher:
 * 		[m] Simplify the Shortcut dispatch invoke.
 * @2011-04-14 by mytharcher:
 * 		[m] Change the top namespace to "js", in order to make the library to be more common.
 */
/**
 * @class js
 * 声明js顶级命名空间
 */
var js = js || {};


/**
 * @ignore
 * 声明text包，文本处理
 */
js.text = {};

/*
 * jslib JavaScript Library
 * 
 * from baidu Tangram: baidu.string.escapeReg
 * 
 * create:
 * @2010-11-20 by mytharcher
 * 
 * update:
 * 
 */
/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-20 by mytharcher
 * 
 * update:
 * 
 */

/**
 * @class js.text.Escaper
 * 转义函数集
 * @static
 * @singleton
 */
js.text.Escaper = js.text.Escaper || {};


/**
 * @class js.text.Escaper
 */
/**
 * 转义字符串中的正则相关字符
 * @method escapeReg
 * @static
 * 
 * @param {String} source 要转义的字符串
 * 
 * @return {String} 转义后的字符串
 */
js.text.Escaper.escapeReg = js.text.Escaper.escapeReg || function (source) {
	return String(source)
		.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\\x241');
};


/**
 * @class js.text.Template 文本拼串模板类
 * @static
 * @singleton
 */
js.text.Template = js.text.Template || {
	/**
	 * @final
	 * @property LEFT_DELIMITER 变量左边界
	 * @type {String}
	 */
	LEFT_DELIMITER: '#{',
	
	/**
	 * @final
	 * @property RIGHT_DELIMITER 变量右边界
	 * @type {String}
	 */
	RIGHT_DELIMITER: '}',
	
	/**
	 * @ignore
	 * @private
	 * 缓存已编译的模板，未考虑缓存上限及管理机制
	 */
	compiled: {},
	
	/**
	 * 模板缓存管理
	 * @method js.text.Template.cache
	 * @static
	 * 
	 * <p>查找缓存看是否已经被缓存，如果是则返回缓存的模板方法，否则生成该模板的模板方法并缓存</p>
	 * 
	 * @param {String} tpl 模板字符串
	 * 
	 * @return {Function} 返回模板方法
	 */
	cache: function (tpl) {
		var Template = js.text.Template,
			compiled = Template.compiled[tpl];
		if (!compiled) {
			compiled = Template.compiled[tpl] = Template.compile(tpl);
		}
		return compiled;
	},
	
	/**
	 * 预编译模板
	 * @method js.text.Template.compile
	 * @static
	 * 
	 * @param {String} tpl
	 * 
	 * @return {Function}
	 */
	compile: function (tpl) {
		var Template = js.text.Template;
		if (!Template._re) {
			Template.delimiter();
		}
		var fnBody = [
			'var args = args && typeof args == "object" ? args : [].slice.call(arguments, 0);',
			'return ["',
			tpl.replace(/(["'])/g, '\\\x241').replace(Template._re, '", args["\x241"], "'),
			'"].join("");'
		].join('');
		
		return new Function('args', fnBody);
	},
	
	/**
	 * 格式化模板
	 * @method js.text.Template.format
	 * @static
	 * 
	 * @param {String/Function} tpl 使用的模板，可以是一个函数，使用函数可以做更高级的扩展
	 * @param {Any...} vars 模板变量群，可以是Object，也可以是更多的类String型的参数
	 * 
	 * @return {String}
	 */
	format: function(tpl, vars){
		var args = [].slice.call(arguments, 1);
		//支持函数扩展处理
		if (typeof tpl == 'function') {
			return tpl.apply(null, args);
		}
		return js.text.Template.cache(tpl).apply(null, args);
		
		// return (typeof tpl == 'function' ? tpl : js.text.Template.cache(tpl)).apply(null, args);
	},
	
	/**
	 * 修改定界符
	 * @method js.text.Template.delimiter
	 * @static
	 * 
	 * @param {String} left
	 * @param {String} right
	 * 
	 * @return {void}
	 */
	delimiter: function (left, right) {
		var Template = js.text.Template,
			escapeReg = js.text.Escaper.escapeReg;
		Template._re = new RegExp(escapeReg(left || Template.LEFT_DELIMITER) + '(\\w+)' + escapeReg(right || Template.RIGHT_DELIMITER), 'ig');
	}
};


js.util = {};

/*
 * jslib JavaScript Library
 * 
 * create: 
 * @2010-02-27 by mytharcher
 * 
 * update:
 * @2010-04-09 by mytharcher
 * @2010-07-23 by mytharcher
 * @2010-11-17 by mytharcher
 * @2010-12-23 by mytharcher [m] Modify method "extend", "clone" and "copy" will all implement by "extend".
 * @2011-01-10 by mytharcher [m] Fix bug in method "extend", especially for extend an object contains a constructor key.
 * @2011-06-29 by mytharcher [m] Fix bug in method "create" and "inherit", for supporting the syntax of "subClassInstance instanceof SuperClass == true".
 * @2011-08-13 by mytharcher
 *      [m] Change the method "extend" to "mix" to avoid confusion about extend actions.
 * @2011-08-18 by mytharcher
 *      [m] Move the implement process from method "inherit" to "create" for clean.
 * @2011-08-24 by mytharcher
 *      [m] Change class inheritship property "superClass" in newly created classes to "Super".
 *      [d] Remove prototype property "_super" from newly created classes.
 *      [m] Modify "implement" API to support more arguments.
 * @2011-09-02 by mytharcher
 *      [m] Add array support for method "mix" to specify the argument "override".
 * @2011-09-25 by mytharcher
 *      [m] Change method "mix" to allow copy empty properties.
 * @2011-10-30 by mytharcher
 *      [m] Abandon the auto-created constructor in newly created class without specifying a own constructor, for being more common as other languages.
 *      [m] Remove "Super" in newly created sub-class to avoid confusion.
 * @2012-01-10 by mytharcher
 *      [m] Change the type judgement from by the class js.util.Type to native implement by typeof expression, to cut off the dependency circle.
 */

///import js.client.Features.~arrayIndexOf;
///import js.client.Features.~objectKeys;
///import js.util;

/**
 * @class js.util.Class
 * 类管理
 * @static
 * @singleton
 */
js.util.Class = js.util.Class || {
	/**
	 * 通过克隆一个对象的所有层级的属性产生一个新的对象
	 * @method js.util.Class.clone
	 * @static
	 * 
	 * @param {Object} source 克隆源
	 * @param {Object} target (optional)克隆目标，不输入则自动创建。
	 * 
	 * @return {Object}
	 */
	clone: function (source, target) {
		return js.util.Class.mix(target, source, true, true);
	},
	
	/**
	 * 复制源对象上的属性到目标对象
	 * @method js.util.Class.copy
	 * @static
	 * 
	 * @param {Object...} source 复制源
	 * @param {Object} target (optional)复制目标
	 * @param {Boolean} deep (optional)是否深度复制
	 * 
	 * @return {Object}
	 */
	copy: function (source) {
		var len = arguments.length,
			lastIndex = len - 1,
			deep = arguments[lastIndex],
			hasDeep = typeof deep == 'boolean',
			target;
		
		if (lastIndex > 0) {
			if (hasDeep) {
				if (lastIndex > 1) {
					target = arguments[--lastIndex];
				}
			} else {
				target = deep;
				deep = false;
				lastIndex--;
			}
		} else {
			deep = false;
		}
		for (var i = 0; i <= lastIndex; i++) {
			target = js.util.Class.mix(target, arguments[i], true, deep);
		}
		return target;
		// return js.util.Class.mix(target, source, true, deep);
	},
	
	/**
	 * 以一个对象上有的属性扩展另一个对象，默认不覆盖已有的同名属性
	 * @method js.util.Class.mix
	 * @static
	 * 
	 * @param {Object} target 被扩展的对象
	 * @param {Object} source 源对象
	 * @param {Boolean/Function/Array} override (optional)是否覆盖已存在的属性。该参数或函数返回的值在如下三种情况下，undefined：如果已存在则不覆盖；true：强制覆盖；false：忽略该属性。默认：undefined。
	 * @param {Boolean} deep 是否深度扩展，默认：false；
	 * 
	 * @return {Object}
	 */
	mix: (function (specialKeys) {
		function doMix (target, source, key, override, deep, deleteNull) {
			var over, item,
				overDef = typeof override != 'undefined',
				Class = js.util.Class;
			if (overDef) {
				over = typeof override == 'function' ?
					override.call(source, key)
					: (override instanceof Array ?
						override.indexOf(key) >= 0
						: override);
			}
			
			if (source.hasOwnProperty(key) &&
				(overDef && typeof over != 'undefined' ?
					over : !target.hasOwnProperty(key))
			) {
				item = source[key];
				target[key] = deep ? Class.mix(target[key], item, true, true) : item;
				if (deleteNull && item === null) {
					delete target[key];
				}
			}
		}
		
		return function (target, source, override, deep) {
			var
				isFunction = Object.prototype.toString.call(source) == '[object Function]',
				isObject = source && typeof source == 'object' && !isFunction,
				isArray = source instanceof Array,
				keys = [], i, len;
			if (isObject || (isFunction && !deep)) {
				target = target || (isArray ? [] : {});
				
				if (isArray) {
					for (i = 0, len = source.length; i < len; ) {
						doMix(target, source, i++, override, deep);
					}
				} else {
					keys = Object.keys(source);
				}
				
				keys = keys.concat(specialKeys);
				for (i = 0, len = keys.length; i < len; ) {
					doMix(target, source, keys[i++], override, deep, true);
				}
			} else {
				target = source;
			}
			return target;
		};
	})(['constructor', 'toString']),
	
	/**
	 * 创建一个类
	 * @method js.util.Class.create
	 * @static
	 * 
	 * @param {Object} proto 新类的原型
	 * @param {Function} Super 超类，非必选。如有超类，则新类会继承于超类
	 * @param {Array} interfaces 接口，非必选。如果有接口，则新类会继承接口列表中的所有原型，但不会被覆盖
	 * 
	 * @return {Function} 创建的新类
	 */
	create: function (proto, Super, interfaces) {
		var Class = js.util.Class,
			newClass = proto.hasOwnProperty('constructor') ? proto.constructor : new Function();
		
		Class.copy(proto, newClass.prototype);
		
		//如果声明了父类，则从父类继承
		Super && Class.inherit(newClass, Super);
		
		//实现接口
		if (interfaces) {
			var inters = interfaces instanceof Array ? interfaces : [].slice.call(arguments, 2);
			Class.implement(newClass, inters);
		}
		
		return newClass;
	},
	
	/**
	 * 继承一个类
	 * @method js.util.Class.inherit
	 * @static
	 * 
	 * 该继承会使用SubClass.prototype = new SuperClass()的机制继承超类，
	 * 同时会修正constructor属性，
	 * 另外，还会继承超类上所有的静态对象。
	 * 
	 * @param {Function} someClass 派生类
	 * @param {Function} Super 超类
	 * 
	 * @return {Function} 派生类
	 */
	inherit: function (someClass, Super) {
		var Class = js.util.Class,
		
			//暂存派生类原有的prototype
			proto = someClass.prototype,
		
			//超类prototype复制临时辅助类
			superHelper = new Function();
		
		//复制超类的prototype到临时辅助类
		superHelper.prototype = Super.prototype;
		
		//设置派生类的prototype为临时辅助类生成的实例
		//这里相当于给派生类一套超类干净的prototype赋值
		someClass.prototype = new superHelper();
		
		//覆盖自定义原型
		Class.copy(proto, someClass.prototype);
		
		//复制超类的静态对象到派生类
		Class.mix(someClass, Super);
		
		//设置派生类的超类属性为超类的原型
		someClass.__super__ = Super.prototype;
		
		//修复派生类的构造函数属性
		someClass.prototype.constructor = someClass;
		
		return someClass;
	},
	
	/**
	 * 实现接口
	 * @method js.util.Class.implement
	 * @static
	 * 该方法会将inter对象上的所有函数扩展到someClass的原型上，前提是someClass自己的原型上没有同名的方法。
	 * 通过此方法以达到在创建类时可以实现其他类提供的接口。
	 * 
	 * @param {Function} someClass
	 * @param {Array|Object...} inter
	 * 
	 * @return {Function} 返回实现了接口的对象someClass
	 */
	implement: function (someClass, inter) {
		if (inter) {
			var obj2str = Object.prototype.toString;
			var interfaces = inter instanceof Array ? inter : [].slice.call(arguments, 1);
			for (var i = 0, l = interfaces.length; i < l; i++) {
				var interProto = interfaces[i];
				for (var p in interProto) {
					if (interProto.hasOwnProperty(p)) {
						var protoItem = interProto[p];
						if (p != 'constructor' &&
							p != 'prototype' &&
							obj2str.call(protoItem) == '[object Function]' &&
							!someClass.prototype.hasOwnProperty(p)
						) {
							someClass.prototype[p] = protoItem;
						}
					}
				}
			}
		}
		return someClass;
	}
};