import { Avatar, Box, Card, Center, Divider, Flex, Group, Image, Paper, RingProgress, SimpleGrid, Space, Stack, Text, Title } from "@mantine/core"
import LayoutDefault from "../../../components/layout_default"
import Clock from 'react-live-clock';
import { useEffect, useMemo, useState } from "react";
import { ResultDashboard } from "../../../models/model";
import { IconArrowBarDown, IconArrowBarUp } from "@tabler/icons";
// import useStore from "../../../util/store";
import { useDebouncedState, useShallowEffect } from '@mantine/hooks';
import ReactECharts from 'echarts-for-react';
import { AppProps } from "next/dist/shared/lib/router/router";

const Dashboard = () => {
    const [waktu, setWaktu] = useState<JSX.Element>()
    const [tanggal, setTanggal] = useState<String>()
    const [totalCount, setTotalCount] = useState<number>()
    const [resultDashboard, setResultDashboard] = useState<ResultDashboard[]>([])
    const [oldData, setOldData] = useState<ResultDashboard[]>([]);
    const [dataPrabowo, setDataPrabowo] = useState<ResultDashboard>();

    useShallowEffect(() => {
        const clock = <Clock
            format={'h:mm:ssa'}
            ticking={true} />

        setWaktu(clock)

        setTanggal((new Date()).toLocaleDateString())

        // setOldData([...useStore<ResultDashboard[]>("listResult").get() ?? []])

        fetch('/api/dashboard/data-count').then(async (res) => {
            if (res) {
                const total = await res.text()
                setTotalCount(Number(total));
            }
        })

        fetch('/api/dashboard').then(async (res) => {
            if (res) {
                // useStore("listResult").set([...resultDashboard ?? []])
                setOldData([...resultDashboard])
                let data: ResultDashboard[] = await res.json()
                setResultDashboard(data);
                setDataPrabowo(data.find(itm => itm.idx === 1))

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
                {/* <Card bg={"blue"}>
                    <Stack sx={{ width: 300, height: 100 }}>
                        <Text color={"white"}>
                            Total
                        </Text>
                        <Group >
                            <Title color={"white"}>{totalCount}</Title>
                        </Group>
                    </Stack>
                </Card> */}
            </Group>
            <Space h={60} />
            {/* <Text>disini loh</Text>
            {JSON.stringify(oldData)} */}
            {dataPrabowo && <Stack>
                <Group position={"center"} >
                    <Box p={"lg"}>
                        <Image width={180} radius={300} src={"/calon/" + dataPrabowo.name + ".png"} withPlaceholder alt="gambar prabowo" />
                    </Box>
                    {/* <PrabowoChart data={dataPrabowo} /> */}
                    {/* <Title>{dataPrabowo.score}</Title> */}
                    <RingProgress
                        label={<Title>{dataPrabowo.score}</Title>}
                        sections={[
                            { value: dataPrabowo.score, color: 'orange' },
                            // { value: 15, color: 'orange' },
                            // { value: 15, color: 'grape' },
                        ]}
                    />
                </Group>
                <Center>
                    <Text>
                        {dataPrabowo.name}
                    </Text>
                </Center>
            </Stack>}
            <Space h={60} />

            <Group position={"left"}>
                {resultDashboard?.map((itm) => itm.idx != 1 && <Stack key={itm.id} sx={{ width: 200 }}>
                    <Flex p={"md"}>
                        <Box p={"md"}>
                            <Image width={80} radius={200} src={"/calon/" + itm.name + ".png"} withPlaceholder alt="gambar calon" />
                        </Box>
                        <Stack align={"center"} justify={"center"} p={"md"} >
                            {oldData.find((dt) => dt.id === itm.id)?.score! < itm.score && <IconArrowBarUp />}
                            <Title >{itm.score}</Title>
                            {(oldData.find((dt) => dt.id === itm.id)?.score ?? 0) > itm.score && <IconArrowBarDown />}
                        </Stack>
                    </Flex>
                    <Divider />
                    <Text color={"gray"}>{itm.name}</Text>
                    <Divider />
                </Stack>)}
            </Group>
            <Space h={60} />
            <StackLineChart />
        </LayoutDefault>
    </>)
}


const StackLineChart = () => {
    const [option, setOption] = useDebouncedState({}, 200);

    useShallowEffect(() => {
        fetch('/api/dashboard/stack-chart').then(async res => {
            if (res.status === 200) {
                const datanya = await res.json()

                const options = {
                    // title: {
                    //     text: 'Stacked Line'
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [...datanya.map((val: any) => val.name)]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [...datanya.map((val: any) => ({
                        name: val.name,
                        type: 'line',
                        stack: 'Total',
                        data: [...val.data.map((vv: any) => vv.value)]
                    }))]
                    // [
                    //     {
                    //         name: 'Email',
                    //         type: 'line',
                    //         stack: 'Total',
                    //         data: [120, 132, 101, 134, 90, 230, 210]
                    //     },
                    //     {
                    //         name: 'Union Ads',
                    //         type: 'line',
                    //         stack: 'Total',
                    //         data: [220, 182, 191, 234, 290, 330, 310]
                    //     },
                    //     {
                    //         name: 'Video Ads',
                    //         type: 'line',
                    //         stack: 'Total',
                    //         data: [150, 232, 201, 154, 190, 330, 410]
                    //     },
                    //     {
                    //         name: 'Direct',
                    //         type: 'line',
                    //         stack: 'Total',
                    //         data: [320, 332, 301, 334, 390, 330, 320]
                    //     },
                    //     {
                    //         name: 'Search Engine',
                    //         type: 'line',
                    //         stack: 'Total',
                    //         data: [820, 932, 901, 934, 1290, 1330, 1320]
                    //     }
                    // ]
                };

                setOption(options)
            }
        })




    }, [])
    return (<>
        <ReactECharts option={option} />
    </>)
}


interface DATA_PRABOWO {
    data: ResultDashboard
}

const PrabowoChart = ({ data }: DATA_PRABOWO) => {
    const [option, setOption] = useState<{}>({});

    useShallowEffect(() => {
        let options = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
                {
                    name: 'Pressure',
                    type: 'gauge',
                    progress: {
                        show: true
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}'
                    },
                    data: [
                        {
                            value: data.score,
                            name: 'SCORE'
                        }
                    ]
                }
            ]
        };

        setOption(options)
    }, [])

    return (<>
        <Box>
            <ReactECharts option={option} style={{ height: 250, width: 250 }} />
        </Box>
    </>)
}

export default Dashboard