"use strict";
var import_backend = require("@clerk/backend");
var import_server = require("next/server");
var import_createGetAuth = require("./createGetAuth");
const mockToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyLWlkIn0.0u5CllULtDVD9DUUmUMdJLbBCSNcnv4j3hCaPz4dNr8";
const mockToken2 = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyLWlkLTIifQ.K-mhz0Ber1Hfh2xCwmvsLwhZO_IKLtKt78KTHsecEas";
describe("createGetAuth(opts)", () => {
  it("returns a getAuth function", () => {
    expect((0, import_createGetAuth.createGetAuth)({ debugLoggerName: "test", noAuthStatusMessage: "test" })).toBeInstanceOf(Function);
  });
});
describe("getAuth(req)", () => {
  it("parses and returns the token claims when signed in", () => {
    const req = new import_server.NextRequest("https://www.clerk.com", {
      headers: new Headers({
        [import_backend.constants.Headers.AuthStatus]: import_backend.AuthStatus.SignedIn,
        [import_backend.constants.Headers.AuthToken]: mockToken,
        [import_backend.constants.Headers.AuthMessage]: "message",
        [import_backend.constants.Headers.AuthReason]: "reason"
      })
    });
    expect((0, import_createGetAuth.getAuth)(req).userId).toEqual("user-id");
  });
  it("parses and returns the token claims when signed out", () => {
    const req = new import_server.NextRequest("https://www.clerk.com", {
      headers: new Headers({
        [import_backend.constants.Headers.AuthStatus]: import_backend.AuthStatus.SignedOut,
        [import_backend.constants.Headers.AuthMessage]: "message",
        [import_backend.constants.Headers.AuthReason]: "reason"
      })
    });
    expect((0, import_createGetAuth.getAuth)(req).userId).toEqual(null);
  });
  it("prioritizes the token found in the auth header if a cookie token also exists", () => {
    const req = new import_server.NextRequest("https://www.clerk.com", {
      headers: new Headers({
        [import_backend.constants.Headers.AuthStatus]: import_backend.AuthStatus.SignedIn,
        [import_backend.constants.Headers.AuthToken]: mockToken,
        [import_backend.constants.Headers.AuthMessage]: "message",
        [import_backend.constants.Headers.AuthReason]: "reason",
        Cookie: `__session=${mockToken2};`
      })
    });
    expect((0, import_createGetAuth.getAuth)(req).userId).toEqual("user-id");
  });
  it("throws if auth status is not found", () => {
    const req = new import_server.NextRequest("https://www.clerk.com", {
      headers: new Headers({
        [import_backend.constants.Headers.AuthToken]: mockToken
      })
    });
    expect(() => (0, import_createGetAuth.getAuth)(req)).toThrowError();
  });
});
//# sourceMappingURL=createGetAuth.test.js.map