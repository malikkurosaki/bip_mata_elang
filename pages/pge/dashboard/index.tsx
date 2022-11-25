import { Avatar, Card, Flex, Group, Image, SimpleGrid, Space, Stack, Text, Title } from "@mantine/core"
import LayoutDefault from "../../../components/layout_default"
import Clock from 'react-live-clock';
import { useEffect, useState } from "react";
import { ResultDashboard } from "../../../models/model";
import { IconArrowBarDown } from "@tabler/icons";
import useStore from "../../../util/store";

const Dashboard = () => {
    const [waktu, setWaktu] = useState<JSX.Element>()
    const [tanggal, setTanggal] = useState<String>()
    const [totalCount, setTotalCount] = useState<number>()
    const [resultDashboard, setResultDashboard] = useState<ResultDashboard[]>()
    const listResultStore = useStore<ResultDashboard[]>("listResult");

    useEffect(() => {
        const clock = <Clock
            format={'h:mm:ssa'}
            ticking={true} />

        setWaktu(clock)

        setTanggal((new Date()).toLocaleDateString())

        fetch('/api/dashboard/data-count').then(async (res) => {
            if (res) {
                const total = await res.text()
                setTotalCount(Number(total));
            }
        })

        fetch('/api/dashboard').then(async (res) => {
            if (res) {
                listResultStore.set(resultDashboard!)
                setResultDashboard((await res.json()))
            }
        })

    }, [])

    return (<>
        <LayoutDefault>
            <Group align={"start"} position={"left"}>
                <Card bg={"cyan"}>
                    <Stack sx={{ width: 300, height: 100 }}>
                        <Text color={"white"}>
                            {tanggal}
                        </Text>
                        <Title color={"white"}>
                            {waktu}
                        </Title>
                    </Stack>
                </Card>
                <Card bg={"blue"}>
                    <Stack sx={{ width: 300, height: 100 }}>
                        <Text color={"white"}>
                            Total
                        </Text>
                        <Group >
                            <Title color={"white"}>{totalCount}</Title>
                        </Group>
                    </Stack>
                </Card>
            </Group>
            <Space h={"lg"} />
            {JSON.stringify(listResultStore)}
            <Group position={"left"}>
                {resultDashboard?.map((itm) => itm.idx != 1 && <Stack key={itm.id} sx={{ width: 150 }}>
                    <Flex p={"md"}>
                        <Image radius={200} src={"/calon/" + itm.name + ".png"} withPlaceholder alt="gambar calon" />
                        <Card>
                            <Title >{itm.score}</Title>
                            <Stack>
                                <IconArrowBarDown />
                            </Stack>
                        </Card>
                    </Flex>
                    <Text color={"gray"}>{itm.name}</Text>

                </Stack>)}
            </Group>

        </LayoutDefault>
    </>)
}

export default Dashboard