import { Title } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useState } from "react"


const PDeveloper = () => {
    const [dataTotal, setDataTotal] = useState();
    const [dataToday, setDataToday] = useState();
    const [dataYesterday, setDataYesterday] = useState();
    useShallowEffect(() => {

        fetch('/api/dashboard/data-count-today').then((res) => {
            if (res.status === 200) { }
        })

        fetch('/api/dashboard/data-count-yesterday').then((res) => {
            if (res.status === 200) {

            }
        })

        fetch('/api/dashboard/data-count').then((res) => {
            if (res.status === 200) {

            }
        })

    })


    return (<>

        <Title>
            Developer
        </Title>
    </>)
}

export default PDeveloper