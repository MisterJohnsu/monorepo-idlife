import * as Toast from '@radix-ui/react-toast';
import { useEffect } from 'react';

interface AlertProps {
  titleMessage: string;
  descriptionMessage: string;
  open: boolean;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Alert({ titleMessage, descriptionMessage, open, type, onClose }: AlertProps) {
  const backgroundColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const buttonColor = type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      timer = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 5000);
    }
  }, [open]);

  return (
    <>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={`shadow-lg rounded-lg p-4 border fixed top-4 right-4 w-80 ${backgroundColor} ${borderColor}`}
          open={open}
        >
          <Toast.Title className={`text-lg font-semibold ${textColor}`}>
            {titleMessage}
          </Toast.Title>
          <Toast.Description className={`text-sm mt-2 ${textColor}`}>
            {descriptionMessage}
          </Toast.Description>
          <Toast.Action
            className="mt-4 flex justify-end"
            asChild
            altText="Close alert"
          >
            <button onClick={() => onClose()} className={`cursor-pointer px-4 py-2 text-white rounded transition ${buttonColor}`}>
              Fechar
            </button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="fixed top-4 right-4 flex flex-col gap-2" />
      </Toast.Provider>
    </>
  );
}