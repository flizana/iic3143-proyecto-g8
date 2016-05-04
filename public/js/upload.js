// upload.js

function uploadProfilePicture(){
    $('#photo-upload').trigger('click');
}
$(document).ready(function (){
    $("form[name='avatar'] input:file").change(function (){
        $("form[name='avatar']").submit();
    });
});