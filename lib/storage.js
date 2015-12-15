/* 
  Value type saving upon working with localStorage
*/

storage = new function() {

	var self = this;
	
	this.typesPrefix = 'DataTypes';
	
	this.Types = {
		String: 'string',
		Number : 'number',
		Boolean : 'boolean',
		Date : 'date',
		Object : 'object'
	};
	
	this.allowedTypes = (function(){
		var result = [],
			i = 0;
			
		var keys =  Object.keys(self.Types);
		for(i; i < keys.length; i++) {
			result.push(self.Types[keys[i]]);
		}
		return result;
	})();
	
	/**
	* Saves the item at the key provided.
	* @param {string} key		Key identifying the value
	* @param {*} value			Value to be stored
	* @param {string=} type		Explicitly specified value type
	*/
	this.set = function (key, value, type) {
	
		type = typeof type !== 'undefined' ? type : typeof value;

		if (this.allowedTypes.indexOf(type) < 0) {
			throw new Error('Invalid value type.');
		}
	
		// Set Date type
		if (value && value.constructor.name == 'Date') {
			type = self.Types.Date;
		}
		
		if (type === 'object') {
			value = JSON.stringify(value);
		}
	
		// Store value
		localStorage.setItem(key, value);
		
		// Store value type
		localStorage.setItem(this.getTypeKey(key), type);
	};

	/**
	* Returns the item identified by it's key.
	* @param {string} key		Key identifying the value
	* @return {*}
	*/
	this.get = function (key) {
		var valueString, type;
		
		valueString = localStorage.getItem(key);
		type = localStorage.getItem(this.getTypeKey(key));
		
		if (valueString == null) {
			return null;
		}
		
		return parseString(valueString, type);
	};
	
	this.getType = function (key) {
		return localStorage.getItem(this.getTypeKey(key));
	}
	
	this.getTypeKey = function (key) {
		return key + '.' + this.typesPrefix;
	}
	
	/**
	* Determines whether value stored with the specified key exists.
	* @param {string} key		Key identifying the value
	* @return {boolean}
	*/
	this.exists = function (key) {
		var recordString;

		recordString = localStorage.getItem(key);
		return recordString !== null;
	};
	
	/**
	* Removes the item identified by it's key.
	* @param {string} key		Key identifying the value
	*/
	this.remove = function (key) {
		localStorage.removeItem(key);
		localStorage.removeItem(this.getTypeKey(key));
	};
	
	/**
	* Removes all of the key value pairs.
	*/
	this.clear = function () {
		localStorage.clear();
	};
	
	var parseString = function (stringValue, type) {
		var value;
		
		if (stringValue === null || typeof stringValue === undefined) {
			return stringValue;
		}
		
		switch (type) {
			case self.Types.Number:
				value = Number(stringValue);
				break;
			case self.Types.Boolean:
				value = Boolean(stringValue);
				break;
			case self.Types.Date:
				value = new Date(stringValue);
				break;
			case self.Types.Object:
				value = JSON.parse(stringValue);
				break;
			case self.Types.Undefined:
				value = undefined;
				break;
			default:
				value = stringValue;
				break;
		}
		
		return value;
	};
	
};

module.exports = storage;
