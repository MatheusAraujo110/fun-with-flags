import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

type ErrorProps = {
    text: string
}

const Error = ({ text }: ErrorProps) => {
    return (
        <div className="flex flex-col items-center m-auto">
            <ExclamationCircleIcon className="size-8 mb-5" />
            <span className="text-sm mb-1">Ops, algo deu errado!</span>
            <span className="text-sm">{text}</span>
        </div>
    )
}

export default Error