import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useState } from "react";
import Routes from "./Routes";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";

function App() {
  const [open, setOpen] = useState(false);
  const handleIconClick = () => {
    setOpen(!open);
    // Handle the click event, e.g., open a chat window
    // alert('Open chat window or perform other actions here!');
  };
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What type of property are you interested in?",
      subQuestions: [
        {
          id: 1,
          question: "Are you interested in House?",
          answers: [
            {
              id: 1,
              answer:
                "Yes, We have variety of options. Visit our website. Thanks!",
            },
          ],
        },
        {
          id: 2,
          question: "Are you interested in Land?",
          answers: [
            {
              id: 2,
              answer: "Sorry, We have no land!",
            },
          ],
        },
        {
          id: 3,
          question: "Are you interested in RentHouse?",
          answers: [
            {
              id: 3,
              answer:
                "Yes, We have variety of options. Visit our website. Thanks!",
            },
          ],
        },
        {
          id: 4,
          question: "Are you interested in Property for Bidding?",
          answers: [
            {
              id: 4,
              answer: "Yes, we have alot of properties for bidding",
            },
          ],
        },
        {
          id: 5,
          question: "Are you interested in Residental Colony?",
          answers: [
            {
              id: 5,
              answer: "Sorry, We have no Residental colony!",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      question: "Which city are you considering to live?",
      subQuestions: [
        {
          id: 1,
          question: "Are you considering in Lahore?",
          answers: [
            {
              id: 1,
              answer: "Sorry, We have no land yet in Lahore.",
            },
          ],
        },
        {
          id: 2,
          question: "Are you considering in Karachi?",
          answers: [
            {
              id: 2,
              answer:
                "Yes, We have available options in that city. Visit the website. Thanks!",
            },
          ],
        },
        {
          id: 3,
          question: "Are you considering in Islamabad?",
          answers: [
            {
              id: 3,
              answer:
                "Yes, We have available options in that city. Visit the website. Thanks!",
            },
          ],
        },
        {
          id: 4,
          question: "Are you considering in Peshawar?",
          answers: [
            {
              id: 4,
              answer: "Sorry, We have not updated data for this city",
            },
          ],
        },
        {
          id: 5,
          question: "Are you considering in Gujrawala?",
          answers: [
            {
              id: 5,
              answer: "Sorry, We have not updated data for this city",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      question: "Are you looking for a specific number of bedrooms?",
      subQuestions: [
        {
          id: 1,
          question: "3 Bedrooms",
          answers: [
            {
              id: 1,
              answer: "Yes, We have alot of appartments that have 3 Bedrooms.",
            },
          ],
        },
        {
          id: 2,
          question: "5 Bedrooms",
          answers: [
            {
              id: 2,
              answer: "Yes, We have alot of appartments that have 5 Bedrooms.",
            },
          ],
        },
        {
          id: 3,
          question: "2 Bedrooms and 1 Tv Room",
          answers: [
            {
              id: 3,
              answer:
                "Yes, We have alot of appartments that have 2 Bedrooms and 1 Tv Room.",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      question: "Do you have a preferred budget range?",
      subQuestions: [
        {
          id: 1,
          question: "Low Budget",
          answers: [
            {
              id: 1,
              answer:
                "Ohhh okay! Then, you should go with the 2 bedrooms and 1 bathroom appartment but it has no other specification.",
            },
          ],
        },
        {
          id: 2,
          question: "Moderate Budget",
          answers: [
            {
              id: 2,
              answer:
                "Ahhhh Good! Then, you should go with the 3 bedrooms with 2 attach bathrooms appartment but it has basement and tv launch also.",
            },
          ],
        },
        {
          id: 3,
          question: "High Budget",
          answers: [
            {
              id: 3,
              answer:
                "Okay Brilliant! Then, you should go with the full big appartment that has 3 bedrooms with 2 attach bathrooms appartment but it has basement and tv launch also and swimming pool.",
            },
          ],
        },
      ],
    },
    {
      id: 5,
      question: "Are you open to property auctions?",
      subQuestions: [
        {
          id: 1,
          question: "Yes",
          answers: [
            {
              id: 1,
              answer:
                "Okay Brilliant! Then, Go and visit the website and do auction.",
            },
          ],
        },
        {
          id: 2,
          question: "No",
          answers: [
            {
              id: 2,
              answer: "Okay No Problem! Better try Next Time.",
            },
          ],
        },
      ],
    },
    // Add more questions and options as needed
  ];

  // const handleOptionClick = (selectedOption) => {
  //   const currentQuestion = questions[currentQuestionIndex];

  //   const newMessage = {
  //     type: "user",
  //     content: selectedOption,
  //   };

  //   setMessages([...messages, newMessage]);

  //   const feedback = getFeedbackMessage(selectedOption);
  //   const feedbackMessage = {
  //     type: "assistant",
  //     content: feedback,
  //   };

  //   setMessages([...messages, feedbackMessage]);

  //   // Move to the next question or sub-question
  //   if (
  //     currentQuestion.subQuestions &&
  //     currentQuestion.subQuestions.length > 0
  //   ) {
  //     // If there are sub-questions, move to the first sub-question
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   } else {
  //     // If there are no sub-questions, move to the next main question
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   }
  // };

  // const getFeedbackMessage = (selectedOption) => {
  //   switch (selectedOption) {
  //     case "House":
  //       return "Great choice! Houses offer spacious living.";
  //     case "Apartment":
  //       return "Excellent! Apartments can be convenient and low-maintenance.";
  //     case "Land":
  //       return "Nice! Land provides potential for custom development.";
  //     // Add more cases based on your options
  //     default:
  //       return "Thanks for your selection!";
  //   }
  // };

  // const renderOptions = (options) => {
  //   return options.map((option, index) => (
  //     <div>
  //       <button
  //         key={index}
  //         onClick={() => handleOptionClick(option)}
  //         className="bg-blue-500 text-white p-2 rounded-md mx-2"
  //       >
  //         {option}
  //       </button>
  //     </div>
  //   ));
  // };

  // const renderMessages = () => {
  //   return messages.map((message, index) => (
  //     <div
  //       key={index}
  //       className={`chat-message ${
  //         message.type === "user" ? "user" : "assistant"
  //       }`}
  //     >
  //       {message.content}
  //     </div>
  //   ));
  // };

  const [subQuestions, setSubQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const handleQuestionOptions = (id) => {
    const subQues = questions?.filter((item) => item.id === id);
    setSubQuestions(subQues[0]?.subQuestions);
  };

  const handleSubQuestions = (id) => {
    const answer = subQuestions?.filter((item) => item.id === id);
    setAnswers(answer[0]?.answers);

    const location = useLocation();
  };
  return (
    <div className="font-manrope">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Routes />
        {location.pathname === "/" && (
          <button
            id="message-icon"
            className="fixed bottom-8 right-8 bg-orange-50 text-white rounded-full p-4 cursor-pointer text-lg focus:outline-none"
            onClick={handleIconClick}
          >
            {open ? (
              <XMarkIcon className="w-8 h-8 text-gray-900 font-semibold" />
            ) : (
              <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8 text-gray-900" />
            )}
          </button>
        )}
      </GoogleOAuthProvider>
      {open && (
        <ul class="space-y-5 fixed bottom-28 bg-orange-50 px-2 py-4 rounded-xl overflow-auto right-10 w-[30rem]">
          {subQuestions.length == 0 ? (
            <li class="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
              <img
                class="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                alt="Image Description"
              />

              <div className="">
                {questions?.map((question) => (
                  <div
                    class="bg-white border border-gray-200 rounded-full p-4 mb-1"
                    onClick={() => handleQuestionOptions(question?.id)}
                  >
                    <h2 class="font-medium text-gray-800">
                      {question?.question}
                    </h2>
                    {/* <div class="space-y-1.5">
                    <ul class="list-disc list-outside space-y-1.5 ps-3.5">
                      <li class="text-sm text-gray-800 dark:text-white">
                       {question?.options}
                      </li>
                    </ul>
                  </div> */}
                  </div>
                ))}
              </div>
            </li>
          ) : (
            ""
          )}
          {subQuestions.length > 0 && (
            <li class="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
              <img
                class="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                alt="Image Description"
              />

              <div className="">
                {subQuestions?.map((question) => (
                  <div
                    class="bg-white border border-gray-200 rounded-full p-4 mb-1"
                    onClick={() => handleSubQuestions(question?.id)}
                  >
                    <h2 class="font-medium text-gray-800">
                      {question?.question}
                    </h2>
                    {/* <div class="space-y-1.5">
                    <ul class="list-disc list-outside space-y-1.5 ps-3.5">
                      <li class="text-sm text-gray-800 dark:text-white">
                       {question?.options}
                      </li>
                    </ul>
                  </div> */}
                  </div>
                ))}
              </div>
            </li>
          )}
          {answers.length > 0 && (
            <li class="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
              <img
                class="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                alt="Image Description"
              />

              <div className="">
                {answers?.map((answer) => (
                  <div
                    class="bg-white border border-gray-200 rounded-full p-4 mb-1"
                    onClick={() => handleSubQuestions(question?.id)}
                  >
                    <h2 class="font-medium text-gray-800">{answer?.answer}</h2>
                    {/* <div class="space-y-1.5">
                    <ul class="list-disc list-outside space-y-1.5 ps-3.5">
                      <li class="text-sm text-gray-800 dark:text-white">
                       {question?.options}
                      </li>
                    </ul>
                  </div> */}
                  </div>
                ))}
              </div>
            </li>
          )}
          <div>
            <div className="flex gap-x-2 items-center justify-end px-4">
              <button
                className="bg-red-500 px-5 py-3 rounded-lg text-white"
                onClick={() => {
                  setSubQuestions([]);
                  setAnswers([]);
                }}
              >
                Reset Options
              </button>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
}

export default App;
