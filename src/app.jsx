import React, { useEffect, useRef, useState } from "react";
import List from "./list";
import Modal from "./modal";

const getLocalStorage = () => {
    const list = localStorage.getItem("list");
    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
};
const App = () => {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [list, setList] = useState(getLocalStorage());
    const [update, setUpdate] = useState(null);
    const [modal, setModal] = useState(false);

    const ref = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && edit) {
            setList(
                list?.map((data) => {
                    if (data.id === update) {
                        return { ...data, title: name };
                    }
                    return data;
                })
            );
            setName("");
            setUpdate(null);
            setEdit(false);
        } else {
            const newList = { id: list.length, title: name };
            if (newList.title === "") {
                alert("Please enter a title");
                newList.id = "";
            } else {
                setList([...list, newList]);
                setName("");
            }
        }
        console.log(list);
    };
    const handleDelete = (id) => {
        setList((data) => {
            return list.filter((data, index) => {
                return data.id !== id;
            });
        });
    };
    const handleUpdate = (id) => {
        const selectedList = list.find((data) => data.id === id);
        setEdit(true);
        setUpdate(id);
        setName(selectedList.title);
        ref.current.focus();
    };
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list));
    }, [list]);
    return (
        <div>
            <div className={"text-center my-8"}>
                <div className="bg-white min-h-56 md:w-[36rem] w-80 duration-500 rounded mx-auto my-4 shadow-xl p-4">
                    <h1 className={"text-xl font-semibold"}>Grocery Bud</h1>
                    <div className={"h-1 w-32 bg-[bisque] mx-auto my-1"}></div>
                    <form
                        onSubmit={handleSubmit}
                        className={
                            "w-11/12 mx-auto flex justify-evenly items-center my-3"
                        }
                    >
                        <input
                            ref={ref}
                            type={"text"}
                            placeholder={"e.g. eggs"}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className="border-2 border-black p-2 focus:outline-none shadow-lg w-4/6 mx-1"
                        />
                        <button
                            type={"submit"}
                            className={
                                "border-2 border-black w-2/6 h-11 mx-1 hover:text-white hover:bg-black shadow-lg"
                            }
                        >
                            {edit ? "Save" : "Add"}
                        </button>
                        {edit && (
                            <button
                                onClick={() => {
                                    setEdit(false);
                                    setName("");
                                }}
                                className={
                                    "border-2 border-black w-2/6 h-11 mx-1 hover:text-white hover:bg-black shadow-lg"
                                }
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                    {list.length > 0 && (
                        <div>
                            <div className={"mt-2"}>
                                {list?.map((data, index) => {
                                    return (
                                        <List
                                            key={index}
                                            id={data.id}
                                            title={data.title}
                                            handleDelete={handleDelete}
                                            handleUpdate={handleUpdate}
                                        />
                                    );
                                })}
                            </div>
                            <button
                                className={
                                    "text-red-600 shadow-xl bg-[bisque] py-2 px-3 mt-4 w-40 hover:text-white hover:bg-black"
                                }
                                onClick={() => setModal(true)}
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {modal && (
                <Modal
                    text={"Are you sure you want to clear all items?"}
                    onConfirm={() => {
                        setList([]);
                        setModal(false);
                    }}
                    onCancel={() => setModal(false)}
                />
            )}
        </div>
    );
};

export default App;
