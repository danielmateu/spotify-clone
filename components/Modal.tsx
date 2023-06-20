

import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {

    onChange: (open: boolean) => void;
    isOpen: boolean;
    title: string;
    description: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-neutral-900/90" />
                <Dialog.Content
                    className="
                    fixed
                    drop-shadow-md
                    border
                    border-neutral-700
                    top-1/2 left-1/2
                    max-h-full
                    h-full
                    md:h-auto
                    md:max-h-[85vh]
                    w-full md:w-[90vw]
                    md:max-w-[450px]
                    transform
                    -translate-x-1/2 -translate-y-1/2
                    rounded-md bg-neutral-800 p-[25px]
                    focus:outline-none"
                >
                    <Dialog.Title
                        className="text-xl text-center font-semibold mb-4"
                    >
                        {title}
                    </Dialog.Title>
                    <Dialog.Description
                        className="text-sm text-center mb-4"
                    >
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button
                            className="
                            absolute
                            top-0
                            right-0
                            p-2
                            mt-[-10px]
                            mr-[-10px]
                            rounded-full
                            bg-neutral-700
                            hover:bg-neutral-600
                            transition
                            duration-200
                            focus:outline-none
                            "
                        >
                            <IoMdClose className="text-neutral-100 text-xl" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    )
}
