const url = 'https://graph.mirror.finance/graphql'
let query = null

export default {
    getmAssetsAll: async function(){
        query = `
        query {
            assets{ 
                symbol name token
                prices { 
                price oraclePrice 
                
                }
            }
            
            }
        `
        const request = await fetch(url, {
            method: 'post',
            mode:'cors',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*',
              "Access-Control-Allow-Headers" : "Content-Type",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify({query})
        })
        if(!request.ok || request.status !== 200) 
        throw await request.json()
        const response = (await request.json())
        return response.data 
    },

    getAssetShortHistory: async function(token){
        
        query = `
        query {
            asset(token: "${token}"){ 
                symbol name
                prices { 
                price oraclePrice 
                
                }
                statistic{
                apr{ long short}
                }
            }
        } `
        const request = await fetch(url, {
            method: 'post',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify({query})
        })
        if(!request.ok || request.status !== 200) 
            throw await request.json()
        const response = await request.json()
        return response.data

    }
}