<template>
<div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main bg-pattern-3">
        <!-- Header main -->
        <HeaderMain></HeaderMain>
    </header>
    <!-- create -->
    <section class="create-section section-space-b pt-4 pt-md-5 mt-md-4">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="section-head-sm">
                            <router-link :to="SectionData.createSingleData.path" class="btn-link fw-semibold"><em class="ni ni-arrow-left"></em> {{SectionData.createSingleData.btnText }}</router-link>
                            <h1 class="mt-2">Create a Collection</h1>
                        </div>
                    </div><!-- end col -->
                    <div class="col-lg-8">
                        <form action="#" class="form-create mb-5 mb-lg-0">
                            <div class="form-item mb-4 row">
                                <div class="col-md-6">
                                    <h5 class="mb-3">Upload Logo Image</h5>
                                    <div class="file-upload-wrap">
                                        <p class="file-name mb-4" id="logo-file-name">PNG, GIF, JPG. Max 100mb.</p>
                                        <input id="logo-file-upload" class="file-upload-input" data-target="logo-file-name" type="file" hidden>
                                        <label for="logo-file-upload" class="input-label btn btn-primary">Choose File</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="mb-3">Upload Coveer Image</h5>
                                    <div class="file-upload-wrap">
                                        <p class="file-name mb-4" id="cover-file-name">PNG, GIF, JPG. Max 100mb.</p>
                                        <input id="cover-file-upload" class="file-upload-input" data-target="cover-file-name" type="file" hidden>
                                        <label for="cover-file-upload" class="input-label btn btn-primary">Choose File</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-item mb-4">
                                <div class="mb-4">
                                    <label class="mb-2 form-label">Display name <small>(required)</small></label>
                                    <input type="text" class="form-control form-control-s1" placeholder="Enter collection name">
                                </div>
                                <div class="mb-4">
                                    <label class="mb-2 form-label">Symbol <small>(required)</small></label>
                                    <input type="text" class="form-control form-control-s1" placeholder="Enter collection name">
                                </div>
                                <div class="mb-4">
                                    <label class="mb-2 form-label">Description <small>(optional)</small></label>
                                    <textarea name="message" class="form-control form-control-s1" placeholder="Spread some words about your token collection"></textarea>
                                </div>
                                <div class="mb-4">
                                    <label class="mb-2 form-label">Short url <small>(will be used as public url)</small></label>
                                    <div class="d-flex align-items-center">
                                        <p>https://prelabtech.com/collection/</p>
                                        <input type="text" class="form-control form-control-s1" placeholder="Enter short url">
                                    </div>
                                </div>
                            </div><!-- end form-item -->
                            <button class="btn btn-primary" type="button" onclick="createCollection">Create</button>
                        </form>
                    </div><!-- endn col -->
                </div><!-- row-->
            </div><!-- container -->
        </section><!-- create-section -->
    <!-- Footer  -->
    <Footer></Footer>
</div><!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'
export default {
  name: 'CreateSingle',
  data () {
    return {
      SectionData,
      selected: 'Select Collection',
      options: [
        'Select Collection',
        'Abstraction',
        'Patternlicious',
        'Skecthify',
        'Cartoonism',
        'Virtuland',
        'Papercut'
      ]
    }
  },
  mounted () {
    /*==============File upload =============== */
    function fileUpload(selector) {
        let elem = document.querySelectorAll(selector);
        if(elem.length > 0) {
            elem.forEach(item => {
            item.addEventListener("change", function(){
                var target = document.getElementById(item.dataset.target);
                var allowedExtensions  = ["jpg", "png", "gif", "webp", "mp4", "mp3"];
                var fileExtension  = this.value.split(".").pop();
                var lastDot = this.value.lastIndexOf('.');
                var ext = this.value.substring(lastDot + 1);
                var extTxt = target.value = ext;

                if(!allowedExtensions.includes(fileExtension)) {
                alert(extTxt + " file type not allowed, Please upload jpg, png, gif, webp, mp4 or mp3 file");
                target.innerHTML = "Please upload jpg, png, gif, webp, mp4 or mp3 file";
                }else {
                target.innerHTML = item.files[0].name;
                }
            })
            })
        }
    }

    fileUpload(".file-upload-input");

    /*  ============== Unlock once purchased Checkbox switcher ============= */
    function checkboxSwitcher(selector) {
    let elem = document.querySelectorAll(selector);
    if(elem.length > 0) {
        elem.forEach(item => {
        item.addEventListener("change", function(){
            let target = document.getElementById(item.dataset.target);
            if(this.checked) {
            target.classList.add("is-shown");
            }else {
            target.classList.remove("is-shown");
            }
        });
        });
    }
    }

    checkboxSwitcher(".checkbox-switcher");

  }
}
</script>