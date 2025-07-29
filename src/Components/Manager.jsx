import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passArray, setpassArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpassArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPass = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passref.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passref.current.type = "text";
    }
  };

  const addPass = () => {
    if(form.site.length >3 && form.username.length >3 && form.password.length >3){
    setpassArray([...passArray, {...form , id:uuidv4()} ]);
    localStorage.setItem("passwords", JSON.stringify([...passArray, {...form , id:uuidv4()} ]));
    console.log([...passArray, form]);
    setform({site: "", username: "", password: ""})
    toast("Password saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }else{
     toast("Password not saved!", {
     theme: "dark",
           })
          }
  };

   const delPass = (id) => {
    console.log("delete id",id)
    let c=confirm("DO you really want to delete this record?")
    if(c){
    setpassArray(passArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(passArray.filter(item=>item.id!==id)));
    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    }
  };

     const editPass = (id) => {
      console.log("edit id",id)
      setform(passArray.filter(item=>item.id===id)[0])
      setpassArray(passArray.filter(item=>item.id!==id));
  };

  const HandleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      

      <div className="px-2 pt-3 md:px-0 mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-center text-lg">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col items-center p-4 gap-8">
          <input
            className="rounded-full border-2 border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            value={form.site}
            onChange={HandleChange}
            placeholder="Enter website URL"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              className="rounded-full border-2 border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={HandleChange}
              placeholder="Enter Username"
            />
            <div className="relative flex items-center">
              <input
                className="rounded-full border-2 border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={HandleChange}
                placeholder="Enter Password"
                ref={passref}
              />
              <span
                className="absolute right-[3px] top-[5px] cursor-pointer"
                onClick={showPass}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={addPass}
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 cursor-pointer rounded-full px-5 py-2 w-fit gap-2 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
           Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passArray.length === 0 ? (
            <div>No passwords to show</div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2 ">Site</th>
                  <th className="py-2 ">Username</th>
                  <th className="py-2 ">Password</th>
                  <th className="py-2 ">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="flex items-center justify-center text-center py-2 border border-white">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="size-7 cursor-pointer lordiconcopy"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="  text-center  py-2 border border-white">
                        <div className="flex justify-center items-center">
                          {item.username}
                          <div
                            className="size-7 cursor-pointer lordiconcopy"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" text-center  py-2 border border-white">
                        <div className="flex justify-center items-center">
                          {item.password}
                          <div
                            className="size-7 cursor-pointer lordiconcopy"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" text-center  py-2 border border-white">
                        <span className="cursor-pointer mx-1" onClick={()=>{editPass(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1" onClick={()=>{delPass(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
