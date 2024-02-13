import { BiLogOutCircle, BiSupport } from "react-icons/bi";
import { BsSpeedometer2 } from "react-icons/bs";
import { MdOutlinePageview } from "react-icons/md";
import { screens } from "../../screens";
import SVGIcon from "../../components/SVGIcon/SVGIcon";

export const links = [
  {
    link: screens.opPageIssues,
    title: "On-Page Issues",
    icon: <SVGIcon src="/svg/pageIssues.svg" size={24} />,
    isDisabled: false,
  },
  {
    link: screens.integration,
    title: "Speed Optimizer",
    icon: (
      <div>
        <BsSpeedometer2 style={{ marginBottom: -3 }} size={22} />
      </div>
    ),
    isDisabled: true,
    tag: "Coming Soon!",
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
