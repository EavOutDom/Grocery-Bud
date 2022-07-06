import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import Modal from "./modal";

const List = ({ id, title, handleDelete, handleUpdate }) => {
    const [modal, setModal] = useState(false);
    return (
        <div>
            <div
                className={
                    "w-11/12 mx-auto shadow-lg py-2 px-3 rounded border border-gray-300 text-start my-2 flex justify-between items-center"
                }
            >
                <div>{title}</div>
                <div>
                    <button
                        onClick={() => handleUpdate(id)}
                        className={
                            "text-xl text-white hover:text-[bisque] hover:bg-black mx-2 bg-[bisque] rounded-full p-1"
                        }
                    >
                        <AiFillEdit />
                    </button>

                    <button
                        onClick={() => {
                            // handleDelete(id);
                            setModal(true);
                        }}
                        className={
                            "text-xl text-white bg-[bisque] rounded-full p-1 hover:text-[bisque] hover:bg-black"
                        }
                    >
                        <IoMdTrash />
                    </button>
                </div>
            </div>
            {modal && (
                <Modal
                    text={`Are you sure you want to delete ${title}?`}
                    onConfirm={() => {
                        handleDelete(id);
                        setModal(false);
                    }}
                    onCancel={() => setModal(false)}
                />
            )}
        </div>
    );
};

export default List;
