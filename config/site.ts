// config/site.ts

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Spoid",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "PC 부품",
      href: "/component",
    },
    {
      label: "관심 부품",
      href: "/heart",
    },
    {
      label: "견적 내기",
      href: "/estimate",
    },
    {
      label: "내 견적",
      href: "/mypage",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
