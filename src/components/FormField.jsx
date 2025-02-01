import React from "react";

const FormField = ({
    labelName,
    type,
    name,
    placeholder,
    value,
    handleChange,
    isSurpriseMe,
    handleSurpriseMe,
}) => {
    return (
        <>
            <div>
                <div className="flex items-center gap-2 mb-2 text-white ">
                    <label
                        htmlFor={name}
                        className="block text-sm font-medium text-gray-300"
                    >
                        {" "}
                        {labelName}{" "}
                    </label>
                    {isSurpriseMe && (
                        <button
                            type="button"
                            onClick={handleSurpriseMe}
                            className="font-semibold text-xs bg-[#3b3b3b] py-1 px-2 rounded-[5px] text-gray-50"
                        >
                            Surprise me
                        </button>
                    )}
                </div>
                <input
                    id={name}
                    name={name}
                    className="bg-gray-900 border border-gray-300 text-gray-300 text-sm rounded-lg outline-none block w-full p-2"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    required
                />
            </div>
        </>
    );
};

export default FormField;
