import Loader from "@/app/components/Loader/Loader";
import { style } from "@/app/styles/styels";
import { useGetAllUsersQuery, useUserDeleteByIDMutation } from "@/redux/features/user/userApi";
import { Box, Button,Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete,AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";

type Props = {};

const GetAllUsers = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [Active, setActive] = React.useState(false);
  const [id,setId]=React.useState('')
  console.log(id)

  const {isLoading,data,error,refetch}=useGetAllUsersQuery({},{refetchOnMountOrArgChange:true})
  const [userDeleteByID,{isLoading:Loading,error:err,isSuccess:isSuc}]=useUserDeleteByIDMutation({})

  const colums = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.2,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.2,
    },
    {
      field: "Created_at",
      headerName: "Join At",
      flex: 0.3,
    },

    {
      field: "Mail",
      headerName: "Mail",
      flex: 0.2,
      renderCell: (params:any) => {
     
        return (
          <a href={` mailto:${params.row.email}`}>
            <AiOutlineMail  className="dark:text-white text-black" size={22} />
          </a>
        );
      },
    },

    {
      field: "Delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params:any) => {
        return (
          <button onClick={()=>{setActive(true),
          setId(params.row.id)}}>
            <AiOutlineDelete className="dark:text-white text-black" size={22} />
          </button>
        );
      },
    },
  ];
  const rows:any = [

  ];

  data?.users?.forEach((item:any)=>(
    rows.push({
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role ,
      Created_at: format(item.createdAt) ,
  })
  ))

  const DeleteUserByID= async()=>{
    
    if(!Loading){
       await userDeleteByID(id)
        refetch()
        if(isSuc){
            toast.success('User deleted successfully')
        }
    }
  
   
 }

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
                    <button onClick={()=>DeleteUserByID()}  className={`${style.button} !w-[70px] !h-[20px] !rounded-sm !bg-red-600`}>Delete</button>
                </div>
                </div>   


          </Box>
        </Modal>
      )}
      </Box>
    }
    </div>
  );
};

export default GetAllUsers;
 