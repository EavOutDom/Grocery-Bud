import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";

const List = ({ id, title, handleDelete, handleUpdate }) => {
    return (
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
                        handleDelete(id);
                    }}
                    className={
                        "text-xl text-white bg-[bisque] rounded-full p-1 hover:text-[bisque] hover:bg-black"
                    }
                >
                    <IoMdTrash />
                </button>
            </div>
        </div>
    );
};

export default List;
