import {JSDOM} from 'jsdom';


export const before = ()=> {
    // from a preact point of view, it doesn't matter if it accesses the same DOM tree that we use in our tests or a
    // different one
    global.document = (new JSDOM(`<html><body></body></html>`)).window.document;
};

export const after = ()=> {
    // FIXME: this might interfere with other, asynchronous tests that need this global document tree, we need to keep
    // an eye out for other tests that might result in failures that show that "document" is not defined
    global.document = undefined;
};

export const click = (element)=>{
    var evt = (new JSDOM(`<html><body></body></html>`)).window.document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);

    element.dispatchEvent(evt);
};
