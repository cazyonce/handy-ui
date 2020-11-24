export class ArrayUtil {

    /**
     * 删除数组中指定的元素，通过元素值删除
     * @param arr 需要删除元素的数组
     * @param element 删除的元素
     */
    static removeByValue(arr: Array<any>, element: any): boolean {
        if (arr.length == 0) {
            return false;
        }
        for (let i = arr.length - 1; i >= 0; i--) {
            const ite = arr[i];
            if (ite == element) {
              arr.splice(i, 1);
            }
        }
        return true;
    }

    /**
     * 判断数组是否包含指定的元素值
     * @param arr 需要查找的数组
     * @param element 查找的元素值
     */
    static contains(arr: Array<any>, element: any): boolean {
        for (const index in arr) {
            if (arr[index] == element) {
                return true;
            }
        }
        return false;
    }
}