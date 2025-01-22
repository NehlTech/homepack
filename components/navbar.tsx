import { getNotification } from "@/utils/services/generaal-services";
import { UserButton } from "@clerk/nextjs";
import { GetLabel } from "./get-label";
import { NotificationPanel } from "./notification-panel";
import { ThemeSwitcher } from "./theme-switcher";

export const Navbar = async () => {
  const { data } = await getNotification();

  if (!data) return null;

  return (
    <div className="px-5 pt-5  flex justify-between">
      <GetLabel />
      <div className="flex items-center gap-4">
        <NotificationPanel data={data} />
        <ThemeSwitcher />
        <UserButton />
      </div>
    </div>
  );
};
