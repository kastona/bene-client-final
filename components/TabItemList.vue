<template>
  <v-card flat
          v-if="userItems.length > 0">

    <v-list color="primary" dense class="text-left">
      <v-list-item-group
        active-class="pink--text"
      >
        <template v-for="(song, index) in userItems">
          <v-list-item @click="handleClick(song)" :key="song.title">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title class="white--text" v-text="song.title"></v-list-item-title>
                <v-list-item-subtitle class="white--text">ft {{song.featured}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action v-if="song.approved">
                <v-list-item-action-text class="white--text" v-text="`downloads`"></v-list-item-action-text>
                <div class="overline white--text">{{song.hits}}</div>
              </v-list-item-action>

              <v-list-item-action v-else>
                <v-list-item-action-text class="secondary--text" v-text="`Not approved yet.`"></v-list-item-action-text>
                <div class="overline white--text">contact admin</div>
              </v-list-item-action>

            </template>
          </v-list-item>

          <v-divider
            v-if="index + 1 < userItems.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <div class="py-2"></div>

    <v-dialog v-model="editSongDialog" scrollable max-width="400px">

      <v-card style="height: 300px;" v-if="selectedSong">
        <v-card-title class="primary--text"><strong>ID</strong>
          <small style="background-color: rgba(241,241,255,0.85); margin-left: 3px; padding: 0 1px;">{{selectedSong._id}}</small>
          <v-spacer></v-spacer>
          <v-btn
            v-clipboard:copy="selectedSong._id"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            color="primary"
            x-small
          >copy</v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col class="" cols="6">
              <strong>Song Title</strong>
              <div class="caption">{{selectedSong.title}}</div>
            </v-col>

            <v-col class="" cols="6">
              <strong>Featuring</strong>
              <div v-if="selectedSong.featured" class="caption">{{selectedSong.featured}}</div>
              <div v-else class="caption">None</div>
            </v-col>
            <v-col cols="6">
              <strong>Ratings</strong>
              <v-rating color="#FFDF00" readonly dense size="15" v-model="selectedSong.rating"></v-rating>
            </v-col>

            <v-col class="pb-0" cols="6">
              <strong>Uploaded</strong>
              <div class="caption">{{$moment(selectedSong.createdAt).fromNow()}}</div>
            </v-col>

            <v-col class="pb-0" cols="6">
              <strong>Last Edited</strong>
              <div class="caption">{{$moment(selectedSong.updatedAt).fromNow()}}</div>
            </v-col>

            <v-col cols="6">
              <strong>Total Downloads</strong>
              <div  class="caption">{{selectedSong.hits}}</div>
            </v-col>

          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="editSongDialog = false">Close</v-btn>
          <v-btn nuxt :to="{path: `/songs/${seoTitle}`}" color="blue darken-1" text>View</v-btn>
          <v-btn nuxt :to="{path: `/me/edit-song/${selectedSong._id}`}" color="blue darken-1" text>Edit</v-btn>
          <v-btn icon color="secondary" text @click="dialog3 = true"><v-icon>mdi-delete</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog3"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-title class="error--text">
          <span>Warning!</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete this song?
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="dialog3 = false"
          >
            Cancel
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="error"
            text
            :loading="deleteLoading"
            @click="deleteSong"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
  <v-card flat v-else>
    <v-card-text v-if="emptyMessage">{{emptyMessage}}</v-card-text>
    <v-card-text v-else>
      Your collection is empty
    </v-card-text>
  </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  import copy from 'copy-to-clipboard'
  export default {
    data: () =>({
      editSongDialog: false,
      selectedSong: null,
      dialog3: false,
      deleteLoading: false
    }),
    props: ['userItems', 'emptyMessage', 'page', 'length'],
    methods: {
      ...mapActions({
        delete: 'songs/deleteSong'
      }),
      handleClick(song) {
        this.selectedSong = song
        this.editSongDialog = true;
      },

      async deleteSong() {
        this.deleteLoading = true
        try {
          await this.delete(this.selectedSong._id)
          await this.$router.go()
        }catch(error) {
          this.deleteLoading = false
          this.$toasted.error('Some error happened!')
        }
      },
      onCopy() {
        this.$toasted.success('Copied')
      },
      onError() {
        this.$toasted.error('Couldn\'t copy')
      }
    },
    computed: {
      seoTitle() {
        return `${this.selectedSong._id}/${this.selectedSong.seoTitle}`
      },
      myPath() {
        return this.selectedSong.audio? 'songs': 'videos'
      }
    }
  }
</script>
