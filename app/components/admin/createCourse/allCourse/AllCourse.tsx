import Loader from "@/app/components/Loader/Loader";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React from "react";
import { AiFillEdit, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { format } from "timeago.js";

type Props = {};

const AllCourse = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, error } = useGetAllCoursesQuery({});
  console.log(data);

  const colums = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "Title",
      headerName: "Course Title",
      flex: 1,
    },
    {
      field: "Ratings",
      headerName: "Ratings",
      flex: 0.5,
    },
    {
      field: "Purchased",
      headerName: "Purchased",
      flex: 0.5,
    },
    {
      field: "Created_at",
      headerName: "Created_at",
      flex: 0.5,
    },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button>
            <AiFillEdit className="dark:text-white text-black" size={22} />
          </Button>
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
  ];
  const rows: any = [];

  data?.courses?.forEach((item: any) =>
    rows.push({
      id: item._id,
      Title: item.name,
      Ratings: item.ratings,
      Purchased: item.purchased,
      Created_at: format(item.createdAt),
    })
  );

  return (
    <div className="mt-[120px] ">
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default AllCourse;
