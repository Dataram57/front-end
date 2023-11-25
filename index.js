//===============================================================
//#region Slots

const onSlotEnter = (event) => {
    const slot = event.target;
};
const onSlotExit = (event) => {
    const slot = event.target;
};

//#endregion

//===============================================================
//#region Patterns

const ReadPattern = (element) => {
    //split by $ARG$
    const pattern = element.innerHTML.split('$ARG$');
    //remove element
    pattern[0] = pattern[0].replace("<!--",'');
    pattern[pattern.length - 1] = pattern[pattern.length - 1].replace('-->','');
    return pattern;
};

const UsePattern = (pattern, args) => {
    let temp = pattern[0];
    let i = 0;
    const f = pattern.length - 1;
    while(i < f){
        if(args[i] !== undefined && args[i] !== null)
            temp += args[i];
        temp += pattern[++i];
    }
    return temp;
};

//#endregion

//===============================================================
//#region Startup

window.onload = () => {
    //init vars
    const list = document.getElementsByTagName('main')[0];
    let i = 0;
    //get pattern
    const slotPattern = ReadPattern(list);
    //write to list
    list.innerHTML = '';
    //test elements
    for(let i = 0; i < 10; i++){
        //add to list
        list.innerHTML += UsePattern(slotPattern,[
            'https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif'
            ,'#'
            ,'#1'
        ]);
    }
    //add events
    i = list.children.length;
    while(i-- > 0){
        list.children[i].children[1].addEventListener('mouseover', onSlotEnter);
        list.children[i].children[1].addEventListener('mouseleave', onSlotExit);
    }
};

//#endregion