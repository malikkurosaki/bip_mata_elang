import { Button, Image, Text } from "@mantine/core";
import Link from "next/link";

const LayoutLanding = () => {
    return (
        <>
            <Image src={'/img/eagle_eye.png'} width={200} alt={"gambar mana elang"} />
            <Link href={"/pge/dashboard"}>
                <Button>Next</Button>
            </Link>
        </>
    )
}

export default LayoutLanding;