import { Avatar, Title } from "@mantine/core"
import Image from "next/image"
import { Map, Overlay, ZoomControl } from 'pigeon-maps'
import { useState } from "react"

const AreaDistribution = () => {
    const [center, setCenter] = useState<[number, number]>([-2.994494, 120.195465])
    const [zoom, setZoom] = useState(5)
    return (<>
        <Title>Map</Title>
        <Map
            height={400}
            center={center}
            zoom={zoom}
            onBoundsChanged={({ center, zoom }) => {
                setCenter(center)
                setZoom(zoom)
            }}
        >
            <ZoomControl />
            <Overlay anchor={[-6.271194, 106.894547]} offset={[120, 79]}>
                <Avatar size={70} radius={70}>
                    <Image src='/calon/Prabowo Subianto.png' width={100} height={100} alt='' />
                </Avatar>
            </Overlay>
        </Map>
    </>)
}

export default AreaDistribution