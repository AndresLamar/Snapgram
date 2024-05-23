import { Skeleton } from "@/components/ui/skeleton";
import { GridPostsSkeleton } from "./GridPostsSkeleton";

export const ProfileDetailSkeleton = () => {
  return (
    <>
        <div className="profile-inner_container">
            <Skeleton className='rounded-full w-32 lg:h-32'/>

            <div className="flex flex-col">
                <div className="flex gap-14">
                    <Skeleton className="h-10 w-40" />
                    <Skeleton className="h-10 w-24"/>
                </div>
                <Skeleton className="h-5 w-24 mt-3" />

                <div className="mt-5 flex gap-10">
                    {Array.from(Array(3).keys()).map((tag) => (
                        <div key={tag} className="flex gap-3 ">
                            <Skeleton className="h-6 w-6" />
                            <Skeleton className="h-6 w-14" />
                        </div>
                    ))}       
                </div>

                <Skeleton className='h-5 w-full max-w-xs xl:max-w-2xl mt-6' />
                <Skeleton className='h-5 w-24 mt-2' />
            </div>
        </div>

        <div className="flex flex-start w-full">
            <Skeleton className='h-10 w-40 '/>
            <Skeleton className='h-10 w-40 ml-1'/>
        </div>
        <GridPostsSkeleton showUser={false} showStats={false} />
    </>
  );
};

export const ProfilePostsSkeleton = () => {
  return <GridPostsSkeleton />;
};
