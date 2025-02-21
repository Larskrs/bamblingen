import { DefaultRows } from "@/lib/componentPageLib";
import ComponentPage from "@/components/frontPage/ComponentPage";
import Navigation from "@/components/layout/PrimaryNavigation/nav";
import Cookies from "@/components/layout/Cookies";

export default function TestArticle ({rows}) {

    return (
        <>
            <Navigation />
            <Cookies policyId={"0.0.1"} />
            <ComponentPage rows={rows} />
        </>
    );
}