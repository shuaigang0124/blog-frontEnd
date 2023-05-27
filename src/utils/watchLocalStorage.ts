export const dispatchEventStroage = () => {
    const signSetItem = localStorage.setItem
    localStorage.setItem = function (key, val) {
        let setEvent = new Event('setItemEvent');
        let setEvent2 = new Event('setItemEvent2');
        (setEvent as unknown as typeA).key = key;
        (setEvent as unknown as typeB).newValue = val;
        (setEvent2 as unknown as typeA).key = key;
        (setEvent2 as unknown as typeB).newValue = val;
        window.dispatchEvent(setEvent);
        window.dispatchEvent(setEvent2);
        signSetItem.apply(this, arguments);
    }
}
// 解决ts无key属性报错
interface typeA {
    key: string
    [props:string]:any
}
interface typeB {
    newValue: string
    [props:string]:any
}