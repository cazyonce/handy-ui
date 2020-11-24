export class JSONUtil {

    // stringify(data: any): string {
    //     let json =  JSON.stringify(data);
    //     if (json === "[]") {
    //         if (Object.keys(data).length == 0) {
    //             return json;
    //         }

    //     }

    //     // let obj = Object.create(null);
    //     // map.forEach((value, key) => {
    //     //     if (value instanceof Array) {

    //     //         value.forEach(value=>{
    //     //           console.log(value)
    //     //         })
    //     //       }
    //     // })
    //     // this.allData.forEach((value,key) => {
    //     //     if (value instanceof Array) {

    //     //       value.forEach(value=>{
    //     //         console.log(value)
    //     //       })
    //     //     }
    //     //     console.log()
    //     //     console.log(value,"--------value");
    //     //     console.log(key,"----------key")
    //     //     // console.log(this.allData.get(res))
    //     //   })
    //     // JSON.stringify
    //     return null;
    // }
    number = 0;
    tupleRecorder = new Map<any, any>();

    checkTupleExistRecorder(val: any): boolean {
        if (this.tupleRecorder.size == 0) {
            return false;
        }
        if (!(val instanceof Array) || !(val instanceof Map) || typeof (val) !== "object") {
            return false;
        }
        console.log("99999999999999999999")
        const bool = this.tupleRecorder.has(val);
        if (!bool) {
            this.tupleRecorder.set(val, val);
        }
        return bool;
    }

    static stringify(obj: any, filter?: Array<string>): string {
        const util = new JSONUtil();
        if (obj instanceof Array) {
            return util.stringifyByArray(obj, filter);
        } else {
            return util.stringifyByObject(obj, filter);
        }

        return null;
    }

    private stringifyByArray(arr: Array<any>, filter: Array<string>): string {
        if (this.number >= 10) {
            return;
        }
        let json = "[";
        for (const tuple of arr) {
            if (this.checkTupleExistRecorder(tuple)) {
                console.log("Repeat the reference");
                continue;
            }
            if (tuple === arr) {
                this.number++;
                continue;
            }
            const isArray = tuple instanceof Array;
            if (isArray) {
                json += this.stringifyByArray(tuple, filter) + ",";
            } else {
                json += this.stringifyByObject(tuple, filter) + ",";
            }
        }
        if (json.endsWith(",")) {
            json = json.substring(0, json.length - 1);
        }
        console.log("--------1----------")
        json += "]";
        return json;
    }

    private stringifyByObject(obj: Object, filter: Array<string>): string {
        if (this.number >= 10) {
            return;
        }
        let json = "{";
        for (const key in obj) {
            let val = obj[key];
            if (this.checkTupleExistRecorder(val)) {
                console.log("Repeat the reference, property name: " + key + ".");
                continue;
            }
            if (val === obj) {
                this.number++;
                continue;
            }
            if (filter != null && filter.length > 0
                && this.matchingProperty(filter, key)) {
                continue;
            }
            if (val instanceof Array) {
                json += this.stringifyByArray(val, filter) + ",";
                continue;
            }
            if (val instanceof Map) {
                continue;
            }
            json += `"${key}":`;
            if (typeof (val) === "string" || val instanceof String) {
                json += `"${val}"`;
                continue;
            }
            if (typeof (val) === "number" || val instanceof Number
                || typeof (val) === "boolean" || val instanceof Boolean) {
                json += val;
                continue;
            }
        }
        if (json.endsWith(",")) {
            json = json.substring(0, json.length);
        }
        json += "}";
        console.log("-------2----------")
        return json;
    }

    private stringifyTuple(key: string, val: any, filter: Array<string>): string {
        if (filter != null && filter.length > 0 && this.matchingProperty(filter, key)) {
            return null;
        }
        if (val instanceof Array || val instanceof Map) {
            return null;
        }
        return `"${key}": ${val}`;
    }

    private matchingProperty(filterPropertys: Array<string>, property: string): boolean {
        for (const iterator of filterPropertys) {
            if (iterator == property) {
                return true;
            }
        }
        return false;
    }
}