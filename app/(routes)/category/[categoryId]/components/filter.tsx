"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface FilterProps {
    data: (Size | Color)[];
    name: string;
    valueKey: string;
    catName?: string;
};

const Filter: React.FC<FilterProps> = ({
    data,
    name,
    valueKey,
    catName = ''
}) => {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const toastId = toast.loading('Loading...');
        try {
            setLoading(true);
            const current = qs.parse(searchParams.toString());
            const query = {
                ...current,
                [valueKey]: id
            };

            if (current[valueKey] === id) {
                query[valueKey] = null;
            }

            const url = qs.stringifyUrl({
                url: window.location.href,
                query,
            }, { skipNull: true });
            router.push(url, { scroll: false, })
        }
        catch (err) { console.log(err) }
        finally {
            setLoading(false);
            toast.success('Please wait!', { id: toastId });
        }

    }
    const filteredData = data.filter(item => !catName || item.value === catName)
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold">
                {name}
            </h3>
            <hr className="my-4" />
            <div className="flex flex-wrap gap-2">
                {filteredData.map((item) => {

                    return (
                        <div key={item.id} className="flex items-center">
                            <Button
                                disabled={loading}
                                variant="outline"
                                className={cn(
                                    '',
                                    selectedValue === item.id && 'bg-black text-white'
                                )}
                                onClick={() => onClick(item.id)}
                            >
                                {item.name}
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Filter;