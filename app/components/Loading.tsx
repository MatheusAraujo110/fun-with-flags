import { ArrowPathIcon } from "@heroicons/react/24/solid"

type LoadingProps = {
    text: string

}

const Loading = ({ text }: LoadingProps) => {
    return (
        <div className="flex flex-col items-center m-auto">
            <ArrowPathIcon className="animate-spin size-8 mb-5" />
            <span className="text-s">{text}</span>
        </div>
    )
}

export default Loading