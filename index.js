//===============================================================
//#region Slots

const onSlotEnter = (event) => {
    const slot = event.target.parentNode;
    slot.classList.add('show');
};

const onSlotExit = (event) => {
    const slot = event.target.parentNode;
    slot.classList.remove('show');
};

const onSlotAnimationLoaded = (event) =>{
    //vars
    const img = event.target;
    const canvas = img.parentNode.children[1];
    const ctx = canvas.getContext('2d');
    //apply size
    canvas.width = img.width;
    canvas.height = img.height;
    //draw
    ctx.drawImage(img, 0, 0, img.width, img.height);
};

//#endregion

//================================================================
//#region HTML Templates

const LoadHTMLTemplate = (id) => {
    return window.jsrender.templates('#' + id);
};

//#endregion

//===============================================================
//#region Startup

window.onload = () => {
    //init vars
    const tagList = document.getElementsByTagName('main')[0];
    let i = 0;
    let tag = null;
    //get pattern
    const slotPattern = LoadHTMLTemplate("pattern_slot");
    //write to list
    tagList.innerHTML = '';
    //test elements
    for(let i = 0; i < list.length; i++){
        //read slot
        tag = list[i];
        //correct path
        tag.path = tag.path.trim();
        //add index.html to the internal paths
        if(tag.path.indexOf('./') == 0 || tag.path.indexOf('/') == 0){
            tag.thumb = tag.path + '/' + tag.thumb;
            tag.path += '/index.html';
        }
        //add to list
        tagList.innerHTML += slotPattern.render({
            path: tag.path
            ,thumb: tag.thumb
        });
    }
    //add events
    i = tagList.children.length;
    while(i-- > 0){
        //fader
        tagList.children[i].children[1].addEventListener('mouseover', onSlotEnter);
        tagList.children[i].children[1].addEventListener('mouseleave', onSlotExit);
        //is gif
        if(tagList.children[i].children[0].src.toLowerCase().indexOf('.gif') != -1){
            //add canvas to store image
            tag = document.createElement('canvas');
            tagList.children[i].insertBefore(tag, tagList.children[i].children[1]);
            //add class
            tag.classList.add('slot-fader');
            //add event
            tagList.children[i].children[0].addEventListener('load', onSlotAnimationLoaded);
        }
    }
};

//#endregion