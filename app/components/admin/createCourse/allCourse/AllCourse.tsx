import Loader from "@/app/components/Loader/Loader";
import { style } from "@/app/styles/styels";
import { useDeleteCourseByIdMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { Box, Button,Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React, {FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillEdit, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { format } from "timeago.js";

type Props = {
  setEdit:(Edit:number)=>void
  setSelect:(select:number)=>void
  setEditCourseID:(EditCourseID:string)=>void
};

const AllCourse:FC<Props> = ({setEdit,setSelect,setEditCourseID}) => {
  const { theme, setTheme } = useTheme();
   const [id,setId]=useState('')
   const [Active, setActive] = useState(false)
  const { isLoading, data,refetch } = useGetAllCoursesQuery({},{refetchOnMountOrArgChange:true});
  const [deleteCourseById,{isSuccess,isLoading:Loading,error}]=useDeleteCourseByIdMutation()


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
          <Button onClick={
          ()=>{
            setEdit(88)
            setSelect(0)
            setEditCourseID(params.row.id)
          }
          }>
            <AiFillEdit className="dark:text-white text-black" size={22} />
          </Button>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params:any) => {
        const DeleteFunction=()=>{
          setId(params.row.id)
          setActive(true)
        }
        return (
          <Button onClick={()=>DeleteFunction()}>
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

  useEffect(()=>{
    if(isSuccess){
      refetch()
      toast.success('course deleted successfully')
    }
    if(error){
      if('data' in error){
        const message=error as any
        toast.error(message.data.message)
      }
    }
  },[isSuccess,error])

  const CourseDeleteById=async()=>{
    if(!Loading){
      await deleteCourseById(id)
      setActive(false)
     
    }
    
  }

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
          {Active && (
        <Modal
       open={Active}
       onClose={()=>(!Active)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box className=' absolute top-[50%] left-[50%]'>
            <div className="w-[50vh] min-h-[10vh] bg-black p-2">
               <h1 className="text-center font-Poppins mt-3 ">Are your sure you want to delete </h1>
          
                
                <div className="flex justify-between w-full my-8 px-5">
                    <button onClick={()=>setActive(!Active)} className={`${style.button} !w-[70px] !h-[20px] !rounded-sm`}>Cancel</button>
                    <button onClick={()=>CourseDeleteById()}  className={`${style.button} !w-[70px] !h-[20px] !rounded-sm !bg-red-600`}>Delete</button>
                </div>
                </div>   


          </Box>
        </Modal>
      )}
        </Box>
      )}
    </div>
  );
};

export default AllCourse;
