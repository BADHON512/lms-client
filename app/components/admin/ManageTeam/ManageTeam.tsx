import Loader from "@/app/components/Loader/Loader";
import { style } from "@/app/styles/styels";
import { useGetAllUsersQuery, useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";

type Props = {};

const ManageTeam = (props: Props) => {
  const [Active, setActive] = React.useState(false);
  const [updateRole, setUpdateRole] = React.useState({
    email:'',
    role:''
  });

  const [updateUserRole,{ isSuccess, error:err}]=useUpdateUserRoleMutation({},)
 
  const { theme, setTheme } = useTheme();

  const { isLoading, data, error,refetch } = useGetAllUsersQuery({},{refetchOnMountOrArgChange:true});


  const colums = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
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
      field: "Mail",
      headerName: "Mail",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <a href={` mailto:${params.row.email}`}>
            <AiOutlineMail className="dark:text-white text-black" size={22} />
          </a>
        );
      },
    },

    {
      field: "Delete",
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
  const filterUser = data?.users?.filter((v: any) => v.role === "admin");
  if (filterUser) {
    filterUser?.forEach((item: any) =>
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        Created_at: format(item.createdAt),
      })
    );
  }
 const UpdateRole=()=>{

    if(updateRole.email===''){
        toast.error('Please drop the email ')
    }else if(updateRole.role===''){
        toast.error('Please select the role ')
    }else{
        updateUserRole(updateRole)
        if(isSuccess){
            refetch()
            toast.success('User role is Changed')
            setActive(false)
        }
    }
   
 }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[20px] ">
          <div className=" flex justify-end w-ful my-2">
            <button
              className={`${style.button} !w-[150px] bg-[green] dark:text-white `}
              onClick={() => setActive(!Active)}
            >
              Add member
            </button>
          </div>
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
        </div>
      )}
      {Active && (
        <Modal
       open={Active}
       onClose={()=>(!Active)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box className=' absolute top-[50%] left-[50%]'>
            <div className="w-[50vh] min-h-[10vh] bg-black p-2">
               <h1 className="text-center font-Poppins ">Role Update</h1>
               <input type="email" onChange={(e)=>setUpdateRole({...updateRole,email:e.target.value})} placeholder="Pleas drop the email" className={`${style.input}`}/>
               <select onChange={(e)=>setUpdateRole({...updateRole,role:e.target.value})}  className={`${style.input}`}>
                <option className="bg-[gray]" value="Choose">Choose</option>
                <option  className="bg-[gray]" value="admin">admin</option>
                <option className="bg-[gray]" value="user">user</option>
               </select>
                
                <div className="flex justify-between w-full mt-8">
                    <button onClick={()=>setActive(!Active)} className={`${style.button} !w-[70px] !h-[20px] !rounded-sm`}>Cancel</button>
                    <button onClick={()=>UpdateRole()} className={`${style.button} !w-[70px] !h-[20px] !rounded-sm !bg-green-600`}>Update</button>
                </div>
                </div>   


          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ManageTeam;
