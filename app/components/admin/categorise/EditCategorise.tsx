import {
  useEditLayoutMutation,
  useGetBannerQuery,
} from "@/redux/features/layout/layout.Api";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { style } from "@/app/styles/styels";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading,refetch } = useGetBannerQuery("Category", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    setCategories(data?.layout[0]?.categories);

    if(isSuccess){
        toast.success('Categories updated successfully')
    }
    if(error){
        if("data" in error){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message)
      }
    }

  }, [data,isSuccess,error]);

  const handleCategoriesAdd = (id: number, value: any) => {

    setCategories((pre:any)=>pre?.map((v:any,i:number)=>(i===id ? {...v,title:value}:v)))

}

  const newCategoriesHandler = () => {
 if(categories){
    if (categories[categories?.length - 1]?.title === "") {
        toast.error("Please enter category title");
      }else{
          setCategories((pre: any) => [...pre, { title: "" }]);
      }
      
 }
  };

  const areQuestionsUnchanged=(originalQuestions:any[], newQuestions:any)=>{
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions)
  }
const isAnyQuestionEmpty=(categories:any[])=>{
    return categories?.some((q:any)=>q.title==='')
}

const handleEditCategories= async()=>{
    if(!areQuestionsUnchanged(data?.layout[0]?.categories,categories) && !isAnyQuestionEmpty(categories)){ 
     await  editLayout({
        type:'Category',
        categories:categories
      })
    }
    refetch()

}
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${style.title}`}>All Categories</h1>
          {categories?.map((item: any, index: number) => {
            return (
              <div key={item._id} className="p-3">
                <div className="flex items-center justify-center w-full gap-x-3">
                  <input
                    type="text"
                    className={`${style.input} !w-[unset] !border-none !text-[20px]`}
                    value={item.title}
                    onChange={(e) =>
                      handleCategoriesAdd(index, e.target.value)
                    }
                    placeholder="Enter category title..."
                  />

                  <AiOutlineDelete
                    size={25}
                    className="dark:text-white text-black text-[18px] cursor-pointer mt-2"
                    onClick={() =>
                      setCategories((pre) =>
                        pre?.filter((v, i) => i !== index)
                      )
                    }
                  />
                </div>
              </div>
            );
          })}

          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              size={25}
              className="dark:text-white text-black text-[18px] cursor-pointer mt-2"
              onClick={ newCategoriesHandler}
            />
          </div>

          <div className="flex justify-end w-full mb-3">
    <div
      className={`${style.button} mr-8 !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${areQuestionsUnchanged(data?.layout[0]?.categories, categories) || isAnyQuestionEmpty(categories) ? '!cursor-not-allowed':'!cursor-pointer !bg-[#42d383]'}  !rounded  `} 
      onClick={
        areQuestionsUnchanged(data?.layout[0].categories, categories) || isAnyQuestionEmpty(categories)?()=>null:handleEditCategories
      }>Save</div>
    </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
