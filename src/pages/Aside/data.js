import { BiLogOutCircle, BiSupport } from "react-icons/bi";
import { BsSpeedometer2 } from "react-icons/bs";
import { MdOutlinePageview } from "react-icons/md";
import { screens } from "../../screens";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import { FaRegCreditCard } from "react-icons/fa";

export const links = [
  {
    link: screens.dashboard,
    title: "Dashboard",
    icon: <SVGIcon src="/assets/svg/dashboard.svg" size={24} />,
    isDisabled: false,
  },
  {
    link: screens.plans,
    title: "Subscription",
    icon: <SVGIcon src="/assets/svg/credit-card.svg" size={22} />,

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
