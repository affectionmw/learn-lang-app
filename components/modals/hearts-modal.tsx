"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const onClick = () => {
        close();
        router.push("/store");
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center w-full justify-center mb-5'>
                        <Image src='/mascot_bad.svg' alt='Плохо' height={80} width={80} />
                    </div>
                    <DialogTitle className='text-center font-bold text-2xl'>У тебя закончились сердца!</DialogTitle>
                    <DialogDescription className='text-center text-base'>
                        Оплати PRO-подписку для безлимитных сердец или купи их в магазине.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button variant='primary' className='w-full' size='lg' onClick={onClick}>
                            Получить безлимитные сердца
                        </Button>
                        <Button variant='primaryOutline' className='w-full' size='lg' onClick={close}>
                            Нет, спасибо
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
