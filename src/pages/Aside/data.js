import { BiLogOutCircle, BiSupport } from "react-icons/bi";
import { BsSpeedometer2 } from "react-icons/bs";
import { MdOutlinePageview } from "react-icons/md";
import { screens } from "../../screens";
import SVGIcon from "../../components/SVGIcon/SVGIcon";

export const links = [
  {
    link: screens.dashboard,
    title: "Dashboard",
    icon: <SVGIcon src="/assets/svg/dashboard.svg" size={24} />,
    isDisabled: false,
  },
];

export const accountMenuItems = [
  {
    title: "Logout",
    link: "/dashboard/logout",
    icon: <BiLogOutCircle size={20} />,
    handler: () => {},
  },
];
