type CardProps = {
    country: string;
    capital: string;
    region: string;
    population: number; // Alterado para number
};

const Card = ({ country, capital, region, population }: CardProps) => {
    return (
        <div className="h-full overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="aspect-video w-full">
                <img
                    src="https://placehold.co/600x400"
                    alt={`Imagem de ${country}`}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6 text-sm text-gray-600">
                <h2 className="text-xl font-semibold mb-4">{country}</h2>
                <div className="space-y-2">
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Capital: </span>
                        <span>{capital}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Região: </span>
                        <span>{region}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">População: </span>
                        <span>{population.toLocaleString('en-US')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
