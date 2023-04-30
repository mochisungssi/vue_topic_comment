<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="8">
                    <!-- SEARCH -->
                    <v-text-field
                    single-line
                    hide-details
                    placeholder="Search topic..."
                    density="compact"
                    variant="outlined"
                    append-inner-icon="mdi-magnify"
                    class="search text-right"></v-text-field>
                </v-col>
                <v-col md="4" class="text-right">
                    <v-btn
                    variant="outlined"
                    color="primary"
                    @click="allowEdit('', 'add', '')">
                        <v-icon class="mr-3">mdi-comment-plus</v-icon>
                        Add Topic
                    </v-btn>
                </v-col>
            </v-row>

            <!-- TOPICS -->
            <v-row no-gutters>
                <v-col
                    v-for="(topic, i) in getTopics"
                    :key="i"
                    cols="12"
                    sm="3"
                    class="pa-2"
                >
                    <v-card class="ma-2 pa-4" min-height="180">
                        <v-row>
                            <v-col md="8">
                                <span style="text-transform: capitalize;">{{ topic.name }}</span>

                            </v-col>
                            <v-col md="3" class="text-right">
                                <!-- <v-icon>mdi-dots-vertical</v-icon> -->
                                <v-menu location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" variant="text">
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click="allowEdit(i, 'edit', topic.name)">
                                                <v-btn variant="plain" color="success">
                                                    Edit
                                                </v-btn>
                                            </v-list-item-title>
                                            <v-list-item-title @click="deleteTopic(i)">
                                                <v-btn variant="plain" color="error">
                                                    Delete
                                                </v-btn>
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <div class=" text-center">
                            <v-row class="bottom">
                                <v-col
                                sm="6">
                                    <v-btn variant="text" disabled>
                                        <v-icon class="icon mr-1">mdi-comment-multiple-outline</v-icon>
                                        <span class="card-span">{{ topic.comments.length }} Comment{{ topic.comments.length > 1 ? 's' : '' }}</span>
                                    </v-btn>
                                </v-col>
                                <v-col
                                sm="6">
                                    <v-btn variant="text" @click="openViewCommentDialog(i, topic)">
                                        <v-icon class="icon mr-1">mdi-comment-eye-outline</v-icon>
                                        <span class="card-span">View</span>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <v-pagination
            dark
            v-model="intPageNo"
            :length="pageCountOfData"
            :total-visible="5"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"></v-pagination>
        </v-container>

        <!-- COMPONENT -->
        <view-comment
        :viewCommentDialog="viewCommentDialog"
        :viewCommentDetails="viewCommentDetails"
        :persons="persons"
        :topicIndex="topicIndex"
        @closeViewCommentDialog="closeViewCommentDialog"
        @updateTopics="updateTopics"
        @deleteTopic="deleteTopic"
        @addTopicComments="addTopicComments"></view-comment>

        <topic-dialog
        :topicDialog="topicDialog"
        :action="action"
        :topicIndex="topicIndex"
        :topicName="topicName"
        @closeTopicDialog="closeTopicDialog"
        @saveTopic="saveTopic"></topic-dialog>

    </div>
</template>

<script>
//import components
import ViewComment from '../components/ViewComment.vue'
import TopicDialog from '../components/TopicDialog.vue'

import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

export default {
    components: {
        'view-comment': ViewComment,
        'topic-dialog': TopicDialog
    },
    data: () => ({
        intPageNo: 1,
        intItemsPerPage: 20,
        viewCommentDialog: false,
        viewCommentDetails: {},
        //tempTopics: [],
        baseUrl : 'https://atillc.blob.core.windows.net/data-collector/icode/test-data/topics.json',
        topics: [],
        persons: [],
        addTopicDialog: false,
        topicName: '',
        topicIndex: '',
        action: '',
        topicDialog: false,
        guidChar: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    }),
    created(){
        this.loadJSON()
    },
    computed: {
        pageCountOfData(){
            let l = this.topics.length,
            s = this.intItemsPerPage
            return Math.ceil(l/s)
        },
        getTopics(){
            const start = (this.intPageNo - 1) * this.intItemsPerPage,
            end = start + this.intItemsPerPage
            return this.topics.slice(start, end)
        }
    },
    watch:{
        
    },
    methods:{
        loadJSON(){
            axios.get(this.baseUrl).then(res=>{
                //using map
                res.data.persons.map(rec=>{
                    let obj = {
                        fullname: rec.first + ' ' + rec.last,
                        first: rec.first,
                        last: rec.last,
                        guid: rec.guid,
                        email: rec.email
                    }
                    this.persons.push(obj)
                })

                //using for loop
                for(let data of res.data.topics){
                    let comments = []

                    for(let comment of data.comments){
                        let by = comment.by;
                        //get data of commentor on data.persons
                        let user = res.data.persons.filter(rec=>{
                            return rec.guid == by
                        })

                        if(user.length > 0){
                            let userObj = {
                                first: user[0].first,
                                last: user[0].last,
                                guid: user[0].guid,
                                email: user[0].email,
                                date: moment(comment.date).format('YYYY/MM/DD, h:mm A'),
                                comment: comment.comment
                            }
                            comments.push(userObj)
                        }
                    }

                    //sort comments by date DESC
                    let sortedComments = _.orderBy(comments, 'date', 'desc')

                    let obj = {
                        name: data.name,
                        guid: data.guid,
                        comments: sortedComments
                    }

                    this.topics.push(obj)
                }
            })
        },
        openViewCommentDialog(i, topic){
            this.topicIndex = i.toString()
            this.viewCommentDialog = true
            this.viewCommentDetails = topic
        },
        closeViewCommentDialog(val){
            this.viewCommentDialog = val;
            this.viewCommentDetails = {}
        },
        updateTopics(i, name){
            this.topics[i].name = name
        },
        deleteTopic(i){
            this.topics.splice(i, 1)
        },
        addTopicComments(i, comment){
            if(this.topics[i].comments.length > 0){
                this.topics[i].comments.unshift(comment)
            } else{
                this.topics[i].comments.push(comment)
            }
        },
        deleteTopicComment(i, j){
            //i = topic array index
            //j = comment array index
            this.topics[i].comments.splice(j, 1);
        },
        allowEdit(i, action, name){
            this.action = action
            this.topicIndex  = i.toString()
            this.topicName = name
            this.topicDialog = true
        },
        closeTopicDialog(val){
            this.topicDialog = val
        },
        saveTopic(i, action, name){
            if(action == 'edit'){
                this.topics[i].name = name
            } else if(action == 'add'){
                //generate random guid
                let guid = ' ';
                for ( let x = 0; x < 8; x++ ) {
                    guid += this.guidChar.charAt(Math.floor(Math.random() * 8));
                }
                let obj = {
                    name: name,
                    guid: guid,
                    comments: []
                }
                this.topics.unshift(obj)
            }
        }
    }
}
</script>