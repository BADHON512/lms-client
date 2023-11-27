import { Modal ,Box} from '@mui/material'
import React,{FC} from 'react'

type Props = {

    open:boolean,
    setOpen:(open:boolean)=>void
    Component:any
    setRoute:(route:string)=>void
}

const CustomModal:FC<Props> = ({open,setOpen,setRoute,Component}) => {
  return (
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    aria-labelledby='modal-modal-title'
    aria-describedby='modal-modal-description'>
<Box 
   className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  w-[350px] 800px:w-[450px] bg-white dark:bg-slate-900 rounded-md shadow p-4 outline-none'
>
<Component setOpen={setOpen} setRoute={setRoute}/>
</Box>
    </Modal>
  )
}

export default CustomModal