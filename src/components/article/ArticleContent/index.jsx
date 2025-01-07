import Text from "../Text";
import Image from "../Image";
import Reference from "../Reference";
import Video from "../Video";
import Heading from "../Heading"

export const ArticleComponents = {
    text: Text,
    heading: Heading,
    image: Image,
    video: Video,
    reference: Reference,
};

export function GetArticleComponent (type) {
    const Component = ArticleComponents[type]
    return Component
}
export function GetComponentPreviewText (data) {
    const component = GetArticleComponent(data.type)
    if (component?.previewText) {
        return component?.previewText(data)
    }

    return "Error"
}
export function ArticleRenderer({ components, editor=false, onUpdateComponent }) {
    // Define the component mapping

    return (
        <div>
            {components.map(({ type, ...props }, i) => {
                if (editor == true) {
                    const EditorRenderer = ArticleComponents[type].editor;
                    if (!EditorRenderer) return null; // If type is unsupported, skip

                    return <EditorRenderer onChange={(value) => {onUpdateComponent(i, value)}} key={i} {...props} />
                }

                // Select the appropriate component based on the type
                const Renderer = ArticleComponents[type].renderer;
                if (!Renderer) return null; // If type is unsupported, skip

                // Render the component with the remaining props
                return <Renderer editor={editor} onChange={(value) => {onUpdateComponent(i, value)}} key={i} {...props} />
                
            })}
        </div>
    );
}
