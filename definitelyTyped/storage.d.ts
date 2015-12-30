
interface Storage {

	getItem(key: string) : any;

	setItem(key: string, value: any) : void;

	getType(key: string) : string;

	exists(key: string) : boolean;

	remove(key: string) : void;

	clear() : void;

}

declare var storage: Storage;
