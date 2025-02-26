import { DefaultRows } from "@/lib/componentPageLib";
import ComponentPage from "@/components/frontPage/ComponentPage";

export default async function TestArticle () {
    
    const rows = await DefaultRows()

    return (
        <>
            <ComponentPage rows={rows} />
        </>
    );
}