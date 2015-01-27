/* 
  Value type saving upon working with localStorage
*/

window.storage = new function() {

	var self = this;
	
	this.typesPrefix = 'LocalStorageTypes.';
	
	//TODO: Allow functions to be stored
	this.Types = {
		'string': 0,
		'number' : 1,
		'boolean' : 2,
		'date' : 3,
		'object' : 4,
	};
	
	/**
	* Saves the item at the key provided.
	* @param {string} key		Key identifying the value
	* @param {*} value			Value to be stored
	* @param {string=} type		Explicitly specified value type
	*/
	this.set = function (key, value, type) {
	
		type = typeof type !== 'undefined' ? type : typeof value;
		if (!self.Types.hasOwnProperty(type)) {
			throw new Error('Invalid value type.');
		}
	
		if (type === 'object') {
			value = JSON.stringify(value);
		}
	
		// Store value
		localStorage.setItem(key, value);
		
		// Store value type
		localStorage.setItem(self.typesPrefix + key, type);
	};

	/**
	* Returns the item identified by it's key.
	* @param {string} key		Key identifying the value
	* @return {*}
	*/
	this.get = function (key) {
		var valueString = localStorage.getItem(key);
		var type = localStorage.getItem(self.typesPrefix + key);
		
		if (valueString == null) {
			return null;
		}
		
		return parseString(valueString, type);
	};
	
	/**
	* Determines whether value stored with the specified key exists.
	* @param {string} key		Key identifying the value
	* @return {boolean}
	*/
	this.exists = function (key) {
		var recordString = localStorage.getItem(key);
		return recordString !== null;
	};
	
	/**
	* Removes the item identified by it's key.
	* @param {string} key		Key identifying the value
	*/
	this.remove = function (key) {
		localStorage.removeItem(key);
		localStorage.removeItem(self.typesPrefix + key);
	};
	
	/**
	* Removes all of the key value pairs.
	*/
	this.clear = function () {
		localStorage.clear();
	};
	
	var parseString = function (stringValue, type) {
		var value;
		
		if (!stringValue) {
			return stringValue;
		}
		
		switch (type) {
			case 'number':
				value = Number(stringValue);
				break;
			case 'boolean':
				value = Boolean(stringValue);
				break;
			case 'date':
				value = new Date(stringValue);
				break;
			case 'object':
				value = JSON.parse(stringValue);
				break;
			case 'string':
				value = stringValue;
				break;
			default:
				throw new Error('Invalid value type.');
		}
		
		return value;
	};
	
};
