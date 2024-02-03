import { style } from "@/app/styles/styels";
import { useEditLayoutMutation, useGetBannerQuery } from "@/redux/features/layout/layout.Api";
import React, { FC, useState,useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = {};

const EditFaQ = (props: Props) => {

    const { data, isLoading,refetch } = useGetBannerQuery("FAQ", {
        refetchOnMountOrArgChange: true,
      });

      const [editLayout,{isSuccess,error}] =useEditLayoutMutation()
     
  const [question, setQuestion] = useState<any[]>([]);
  console.log(question)

  useEffect(() => {
    if (data) {
        setQuestion(data?.layout[0]?.faq);
     
    }
    if(isSuccess){
      toast.success('Faq updated successfully')
    }

    if(error){
      if("data" in error){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message)
      }
    }

  
  }, [data,isSuccess,error]);

  const toggleQuestion = (id: any) => {
    setQuestion((pre)=>pre.map((q)=>q._id===id? {...q,active:!q.active}:q))
    
  }

  const handleQuestionChange = (id: any, value: any) => {
    setQuestion((pre)=>pre.map((q)=>q._id===id? {...q, question:value}:q))
  }
  const handleAnswerChange = (id: any, value: any) => {
    setQuestion((pre)=>pre.map((q)=>q._id===id? {...q, answer:value}:q))
  }

  const newFaqHandler=()=>{
    setQuestion([...question,{
        question:'',
        answer:''
    }])
  }

  const areQuestionsUnchanged=(originalQuestions:any[], newQuestions:any[])=>{
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions)
  }
const isAnyQuestionEmpty=(questions:any[])=>{
    return questions.some((q)=>q.question===''||q.answer==='')
}
const handleEdit= async()=>{
    if(!areQuestionsUnchanged(data?.layout[0]?.faq,question) && !isAnyQuestionEmpty(question)){ 
      await editLayout({
        type:'FAQ',
        faq:question
      })
    }
    refetch()
}

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
      <div className="mt-12 min-h-[50vh]">
        <dl className="space-y-8">
          {question.map((q: any) => (
            <div
              key={q._id}
              className={`${
                q._id !== question[0]?._id && "border-t"
              } border-gray-200 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-center dark:text-white text-black justify-between w-full text-left focus:outline-none"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <input
                    type="text"
                    className={`${style.input} border-none`}
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(q._id, e.target.value)
                    }
                    placeholder="Add your question"
                  />
                  <span className="ml-6 flex-shrink-0">
                    {q.active ? (
                      <HiMinus className="h-6 w-6" />
                    ) : (
                      <HiPlus className="h-6 w-6" />
                    )}
                  </span>
                </button>
              </dt>
              {q.active && (
                <dd className="mt-2 pr-12">
                  <input
                    type="text"
                    className={`${style.input} border-none`}
                    value={q.answer}
                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                    placeholder="Add your answer"
                  />

                  <span className="ml-6 flex-shrink-0">
                    <AiOutlineDelete
                      onClick={() => {
                        setQuestion(
                          question.filter((item: any) => item._id !== q._id)
                        );
                      }}
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                    />
                  </span>
                </dd>
              )}
            </div>
          ))}
        </dl>
        <br />
        <br />
         <IoMdAddCircleOutline
          className='dark:text-white text-black text-[25px] cursor-pointer '
          onClick={newFaqHandler}
          />
      </div>
    <div className="flex justify-end w-full mb-3">
    <div
      className={`${style.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${areQuestionsUnchanged(data?.layout[0]?.faq, question) || isAnyQuestionEmpty(question) ? '!cursor-not-allowed':'!cursor-pointer !bg-[#42d383]'}  !rounded  `} 
      onClick={
        areQuestionsUnchanged(data?.layout.faq, question) || isAnyQuestionEmpty(question)?()=>null:handleEdit
      }>Save</div>
    </div>
    </div>
  );
};

export default EditFaQ;
