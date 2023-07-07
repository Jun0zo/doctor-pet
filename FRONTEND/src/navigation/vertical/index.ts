// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "홂",
      path: "/home",
      icon: "mdi:home-outline",
    },
    {
      path: "/inquiries",
      action: "read",
      subject: "acl-page",
      title: "대기열",
      icon: "mdi:shield-outline",
    },
  ];
};

export default navigation;
