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
import { useExitModal } from "@/store/use-exit-modal";

export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const handleFinish = () => {
        close();
        router.push("/learn");
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center w-full justify-center mb-5'>
                        <Image src='/mascot_sad.svg' alt='Грустный' height={80} width={80} />
                    </div>
                    <DialogTitle className='text-center font-bold text-2xl'>Подожди, не уходи!</DialogTitle>
                    <DialogDescription className='text-center text-base'>
                        Ты уходишь с урока... Ты уверен?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button variant='primary' className='w-full' size='lg' onClick={close}>
                            Продолжить изучение
                        </Button>
                        <Button variant='dangerOutline' className='w-full' size='lg' onClick={handleFinish}>
                            Мне нужно идти
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
