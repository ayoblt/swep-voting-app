import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export const CollectionMiniCard = ({label, children}: {label: string; children: React.ReactNode}) => {
    return (
        <div className="bg-card w-full h-[150px] p-5 rounded-lg space-y-4 border border-muted shadow-sm">
            <p className="text-muted-foreground font-medium tracking-wide text-sm">{label}</p>
            <div>
                {children}
                {/*<h3 className="text-xl font-semibold">Date: Sat, Sep 7, 2024</h3>*/}
                {/*<h3 className="text-xl font-semibold">Time: 04:23pm</h3>*/}
                {/*<p className="text-muted-foreground text-sm">Created: Saturday, Sep 7, 2024 | 04:23pm</p>*/}
            </div>
        </div>
    )
}