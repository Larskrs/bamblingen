import Text from "../Text";
import Image from "../Image";
import Reference from "../Reference";
import Heading from "../Heading";

export default function ArticleContent({ components, editor=false }) {
    // Define the component mapping
    const componentMap = {
        text: Text,
        image: Image,
        reference: Reference,
        heading: Heading,
    };

    return (
        <div>
            {components.map(({ type, ...props }, i) => {
                // Select the appropriate component based on the type
                const Component = componentMap[type];
                if (!Component) return null; // If type is unsupported, skip

                // Render the component with the remaining props
                return <Component editor={editor} key={i} {...props} />
                
            })}
        </div>
    );
}
