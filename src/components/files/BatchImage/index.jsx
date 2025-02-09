import Image from "next/image";



export default function BatchImage ({
    id, name="Mappenavn", size=256, files=0
}) {
    return (
        <Image alt={`Batch ${name}`} width={256} height={256} src={`/api/image/batch?b=${id}&v=${Math.max(1, Math.min(4, files))}`} />
    );
}