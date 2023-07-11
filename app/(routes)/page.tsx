import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = async () => {
    const billboards = await getBillboard("de6264cc-28a9-4116-8d28-2a276c9f007a")
    return (
        <Container>
            <div className="space y-10 pb-10">
                <Billboard data={billboards} />
            </div>
        </Container>
    );
}

export default HomePage;