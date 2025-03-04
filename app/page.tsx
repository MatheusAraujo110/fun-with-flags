'use client'

import { Card, Grid, Search } from "./components"
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
    const [serach, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCountries = async () => {
            const [response, error] = await countriesApi.getAll()
            setLoading(false)

            if (error) {
                setError(error)
                return
            }

            setCountries(response)
        }
        fetchCountries()
    }, [])

    if (loading) return <div>loading...</div>
    if (error) return <div>{error}</div>

    const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common, 'en-US'))

    const filteredCountries = sortedCountries.filter(({ name }) =>
        name.common.toLowerCase().includes(serach.toLowerCase()))

    return (
        <>
            <div className="mb-8">
                <Search
                    count={filteredCountries.length}
                    search={serach}
                    setSearch={setSearch} />
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
