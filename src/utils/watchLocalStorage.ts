export const dispatchEventStroage = () => {
    const signSetItem = localStorage.setItem
    localStorage.setItem = function (key, val) {
        let setEvent = new Event('setItemEvent');
        (setEvent as unknown as typeA).key = key;
        // setEvent.newValue = val;
        (setEvent as unknown as typeB).newValue = val;
        window.dispatchEvent(setEvent);
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