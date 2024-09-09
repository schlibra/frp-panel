import {JSX} from "react";

export interface SideBarItem {
    icon?: JSX.Element,         // 图标
    text?: string,              // 标题
    link?: string,              // 链接
    onclick?: ()=>Promise<void>,    // 点击事件
    line?: boolean,             // 是否为分割线
}