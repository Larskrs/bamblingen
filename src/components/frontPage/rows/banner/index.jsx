import Page from "./page"
import Editor from "./editor"
export { Page, Editor }

export default {
    config: (data) => {return{
        icon: data.image,
        title: data.title,
        previewImage: data.image
    }},
    Page,
    Editor
}   