<script setup>
    import { h, reactive, onMounted } from 'vue';
    import { fetchCountries } from '../../api/fetchCountries';
    import { RouterLink } from 'vue-router';

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

    function Countries() {
        return h("aside", {class: "countries-list"}, [
            h("ul", {class: "countries"}, 
                countryList.map(country =>
                    h(RouterLink, { 
                        to: `/list/${country.alpha3Code}`, key: country.alpha3Code 
                    },
                    [
                        h("img", { src: `https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png` }),
                        h("span", {}, country.name.common)
                    ])
                )
            )
        ])
    }
</script>

<template>
    <Countries />
    <router-view />
</template>

<style> 
  aside {
    height: 90vh;
    width: 50%;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;

    ul {
        height: 100%;

      a {
        padding: 1rem 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
        border: 1px solid rgba(0, 0, 0, 0.23);
        text-decoration: none;
        color: black;
      }
    }
  }
</style>