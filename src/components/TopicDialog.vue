<template>
    <div>
      <v-dialog v-model="localDialog" max-width="900" persistent>
        <v-card dense>
          <v-toolbar class="gradient">
            <v-row class="pl-5 pr-3">
                <v-col md="6">
                    <span class="capitalize">{{ localAction == 'add' ? 'Add New' : localAction == 'edit' ? 'Edit' : ''  }} Topic</span>
                </v-col>
                <v-col md="6" class="text-right">
                    <v-icon @click="closeTopicDialog()">mdi-close</v-icon>
                </v-col>
            </v-row>
          </v-toolbar>
          <v-card-text>
            <v-text-field
            v-model="localTopicName"
            :placeholder="localAction == 'add' ? 'Add New Topic': localAction == 'edit' ? 'Edit Topic Name': ''"
            :label="localAction == 'add' ? 'Add New Topic': localAction == 'edit' ? 'Edit Topic Name': ''"
            append-inner-icon="mdi-send-outline"
            @click:append-inner="saveTopic()"
            @keyup.enter="saveTopic()"></v-text-field>            
            <div class="text-center">
              <v-btn variant="outlined" color="success" @click="saveTopic()">
                <v-icon class="mr-3">mdi-send-outline</v-icon>
                {{ localAction == 'add' ? 'Submit': localAction == 'edit' ? 'Update': '' }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
</template>
  
<script>
    // import _ from 'lodash'
  export default {
    props: {
      topicDialog: {
        type: Boolean,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      topicIndex:{
        type: String,
        required: true
      },
      topicName: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        localDialog: this.topicDialog,
        localAction: '',
        localIndex: '',
        localTopicName: ''
      };
    },
    watch: {
      topicDialog(newVal) {
        this.localDialog = newVal
        
        if(newVal){
          this.localAction = this.action
          this.localIndex = this.topicIndex
          this.localTopicName = this.topicName
        }
      },
    },
    methods: {
      closeTopicDialog(){
          this.$emit('closeTopicDialog', false)
      },
      saveTopic(){
        this.$emit('saveTopic', parseInt(this.localIndex), this.localAction, this.localTopicName)
        this.closeTopicDialog()
      }
    }
  };
</script>