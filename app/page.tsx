'use client'

import { Card, Grid, Search, Select } from "./components"
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
    const [selected, setSelected] = useState("All regions")

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

    const regions = [... new Set(countries.map(({ region }) => region))]

    const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common, 'en-US'))

    const filteredCountries = sortedCountries.filter(({ name, region }) => {
        const nameMatches = name.common.toLowerCase().includes(serach.toLowerCase())
        const regionMatches = selected === "All regions" || region === selected

        return nameMatches && regionMatches
    })

    return (
        <>
            <div className="flex justify-between mb-8">
                <Search
                    count={filteredCountries.length}
                    search={serach}
                    setSearch={setSearch} />

                <Select
                    options={regions}
                    selected={selected}
                    setSelected={setSelected} />
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
