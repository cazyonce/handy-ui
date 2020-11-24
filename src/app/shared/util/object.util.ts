/**
 * 对象工具类
 */
export class ObjectUtil {

    /**
     * 对象中为字符串的属性进行去除前后空格
     * 注：这个方法可进一步优化，使用js特性直接遍历对象
     * @param obj 数据实体对象，暂时只支持属性为string|String类型的数据去除前后空格，不支持属性为数组或集合中的字符串操作
     */
    static propertyTrim(obj: Object): Object {
        // type PropertyKey = string | number | symbol;
        let propertyKey: PropertyKey[];

        if(null == obj) {
            return obj;
        }
        propertyKey = Reflect.ownKeys(obj);
        const len = propertyKey.length;
        if (len <= 0) {
            return obj;
        }
        for(var i = 0; i < propertyKey.length; i++) {
            const key = propertyKey[i].toString();
            const val = Reflect.get(obj, key);
            if (null != val && (val instanceof String || typeof(val) == "string")) {
                Reflect.set(obj, key, val.trim());
            }
        }
        return  obj;
    }

}