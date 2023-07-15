"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Billboard, Category, Size } from "@/types";
import { usePathname } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


interface MainNavProps {
    categories: Category[]
    sizes: Size[]
    billboards: Billboard[]
}

const decription: { [key: string]: string } = {
    "Genji": "Genji Shimada is a Japanese cyborg ninja who is a member of the Shimada clan, a group of assassins. He is also the younger brother of Hanzo, who is the heir to the clan.",
    "Hanzo": "Hanzo Shimad is a Japanese archer and assassin who is a member of the Shimada clan, a group of assassins. He is also the older brother of Genji, who he believed to be dead after he supposedly killed him.",
    "Sombra": "Sombra is a notorious hacker who has hidden within the shadows to find a global conspiracy that she once encountered as a child.",
    "Moira": "Moira is an Irish geneticist and former head of the notorious Blackwatch. She is an expert in the field of genetics, searching for a way to rewrite the fundamental building blocks of life.",
    "Lucio": "Lucio grew up in Rio de Janeiro, in a poor and crowded favela that was hit hard by the financial upheaval following the Omnic Crisis. As Brazil began the long process of recovery, he wanted to find a way to lift the spirits of those around him.",
    "Kiriko ": "Kiriko Takemura is a Japanese climatologist and adventurer who is a member of Overwatch. She is the daughter of Mina Liao, one of the six founding members of Overwatch.",
    "Junker Queen": "The Junker Queen is the leader of the Junkers, a group of scavengers who reside in the Australian Outback. She is the ruler of Junkertown, a former omnium that was destroyed in the Omnic Crisis.",
    "Reinhardt": "Reinhardt Wilhelm styles himself as a champion of a bygone age, who lives by the knightly codes of valor, justice, and courage.",
    "Ramattra": "Ramattra is a member of the Shambali, a group of omnic monks who seek spiritual enlightenment. She is a close friend of Tekhartha Mondatta, the Shambali's leader.",
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

const NavMenuItem = ({ route }: { route: any }) => {
    return (<NavigationMenuItem>
        <NavigationMenuTrigger>
            <a href={route.href} className={route.active ? "text-black dark:text-white border-b" : "text-gray-500 border-b border-transparent"}>
                {route.label}
            </a>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                    <NavigationMenuLink asChild>
                        <a
                            className="flex h-full w-full select-none flex-col items-center justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href={route.href}
                            style={{
                                backgroundImage: `url(${route.billboard?.imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div
                                className="mb-2 mt-4 text-xl font-bold"
                                style={{
                                    // backgroundColor: avgColor,
                                    backgroundImage: `linear-gradient(45deg,white,white )`,
                                    // backdropFilter: "blur(2px)",
                                    backgroundSize: "100%",
                                    WebkitBackgroundClip: "text",
                                    MozBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    WebkitTextStrokeWidth: "0.5px",
                                    WebkitTextStrokeColor: "black",
                                }}
                            >
                                {route.label.toUpperCase()}
                            </div>
                        </a>
                    </NavigationMenuLink>
                </li>
                {
                    route.sizes.map((size: Size) => (
                        <ListItem href={`${route.href}?sizeId=${size.id}`} title={size.name} key={size.id}>
                            <TooltipProvider delayDuration={0.5} disableHoverableContent>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="line-clamp-2 text-left">
                                            {decription[size.name] || size.name}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="flex items-center justify-center flex-col">
                                            <div className="text-sm font-medium leading-none">{size.name}</div>
                                            <div className="max-w-sm">{decription[size.name] || size.name}</div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </ListItem>
                    ))
                }
            </ul>
        </NavigationMenuContent>
    </NavigationMenuItem>
    )
}

const MainNav: React.FC<MainNavProps> = ({ categories, sizes, billboards }) => {
    const pathname = usePathname()

    const routes = categories.map((route: Category) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`,
        sizes: sizes.filter((size: Size) => size.value === route.name),
        billboard: route.billboard
    }))

    return (
        <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
                {routes.map((route: any) => (<NavMenuItem route={route} key={route.id} />))}
                <NavigationMenuItem>
                    <Link href="https://overwatch.blizzard.com/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Play Overwatch 2 <ArrowUpRight size={16} className="inline-block ml-1" />
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}



export default MainNav;