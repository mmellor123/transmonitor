import { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from '@mui/material';
import {tokens} from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { useAuth } from "../../components/auth";
import { Item } from "../../common/functions";
import { ReactComponent as Logo } from "./flower.svg";
import { useLocation } from "react-router-dom";


const SidebarMine = ({isSidebar}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { collapseSidebar, collapsed } = useProSidebar();
    const auth = useAuth();
    const location = useLocation();

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important"
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important"
                },
            }}
            display='flex'
            boxShadow="0px 4px 19px 0px #aaaaaa"
        >
            {auth.user && (
            <Sidebar backgroundColor={colors.primary[400]} collapsed={collapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                        <MenuItem onClick={() => collapseSidebar()}
                            icon={collapsed ? <MenuOutlinedIcon/> : undefined}
                            style={{
                                margin: "10px 0 20px 0",
                                color: colors.grey[100],
                            }}
                        >
                        {!collapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINIS
                                </Typography>
                                <IconButton>
                                    <MenuOutlinedIcon/>          
                                </IconButton>
                            </Box>
                            
                        )} 
                        </MenuItem>

                        {!collapsed && (
                            <Box mb="25px">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Logo/>
                                    {/* <img
                                        alt="profile-user"
                                        width="100px"
                                        height="100px"
                                        src={<Logo/>}
                                        style={{cursor: "pointer", borderRadius: "50%"}}
                                    /> */}
                                </Box>
                                <Box textAlign="center">
                                    <Typography
                                        variant="h2"
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        sx={{m: "10px 0 0 0"}}
                                    >
                                        AML Monitoring
                                    </Typography>
                                    <Typography variant="h5" color={colors.greenAccent[500]}>
                                        Pages
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Box paddingLeft={collapsed ? undefined : "10%"}>
                            <Item
                                title="Dashboard"
                                to="/"
                                icon={<HomeOutlinedIcon/>}
                                location={location.pathname}

                            />

                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m:"15px 0 5px 20px"}}
                            >
                                Data
                            </Typography>
                            {/* <Item
                                title="Manage Team"
                                to="/team"
                                icon={<PeopleOutlinedIcon/>}
                            /> */}
                            <Item
                                title="Transactions"
                                to="/invoices"
                                icon={<ReceiptOutlinedIcon/>}
                                location={location.pathname}
                            />
                            
                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m:"15px 0 5px 20px"}}
                            >
                                Pages
                            </Typography>
                            {/* <Item
                                title="Profile Form"
                                to="/form"
                                icon={<PersonOutlinedIcon />}
                            /> */}
                            {/* <Item
                                title="Calendar"
                                to="/calendar"
                                icon={<CalendarTodayOutlinedIcon />}
                            /> */}
                            {/* <Item
                                title="FAQ Page"
                                to="/faq"
                                icon={<HelpOutlineOutlinedIcon  yOutlinedIcon />}
                            /> */}

                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m:"15px 0 5px 20px"}}
                            >
                                Charts
                            </Typography>
                            <Item
                                title="Bar Chart"
                                to="/bar"
                                icon={<BarChartOutlinedIcon  />}
                                location={location.pathname}
                            />
                            <Item
                                title="Pie Chart"
                                to="/pie"
                                icon={<PieChartOutlineOutlinedIcon/>}
                                location={location.pathname}
                            />
                            <Item
                                title="Line Chart"
                                to="/line"
                                icon={<TimelineOutlinedIcon/>}
                                location={location.pathname}
                            />

                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m:"15px 0 5px 20px"}}
                            >
                                Rules
                            </Typography>
                            <Item
                                title="Create Rule"
                                to="/create-rule"
                                icon={<AddIcon/>}
                                location={location.pathname}
                            />
                            <Item
                                title="View Rules"
                                to="/view-rules"
                                icon={<EditIcon/>}
                                location={location.pathname}
                            />
                        </Box>
                </Menu>
            </Sidebar>
            )}
        </Box>
    );
};

export default SidebarMine;