"use client"
import { Billboard } from "@/types";
// @ts-ignore
import randomColor from "randomcolor";

interface BillboardProps {
    data: Billboard
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
    let avgColor = randomColor()
    let rColor = randomColor();

    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div
                className="rounded-xl relative aspect-square md:aspect-[2.3/1] overflow-hidden"
                style={{
                    backgroundImage: `url(${data.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8"
                >
                    {
                        data.label.toUpperCase() != "OMNIC OUTLET" ?
                            <div
                                className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs p-4 "
                                style={{
                                    // backgroundColor: avgColor,
                                    backgroundImage: `linear-gradient(45deg,${rColor},${avgColor} )`,
                                    // backdropFilter: "blur(2px)",
                                    backgroundSize: "100%",
                                    WebkitBackgroundClip: "text",
                                    MozBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    // animation: "gradient 3s ease infinite alternate",
                                    WebkitTextStrokeWidth: "0.5px",
                                    WebkitTextStrokeColor: "black",
                                }}
                            >
                                {data.label.toUpperCase()}
                            </div>
                            :
                            <div
                                className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs p-4"
                                style={{
                                    backdropFilter: "blur(2px)",

                                    WebkitTextStrokeWidth: "0.5px",
                                    WebkitTextStrokeColor: "black",
                                }}
                            >
                                OMNIC<span className="text-orange-500">OUTLET</span>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default Billboard;