import { Skeleton } from "../ui/skeleton"
import { PostStatsSkeleton } from "./PostStatsSkeleton"

export const GridPostsSkeleton = ({
    postsCount = 6,
    showUser = true,
    showStats = true,
  }: {
    postsCount?: number;
    showUser?: boolean;
    showStats?: boolean;
  }) => {
    return (
      <ul className="grid-container">
        {Array.from(Array(postsCount).keys()).map((key) => (
          <li
            key={`explore-skeleton-key-${key}`}
            className="relative min-w-80 h-80"
          >
            {/* Image Sec */}
            <div className="grid-post_link">
              <Skeleton className="h-full w-full object-cover" />
            </div>
  
            {/* User Sec & Stats Sec */}
            <div className="grid-post_user">
              {showUser && (
                <div className="flex items-center justify-start gap-2 flex-1">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-20" />
                </div>
              )}
  
              {showStats && <PostStatsSkeleton />}
            </div>
          </li>
        ))}
      </ul>
    );
  };
