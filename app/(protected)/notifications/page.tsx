import { auth } from "@clerk/nextjs/server";

import { NotificationContainer } from "@/components/notification-container";
import { fetUserNotifications } from "@/utils/services/generaal-services";

const Notifications = async () => {
  const { userId } = await auth();

  const { data } = await fetUserNotifications(userId!);

  if (!data) return null;

  return <NotificationContainer data={data} />;
};

export default Notifications;
