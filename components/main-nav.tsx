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

interface MainNavProps {
    categories: Category[]
    sizes: Size[]
    billboards: Billboard[]
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
            <a href={route.href} className={route.active ? "text-black" : "text-gray-500"}>
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
                            {size.name} items
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
        <NavigationMenu>
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