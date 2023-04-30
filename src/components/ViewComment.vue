<template>
  <div>
    <v-dialog v-model="localDialog" max-width="950" persistent>
      <v-card dense>
        <v-toolbar class="gradient">
          <v-row class="pl-5 pr-3">
              <v-col md="6">
                  <span class="capitalize">{{ topicName }}</span>
              </v-col>
              <v-col md="6" class="text-right">
                  <v-icon @click="closeViewCommentDialog()">mdi-close</v-icon>
              </v-col>
          </v-row>
        </v-toolbar>
        <v-card-text>
          <v-row>
              <v-col class="text-right">
                  <v-btn variant="text" color="green" @click="enableEdit()">
                      <v-icon class="mr-2">mdi-pencil</v-icon>
                      Edit
                  </v-btn>
                  |
                  <v-btn variant="text" color="red" @click="deleteTopic()">
                      <v-icon class="mr-2">mdi-delete</v-icon>
                      Delete
                  </v-btn>
              </v-col>
          </v-row>
          <v-card-title class="text-center capitalize">
              <span class="capitalize" v-if="!isEdit">{{ topicName }}</span>
              <v-text-field
              placeholder="Update Topic Name"
              append-inner-icon="mdi-content-save-edit-outline"
              @click:append-inner="saveNewTopicName()"
              @keyup.enter="saveNewTopicName()"
              v-else-if="isEdit"
              v-model="newTopicName"
              :rules="[rules.required]"></v-text-field>
              <div class="success" v-show="success">Successfully updated the topic name.</div>
              <div class="failed" v-show="failed">No changes were made.</div>
          </v-card-title>

          
          <span class="label"><v-icon class="imr-1">mdi-comment-multiple-outline</v-icon> Comments:</span>
          
          <!-- COMMENTS  -->
          <!-- ADD -->
          <v-list lines="2">
            <div class="failed ml-3" v-if="isEmptyComment">
              Please type a comment!
            </div>
            <v-list-item class="mt-3 mb-2" style="width: 98% !important;">
                <v-text-field
                v-model="comment.comment"
                append-inner-icon="mdi-comment-outline"
                placeholder="Add comment..."
                :rules="[rules.required]"></v-text-field>
            </v-list-item>
            <div class="failed ml-3" v-if="isEmptyGUID">
              Please select a user!
            </div>
            <v-row class="ml-2" style="width: 98% !important;">
              <v-col cols="10">
                <v-autocomplete
                v-model="comment.guid"
                :items="persons"
                item-title="fullname"
                item-value="guid"
                placeholder="Submit Comment as:"
                label="Submit as:"
                density="compact"
                :rules="[rules.required]"></v-autocomplete>
              </v-col>
              <v-col cols="2" class="text-right">
                <v-btn
                color="primary"
                @click="sendComment()">
                  <v-icon class="mr-3">mdi-send-outline</v-icon>
                  Submit
                </v-btn>
              </v-col>
            </v-row>

            <div class="text-center mt-3 comment-added" v-if="isCommentAdded">
              Comment Added!
            </div>

            <!-- SHOW/UPDATE/DELETE -->
            <v-list-item
                v-for="(comment, i) in localComments"
                :key="i"
                class="mt-5"
            >
                <template v-slot:prepend>
                    <v-avatar color="grey-lighten-1">
                        <v-icon color="white">mdi-account-circle</v-icon>
                    </v-avatar>
                </template>
                <v-row>
                    <v-col md="8">
                        <v-list-item-title>{{ comment.first + ' ' + comment.last }}</v-list-item-title>
                    </v-col>
                    <v-col md="4" class="text-right">
                      <span class="date">{{ comment.date }}</span>
                      <!-- DELETE/EDIT COMMENT -->
                      <v-menu location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" variant="text">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title @click="editIndex = i, newComment = comment.comment">
                                  <v-btn variant="plain" color="success">
                                    Edit
                                  </v-btn>
                                </v-list-item-title>
                                <v-list-item-title @click="deleteComment(i)">
                                  <v-btn variant="plain" color="error">
                                    Delete
                                  </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                </v-row>
                <v-list-item-subtitle>
                    <span v-if="editIndex != i">{{ comment.comment }}</span>
                    <div v-else-if="editIndex == i">
                      <v-text-field
                      label="Edit comment"
                      placeholder="Edit comment"
                      v-model="newComment"
                      append-inner-icon="mdi-send-outline"
                      @click:append-inner="saveComment()"
                      @keyup.enter="saveComment()"></v-text-field>
                    </div>
                </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import _ from 'lodash'
