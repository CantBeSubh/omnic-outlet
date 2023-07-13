import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import getSizes from "@/actions/get-sizes";

export const revalidate = 0

const Navbar = async () => {
    const categories = await getCategories()
    const sizes = await getSizes()
    return (
        <div className="border-b">
            <Container >
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2 mr-6">
                        <p className="font-bold text-xl">OMNIC<span className="text-orange-500">OUTLET</span></p>
                    </Link>
                    {/* @ts-ignore */}
                    <MainNav categories={categories} sizes={sizes} />
                    <NavbarActions />
                </div>
            </Container>
        </div>
    );
}

export default Navbar;