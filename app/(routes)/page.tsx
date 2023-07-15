import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

interface HomePageProps {

}
export const revalidate = 0

const HomePage: React.FC<HomePageProps> = async () => {
    const products = await getProducts({ isFeatured: "true" })
    const sProducts = products.sort((a, b) => a.name.localeCompare(b.name))
    const billboards = await getBillboard("3b588479-f3cb-403d-8520-b9c3e262398a")

    return (
        <Container>
            <div className="space y-10 pb-10">
                <Billboard data={billboards} />
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title="Featured Products" items={sProducts} />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;