import moment from 'moment';
export default {
  props: {
    viewCommentDialog: {
      type: Boolean,
      required: true
    },
    viewCommentDetails: {
      type: Object,
      required: true
    },
    persons:{
      type: Array,
      required: true
    },
    topicIndex:{
      type: String,
      required: true
    },
  },
  data() {
    return {
      localDialog: this.viewCommentDialog,
      localComments: [],
      comment: {},
      isEdit: false,
      isDelete: false,
      newTopicName: '',
      topicName: this.viewCommentDetails.name,
      success: '',
      failed: '',
      guid: '',
      index: '',
      rules: {
        required: value => !!value || 'Cannot be empty!',
      },
      isEmptyComment: false,
      isEmptyGUID: false,
      isCommentAdded: false,
      editIndex: -1,
      newComment: ''
    };
  },
  watch: {
    viewCommentDialog(newVal) {
      this.localDialog = newVal;
      if(newVal){
          this.topicName = this.viewCommentDetails.name
          this.guid = this.viewCommentDetails.guid
          this.index = _.findIndex(this.topics, { guid: this.guid })
          this.localComments = this.viewCommentDetails.comments
      }
    },
  },
  methods: {  
      enableEdit(){
          this.isEdit = !this.isEdit;
          this.newTopicName = this.viewCommentDetails.name
      },
      saveNewTopicName(){
          //edit from topics array
          if(this.topicName.toLowerCase() == this.newTopicName.toLowerCase()){
            this.isEdit = false;
            this.failed = true;

            setTimeout(() => {
                this.failed = false
            }, 3000);
          } else{
            this.topicName = this.newTopicName
            
            this.$emit('updateTempTopics', parseInt(this.topicIndex), this.newTopicName)            

            this.isEdit = false;
            this.success = true;

            setTimeout(() => {
                this.success = false
            }, 3000);
          }
      },
      deleteTopic(){
        this.$emit('deleteTopic', this.index)
        this.closeViewCommentDialog()
      },
      closeViewCommentDialog(){
          this.$emit('closeViewCommentDialog', false)
          this.localDialog = false
          this.isEdit = false
          this.topicName = ''
          this.newTopicName = ''
          this.isEdit = false
          this.success = false
          this.index = ''
          this.guid = ''
          this.localComments = []
      },
      sendComment(){
        if(!this.comment.guid){
          this.isEmptyGUID = true
        } else if(!this.comment.comment){
          this.isEmptyComment = true
        } else{
          let i = _.findIndex(this.persons, { guid: this.comment.guid })
          this.comment.date = moment().format('YYYY/MM/DD, h:mm A')
          this.comment.first = this.persons[i].first
          this.comment.last = this.persons[i].last
          this.comment.email = this.persons[i].email

          this.$emit('addTopicComment', this.index, this.comment)
          
          if(this.localComments.length > 0){
            this.localComments.unshift(this.comment)
          } else{
            this.localComments.push(this.comment)
          }

          this.isCommentAdded = true

          setTimeout(() => {
            this.isCommentAdded = false
          }, 4000);

          this.comment = {}
          this.isEmptyComment = false
          this.isEmptyGUID = false
        }
      },
      deleteComment(i){
        this.localComments.splice(i, 1)
        this.$emit('deleteTopicComment', this.index, i) 
        //this.index = index of topic where the comment was from
        //i = index of the comment in comments array of topics
      },
      saveComment(){
        this.localComments[this.editIndex].comment = this.newComment
        this.editIndex = -1
      }
  }
};
</script>