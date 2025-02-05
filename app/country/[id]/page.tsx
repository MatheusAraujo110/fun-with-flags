'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { countriesApi } from "../../services"
import { useParams } from "next/navigation"

type Params = {
    id: string
}

type DetailedCountry = {
    cca3: string
    flags: {
        svg: string
    }
    name: {
        common: string
    }
    capital: string[]
    region: string
    population: number
    languages: Record<string, string>  // aqui eu passo a minha chave e valor.
    currencies: Record<string, {  // aqui eu passo a minha chave e dentro da {} eu passo o meu objeto.
        name: string
        symbol: string
    }>
    tld: string[]
    borders: string[]
}

export default function Country() {
    const params = useParams<Params>()

    const [id, setId] = useState<string | null>(null)
    const [country, setCountry] = useState<DetailedCountry>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (params?.id && params.id !== id) {
            setId(params.id as string)
        }
    }, [params, id])

    useEffect(() => {
        const fetchCountries = async () => {
            const [response, error] = await countriesApi.getCountry(id)
            setLoading(false)

            if (error) {
                setError(error)
                return
            }

            setCountry(response)
        }
        if (id) {
            fetchCountries()
        }
    }, [id])

    if (loading) return <div>loading...</div>
    if (error) return <div>{error}</div>

    console.log(country)
    const { flags, name, capital, region, population, languages, currencies, tld, borders } = country ?? {}

    const flag = flags?.svg
    const countryName = name?.common
    const capitalName = capital?.[0] ?? "No Capital"
    const languageName = Object.values(languages ?? {}).join(", ")
    const currencyName = Object.values(currencies ?? {}).map(({ name, symbol }) => `${name} (${symbol})`).join(", ")
    const [topLevelDomain] = tld ?? []
    const borderIds = borders?.join(", ") ?? "No Borders"

    return (
        <>
            <div className="mb-8">
                <Link href="/">
                    <button
                        className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded">
                        Back
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6">
                <div className="flex items-center md:max-w-[400px]">
                    <Image
                        src={flag || "/flag-placeholder.svg"}
                        alt={`flag of ${countryName}`}
                        className="max-h-88 object-cover rounded-lg"
                        width={500}
                        height={300}
                        priority
                    />                </div>
                <div className="p-6 text-sm text-gray-600">
                    <h2 className="text-xl font-semibold mb-4">{countryName} ({id})</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Capital: </span>
                            <span>{capitalName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Região: </span>
                            <span>{region}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">População: </span>
                            <span>{population}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Languages: </span>
                            <span>{languageName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Currency: </span>
                            <span>{currencyName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Top Level Domain: </span>
                            <span>{topLevelDomain}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Borders: </span>
                            <span>
                                {borderIds}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}