import Loader from "@/app/components/Loader/Loader";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React from "react";
import { AiOutlineDelete,AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";

type Props = {};

const GetAllUser = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const {isLoading,data,error}=useGetAllUsersQuery({})
  console.log(data)

  const colums = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "Created_at",
      headerName: "Join At",
      flex: 0.5,
    },

    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params:any) => {
        return (
          <a href={` mailto:${params.row.email}`}>
            <AiOutlineMail className="dark:text-white text-black" size={22} />
          </a>
        );
      },
    },

    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: () => {
        return (
          <Button>
            <AiOutlineDelete className="dark:text-white text-black" size={22} />
          </Button>
        );
      },
    },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: () => {
        return (
          <Button>
            <AiOutlineDelete className="dark:text-white text-black" size={22} />
          </Button>
        );
      },
    },
  ];
  const rows:any = [

  ];

  data?.users?.forEach((item:any)=>(
    rows.push({
      id: item._id,
      name: item.name+"xx",
      email: item.email,
      role: item.role ,
      Created_at: format(item.createdAt) ,
  })
  ))

  return (
    <div className="mt-[120px] ">
    {
        isLoading? <Loader/>:
        <Box>
        <Box
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-sortIcon": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-row": {
              color: theme === "dark" ? "#fff" : "#000",
              borderBottom:
                theme === "dark"
                  ? "1px solid #ffffff30 !important"
                  : "1px solid #ccc !important",
            },
            "& .MuiTablePagination-root": {
              color: theme === "dark" ? "#fff" : "#000",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "&.name-column--cell": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              borderBottom: "none",
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
            },

            "& .MuiDataGrid-footerContainer": {
              color: theme === "dark" ? "#fff" : "#000",
              borderTop: "none",
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
            },
            "& .MuiCheckbox-root": {
              color:
                theme === "dark" ? `#b7ebde !important` : `#000 !important`,
            },
            "& .MuiCheckbox-toolbarContainer .MuiButton-text": {
              color: `#000 !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={rows} columns={colums} />
        </Box>
      </Box>
    }
    </div>
  );
};

export default GetAllUser;
