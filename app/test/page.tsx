'use client'
import { useState } from "react";

function App() {
	const [answers, setAnswers] = useState(['', '', '']); // Initialize with empty strings for each input field

	const handleAnswerChange = (index:any, value:any) => {
	  const newAnswers = [...answers];
	  newAnswers[index] = value;
	  setAnswers(newAnswers);
	  console.log("Current answers:", answers);
	};
	const h = () => {
		
		console.log("Current answers:", answers);
	  };
     
 // Log the answers array
   const questions=[1,2,3,]
	return (
		
		<div>
		{questions.map((question, index) => (
		  <div key={index}>
			<p>{question}</p>
			<input
			  type="text"
			  placeholder="Enter your reply..."
			  value={answers[index]} // Use corresponding answer for each input
			  onChange={(e) => handleAnswerChange(index, e.target.value)}
			  className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-white text-black dark:text-white w-[90%]"
			/>
		  </div>
		))}

		<h1 onClick={h}>badhon</h1>
	  </div>	

	);
}

export default App;