import { getRole } from "@/utils/roles";
import {
  Bell,
  ClipboardPlus,
  LayoutDashboard,
  List,
  ListOrdered,
  Logs,
  LucideIcon,
  Pill,
  Receipt,
  Settings,
  SquareActivity,
  User,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { Card } from "./ui/card";
import Image from "next/image";

const ACCESS_LEVELS_ALL = [
  "admin",
  "doctor",
  "nurse",
  "laboratory",
  "patient",
  "pharmacy",
  "account",
];

const STAFF_ONLY = [
  "admin",
  "doctor",
  "nurse",
  "laboratory",
  "pharmacy",
  "account",
];

const SidebarIcon = ({ Icon }: { Icon: LucideIcon }) => {
  return <Icon className="size-6 lg:size-5" />;
};

export const LogoLink = () => (
  <div className="flex items-center justify-center lg:justify-start gap-2">
    <Link href="/" className="flex items-center gap-2">
      <div className="p-1.5 rounded-md  text-white">
        {/* <SquareActivity size={22} /> */}
        <Image src="/homeLogo.png" alt="homelogo" width={50} height={50} />
      </div>
      <span className="hidden lg:flex text-base 2xl:text-xl font-bold">
        HPMS
      </span>
    </Link>
  </div>
);

export const Sidebar = async () => {
  const role = await getRole();

  const SIDEBAR_LINKS = [
    {
      label: "MENU",
      links: [
        {
          name: "Dashboard",
          href: `/${role.toLowerCase()}`,
          access: ACCESS_LEVELS_ALL,
          icon: LayoutDashboard,
        },
        {
          name: "Profile",
          href: "/patient/self",
          access: ["patient"],
          icon: User,
        },
      ],
    },
    {
      label: "Manage",
      links: [
        {
          name: "Users",
          href: "/record/users",
          access: ["admin"],
          icon: Users,
        },
        {
          name: "Doctors",
          href: "/record/doctors",
          access: ["admin", "nurse"],
          icon: User,
        },
        {
          name: "Staffs",
          href: "/record/staffs",
          access: ["admin", "doctor"],
          icon: UserRound,
        },
        {
          name: "Patients",
          href: "/record/patients",
          access: STAFF_ONLY,
          icon: UsersRound,
        },
        {
          name: "Appointments",
          href: "/record/appointments",
          access: ["admin", "doctor", "nurse"],
          icon: ListOrdered,
        },
        {
          name: "Prescriptions",
          href: "/pharmacy/prescriptions",
          access: ["admin", "pharmacy"],
          icon: ClipboardPlus,
        },
        {
          name: "Drugs",
          href: "/pharmacy/drugs",
          access: ["admin", "pharmacy"],
          icon: Pill,
        },
        {
          name: "Medical Records",
          href: "/record/medical-records",
          access: ["admin", "doctor", "nurse", "laboratory", "pharmacy"],
          icon: SquareActivity,
        },
        {
          name: "Billing Overview",
          href: "/record/billing",
          access: ["admin", "doctor", "account"],
          icon: Receipt,
        },
        {
          name: "Payments Received",
          href: "/record/payments",
          access: ["admin", "account"],
          icon: Receipt,
        },
        {
          name: "Appointments",
          href: "/record/appointments",
          access: ["patient"],
          icon: ListOrdered,
        },
        {
          name: "Doctors",
          href: "/record/available-doctors",
          access: ["patient"],
          icon: Users,
        },
        {
          name: "Records",
          href: "/patient/self",
          access: ["patient"],
          icon: List,
        },
        {
          name: "Prescription",
          href: "#",
          access: ["patient"],
          icon: Pill,
        },
        {
          name: "Billing",
          href: "/patient/self?cat=payments",
          access: ["patient"],
          icon: Receipt,
        },
        {
          name: "Leaves",
          href: "/admin/leaves",
          access: ["admin"],
          icon: List,
        },
        {
          name: "Leaves",
          href: "/record/leaves",
          access: STAFF_ONLY.slice(1),
          icon: List,
        },
        {
          name: "Invoices",
          href: "/pharmacy/invoices",
          access: ["admin", "pharmacy", "account"],
          icon: List,
        },
      ],
    },
    {
      label: "System",
      links: [
        {
          name: "Notifications",
          href: "/notifications",
          access: ACCESS_LEVELS_ALL,
          icon: Bell,
        },
        {
          name: "Audit Logs",
          href: "/admin/audit-logs",
          access: ["admin"],
          icon: Logs,
        },
        {
          name: "Settings",
          href: "/admin/system-settings",
          access: ["admin"],
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <Card className="h-full p-4 flex flex-col justify-between gap-4 overflow-y-scroll">
      <div className="">
        <LogoLink />
        <div className="mt-4 text-sm ">
          {SIDEBAR_LINKS.map((i) => (
            <div className="flex flex-col gap-2" key={i.label}>
              <span className="hidden uppercase lg:block text-foreground font-light my-4">
                {i.label}
              </span>
              {i.links.map((item) => {
                if (item?.access?.includes(role?.toLowerCase())) {
                  return (
                    <Link
                      href={item.href}
                      key={item.name}
                      className="flex items-center justify-center lg:justify-start gap-4 text-muted-foreground py-2 md:px-2 rounded-md hover:bg-yellow-600/10"
                    >
                      <SidebarIcon Icon={item?.icon} />
                      <span className="hidden lg:block">{item.name}</span>
                    </Link>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
      <LogoutButton />
    </Card>
  );
};
