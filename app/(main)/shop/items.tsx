"use client";

import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

const POINTS_TO_REFILL = 10;

export const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
    const [pending, startTransition] = useTransition();

    const handleHeartsRefill = () => {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
            return;
        }

        startTransition(() => {
            refillHearts().catch(() => toast.error("Произошла неизвестная ошибка при пополнении сердец"));
        });
    };

    const handleUpgrade = () => {
        startTransition(() => {
            createStripeUrl()
                .then((response) => {
                    if (response.data) {
                        window.location.href = response.data;
                    }
                })
                .catch(() => toast.error("Произошла неизвестная ошибка при оплате"));
        });
    };

    return (
        <ul className='w-full'>
            <div className='flex items-center w-full p-4 gap-x-4 border-t-2'>
                <Image src='/heart.svg' alt='Сердце' height={60} width={60} />
                <div className='flex-1'>
                    <p className='text-neutral-700 text-base lg:text-xl font-bold'>Пополнить сердца</p>
                </div>
                <Button onClick={handleHeartsRefill} disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}>
                    {hearts === 5 ? (
                        "максимум"
                    ) : (
                        <div className='flex items-center'>
                            <Image src='/points.svg' alt='Очки' height={20} width={20} />
                            <p>{POINTS_TO_REFILL}</p>
                        </div>
                    )}
                </Button>
            </div>
            <div className='flex items-center w-full p-4 pt-8 gap-x-4 border-t-2'>
                <Image src='/unlimited.svg' alt='Бесконечные сердца' width={60} height={60} />
                <div className='flex-1'>
                    <p className='text-neutral-700 text-base lg:text-xl font-bold'>Бесконечные сердца</p>
                </div>
                <Button onClick={handleUpgrade} disabled={pending}>
                    {hasActiveSubscription ? "управление" : "подключить"}
                </Button>
            </div>
        </ul>
    );
};
