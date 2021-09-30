
const mAssetsTable = Vue.component(
    'table-m-assets',
    {
        props:{
          assets: {
            type: Array,
            required: true,
          },
          loader: Boolean,
          lastUpdate: String,
        },
        template: /* vue-html*/ `
        <div>
            <v-data-table
            :headers="headers"
            :items="assets"
            :items-per-page="5"
            v-model="selectedAssets"
            item-key="symbol"
            selectable-key="symbol"
            show-select
            class="elevation-1"
            :loading="loader"
            >
            <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Acciones Sinteticas</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              Última actualización<br />
              {{lastUpdate}}
            </v-toolbar>
          </template>
            </v-data-table>
        </div>
        `,
        data: () => {
            return{
                selectedAssets: [],
                headers: [
                    {
                      text: 'Símbolo',
                      align: 'start',
                      sortable: true,
                      value: 'symbol',
                    },
                    { text: 'Descripción', value: 'name' },
                    { text: 'Precio', value: 'price' },
                ],
            }
        },
        methods:{
        },
        created(){
        },
        watch:{
          selectedAssets(newVal){
            const mAssets = newVal
              .map( m => {
                return {name: m.name, symbol: m.symbol}
              })
            this.$emit('update-assets', mAssets)
          }
        }
    })

export default mAssetsTable