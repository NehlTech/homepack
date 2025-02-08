// import { ActionOptions, ViewAction } from "@/components/action-options";
// import ActionDialog from "@/components/dialogs/action-dialog";
// import { PatientForm } from "@/components/forms/patient-form";
// import { ProductForm } from "@/components/forms/product-form";
// import { Pagination } from "@/components/pagination";
// import { ProfileImage } from "@/components/profile-image";
// import SearchInput from "@/components/search-input";
// import { Table } from "@/components/tables/table";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { SearchParamsProps } from "@/types";
// import { calculateAge, formatDateTime } from "@/utils";
// import { checkRole } from "@/utils/roles";
// import { getAllPatient } from "@/utils/services/patient";
// import { getProductData } from "@/utils/services/shop";
// import { DATA_LIMIT } from "@/utils/settings";
// import { Patient } from "@prisma/client";
// import { UserPen, Users } from "lucide-react";

// const columns = [
//   {
//     header: "Available For Purchase",
//     key: "purchase",
//   },
//   {
//     header: "Name",
//     key: "name",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Price",
//     key: "price",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Orders",
//     key: "orders",
//     className: "hidden lg:table-cell",
//   },
//   //   {
//   //     header: "Address",
//   //     key: "address",
//   //     className: "hidden xl:table-cell",
//   //   },
//   //   {
//   //     header: "Last Visit",
//   //     key: "created_at",
//   //     className: "hidden lg:table-cell",
//   //   },
//   //   {
//   //     header: "Last Treatment",
//   //     key: "treatment",
//   //     className: "hidden 2xl:table-cell",
//   //   },
//   {
//     header: "Actions",
//     key: "action",
//   },
// ];

// interface PatientProps extends Patient {
//   appointments:
//     | {
//         medical:
//           | {
//               created_at: Date;
//               treatment_plan: string;
//             }[]
//           | [];
//       }[]
//     | [];
// }
// const AdminProductPage = async (props: SearchParamsProps) => {
//   const searchParams = await props.searchParams;
//   const page = (searchParams?.p || "1") as string;
//   const searchQuery = (searchParams?.q || "") as string;
//   const { activeCount, inactiveCount } = await getProductData({
//     page,
//     limit: DATA_LIMIT,
//     search: searchQuery,
//   });

//   const isAdmin = await checkRole("ADMIN");
//   const isNurse = await checkRole("NURSE");

//   const renderRow = (item: PatientProps) => {
//     const lastVisit = item?.appointments[0]
//       ? item?.appointments[0]?.medical[0]
//       : null;

//     return (
//       <tr
//         key={item.id}
//         className="border-b border-gray-200 dark:border-gray-800 even:bg-blue-50  dark:even:bg-transparent text-sm hover:bg-slate-50 dark:hover:bg-gray-900"
//       >
//         <td className="flex items-center gap-4 p-4">
//           <ProfileImage
//             url={item?.img!}
//             name={item.first_name + " " + item.last_name}
//             bgColor={item?.colorCode!}
//             textClassName=""
//           />

//           <div>
//             <h3 className="text-base md:font-semibold uppercase">
//               {item.first_name + " " + item.last_name}
//             </h3>
//             <span className="text-sm">{calculateAge(item.date_of_birth)}</span>
//           </div>
//         </td>
//         <td className="hidden md:table-cell capitalize">
//           {item.gender.toLowerCase()}
//         </td>
//         <td className="hidden md:table-cell">{item.phone}</td>
//         <td className="hidden lg:table-cell lowercase">{item.email}</td>
//         <td className="hidden xl:table-cell">{item.address}</td>
//         <td className="hidden lg:table-cell">
//           {lastVisit ? (
//             formatDateTime(lastVisit?.created_at.toDateString())
//           ) : (
//             <span className="text-gray-400 italic">No last visit</span>
//           )}
//         </td>
//         <td className="hidden 2xl:table-cell">
//           {lastVisit?.treatment_plan ? (
//             lastVisit?.treatment_plan
//           ) : (
//             <span className="text-gray-400 italic">No last treatment</span>
//           )}
//         </td>
//         <td>
//           <div className="flex items-center gap-2">
//             <ViewAction href={`/patient/${item?.id}`} />

