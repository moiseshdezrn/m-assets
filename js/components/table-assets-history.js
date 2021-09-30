
import cTableHistoryApr from './table-assets-apr-history.js'
const mAssetsShortHistory = Vue.component(
    'asset-short-history',
    {
      props:{
        nextUpdate: String,
        assets:{
          type: Array,
          required: true,
        }
      },
      data(){
        return {
          headers: [
            {
              text: 'Símbolo',
              align: 'start',
              sortable: true,
              value: 'symbol',
            },
            { text: 'Descripción', value: 'name' },
            { text: 'Precio', value: 'price' },
            { text: '', value: 'data-table-expand' }
          ],
          loader:{
            table: false
          },
          lastUpdate: null,
          expanded: [],
        }
      },
      computed: {
      },
      methods:{
        dataToCSV(){
          const data = []
          this.assets.forEach(element => {
            const assetHeader = {
              name: element.name, symbol: element.symbol,
            }
            if(element.history)
              element.history
              .forEach(element_history=>{
                data.push({
                  ...assetHeader,
                  ...element_history
                })
              })
            else
              data.push({...assetHeader})
            
          });

          const array = [Object.keys(data[0])].concat(data)

          return array.map(it => {
            return Object.values(it).toString()
          }).join('\n')

        },
        getCSV(){
          const data = this.dataToCSV()
          //const csv = Papa.unparse(data)
         
          download(new Blob([data], {type: 'text/csv;charset=utf-8;'}), "history.csv", "csv" ) 

        },
      },
      created(){

      },
      template: /* vue-html*/ `
      <div>
          <v-data-table
          fixed-header
          :headers="headers"
          :items="assets"
          :items-per-page="5"
          item-key="symbol"
          class="elevation-1 table-assets-history"
          show-expand
          :single-expand="true"
          :expanded.sync="expanded"
          >
            <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Historial</v-toolbar-title>
              
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-btn color="primary"
                @click="getCSV">
                Descargar
              </v-btn>
              <v-spacer></v-spacer>
              Próxima actualización<br />
              {{nextUpdate}}
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <asset-short-history-detail :apr="item.history" v-if="item.history" />
              <span v-else>Sin Datos</span>
            </td>
          </template>
          </v-data-table>
      </div>
      `,
    })

export default mAssetsShortHistory