import {useState} from "react";
import TopBar from "../component/TopBar.tsx";
import SideBar from "../component/SideBar.tsx";
import Main from "../component/Main.tsx";
import {
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import axios from "axios";
import {NodeItem} from "../model/NodeItem.ts";

export default function NodeListView() {
    const [showMenu, setShowMenu] = useState(false);
    const [tableData, setTableData] = useState([]);

    window.onload = () => {
        axios.get("/api/nodeList").then((res) => {
            console.log(res.data);
            setTableData(res.data.data)
        })
    }

    return <>
        <TopBar title={"节点列表"} onOpenMenu={() => setShowMenu(true)} />
        <SideBar title={"节点列表"} open={showMenu} onClose={() => setShowMenu(false)} />
        <Main ml={12} mr={12}>
            <h1>节点列表</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell component={"th"}>节点ID</TableCell>
                            <TableCell component={"th"}>节点名称</TableCell>
                            <TableCell component={"th"}>节点地址</TableCell>
                            <TableCell component={"th"}>节点状态</TableCell>
                            <TableCell component={"th"}>创建时间</TableCell>
                            <TableCell component={"th"}>修改时间</TableCell>
                            <TableCell component={"th"}>操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableData.length === 0 ?
                            <TableRow>
                                <TableCell rowSpan={4}>暂时没有数据</TableCell>
                            </TableRow>:
                            tableData.map((item: NodeItem)=>
                                 <TableRow>
                                     <TableCell component={"td"}>{item.id}</TableCell>
                                     <TableCell component={"td"}>{item.name}</TableCell>
                                     <TableCell component={"td"}>{item.host}:{item.port}</TableCell>
                                     <TableCell component={"td"}>
                                         {
                                             (item.status === "online" && <Chip color={"success"} label={"在线"}/>) ||
                                             (item.status === "offline" && <Chip color={"error"} label={"离线"}/>)
                                         }
                                     </TableCell>
                                     <TableCell>{item.create}</TableCell>
                                     <TableCell>{item.update}</TableCell>
                                     <TableCell>
                                         <Button variant={"contained"}>映射列表</Button>
                                     </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Main>
    </>
}