import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className='hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2'>
            <div className='max-w-screen-lg mx-auto flex items-center justify-evenly h-full'>
                <Button size='lg' variant='ghost' className='w-full'>
                    <Image src='/it.svg' alt='Итальянский' height={32} width={40} className='mr-4 rounded-md' />
                    Итальянский
                </Button>
                <Button size='lg' variant='ghost' className='w-full'>
                    <Image src='/fr.svg' alt='Французский' height={32} width={40} className='mr-4 rounded-md' />
                    Французский
                </Button>
                <Button size='lg' variant='ghost' className='w-full'>
                    <Image src='/es.svg' alt='Испанский' height={32} width={40} className='mr-4 rounded-md' />
                    Испанский
                </Button>
                <Button size='lg' variant='ghost' className='w-full'>
                    <Image src='/hr.svg' alt='Хорватский' height={32} width={40} className='mr-4 rounded-md' />
                    Хорватский
                </Button>
                <Button size='lg' variant='ghost' className='w-full'>
                    <Image src='/jp.svg' alt='Японский' height={32} width={40} className='mr-4 rounded-md' />
                    Японский
                </Button>
            </div>
        </footer>
    );
};
