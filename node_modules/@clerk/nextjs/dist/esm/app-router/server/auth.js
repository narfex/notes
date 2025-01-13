import { buildClerkProps } from "../../server/buildClerkProps";
import { createGetAuth } from "../../server/createGetAuth";
import { authAuthHeaderMissing } from "../../server/errors";
import { buildRequestLike } from "./utils";
const auth = () => {
  const authObject = createGetAuth({
    debugLoggerName: "auth()",
    noAuthStatusMessage: authAuthHeaderMissing()
  })(buildRequestLike());
  const { notFound, redirect } = require("next/navigation");
  authObject.protect = (params, options) => {
    const paramsOrFunction = (params == null ? void 0 : params.redirectUrl) ? void 0 : params;
    const redirectUrl = (params == null ? void 0 : params.redirectUrl) || (options == null ? void 0 : options.redirectUrl);
    const handleUnauthorized = () => {
      if (redirectUrl) {
        redirect(redirectUrl);
      }
      notFound();
    };
    if (!authObject.userId) {
      return handleUnauthorized();
    }
    if (!paramsOrFunction) {
      return { ...authObject };
    }
    if (typeof paramsOrFunction === "function") {
      if (paramsOrFunction(authObject.has)) {
        return { ...authObject };
      }
      return handleUnauthorized();
    }
    if (authObject.has(paramsOrFunction)) {
      return { ...authObject };
    }
    return handleUnauthorized();
  };
  return authObject;
};
const initialState = () => {
  return buildClerkProps(buildRequestLike());
};
export {
  auth,
  initialState
};
//# sourceMappingURL=auth.js.map