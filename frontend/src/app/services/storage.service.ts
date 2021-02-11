import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	set(key: string, value: any) {
		localStorage.setItem(key, window.btoa(JSON.stringify(value)));
	}

	setMulti(...items: Array<{ key: string; value: any }>) {
		for (let { key, value } of items) {
			localStorage.setItem(key, window.btoa(JSON.stringify(value)));
		}
	}

	get(key: string) {
		const data = localStorage.getItem(key);

		if (data) {
			return JSON.parse(window.atob(data));
		}

		return null;
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}

	clear() {
		localStorage.clear();
	}

	setSessionItem(key: string, value: any) {
		sessionStorage.setItem(key, window.btoa(JSON.stringify(value)));
	}

	getSessionItem(key: string) {
		const data = sessionStorage.getItem(key);

		if (data) {
			return JSON.parse(window.atob(data));
		}

		return null;
	}

	removeSessionItem(key: string) {
		sessionStorage.removeItem(key);
	}
}
