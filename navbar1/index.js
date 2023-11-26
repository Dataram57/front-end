//================================================================
//#region Responsivity

const screen_sizes = [0, 576, 768, 992, 1200];
const screen_sizes_names = ['xs', 'sm', 'md', 'lg', 'xl'];
let screen_lastState = -1;

const UpdateResponsivity = () => {
    const w = document.body.clientWidth;
    let i = screen_sizes.length;
    //recognize current state
    while(--i > -1)
        if(w >= screen_sizes[i])
            break;
    //check if state has changed 
    if(screen_lastState != i){
        //remove old class
        document.body.classList.remove('screen-' + screen_sizes_names[screen_lastState]);
        //add new class
        document.body.classList.add('screen-' + screen_sizes_names[i]);
        //update state
        screen_lastState = i;
    }
};

//#endregion

//================================================================
//#region Navbar

let navbar_lastYposition = Number.MAX_SAFE_INTEGER; //-1
let navbar_isSticky = true; //true

const UpdateNavbar = () => {
    const current = window.scrollY;
    if(!tagNavbar.classList.contains('nomobile'))
        if(navbar_isSticky){
            if(navbar_lastYposition < current){
                navbar_isSticky = false;
                tagNavbar.classList.remove('show');
                tagNavbar.classList.add('hide');
            }
        }
        else
            if(navbar_lastYposition > current){
                navbar_isSticky = true;
                tagNavbar.classList.remove('hide');
                tagNavbar.classList.add('show');
            }
    navbar_lastYposition = current;
};

const NavbarBurgerClick = () => {
    if(tagNavbar.classList.contains('mobile')){
        tagNavbar.classList.remove('mobile');
        tagNavbar.classList.add('nomobile');
        document.body.classList.remove('hide-scroll');

        //
        navbar_isSticky = true;
        tagNavbar.classList.remove('hide');
        tagNavbar.classList.add('show');

        //
        setTimeout(()=>{
            tagNavbar.classList.remove('nomobile');
        }, 500);
    }
    else{
        tagNavbar.classList.add('mobile');
        tagNavbar.classList.remove('nomobile');
        document.body.classList.add('hide-scroll');
    }
};

const HideNavbarMobile = () => {
    if(tagNavbar.classList.contains('mobile'))
        NavbarBurgerClick();
};

//#endregion

//================================================================
//#region Events

window.onload = () => {
    //Update responsive CSS
    UpdateResponsivity();
};

window.onresize = () => {
    //Update responsive CSS
    UpdateResponsivity();
};

window.onscroll = (e) => {
    //Update navbar
    UpdateNavbar();
};

//#endregion