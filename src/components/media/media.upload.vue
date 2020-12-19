<template>
  <div class="">
    <i class="material-icons absolute top-0 right-0 m-1" @click="$emit('close')">close</i>
    <h3>Media Upload</h3>
    <div class="grid grid-cols-1">
      <div class="text-center">
        <div v-if="currentFile" class="progress">
          <div
            class="bg-blue-400 h-4 my-1"
            role="progressbar"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{ width: progress + '%' }">
            {{ progress }}%
          </div>
        </div>

        <div class="h-64 border-2 flex flex-row items-center justify-center text-center border-dashed relative">
          <span v-if="!preview && !filename" class="text-gray-300 text-2xl">click here to select a file</span>
          <input class="opacity-0 w-full absolute top-0 left-0 h-64 z-2" type="file" ref="file" @change="selectFile" />
          <img class="absolute h-64" v-if="preview" :src="preview"/>
          <span v-if="filename && !preview">{{filename}}</span>
        </div>

        <button class="m-2" v-if="selectedFiles" @click="upload">
          Upload
        </button>
        <div class="absolute top-0 left-0 right-0 bottom-0 z-2xtop bg-white opacity-75 flex items-center justify-center" v-if="uploading">
          {{message}}
        </div>
      </div>
      <!--<div>
        <img v-if="preview" :src="preview" class="w-64"/>
      </div> -->
    </div>
  
  </div>
</template>
<script>
//import FileUpload from 'vue-upload-component'
export default {
  //components: {
  //  FileUpload,
  //},
  data:()=>({
      selectedFiles: null,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      filename: '',
      preview: null,
      uploading: false
  }),
  methods: {
    selectFile() {
      this.preview = null

      this.previewFile()
      this.selectedFiles = this.$refs.file.files;
    },
    upload() {
      this.progress = 0;

      this.currentFile = this.selectedFiles.item(0);
      console.log( this.currentFile )
      
      this.uploadFile(this.currentFile, event => {
        this.uploading = true
        this.message = 'Uploading ...'
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then(response => {
          this.uploading = false
          this.message = response.data.message;
          this.currenFile = null
          this.selectedFiles = null
          this.preview = null
          this.filename = ''
          this.$emit('uploaded')
          //return UploadService.getFiles();
        })
        .then(files => {
          this.uploading = false
          this.fileInfos = files.data;
        })
        .catch(() => {
          //this.uploading = false
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
    },
    previewFile() {
      let file = this.$refs.file.files[0];
      this.filename = file.name
      if(!file || file.type.indexOf('image/') === -1) return;
      let reader = new FileReader();

      reader.onload = e => {
        this.preview = e.target.result;
      }

      reader.readAsDataURL(file);
    },
    uploadFile(file, onUploadProgress) {
        let formData = new FormData()
        formData.append("files", file )
        for (var key of formData.entries()) {
			  console.log(key[0] + ', ' + key[1])
		}
        return this.$http.post("/upload", 
             formData ,
             {   
                 headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress
            })
    }
  }
}
</script>