import es from './es.js'
import mAssets from './mAsset.js'

import cTableAll from './components/table-assets-all.js'
import cTableHistory from './components/table-assets-history.js'



const vm = new Vue({
    vuetify: new Vuetify({
        lang:{
            locales: { es },
            current: 'es',
        }
    }),
    data: () =>{
        return{
            minutes: 10,
            interval: null,
            mAssetsToshow: [],
            mAssets: [],
            nextUpdate: null,
            loader:{
              tableAll: false,
            },
            lastUpdate: null,
            nextUpdate: null,
        }
    },
    methods:{
      initializeInterval(){
        const self = this
        if(this.interval) clearInterval(this.interval)

        this.interval = setInterval(
          function getHistoryCB(){
            self.getAssetShortHistory()
            self.nextUpdate = moment().add(self.minutes ,'m').format('YYYY-MM-DD hh:mm:ss a')
            return getHistoryCB
        }(), 
        1000 * (self.minutes ?? 1 ) * 60)

      },

      getAssetsAll: async function(){
        try{
          this.loader.tableAll = true
          const response = await mAssets.getmAssetsAll()
          this.mAssets = response
          ? response.assets
              .map(r => {return{...r, price: r.prices ? r.prices.price:null}}) 
          : []
          this.lastUpdate = moment().format('YYYY-MM-DD hh:mm:ss a')
          
          
        }catch(e){
            console.log(e)
        }
        finally{
            this.loader.tableAll = false
        }
      },

      getAssetShortHistory: async function(){
        const self = this
        this.mAssetsFiltered.forEach( async (m)=> {
          const response = await mAssets.getAssetShortHistory(m.token)
          self.setAssetHistory(
            m.symbol, 
            response.asset ? 
            response.asset.statistic : null,
            response.asset ?
             response.asset.prices : null
            )
        })
      },
      setAssetHistory(symbol, history, prices){
        if(history && history.apr ) history.apr.date = moment().format('YYYY-MM-DD hh:mm:ss a')
       
        
        const asset = this.mAssets.filter(m=> m.symbol === symbol)
        if(asset.length < 1) return
        if(asset[0] && !asset[0].history) this.$set(asset[0], 'history', [])
        asset[0].history.push({...history.apr, ...prices})
        asset[0].price = prices.price
      }
      
    },
    created(){
      this.getAssetsAll()
    },
    computed:{
      mAssetsFiltered(){
        const filterSymbols = this.mAssetsToshow.map(m=> m.symbol)
        return this.mAssets.filter(m=> filterSymbols.includes(m.symbol))
      }
    },
    
}).$mount('#app')

