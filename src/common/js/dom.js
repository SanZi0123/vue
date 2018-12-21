/**
 * DOM操作
 */
// 检查
export function hasClassName(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}
// 添加
export function addClass(el, className) {
    if (hasClassName(el, className)) {
        return
    };
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

// 设置获取dom元素绑定的事件
export function getData(el, name, val) {
    const p = 'data_';
    if (!val) {
        return el.getAttribute(p + name);
    }
    return el.setAttribute(p + name, val);
}