"use client"
import { Image as ImageType } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Image from "next/image";

interface GallaryProps {
    images: ImageType[]
}

const Gallary: React.FC<GallaryProps> = ({ images }) => {
    return (
        <Tabs defaultValue={images[0].id} className="aspect-square w-full">
            <div className="mb-10 ">
                {images.map((image) => (
                    <TabsContent key={image.id} value={image.id}>
                        <div className="aspect-square  relative ">
                            <Image
                                src={image.url}
                                alt="product"
                                fill
                                className=" border-4 rounded-3xl"
                            />
                        </div>
                    </TabsContent>
                ))}
            </div>
            <TabsList className=" h-[120px]">
                {images.map((image) => (
                    <TabsTrigger key={image.id} value={image.id} >
                        <div className=" w-[100px] h-[100px] relative ">
                            <Image
                                src={image.url}
                                alt="product"
                                fill
                            />
                        </div>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>

    );
}

export default Gallary;