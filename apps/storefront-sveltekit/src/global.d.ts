// TODO put this to app.d.ts

declare interface Window {
  handleCredentialResponse: (googleUser: unknown) => void;
}