//             {isAdmin && (
//               <ActionDialog type="delete" id={item.id} deleteType="patient" />
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
//           <Users size={20} className="text-gray-500" />
//           <p className="text-2xl font-semibold">{totalRecord}</p>
//           <span className="text-gray-600 text-sm xl:text-base">
//             Total products
//           </span>
//         </div>

//         <div className="w-full lg:w-fit flex items-center justify-between lg:justify-start gap-2">
//           <SearchInput />

//           {(isAdmin || isNurse) && <ProductForm />}
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

// export default AdminProductPage;

// ManageProduct.tsx
import { ActionOptions, ViewAction } from "@/components/action-options";
import ActionDialog from "@/components/dialogs/action-dialog";
import { ProductForm } from "@/components/forms/product-form";

import { Pagination } from "@/components/pagination";
import SearchInput from "@/components/search-input";
import { Table } from "@/components/tables/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchParamsProps } from "@/types";
import { getAllProducts } from "@/utils/services/shop";

import { DATA_LIMIT } from "@/utils/settings";
import { Product } from "@prisma/client";
import { ShoppingCart, Edit } from "lucide-react";

const columns = [
  {
    header: "Product Name",
    key: "productName",
  },
  {
    header: "Price (₵)",
    key: "priceInCedis",
  },
  {
    header: "Stock Status",
    key: "stockStatus",
  },
  {
    header: "Description",
    key: "description",
  },
  {
    header: "Actions",
    key: "action",
  },
];

interface ProductProps extends Product {}

const ManageProduct = async (props: SearchParamsProps) => {
  const searchParams = await props.searchParams;
  const page = (searchParams?.p || "1") as string;
  const searchQuery = (searchParams?.q || "") as string;
  const { data, totalRecord, totalPages, currentPage } = await getAllProducts({
    page,
    limit: DATA_LIMIT,
    search: searchQuery,
  });

  const isAdmin = true;

  const renderRow = (item: ProductProps) => {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 dark:border-gray-800 even:bg-blue-50 dark:even:bg-transparent text-sm hover:bg-slate-50 dark:hover:bg-gray-900"
      >
        <td className="flex items-center gap-4 p-4">
          {/* <img
            src={item.imagePath}
            alt={item.productName}
            className="w-12 h-12 rounded"
          /> */}
          {item.imagePath && (
            <img
              src={item.imagePath}
              alt={item.productName}
              className="w-12 h-12 rounded"
            />
          )}
          <div>
            <h2 className="text-base  ">{item.productName}</h2>
            {/* <span className="text-sm">₵ {item.priceInCedis}</span> */}
          </div>
          {/* <div>
            <h3 className="text-base md:font-semibold uppercase">
              {item.productName}
            </h3>
            <span className="text-sm">₵ {item.priceInCedis}</span>
          </div> */}
        </td>
        <td>{item.priceInCedis}</td>
        <td>{item.stockStatus}</td>
        <td>{item.description}</td>
        <td>
          <div className="flex items-center gap-2">
            <ViewAction href={`/product/${item.id}`} />
            {isAdmin && (
              <ActionDialog type="delete" id={item.id} deleteType="product" />
            )}
          </div>
        </td>
      </tr>
    );
  };

  if (!data) return null;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-1">
          <ShoppingCart size={20} className="text-gray-500" />
          <p className="text-2xl font-semibold">{totalRecord}</p>
          <span className="text-gray-600 text-sm xl:text-base">
            Total products
          </span>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-between lg:justify-start gap-2">
          <SearchInput />
          {isAdmin && <ProductForm />}
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <Table columns={columns} renderRow={renderRow} data={data} />

        <Pagination
          totalRecords={totalRecord}
          currentPage={currentPage}
          totalPages={totalPages}
          limit={DATA_LIMIT}
        />
      </div>
    </Card>
  );
};

export default ManageProduct;
