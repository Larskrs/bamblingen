import Page from "./page"
import Editor from "./editor"
export { Page, Editor }

export default {
    config: (data) => {
        const layout = data.layout.split("G_").pop()
        return {
            icon: `/icons/grid_${layout}.svg`,
            previewImage:  "",
            title: "Rekke",
            context: "Rekke",
        }
    },
    Page,
    Editor
}   