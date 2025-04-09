<script setup>
import { h, onMounted, reactive, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { fetchCountries } from '../../api/fetchCountries';

const route = useRoute();

const countryInfo = reactive({
    flag: '',
    name: '',
    capital: '',
    area: '',
    borders: [],
})

async function fetchedCountryInfo(alpha3Code) {
    try {
        const data = await fetchCountries();
        const country = data.find((country) => country.alpha3Code === alpha3Code);

        if (country) {
            countryInfo.flag = `https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`;
            countryInfo.name = country.name.common;
            countryInfo.capital = country.capital[0] || 'Unknown';
            countryInfo.area = `${country.area.toString()} km²` || 'Unknwon';
            countryInfo.borders = country.borders || [];
            
        }

    } catch (err) {
        console.log(err);
    }
}

onMounted(async () => {
    const alpha3Code = route.params.alpha3Code;
    await fetchedCountryInfo(alpha3Code);

    watch(
        () => route.params.alpha3Code,
        (newCode, oldCode) => {
            if (newCode != oldCode) {
                fetchedCountryInfo(newCode);
            }
        }
    )
})

function Country() {
    return h("aside", { class: "country" }, [
        h("header", { class: "name-and-flag" }, [
            h("img", { src: countryInfo.flag }),
            h("h2", { class: "country-name" }, countryInfo.name )
        ]),
        h("table", { class: "country-info" }, [
            h("tr", {}, [
                h("td", {}, "Capital"),
                h("td", {}, countryInfo.capital),
                ]),
            h("tr", {}, [
                h("td", {}, "Area"),
                h("td", {}, countryInfo.area),
            ]),
            h("tr", {}, [
                h("td", {}, "Borders"),
                h("td", { class: "borders" }, 
                    countryInfo.borders.map((border, index) =>
                        h(RouterLink, {
                            to: `/list/${border}`, 
                            key: index
                            },
                            () => border
                        )
                    )
                )
            ]),

        ]),
    ])
}


</script>

<template>
    <Country />
</template>

<style>
    .country {
        margin-top: 2rem;
        padding: 0 3rem;
        height: 90vh;
        float: left;
        overflow: visible;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.3rem;

        .name-and-flag {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;

            img {
                height: 100px;
                width: 150px;
            }
        }

        .country-info {
            margin-top: 2rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;

            tr {
                width: 100%;
                padding-bottom: 1rem;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid rgba(0, 0, 0, 0.23);
            }

            .borders {
                display: flex;
                flex-direction: column;
            }
        }
    }
</style>