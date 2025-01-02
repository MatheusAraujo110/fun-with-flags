'use client'

import { Header, Footer, Card, Grid } from "./components"
import { countriesApi } from "./services"
import { useEffect, useState } from "react"

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

    return (
        <>
            <Header />
            <main className="flex-1">
                <Grid>
                    {countries.map(({ cca3, flags, name, capital, region, population }, index) => {
                        const flag = flags?.svg
                        const countryName = name?.common
                        const capitalName = capital?.[0] ?? "No Capital"

                        return (
                            <Card
                                key={cca3}
                                index={index}
                                flag={flag}
                                name={countryName}
                                capital={capitalName}
                                region={region}
                                population={population}
                            />
                        )
                    })}
                </Grid>
            </main>
            <Footer />
        </>
    )
}