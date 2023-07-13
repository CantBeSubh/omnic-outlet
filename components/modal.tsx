import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import Container from "./ui/container";
import Currency from "./ui/currency";
import { Product } from "@/types";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";

interface ModalProps {
    children: React.ReactNode
    product: Product
}

const Modal: React.FC<ModalProps> = ({ children, product }) => {
    const cart = useCart()

    if (!product) return null
    const onAddtoCard: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        cart.addItem(product)
    }
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogDescription>
                        <Container>
                            <div className="px-4 py-10 sm:px-6 lg:px-8">
                                <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8">
                                    <div className="aspect-square w-full">
                                        <div className="aspect-square  relative ">
                                            <Image
                                                // @ts-ignore
                                                src={product.images[0].url}
                                                alt="product"
                                                fill
                                                className=" border-4 rounded-3xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                        <div className="mt-3 flex items-end justify-between">
                                            <p className="text-2xl text-gray-900">
                                                <Currency value={product?.price} />
                                            </p>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="flex flex-col gap-y-6">
                                            <div className="flex items-center gap-x-4">
                                                <h3 className="font-semibold text-black">Size:</h3>
                                                <div>
                                                    {product?.size?.value}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-x-4">
                                                <h3 className="font-semibold text-black">Color:</h3>
                                                <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: product?.color?.value }} />
                                            </div>
                                        </div>
                                        <div className="mt-10 flex items-center gap-x-3">
                                            <Button onClick={onAddtoCard} className="flex items-center gap-x-2">
                                                Add To Cart
                                                <ShoppingCart size={20} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
}

export default Modal;