/*
  Value type saving upon working with localStorage
*/

storage = {

	typesPrefix: 'ValueType',

	Types: {
		'String': 'string',
		'Number': 'number',
		'Boolean': 'boolean',
		'Date': 'date',
		'Object': 'object',
		'Undefined': 'undefined'
	},

	getAllowedTypes: function () {
		var result = [], i;
		var keys =  Object.keys(this.Types);
		for (i = 0; i < keys.length; i++) {
			result.push(this.Types[keys[i]]);
		}
		return result;
	},

	/**
	* Saves the item at the key provided.
	* @param {string} key		Key identifying the value
	* @param {*} value			Value to be stored
	* @param {string=} type		Explicitly specified value type
	*/
	setItem: function (key, value, type) {

		type = typeof type !== 'undefined' ? type : typeof value;

		if (this.getAllowedTypes().indexOf(type) < 0) {
				throw new Error('Invalid value type.');
		}

		// Set Date type
		if (value && value instanceof Date) {
			type = this.Types.Date;
		}

		if (type === 'object') {
			value = JSON.stringify(value);
		}

		// Store value
		localStorage.setItem(key, value);

		// Store value type
		localStorage.setItem(this.getTypeKey(key), type);
	},

	/**
	* Returns the item identified by it's key.
	* @param {string} key		Key identifying the value
	* @return {*}
	*/
	getItem: function (key) {
		var valueString, type;

		valueString = localStorage.getItem(key);
		type = localStorage.getItem(this.getTypeKey(key));

		if (valueString === null) {
			return null;
		}

		return this.parseString(valueString, type);
	},

	getType: function (key) {
		return localStorage.getItem(this.getTypeKey(key));
	},

	getTypeKey: function (key) {
		return key + '.' + this.typesPrefix;
	},

	/**
	* Determines whether value stored with the specified key exists.
	* @param {string} key		Key identifying the value
	* @return {boolean}
	*/
	exists: function (key) {
		var recordString = localStorage.getItem(key);
		return recordString !== null;
	},

	/**
	* Removes the item identified by it's key.
	* @param {string} key		Key identifying the value
	*/
	remove: function (key) {
		localStorage.removeItem(key);
		localStorage.removeItem(this.getTypeKey(key));
	},

	/**
	* Removes all of the key value pairs.
	*/
	clear: function () {
		localStorage.clear();
	},

	parseString: function (stringValue, type) {
		var value;

		if (stringValue === null || typeof stringValue === undefined) {
			return stringValue;
		}

		switch (type) {
			case this.Types.String:
				value = stringValue;
				break;
			case this.Types.Number:
				value = Number(stringValue);
				break;
			case this.Types.Boolean:
				value = Boolean(stringValue);
				break;
			case this.Types.Date:
				value = new Date(stringValue);
				break;
			case this.Types.Object:
				value = JSON.parse(stringValue);
				break;
			default:
				value = undefined;
				break;
		}

		return value;
	}

};

module.exports = storage;
