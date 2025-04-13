import { Toaster } from 'sonner';

export function Toast() {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      theme="system"
    />
  );
}