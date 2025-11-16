import { useState, useEffect } from "react";
import Image from "next/image";

const ImageEditor = ({
    onClose,
    previewURL,
    settings,
    setSettings,
}: {
    onClose: () => void;
    previewURL: string;
    settings: {
        type: "original" | "wide" | "square";
        sensitive: boolean;
    };
    setSettings: React.Dispatch<
        React.SetStateAction<{
            type: "original" | "wide" | "square";
            sensitive: boolean;
        }>
    >;
}) => {
    // 🟢 Buat state lokal (sementara) untuk menampung perubahan di modal
    const [tempSettings, setTempSettings] = useState(settings);

    // Saat modal dibuka, sinkronkan dengan settings utama
    useEffect(() => {
        setTempSettings(settings);
    }, [settings]);

    // Toggle opsi sensitive
    const handleChangeSensitive = (sensitive: boolean) => {
        setTempSettings((prev) => ({ ...prev, sensitive }));
    };

    // Ubah tipe tampilan (original, wide, square)
    const handleChangeType = (type: "original" | "wide" | "square") => {
        setTempSettings((prev) => ({ ...prev, type }));
    };

    // Klik Save → baru terapkan ke form utama
    const handleSave = () => {
        setSettings(tempSettings);
        onClose();
    };

    return (
        <div className="fixed w-screen h-screen left-0 top-0 bg-black bg-opacity-75 z-10 flex items-center justify-center">
            <div className="bg-white rounded-xl p-12 flex flex-col gap-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <svg
                            width={32}
                            viewBox="0 0 24 24"
                            onClick={onClose}
                            className="cursor-pointer"
                        >
                            <path
                                fill="#000"
                                d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
                            />
                        </svg>
                        <h1 className="font-bold text-xl">Media Settings</h1>
                    </div>
                    <button
                        className="py-2 px-4 rounded-full bg-white border border-black text-black font-bold"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>

                {/* PREVIEW IMAGE */}
                <div className="w-[600px] h-[600px] rounded-xl flex items-center">
                    <Image
                        src={previewURL}
                        alt=""
                        width={600}
                        height={600}
                        className={`w-full ${
                            tempSettings.type === "original"
                                ? "h-full object-contain"
                                : tempSettings.type === "square"
                                ? "aspect-square object-cover"
                                : "aspect-video object-cover"
                        }`}
                    />
                </div>

                {/* SETTINGS OPTIONS */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-8">
                        {/* ORIGINAL */}
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleChangeType("original")}
                        >
                            <svg width={24} viewBox="0 0 24 24">
                                <path
                                    className={
                                        tempSettings.type === "original"
                                            ? "fill-iconBlue"
                                            : "fill-[#e7e9ea]"
                                    }
                                    d="M3 7.5C3 6.119 4.119 5 5.5 5h13C19.881 5 21 6.119 21 7.5v9c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 19 3 17.881 3 16.5v-9zM5.5 7c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-9c0-.276-.224-.5-.5-.5h-13z"
                                />
                            </svg>
                            Original
                        </div>

                        {/* WIDE */}
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleChangeType("wide")}
                        >
                            <svg width={24} viewBox="0 0 24 24">
                                <path
                                    className={
                                        tempSettings.type === "wide"
                                            ? "fill-iconBlue"
                                            : "fill-[#e7e9ea]"
                                    }
                                    d="M3 9.5C3 8.119 4.119 7 5.5 7h13C19.881 7 21 8.119 21 9.5v5c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 17 3 15.881 3 14.5v-5zM5.5 9c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-5c0-.276-.224-.5-.5-.5h-13z"
                                />
                            </svg>
                            Wide
                        </div>

                        {/* SQUARE */}
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleChangeType("square")}
                        >
                            <svg width={24} viewBox="0 0 24 24">
                                <path
                                    className={
                                        tempSettings.type === "square"
                                            ? "fill-iconBlue"
                                            : "fill-[#e7e9ea]"
                                    }
                                    d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13z"
                                />
                            </svg>
                            Square
                        </div>
                    </div>

                    {/* SENSITIVE TOGGLE */}
                    <div
                        className={`cursor-pointer py-1 px-4 rounded-full text-black ${
                            tempSettings.sensitive ? "bg-red-500" : "bg-white"
                        }`}
                        onClick={() =>
                            handleChangeSensitive(!tempSettings.sensitive)
                        }
                    >
                        Sensitive
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageEditor;
