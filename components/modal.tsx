import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import Container from "./ui/container";
import Info from "./info";
import { Product } from "@/types";
import Image from "next/image";

interface ModalProps {
    children: React.ReactNode
    product: Product
}

const Modal: React.FC<ModalProps> = ({ children, product }) => {

    if (!product) return null

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
                                                src={product.Image[0].url}
                                                alt="product"
                                                fill
                                                className=" border-4 rounded-3xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                                        <Info data={product} />
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