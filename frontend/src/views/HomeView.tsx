import TopBar from "../component/TopBar.tsx";
import SideBar from "../component/SideBar.tsx";
import {useState} from "react";
import Main from "../component/Main.tsx";
import Grid from "@mui/material/Grid2";
import {Box, Button} from "@mui/material";


export default function HomeView() {
    const [openMenu, setOpenMenu] = useState(false);
    return <>
        <TopBar title={"首页"} onOpenMenu={()=>setOpenMenu(true)} />
        <SideBar title={"首页"} onClose={()=>setOpenMenu(false)} open={openMenu} />
        <Main ml={12} mr={12}>
            <h1>Frp管理面板</h1>
            <Box sx={{ flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid size={2}>
                        <Button variant={"contained"}>节点列表</Button>
                    </Grid>
                    <Grid size={2}>
                        {/*<Button variant={"contained"}>Btn</Button>*/}
                    </Grid>
                </Grid>
            </Box>
        </Main>
    </>
}