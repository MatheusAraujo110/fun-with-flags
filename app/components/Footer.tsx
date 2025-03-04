import { HeartIcon } from "@heroicons/react/24/solid"


const Footer = () => {
    return (
        <footer className="py-6 mt-8">
            <p className="flex items-center justify-center">
                Feito com <HeartIcon className="size-4 mx-1" /> por Matheus Araujo
            </p>
        </footer>
    )
}

export default Footer