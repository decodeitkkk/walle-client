import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CreatePost = () => {
    let navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        prompt: "",
        photo: "",
    });
    const [generating, setGenerating] = useState(false);
    const [loading, setLoading] = useState(false);

    let handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSurpriseMe = () => {
        let newPrompt = getRandomPrompt(form.prompt);
        setForm({
            ...form,
            prompt: newPrompt,
        });
    };
    const generateImage = async (e) => {
        e.preventDefault();
        try {
            setGenerating(true);
            let response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/dalle`,
                form
            );
            console.log(response);

            setForm({ ...form, photo: response?.data?.imageUrl });
            setGenerating(false);
        } catch (error) {
            console.log(error);
            setGenerating(false);
        }
        console.log(`generate image`);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const submitPromise = axios.post(
            `${import.meta.env.VITE_BASE_URL}/post`,
            form
        );

        toast.promise(submitPromise, {
            loading: "Sharing...",
            success: "Shared successfully 🎉",
            error:(error)=> `${error?.response?.data || "Something went wrong 🚨 "}`,
        });

        submitPromise.catch((error) => {
            console.error(error.response.data);
        });
    };

    return (
        <>
            <Toaster />
            <section className="max-w-7xl mx-auto">
                <div>
                    <h1 className="font-extrabold text-[#222328] text-[32px]">
                        Create
                    </h1>
                    <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
                        Generate an imaginative image through DALL-E AI and
                        share it with the community
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
                    <div className="flex flex-col gap-5">
                        <FormField
                            labelName="Your Name"
                            type="text"
                            name="name"
                            placeholder="Ex. John doe"
                            value={form.name}
                            handleChange={handleChange}
                        />

                        <FormField
                            labelName="Prompt"
                            type="text"
                            name="prompt"
                            placeholder="A plush toy robot sitting against a yellow wall."
                            value={form.prompt}
                            handleChange={handleChange}
                            isSurpriseMe
                            handleSurpriseMe={handleSurpriseMe}
                        />
                        <div className="relative bg-gray-500 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                            {form?.photo ? (
                                <img
                                    src={form?.photo}
                                    alt={form?.alt}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <>
                                    <img
                                        src="preview.png"
                                        alt="preview"
                                        className="w-9/12 h-9/12 object-contain opacity-40"
                                    />
                                </>
                            )}

                            {generating && (
                                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                    <Loader />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 flex gap-5">
                        <button
                            type="button"
                            onClick={generateImage}
                            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            {generating ? "Generating..." : "Generate"}
                        </button>
                    </div>

                    <div className="mt-10">
                        <p className="mt-2 text-[#666e75] text-[14px]">
                            ** Once you have created the image you want, you can
                            share it with others in the community **
                        </p>
                        <button
                            type="submit"
                            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            {loading
                                ? "Sharing..."
                                : "Share with the Community"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default CreatePost;
