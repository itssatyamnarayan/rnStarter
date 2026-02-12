// filepath: /Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/skeltons/index.ts

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton System
// ─────────────────────────────────────────────────────────────────────────────
//
// A comprehensive skeleton loading system using react-native-reanimated-skeleton.
//
// Usage Examples:
//
// 1. Simple List Loading:
//    <ListSkeleton count={5} isLoading={isLoading} />
//
// 2. Profile Page Loading:
//    <ProfileHeaderSkeleton isLoading={isLoading} />
//
// 3. Card Grid Loading:
//    <CardGridSkeleton count={4} columns={2} />
//
// 4. Custom Skeleton with Primitives:
//    <SkeletonRow gap={12}>
//      <SkeletonCircle size={50} />
//      <SkeletonColumn flex={1}>
//        <SkeletonText width="80%" />
//        <SkeletonText width="60%" />
//      </SkeletonColumn>
//    </SkeletonRow>
//
// ─────────────────────────────────────────────────────────────────────────────

// Base Component
export { default as SkeletonBase } from './BaseSkelton';
export type { SkeletonBaseProps, SkeletonLayoutItem } from './BaseSkelton';

// Primitives
export {
  SkeletonBox,
  SkeletonCircle,
  SkeletonText,
  SkeletonRow,
  SkeletonColumn,
} from './SkeletonPrimitives';

// Pre-built Layouts
export {
  // List
  ListItemSkeleton,
  ListSkeleton,
  // Profile
  ProfileHeaderSkeleton,
  ProfileCardSkeleton,
  ProfileGridSkeleton,
  // Cards
  CardSkeleton,
  HorizontalCardSkeleton,
  CardGridSkeleton,
  // Forms
  InputSkeleton,
  FormSkeleton,
  // Media/Social
  PostSkeleton,
  StorySkeleton,
  StoryRowSkeleton,
  GallerySkeleton,
  FeedSkeleton,
} from './layouts';
