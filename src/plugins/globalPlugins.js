// import axios from 'axios'
// import _ from 'lodash'
// import moment from 'moment'

const myMixins = {
    install(Vue){
        Vue.mixin({
            data: () => ({
                // baseUrl : 'https://atillc.blob.core.windows.net/data-collector/icode/test-data/topics.json',
                // topics: [],
                // persons: []
            }),
            computed: {
                
            },
            created(){
                // this.loadJSON()
            },
            methods: {
                // loadJSON(){
                //     axios.get(this.baseUrl).then(res=>{
                //         console.log(res.data)
                //         for(let data of res.data.topics){
                //             let comments = []

                //             for(let comment of data.comments){
                //                 let by = comment.by;
                //                 //get data of commentor on data.persons
                //                 let user = res.data.persons.filter(rec=>{
                //                     return rec.guid == by
                //                 })

                //                 if(user.length > 0){
                //                     let userObj = {
                //                         first: user[0].first,
                //                         last: user[0].last,
                //                         guid: user[0].guid,
                //                         email: user[0].email,
                //                         date: moment(comment.date).format('YYYY/MM.D, h:mm A'),
                //                         comment: comment.comment
                //                     }
                //                     comments.push(userObj)
                //                 }
                //             }

                //             //sort comments by date DESC
                //             let sortedComments = _.orderBy(comments, ['date'], ['desc']);

                //             let obj = {
                //                 name: data.name,
                //                 guid: data.guid,
                //                 comments: sortedComments
                //             }

                //             this.topics.push(obj)
                //         }
                //     })
                // }
            }
        })
    }
}

export default myMixins