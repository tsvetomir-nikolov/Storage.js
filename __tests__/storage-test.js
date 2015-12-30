// __tests__/storage-test.js

jest.dontMock('../lib/storage');
jest.dontMock('localStorage');

var localStorage = require('localStorage');
Object.defineProperty(window, 'localStorage', { value: localStorage });

var storage = require('../lib/storage');

/* Tests */

describe("Storage", function() {

	beforeEach(function() {
		storage.clear();
	});

	describe("when storing a value", function() {
		var key = 'key';
	
		describe("of type number", function() {
		
			it("should be saved with number type", function() {
				spyOn(localStorage, 'setItem');
				
				var value = 1;
				storage.setItem(key, value);
				
				expect(localStorage.setItem).toHaveBeenCalledWith(jasmine.any(String), storage.Types.Number);
			});
			
		});
		
		describe("of type string", function() {
		
			it("should be saved with string type", function() {
				spyOn(localStorage, 'setItem');
				
				var value = 'Example';
				storage.setItem(key, value);
				
				expect(localStorage.setItem).toHaveBeenCalledWith(jasmine.any(String), storage.Types.String);
			});
			
		});
		
		describe("of type bollean", function() {
		
			it("should be saved with bollean type", function() {
				spyOn(localStorage, 'setItem');
				
				var value = true;
				storage.setItem(key, value);
				
				expect(localStorage.setItem).toHaveBeenCalledWith(jasmine.any(String), storage.Types.Boolean);
			});
			
		});
		
		describe("of type object", function() {
		
			it("should be saved with object type", function() {
				spyOn(localStorage, 'setItem');
				
				var value = { prop1: 21 };
				storage.setItem(key, value);
				
				expect(localStorage.setItem).toHaveBeenCalledWith(jasmine.any(String), storage.Types.Object);
			});
			
		});
		
		describe("of type date", function() {
		
			it("should be saved with date type", function() {
				spyOn(localStorage, 'setItem');
				
				var value = new Date();
				storage.setItem(key, value);
				
				expect(localStorage.setItem).toHaveBeenCalledWith(jasmine.any(String), storage.Types.Date);
			});
			
		});
		
		describe("of type undefined", function() {
		
			it("should be saved with undefined type", function() {
				spyOn(localStorage, 'setItem');
				
				var value = undefined;
				storage.setItem(key, value);
				
				expect(localStorage.setItem).toHaveBeenCalledWith(jasmine.any(String), storage.Types.Undefined);
			});
			
		});
		
	});

});
