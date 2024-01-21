import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'


type Props = {}

const AllCourse = (props: Props) => {
    const [theme,setTheme]=useTheme()

    const colums=[
        {
            field:'ID',headerName:'ID',flex:0.5
        },
        {
            field:'Title',headerName:'Course Title',flex:1
        },
        {
            field:'Ratings',headerName:'Ratings',flex:0.5
        },
        {
            field:'Purchesed',headerName:'Purchesed',flex:0.5
        },
        {
            field:'Createed_at',headerName:'Createed_at',flex:0.5
        },
        {
            field:"",
            headerName:'Delete',
            flex:0.2,
            renderCell:()=>{
                return(
                    <Button>
                    
                    <AiOutlineDelete
                    className='dark:text-white text-black'/>
                    </Button>
                )
            }
        }

    ]
    const rows = [
        { ID: 1, Title: 'Snow', Ratings: '5start', Purchesed: 14,Createed_at:"2/5/2024" },
 
      ];
  return (
    <div className='mt-[120px]'>

    </div>
  )
}

export default AllCourse