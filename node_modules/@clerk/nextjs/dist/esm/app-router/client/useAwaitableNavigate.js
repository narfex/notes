"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
const useAwaitableNavigate = () => {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const clerkNavRef = useRef();
  const clerkNavPromiseBuffer = useRef([]);
  if (!clerkNavRef.current) {
    clerkNavRef.current = (to, opts) => {
      return new Promise((res) => {
        clerkNavPromiseBuffer.current.push(res);
        startTransition(() => {
          push(to, opts);
        });
      });
    };
  }
  useEffect(() => {
    var _a;
    if (isPending) {
      return;
    }
    if ((_a = clerkNavPromiseBuffer == null ? void 0 : clerkNavPromiseBuffer.current) == null ? void 0 : _a.length) {
      clerkNavPromiseBuffer.current.forEach((resolve) => resolve());
    }
    clerkNavPromiseBuffer.current = [];
  }, [isPending]);
  return clerkNavRef.current;
};
export {
  useAwaitableNavigate
};
//# sourceMappingURL=useAwaitableNavigate.js.map