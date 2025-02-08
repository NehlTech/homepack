// "use server";

// import db from "@/lib/db";
// import { UserFormSchema } from "@/lib/schema";
// import { clerkClient } from "@clerk/nextjs/server";
// import { Role } from "@prisma/client";

// export async function createNewUser(data: any, uid: string) {
//   try {
//     const validateData = UserFormSchema.safeParse(data);

//     if (!validateData.success) {
//       return {
//         success: false,
//         error: true,
//         msg: "Provide all required fields.",
//       };
//     }

//     const validatedData = validateData.data;
//     let user_id = uid;

//     const client = await clerkClient();

//     if (uid === "new-user") {
//       const user = await client.users.createUser({
//         emailAddress: [validatedData.email],
//         password: validatedData.phone, // For simplicity, we use phone as password
//         firstName: validatedData.first_name,
//         lastName: validatedData.last_name,
//         publicMetadata: { role: "USER" },
//       });

//       user_id = user.id;

//       await db.user.create({
//         data: {
//           id: user_id,
//           email: validatedData.email,
//           name: `${validatedData.first_name} ${validatedData.last_name}`,
//           role: "USER",
//         },
//       });
//     } else {
//       await client.users.updateUser(uid, {
//         publicMetadata: { role: "USER" },
//       });
//     }

//     const fullName = `${validatedData.first_name} ${validatedData.last_name}`;
//     // Create the user in the database without patient-specific fields
//     await db.user.create({
//       data: {
//         id: user_id,
//         name: fullName,
//         phone: validatedData.phone,
//         email: validatedData.email,
//         address: validatedData.address,
//         role: Role.USER,
//       },
//     });

//     await db.notification.create({
//       data: {
//         title: "Welcome on board",
//         message: `You are welcome to the HomePack Healthcare Management System, ${validatedData.first_name} ${validatedData.last_name}.`,
//         user_id: user_id,
//       },
//     });

//     return { success: true, error: false, msg: "User registered successfully" };
//   } catch (error: any) {
//     console.error(error);
//     return { success: false, error: true, msg: error?.message };
//   }
// }

// export async function updateUser(data: any, uid: string) {
//   try {
//     const validateData = UserFormSchema.safeParse(data);

//     if (!validateData.success) {
//       return {
//         success: false,
//         error: true,
//         msg: "Provide all required fields.",
//       };
//     }

//     const validatedData = validateData.data;
//     const client = await clerkClient();

//     await client.users.updateUser(uid, {
//       firstName: validatedData.first_name,
//       lastName: validatedData.last_name,
//     });

//     await db.user.update({
//       where: { id: uid },
//       data: {
//         name: validatedData.first_name,
//         phone: validatedData.phone,
//         email: validatedData.email,

//         address: validatedData.address,
//       },
//     });

//     return { success: true, error: false, msg: "Updated successfully" };
//   } catch (error: any) {
//     console.error(error);
//     return { success: false, error: true, msg: error?.message };
//   }
// }
