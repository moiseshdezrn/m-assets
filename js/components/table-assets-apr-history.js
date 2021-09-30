const mAssetsShortHistory = Vue.component(
    'asset-short-history-detail',
    {
      props:{
        
        apr:{
          type: Array,
          required: true,
        }
      },
      data(){
        return {
          headers: [
            {
              text: 'Long',
              align: 'start',
              sortable: true,
              value: 'long',
            },
            { text: 'short', value: 'short' },
            { text: 'Fecha', value: 'date' },
            { text: 'Precio', value: 'price' },
          ],
          loader:{
            table: false
          },
        }
      },
      computed: {
      },
      methods:{
      },
      created(){

      },
      template: /* vue-html*/ `
      <div>
          <v-data-table
          fixed-header
          :headers="headers"
          :items="apr"
          :items-per-page="3"
          class="elevation-1 table-assets-history"
          >
          </v-data-table>
      </div>
      `,
    })

export default mAssetsShortHistory