import {Injectable} from '@angular/core';

export namespace AppConstants
{
    // Class for general global variables.
    export class General
    {
        public static readonly PREFIX = "DR_"
        public static readonly REMEMBER_USER = "rememberUser"
        public static readonly ROUTE_FROM_LOGIN = "routeFromLogin"
    };

    export class MyStorage {

        public static get(key: string) {
            return localStorage.getItem(General.PREFIX + key)
        }

        public static set(key: string, value: string) {
            localStorage.setItem(General.PREFIX + key, value)
        }

        public static remove(key: string) {
            localStorage.removeItem(General.PREFIX + key)
        }
    }
    
}
