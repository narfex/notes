/**
 * Creates an "awaitable" navigation function that will do its best effort to wait for Next.js to finish its route transition.
 *
 * This is accomplished by wrapping the call to `router.push` in `startTransition()`, which should rely on React to coordinate the pending state. We key off of
 * `isPending` to flush the stored promises and ensure the navigates "resolve".
 */
export declare const useAwaitableNavigate: () => (href: string, options?: import("next/dist/shared/lib/app-router-context").NavigateOptions | undefined) => Promise<void>;
//# sourceMappingURL=useAwaitableNavigate.d.ts.map