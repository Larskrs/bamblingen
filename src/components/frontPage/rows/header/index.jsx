import Page from "./page"
import Editor from "./editor"
export { Page, Editor }

export default {
    config: (data) => {return{
        icon: "/icons/article_content.png",
        title: "Header",
    }},
    Page,
    Editor
}   