"use client"
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

interface NavbarActionsProps {

}

const NavbarActions: React.FC<NavbarActionsProps> = () => {
    const [isMounted, setIsMounted] = useState(false)
    const cart = useCart()
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button variant="default" className="flex items-center" onClick={() => router.push("/cart")}>
                <ShoppingBag size={20} color="white" />
                <span className="ml-2 text-sm font-medium text-white">{cart.items.length}</span>
            </Button>
        </div>
    );
}

export default NavbarActions;