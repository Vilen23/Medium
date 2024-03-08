import { atom } from 'recoil';

const postAtom = atom({
    key:"postAtom",
    default:{
        title:"",
        content:"",
        imagelink:"", 
    }
})

export {
    postAtom
}