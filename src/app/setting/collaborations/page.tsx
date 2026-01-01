"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DraftItemCard from "@/components/setting/draft-item-card";
import { useDraft } from "@/hooks/apis/useDraft";
import { useAuthContext } from "@/context/AuthContext";
import { Users } from "lucide-react";
import FullPageLoading from "@/components/loading/full-page-loading";

export default function CollaborationsPage() {
    const { user, loading } = useAuthContext();

    const { data, isLoading, error } = useDraft().useGetCollaboratedDrafts();

    if (!user) {
        return (
            <CardDescription className="flex w-full justify-center">
                Please log in to view your collaborations.
            </CardDescription>
        );
    }
    if (loading || isLoading)
        return <FullPageLoading text="We are preparing your collaborations." />;
    if (error) return <p>Error loading collaborations: {error.message}</p>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Collaborations</CardTitle>
                <CardDescription>View and manage posts shared with you</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-medium">Shared Drafts</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {data &&
                            data.map((item: any) => (
                                <DraftItemCard key={item.id} draft={item} isCollaborative={true}></DraftItemCard>
                            ))}
                    </div>
                    {data && data.length === 0 && (
                        <div className="py-12 text-center">
                            {" "}
                            <Users className="mx-auto h-12 w-12 text-muted-foreground" />{" "}
                            <h3 className="mt-4 text-lg font-medium"> No collaborations yet </h3>{" "}
                            <p className="mt-2 text-sm text-muted-foreground">
                                {" "}
                                You haven't been added to any drafts yet.{" "}
                            </p>{" "}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
