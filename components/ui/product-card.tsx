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
import { useEffect, useState } from "react";
import { Badge } from "./badge";


interface ProductCardProps {
    data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter()
    const cart = useCart()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) return null;


    const handleClick = () => {
        router.push(`/product/${data.id}`)
    }

    const onAddtoCard: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        cart.addItem(data)
    }

    return (
        <Card className="group" >
            <CardHeader >
                <div className="aspect-square relative cursor-pointer" onClick={handleClick}>
                    <Image
                        // @ts-ignore
                        src={data.images[0].url}
                        alt={data.name}
                        className="rounded-md border "
                        fill
                    />
                </div>
                <CardTitle>{data.name}</CardTitle>
                <CardDescription>
                    <Badge
                        variant="outline"
                        style={{
                            backgroundColor: data.color.value
                        }}
                    >{data.color.name}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between" >
                <Currency value={data.price} />
                <div className="flex space-x-2
                                bg-opacity-20 
                                justify-center items-end gap-x-2 
                                opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300 p-2
                                z-10
                                ">
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
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onAddtoCard}
                    >
                        <ShoppingCart size={20} className="text-gray-600" />
                    </Button>
                </div>

            </CardContent>
        </Card>

    );
}

export default ProductCard;