import { OrderCard } from "@/components/cards/order-card";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// import {
//   getNormalUserData,
//   getProductData,
//   getSalesData,
// } from "@/utils/services/shop";
import { BriefcaseBusiness, BriefcaseMedical, User, Users } from "lucide-react";

const ShopPage = async () => {
  const [data, normalUserData, productData] = await Promise.all([
    getSalesData(),
    getNormalUserData(),
    getProductData(),
  ]);

  if (!data) {
    return null;
  }

  const { amount, numberOfSales } = data;

  const cardData = [
    {
      title: "Sales",
      value: amount,
      isCurrency: true,
      icon: Users,
      className: "bg-blue-600/15",
      iconClassName: "bg-blue-600/25 text-blue-600",
      note: "Total sales",
      subtitle: "Orders",
      subtitle2: "",
    },
    {
      title: "Customers",
      value: normalUserData.averageValuePerUser,
      isCurrency: true,
      icon: User,
      className: "bg-rose-600/15",
      iconClassName: "bg-rose-600/25 text-rose-600",
      note: "Total customers",
      subtitle: "Customers",
      subtitle2: "Average Value",
    },
    {
      title: "Products",
      value: Number(productData.inactiveCount),
      isCurrency: false,
      icon: BriefcaseBusiness,
      className: "bg-yellow-600/15",
      iconClassName: "bg-yellow-600/25 text-yellow-600",
      note: "Total products",
      subtitle: "Inactive",
      subtitle2: "Active Products",
    },
  ];

  return (
    <Card>
      <div className="rounded-xl flex flex-col xl:flex-row gap-6">
        {/* LEFT */}
        <div className="w-full xl:w-[69%]">
          <div className="bg-background rounded-xl p-4 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-semibold">Shop</h1>
              <div className="space-x-2">
                <Button size="sm" variant="outline">
                  {new Date().getFullYear()}
                </Button>
              </div>
            </div>
            <div className="w-full flex flex-wrap gap-5">
              {cardData?.map((i, id) => (
                <OrderCard
                  key={id}
                  title={i.title}
                  value={i.value!}
                  isCurrency={i.isCurrency}
                  icon={i.icon}
                  className={i.className}
                  note={i.note}
                  iconClassName={i.iconClassName}
                  subTitle={i.subtitle}
                  subTitle2={i.subtitle2}
                />
              ))}
            </div>
          </div>

          <div className="h-[500px]">
            {/* <AppointmentChart data={monthlyData!} /> */}
            <h1>Sales Chart</h1>
            <span>Coming soon</span>
          </div>
          <div className="bg-background rounded-xl p-4 mt-8">
            {/* <RecentAppointments data={last5Records as any} /> */}
            <h1>Recent purchases</h1>
            <p>Coming soon</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full xl:w-[30%] mt-4">
          <div className="w-full h-[300px] mb-8">
            {/* <StatSummary data={appointmentCounts} total={totalAppointments!} /> */}
            <h1>Sales summary</h1>
            <p>Coming soon</p>
          </div>

          {/* <StaffChartContainer /> */}

          {/* <AvailableDoctors data={availableDoctors as any} /> */}
        </div>
      </div>
    </Card>
  );
};

export default ShopPage;

// import { ActionOptions, ViewAction } from "@/components/action-options";
// import ActionDialog from "@/components/dialogs/action-dialog";
// import { ProductForm2 } from "@/components/forms/product-form2";
// // import { ProductForm } from "@/components/forms/product-form2"; // Import the ProductForm
// import { Pagination } from "@/components/pagination";
// import { ProfileImage } from "@/components/profile-image"; // If you want to keep profile images (adapt as needed)
// import SearchInput from "@/components/search-input";
// import { Table } from "@/components/tables/table";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { SearchParamsProps } from "@/types";
// import { getAllProducts } from "@/utils/services/shop";

// import { DATA_LIMIT } from "@/utils/settings";
// import { Product } from "@prisma/client"; // Import Product type
// import { PackageIcon } from "lucide-react"; // Use a relevant icon

// const columns = [
//   {
//     header: "Product Name",
//     key: "productName", // Match Prisma field name
//   },
//   {
//     header: "Price",
//     key: "priceInCedis", // Match Prisma field name
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Stock Status",
//     key: "stockStatus", // Match Prisma field name
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Description",
//     key: "description", // Match Prisma field name
//     className: "hidden lg:table-cell",
//   },
//   {
//     header: "Image", // New column for image
//     key: "imagePath",
//     className: "hidden xl:table-cell",
//   },
//   {
//     header: "Actions",
//     key: "action",
//   },
// ];

// interface ProductWithImage extends Product {
//   // If you want to display the image
//   // Add any other related data if needed
// }

// const ManageProducts = async (props: SearchParamsProps) => {
//   const searchParams = await props.searchParams;
//   const page = (searchParams?.p || "1") as string;
//   const searchQuery = (searchParams?.q || "") as string;

//   const { data, totalRecord, totalPages, currentPage } = await getAllProducts({
//     page,
//     limit: DATA_LIMIT,
//     search: searchQuery,
//   });

//   const isAdmin = true; // Or your role checking logic

//   const renderRow = (item: ProductWithImage) => {
//     return (
//       <tr
//         key={item.id}
//         className="border-b border-gray-200 dark:border-gray-800 even:bg-blue-50  dark:even:bg-transparent text-sm hover:bg-slate-50 dark:hover:bg-gray-900"
//       >
//         <td className="flex items-center gap-4 p-4">
//           {/* Conditionally render image */}
//           {item.imagePath && (
//             <img
//               src={item.imagePath}
//               alt={item.productName}
//               className="h-12 w-12 rounded-full object-cover" // Adjust styling as needed
//             />
//           )}
//           <div>
//             <h3 className="text-base md:font-semibold uppercase">
//               {item.productName}
//             </h3>
//           </div>
//         </td>
//         <td className="hidden md:table-cell">{item.priceInCedis}</td>
//         <td className="hidden md:table-cell capitalize">{item.stockStatus}</td>
//         <td className="hidden lg:table-cell">{item.description}</td>
//         <td className="hidden xl:table-cell">
//           {item.imagePath && ( // Display image if path exists.
//             <img
//               src={item.imagePath}
//               alt={item.productName}
//               className="h-16 w-auto object-cover"
//             />
//           )}
//         </td>
//         <td>
//           <div className="flex items-center gap-2">
//             <ViewAction href={`/product/${item?.id}`} /> {/* Update link */}
//             {isAdmin && (
//               <ActionDialog type="delete" id={item.id} deleteType="product" />
//             )}
//           </div>
//         </td>
//       </tr>
//     );
//   };

//   if (!data) return null;

//   return (
//     <Card className="p-4">
//       <div className="flex items-center justify-between">
//         <div className="hidden lg:flex items-center gap-1">
//           <PackageIcon size={20} className="text-gray-500" />{" "}
//           {/* Update icon */}
//           <p className="text-2xl font-semibold">{totalRecord}</p>
//           <span className="text-gray-600 text-sm xl:text-base">
//             Total products
//           </span>
//         </div>

//         <div className="w-full lg:w-fit flex items-center justify-between lg:justify-start gap-2">
//           <SearchInput />
//           {isAdmin && <ProductForm2 />} {/* Use ProductForm */}
//         </div>
//       </div>

//       <div className="overflow-x-auto mt-4">
//         <Table columns={columns} renderRow={renderRow} data={data} />

//         <Pagination
//           totalRecords={totalRecord}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           limit={DATA_LIMIT}
//         />
//       </div>
//     </Card>
//   );
// };

// export default ManageProducts;
