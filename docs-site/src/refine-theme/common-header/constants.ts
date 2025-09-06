import {
  DocumentsIcon,
  IntegrationsIcon,
  ExamplesIcon,
  AwesomeIcon,
  ContributeIcon,
  RefineWeekIcon,
  HackathonsIcon,
  AboutUsIcon,
  StoreIcon,
  MeetIcon,
  BlogIcon,
  NewBadgeIcon,
} from "../icons/popover";

export type NavbarPopoverItemType = {
  isPopover: true;
  label: string;
  items: {
    label: string;
    description: string;
    link: string;
    icon: React.FC;
  }[];
};

export type NavbarItemType = {
  isPopover?: false;
  label: string;
  icon?: React.FC;
  href?: string;
};

export type MenuItemType = NavbarPopoverItemType | NavbarItemType;

export const MENU_ITEMS: MenuItemType[] = [
  {
    isPopover: true,
    label: "Notes",
    items: [
      {
        label: "Creative Learnings",
        description: "Personal insights and creative discoveries.",
        link: "/docs/creative-learnings/",
        icon: DocumentsIcon,
      },
      {
        label: "French Notes",
        description: "French language learning resources.",
        link: "/docs/french/",
        icon: DocumentsIcon,
      },
      {
        label: "DSA Notes",
        description: "Data structures and algorithms notes.",
        link: "/docs/dsa/",
        icon: DocumentsIcon,
      },
      {
        label: "Getting Started",
        description: "Welcome to Notes documentation.",
        link: "/",
        icon: DocumentsIcon,
      },
    ],
  },
  {
    isPopover: false,
    label: "About",
    href: "/about",
  },
  {
    isPopover: true,
    label: "Connect",
    items: [
      {
        label: "GitHub",
        description: "View source code and contribute.",
        link: "https://github.com/sahilpatel09/notes",
        icon: AwesomeIcon,
      },
      {
        label: "Twitter",
        description: "Follow for updates and insights.",
        link: "https://x.com/sahilpatel09",
        icon: BlogIcon,
      },
      {
        label: "LinkedIn",
        description: "Professional networking and updates.",
        link: "https://www.linkedin.com/in/sahilpatel09",
        icon: AboutUsIcon,
      },
    ],
  },
];
