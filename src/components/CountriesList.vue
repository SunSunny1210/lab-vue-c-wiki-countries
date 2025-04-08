<script setup>
    import { h, reactive, onMounted } from 'vue';
    import { fetchCountries } from '../../api/fetchCountries';

    const countryList = reactive([])

    async function fetchedCountries() {
        try {
            const data = await fetchCountries();
            const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            countryList.push(...sortedData)
        } catch (err) {
            console.error(err)
        }
    }

    onMounted(async () => {
        try {
            await fetchedCountries()
        } catch (err) {
            console.error(err)
        }
    })

    console.log(countryList)

    function Countries() {
        return h("aside", {class: "countries-list"}, [
            h("ul", {class: "countries"}, 
                countryList.map(country =>
                    h("li", {class: "country", key: country.alpha3Code}, [
                        h("img", {src: `https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}),
                        h("router-link", 
                            {
                                to: { name: 'details', params: {alpha3Code: country.alpha3Code } },
                            },
                            country.name.common
                        )
                    ])
                )
            )
        ])
    }
</script>

<template>
    <Countries />
</template>

<style>
    aside {
        height: 90vh;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-y: scroll;

        ul {
            height: 100%;

            .country {
                padding: 1rem 0;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                gap: 20px;
                border: 1px solid rgba(0, 0, 0, 0.23);
            }
        }
    }
</style>