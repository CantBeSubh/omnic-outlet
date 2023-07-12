"use client"
import { Product } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import Image from "next/image";
import Currency from "./currency";
import { Button } from "./button";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "../modal";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";

interface ProductCardProps {
    data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter()
    const cart = useCart()
    const handleClick = () => {
        router.push(`/product/${data.id}`)
    }

    const onAddtoCard: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        cart.addItem(data)
    }

    return (
        <Card onDoubleClick={handleClick} className="cursor-pointer" >
            <CardHeader >
                <div className="aspect-square relative group">

                    <Image
                        src={data.Image[0].url}
                        alt={data.name}
                        className="rounded-md border "
                        fill
                    />

                    <div
                        className={`
                        absolute inset-0 bg-opacity-20 
                        flex justify-center items-end gap-x-2 
                        opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 p-2
                        backdrop-blur-[5px]
                        z-10
                        `}>
                        <div>

                            <Modal
                                product={data}
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => { }}
                                >
                                    <Expand size={20} className="text-gray-600" />
                                </Button>
                            </Modal>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onAddtoCard}
                        >
                            <ShoppingCart size={20} className="text-gray-600" />
                        </Button>
                    </div>
                </div>
                <CardTitle>{data.name}</CardTitle>
                <CardDescription>{data.category.name}</CardDescription>
            </CardHeader>
            <CardContent >
                <Currency value={data.price} />
            </CardContent>
        </Card>

    );
}

export default ProductCard;