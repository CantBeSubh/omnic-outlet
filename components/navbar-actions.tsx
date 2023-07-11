import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface NavbarActionsProps {

}

const NavbarActions: React.FC<NavbarActionsProps> = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button variant="default" className="flex items-center">
                <ShoppingBag size={20} color="white" />
                <span className="ml-2 text-sm font-medium text-white">0</span>

            </Button>
        </div>
    );
}

export default NavbarActions;