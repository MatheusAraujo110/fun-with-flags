'use client'

import { Card, Grid } from "./components"
import { countriesApi } from "./services"
import { useEffect, useState } from "react"
import Link from "next/link"

type Country = {
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
}

export default function Home() {
    const [countries, setCountries] = useState<Country[]>([])
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>("")

    useEffect(() => {
        const fetchCountries = async () => {
            const [response, error] = await countriesApi.getAll()
            setLoading(false)

            if (error) {
                setError(error)
                return
            }

            setCountries(response)
            setFilteredCountries(response) // Inicializa com todos os países
        }
        fetchCountries()
    }, [])

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredCountries(countries) // Mostra todos os países se o campo de busca estiver vazio
        } else {
            const query = searchQuery.toLowerCase()
            const filtered = countries.filter(({ name }) =>
                name.common.toLowerCase().includes(query)
            )
            setFilteredCountries(filtered)
        }
    }, [searchQuery, countries])

    if (loading) return <div>loading...</div>
    if (error) return <div>{error}</div>

    return (
        <>
            <div className="p-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Procure um país..."
                        className="w-full p-3 pl-12 text-lg border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
                        />
                    </svg>
                </div>
            </div>
            <Grid>
                {filteredCountries.map(({ cca3, flags, name, capital, region, population }, index) => {
                    const flag = flags?.svg
                    const countryName = name?.common
                    const capitalName = capital?.[0] ?? "No Capital"

                    return (
                        <Link key={cca3} href={`/country/${cca3}`}>
                            <Card
                                index={index}
                                flag={flag}
                                name={countryName}
                                capital={capitalName}
                                region={region}
                                population={population}
                            />
                        </Link>
                    )
                })}
            </Grid>
        </>
    )
}