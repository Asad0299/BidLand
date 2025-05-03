import React, { useEffect, useRef, useState } from "react";

import { db } from "../../../fireabse";
import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  getDocs,
  getDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { query, onSnapshot, orderBy, limit } from "firebase/firestore";

import { Toaster, toast } from "sonner";

import { useParams } from "react-router-dom";
import moment from "moment";
import LandingPageHeader from "components/LandingPageHeader";
import LandingPageFooter from "components/LandingPageFooter";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Chat = () => {
  var userRole = localStorage.getItem("userRole");
  var token = localStorage.getItem("JWT");
  const { propertyId } = useParams();
  const [isShown, setIsShown] = useState(false);
  const [message, setMessage] = useState([]);
  const [userID, setUserID] = useState("");
  const [value, setValue] = useState("");
  const parentDocRef = doc(db, "BidLand", `${propertyId}`);
  const subcollectionRef = collection(parentDocRef, "Message");
  const toScroll = useRef(null);

  const handleEmoji = () => {
    setIsShown((current) => !current);
  };

  const scrollToBottom = () => {
    document.getElementById("toscroll")?.scrollTo({
      top: document.getElementById("toscroll").scrollHeight,
      behavior: "smooth",
    });
  };

  const onClick = (emojiData) => {
    setValue(value + emojiData.emoji);
    console.log(reservationID);
  };
  const handleInput = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (value?.trim() === "") {
      toast.error("Enter valid message!");
      return;
    }
    try {
      await addDoc(subcollectionRef, {
        id: localStorage.getItem("userId"),
        content: value,
        dateTime: serverTimestamp(),
        name: localStorage.getItem("userName"),
        picture: localStorage.getItem("userData"),
      });
      scrollToBottom();
      setValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeySendMessage = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (value?.trim() === "") {
        toast.error("Enter valid message!");
        return;
      } else {
        try {
          await addDoc(subcollectionRef, {
            id: localStorage.getItem("userId"),
            content: value,
            dateTime: serverTimestamp(),
            name: localStorage.getItem("userName"),
            picture: localStorage.getItem("userData"),
          });
          scrollToBottom();
          setValue("");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    setUserID(localStorage.getItem("userId"));
    const q = query(
      collection(db, `BidLand/${propertyId}/Message`),
      orderBy("dateTime")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      console.log("message", messages);
      setMessage(messages);
    });

    return () => unsubscribe;
  }, []);

  console.log(message);
  return (
    <>
      <Toaster richColors={true} />
      <div className="bg-white flex flex-col font-markoone  items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col  w-full">
          <LandingPageHeader className="bg-orange-50  flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div className="my-10 mx-40">
            <div className="text-2xl font-bold ml-7 mb-3">
              <h2>Chat</h2>
            </div>
            <div className="flex h-[82vh] w-full antialiased text-gray-800">
              <div className="flex mx-auto flex-row h-[80vh] w-[100%] overflow-x-hidden">
                {/* Chat Start */}
                {token ? (
                  <div className="flex flex-col flex-auto">
                    <div
                      className="h-full p-6 overflow-y-scroll bg-gray-100 mx-5 rounded-xl"
                      ref={toScroll}
                      id="toscroll"
                    >
                      {message?.map((msg, index) => (
                        <div
                          className={
                            msg?.id === userID
                              ? "chat chat-end"
                              : "chat chat-start"
                          }
                        >
                          <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                              <img
                                src={
                                  msg?.id === userID
                                    ? msg?.picture
                                    : "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                                }
                              />
                            </div>
                          </div>
                          <div className="chat-header">{msg?.name}</div>
                          <div
                            className={
                              msg?.id === userID
                                ? "chat-bubble c-color"
                                : "chat-bubble"
                            }
                          >
                            {msg?.content}
                          </div>
                          <div className="chat-footer opacity-50">
                            {moment.unix(msg?.dateTime?.seconds).format("ll") ==
                            "Invalid date"
                              ? "Just Now"
                              : moment
                                  .unix(msg?.dateTime?.seconds)
                                  .format("ll")}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-row items-center h-16 mt-3  rounded-xl bg-gray-51 w-[97.5%] ml-[1.3rem] pl-4">
                      <div className="flex-grow ml-2 mr-2">
                        <div className="relative w-full">
                          {isShown && (
                            <div className="emoji-picker">
                              <EmojiPicker
                                onEmojiClick={onClick}
                                autoFocusSearch={false}
                                defaultSkinTone={SkinTones.MEDIUM}
                                emojiStyle={EmojiStyle.apple}
                                categories={[
                                  {
                                    name: "Smiles & Emotions",
                                    category: Categories.SMILEYS_PEOPLE,
                                  },
                                  {
                                    name: "Fun and Games",
                                    category: Categories.ACTIVITIES,
                                  },
                                  {
                                    name: "Flags",
                                    category: Categories.FLAGS,
                                  },
                                  {
                                    name: "Yum Yum",
                                    category: Categories.FOOD_DRINK,
                                  },
                                ]}
                              />
                            </div>
                          )}
                          <input
                            type="text"
                            onChange={handleInput}
                            onKeyDown={(e) => handleKeySendMessage(e)}
                            value={value}
                            className="flex w-full border rounded-xl border-orange-500 focus:outline-none focus:border-orange-400 pl-4 h-10"
                          />
                          <button
                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                            onClick={handleEmoji}
                          >
                            <span className="">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="mr-2">
                        <button
                          className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 rounded-full text-white px-2 py-2 flex-shrink-0"
                          onClick={handleSendMessage}
                        >
                          <span className="">
                            <svg
                              className="w-6 h-6 transform rotate-45 -mt-px"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-x-2">
                    <span>First Login to Chat</span>
                    <Link to="/login" className="underline hover:text-blue-500">Login</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <LandingPageFooter className="bg-orange-50  flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default Chat;
